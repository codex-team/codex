<?php defined('SYSPATH') OR die('No Direct Script Access');

/**
 * Модель статьи, имеет поля, соответствующие полям в базе данных и статические методы для получения
 * статьи и массива статей по некоторым признакам.
 *
 * @author     Eliseev Alexandr
 */
Class Model_Article extends Model
{
    public $id = 0;
    public $uri;
    public $title;
    public $text;
    public $json;
    public $blocks;
    public $description;
    public $cover;
    public $user_id;
    public $dt_create;
    public $dt_update;
    public $is_removed;
    public $is_published;
    public $quiz_id;
    /**
    * @var bool $marked — позволяет выделить важную статью в списке
    */
    public $marked = false;

    /**
    * @var null|int $order — позволяет изменять порядок вывода статей
    */
    public $order = null;

    public $author;
    public $commentsCount;

    /**
     * Пустой конструктор для модели статьи, если нужно получить статью из хранилища, нужно пользоваться статическими
     * методами
     */
    public function __construct()
    {
    }

    /**
     * Добавляет текущий объект в базу данных и присваивает ему айдишник.
     *
     * @throws Kohana_Exception
     * @return int inserted id
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Articles::insert()
                                ->set('title',          $this->title)
                                ->set('text',           $this->text)
                                ->set('json',           $this->json)
                                ->set('description',    $this->description)
                                ->set('quiz_id',        $this->quiz_id)
                                ->set('cover',          $this->cover)
                                ->set('user_id',        $this->user_id)
                                ->set('marked',         $this->marked)
                                ->set('order',          $this->order)
                                ->set('is_published',   $this->is_published)
                                ->clearcache('articles_list')
                                ->execute();

        if ($idAndRowAffected) {
            $article = Dao_Articles::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($article);
        }

        return $idAndRowAffected;
    }

    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $article_row array строка из базы данных с создаваемой статьёй
     * @return Model_Article модель, заполненная полями из статьи, либо пустая модель, если была передана пустая строка.
     */
    private function fillByRow($article_row)
    {
        if (!empty($article_row['id'])) {

            $this->id           = $article_row['id'];
            $this->uri          = $article_row['uri'];
            $this->title        = $article_row['title'];
            $this->text         = $article_row['text'];
            $this->json         = $article_row['json'];
            $this->description  = $article_row['description'];
            $this->quiz_id      = $article_row['quiz_id'];
            $this->cover        = $article_row['cover'];
            $this->user_id      = $article_row['user_id'];
            $this->marked       = $article_row['marked'];
            $this->order        = $article_row['order'];
            $this->dt_create    = $article_row['dt_create'];
            $this->dt_update    = $article_row['dt_update'];
            $this->is_removed   = $article_row['is_removed'];
            $this->is_published = $article_row['is_published'];

            $this->author           = Model_User::get($this->user_id);
            $this->commentsCount    = Model_Comment::countCommentsByArticle($this->id);
        }

        return $this;
    }


    /**
     * Удаляет статью, представленную в модели.
     *
     * @param $user_id Number идентификатор пользователя, для проверки прав на удаление статьи
     */
    public function remove($user_id)
    {
        if ($this->id != 0 && $user_id == $this->user_id) {

            Dao_Articles::update()->where('id', '=', $this->id)
                ->set('is_removed', 1)
                ->clearcache('articles_list')
                ->execute();

            // Статья удалена
            $this->id = 0;
        }
    }


    /**
     * Обновляет статью, сохраняя поля модели.
     */
    public function update()
    {
        Dao_Articles::update()->where('id', '=', $this->id)
            ->set('title',          $this->title)
            ->set('uri',            $this->uri)
            ->set('text',           $this->text)
            ->set('json',           $this->json)
            ->set('description',    $this->description)
            ->set('quiz_id',        $this->quiz_id)
            ->set('cover',          $this->cover)
            ->set('marked',         $this->marked)
            ->set('order',          $this->order)
            ->set('user_id',        $this->user_id)
            ->set('is_published',   $this->is_published)
            ->set('dt_update',      $this->dt_update)      // TODO(#38) remove
            ->clearcache($this->id)
            ->execute();
    }

    /**
     * Возвращает статью из базы данных с указанным идентификатором, иначе возвращает пустую статью с айдишником 0.
     *
     * @param int $id идентификатор статьи в базе
     * @return Model_Article экземпляр модели с указанным идентификатором и заполненными полями, если найден в базе или
     * пустую модель с айдишником равным нулю.
     */
    public static function get($id = 0, $needClearCache = false)
    {
        $article = Dao_Articles::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $article->clearcache($id);
        } else {
            $article->cached(Date::MINUTE * 5, $id);
        }

        $article = $article->execute();

        $model = new Model_Article();

        return $model->fillByRow($article);
    }

    public static function getByUserId($user_id)
    {
        $articleRows = Dao_Articles::select()
            ->where('user_id', '=', $user_id)
            ->where('is_removed', '=', 0)
            ->limit(1)
            ->execute();

        return self::rowsToModels($articleRows);
    }


    /**
     * Получить все активные (опубликованные и не удалённые статьи) в порядке убывания айдишников.
     */
    public static function getActiveArticles($clearCache = false)
    {
        return Model_Article::getArticles(0, false, false, !$clearCache ? Date::MINUTE * 5 : null);
    }


    /**
     * Получить все не удалённые статьи в порядке убывания айдишников.
     */
    public static function getAllArticles()
    {
        return Model_Article::getArticles(0, true, false);
    }

    /**
     * Получает статьи определенного пользователя
     * @param int $uid
     * @param bool $clearCache - позволяет очистить кэш списка
     */
    public static function getArticlesByUserId($uid, $clearCache = false)
    {
        return Model_Article::getArticles($uid, false, false, !$clearCache ? Date::MINUTE * 5 : null);
    }



    /**
     * Получить список статей с указанными условиями.
     *
     * @param int $uid - получить статьи определенного пользователя
     * @param $add_removed boolean добавлять ли удалённые статьи в получаемый список статей
     * @param $add_not_published boolean
     * @param $cacheMinuteTime int на сколько минут кешировать, по умолчанию null,
     * кеш не сбрасывается при добавлении новой статьи.
     * @return array ModelArticle массив моделей, удовлетворяющих запросу
     */
    private static function getArticles($uid = 0, $add_unpublished = false, $add_removed = false, $cachedTime = null)
    {
        $articlesQuery = Dao_Articles::select()->limit(200);        // TODO(#40) add pagination.

        if ($uid) {
            $articlesQuery->where('user_id', '=', $uid);
        }

        if (!$add_removed) {
            $articlesQuery->where('is_removed', '=', false);
        }

        if (!$add_unpublished) {
            $articlesQuery->where('is_published', '=', true);
        }

        if ($cachedTime) {
            /** Используем разные ключи кэша для списка статей /articles и статей в профиле пользователя */
            $cacheKey = !$uid ? 'articles_list' : 'user_articles:' . $uid;
            $articlesQuery->cached($cachedTime, $cacheKey);
        }

        /**
        * Сначала сортируем по 'order', затем по дате
        */
        $article_rows = $articlesQuery->order_by('order', 'DESC')->order_by('id', 'DESC')->execute();

        return self::rowsToModels($article_rows);
    }

    private static function rowsToModels($article_rows)
    {
        $articles = array();

        if (!empty($article_rows)) {
            foreach ($article_rows as $article_row) {
                $article = new Model_Article();

                $article->fillByRow($article_row);

                array_push($articles, $article);
            }
        }

        return $articles;
    }


    /**
     * Метод достает из БД все статьи, кеширует их на пять минут и выбирает из них три рандомные статьи.
     * В перспективе этот метод заменит метод, с выборкой трех популярных статей, либо персональных рекомендаций статей.
     *
     * @param $currentArticleId - передается айди статьи, на странице которой выводится блок "Читайте далее".
     * @param $numberOfRandomArticles - сколько рандомных статей выводить.
     * @return array Model_Article - массив объектов Article.
     */
    public static function getRandomArticles($currentArticleId, $numberOfRandomArticles = 3)
    {
        //получаем все статьи и кэшируем их на 5 минут
        $allArticles = self::getArticles(false, false, 5);

        foreach ( $allArticles as $key => $article ){
            if ( $article->id == $currentArticleId ) unset($allArticles[$key]);
        }

        //мешаем массив статей
        shuffle($allArticles);

        return array_slice($allArticles, 0, $numberOfRandomArticles);
    }

    /**
     * Метод проверяет, есть ли в кеше статьи отсортированные по популярности,
     * если нет, тогда достает их из базы и сортирует в порядке убывания просмотров и кеширует.
     * Затем, полученный массив перемешивает, и достает три первых статьи и возвращает их.
     *
     * @param int $currentArticleId - айди статьи, на странице которой выдаетсяблок популярных статей.
     * @param int $numberOfArticles - сколько популярных статей выводить.
     * @return array of Model_Article - массив объектов Model_Article.
     */
    public static function getPopularArticles($currentArticleId, $numberOfArticles = 3)
    {
        $memcache = Cache::instance('memcache');
        $allArticles = $memcache->get('pop_articles');

        if (!$allArticles){
            $allArticles = self::getArticles(false, false, 10);
            $stats = new Model_Stats();

            foreach ( $allArticles as $key => $article ){
                $article->views = $stats->get(Model_Stats::ARTICLE, $article->id);
                if ( $article->id == $currentArticleId ) unset($allArticles[$key]);
            }

            // сортируем массив статей в порядке убывания по просмотрам
            usort($allArticles, function($a, $b){
                return ($a->views < $b->views) ? 1 : -1;
            });

            $memcache->set('pop_articles', $allArticles, null, Date::MINUTE);
        }

        $mostPopularArticles = array_slice($allArticles, 0, 10);
        shuffle($mostPopularArticles);

        return array_slice($mostPopularArticles, 0, $numberOfArticles);
    }
}
