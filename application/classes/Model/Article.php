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
    public $title;
    public $text;
    public $description;
    public $cover;
    public $user_id;
    public $dt_create;
    public $dt_update;
    public $is_removed;
    public $is_published;

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
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Articles::insert()
                                ->set('title',          $this->title)
                                ->set('text',           $this->text)
                                ->set('description',    $this->description)
                                ->set('cover',          $this->cover)
                                ->set('user_id',        $this->user_id)
                                ->set('is_published',   $this->is_published)
                                ->clearcache()
                                ->execute();

        if ($idAndRowAffected) {
            $article = Dao_Articles::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($article);
        }
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
            $this->title        = $article_row['title'];
            $this->text         = $article_row['text'];
            $this->description  = $article_row['description'];
            $this->cover        = $article_row['cover'];
            $this->user_id      = $article_row['user_id'];
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
                ->clearcache()
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
            ->set('text',           $this->text)
            ->set('description',    $this->description)
            ->set('cover',          $this->cover)
            ->set('user_id',        $this->user_id)
            ->set('is_published',   $this->is_published)
            ->set('dt_update',      $this->dt_update)      // TODO(#38) remove
            ->clearcache()
            ->execute();
    }

    /**
     * Возвращает статью из базы данных с указанным идентификатором, иначе возвращает пустую статью с айдишником 0.
     *
     * @param int $id идентификатор статьи в базе
     * @return Model_Article экземпляр модели с указанным идентификатором и заполненными полями, если найден в базе или
     * пустую модель с айдишником равным нулю.
     */
    public static function get($id = 0)
    {
        $article = Dao_Articles::select()
            ->where('id', '=', $id)
            ->limit(1)
            ->execute();

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
    public static function getActiveArticles()
    {
        return Model_Article::getArticles(false, false);
    }


    /**
     * Получить все не удалённые статьи в порядке убывания айдишников.
     */
    public static function getAllArticles()
    {
        return Model_Article::getArticles(true, false);
    }

    /**
     * Получить список статей с указанными условиями.
     *
     * @param $add_removed boolean добавлять ли удалённые статьи в получаемый список статей
     * @param $add_not_published boolean
     * @return array ModelArticle массив моделей, удовлетворяющих запросу
     */
    private static function getArticles($add_not_published = false, $add_removed = false)
    {
        $articlesQuery = Dao_Articles::select()->limit(200);        // TODO(#40) add pagination.

        if (!$add_removed) {
            $articlesQuery->where('is_removed', '=', false);
        }

        if (!$add_not_published) {
            $articlesQuery->where('is_published', '=', true);
        }

        $article_rows = $articlesQuery->order_by('id', 'DESC')->execute();

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
}
