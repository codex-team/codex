<?php defined('SYSPATH') or die('No Direct Script Access');

/**
 * Модель статьи, имеет поля, соответствующие полям в базе данных
 *
 * @author     Eliseev Alexandr
 */
class Model_Article extends Model
{
    public $id = 0;
    public $uri;
    public $linked_article = null;
    public $title;
    public $text;
    public $blocks;
    public $description;
    public $cover;
    public $is_big_cover;
    public $user_id;
    public $dt_create;
    public $dt_update;
    public $dt_publish;
    public $is_removed;
    public $is_published;
    public $quiz_id;
    public $lang = 'ru';
    const FEED_PREFIX = 'article';

    /**
    * @var bool $marked — позволяет выделить важную статью в списке
    */
    public $marked = false;

    public $author;
    public $commentsCount;

    /**
     * True if article showed on the index page
     * @var boolean
     */
    public $is_recent = false;

    /**
     * Estimated time for reading
     * @var boolean
     */
    public $read_time = null;

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
     * @return int inserted id
     *
     * @throws Kohana_Exception
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Articles::insert()
                                ->set('title', $this->title)
                                ->set('text', $this->text)
                                ->set('description', $this->description)
                                ->set('lang', $this->lang)
                                ->set('linked_article', $this->linked_article)
                                ->set('quiz_id', $this->quiz_id)
                                ->set('cover', $this->cover)
                                ->set('is_big_cover', $this->is_big_cover)
                                ->set('user_id', $this->user_id)
                                ->set('marked', $this->marked)
                                ->set('is_published', $this->is_published)
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
        $recentArticlesFeed = new Model_Feed_RecentArticles();

        if (!empty($article_row['id'])) {
            $this->id           = Arr::get($article_row, 'id');
            $this->uri          = Arr::get($article_row, 'uri');
            $this->linked_article = Arr::get($article_row, 'linked_article');
            $this->title        = Arr::get($article_row, 'title');
            $this->text         = Arr::get($article_row, 'text');
            $this->description  = Arr::get($article_row, 'description');
            $this->lang         = Arr::get($article_row, 'lang');
            $this->quiz_id      = Arr::get($article_row, 'quiz_id');
            $this->cover        = Arr::get($article_row, 'cover');
            $this->is_big_cover = Arr::get($article_row, 'is_big_cover');
            $this->user_id      = Arr::get($article_row, 'user_id');
            $this->marked       = Arr::get($article_row, 'marked');
            $this->dt_publish   = Arr::get($article_row, 'dt_publish');
            $this->dt_create    = Arr::get($article_row, 'dt_create');
            $this->dt_update    = Arr::get($article_row, 'dt_update');
            $this->is_removed   = Arr::get($article_row, 'is_removed');
            $this->is_published = Arr::get($article_row, 'is_published');
            $this->is_recent    = $recentArticlesFeed->isExist($this->id);
            $this->read_time    = Model_Methods::estimateReadingTime(null, $this->text);

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
            ->set('title', $this->title)
            ->set('uri', $this->uri)
            ->set('linked_article', $this->linked_article)
            ->set('text', $this->text)
            ->set('description', $this->description)
            ->set('lang', $this->lang)
            ->set('quiz_id', $this->quiz_id)
            ->set('cover', $this->cover)
            ->set('is_big_cover', $this->is_big_cover)
            ->set('marked', $this->marked)
            ->set('user_id', $this->user_id)
            ->set('is_published', $this->is_published)
            ->set('dt_publish', $this->dt_publish)
            ->set('dt_update', $this->dt_update)      // TODO(#38) remove
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

    /**
     * Links article to other one
     * @param integer $idArticleToLink - articles's ID to link if empty, unlink article
     */
    public function linkArticleAndSave($idArticleToLink = null)
    {
        Dao_Articles::update()->where('id', '=', $this->id)
                ->set('linked_article', $idArticleToLink)
                ->clearcache($this->id)
                ->execute();

        $this->linked_article = $idArticleToLink;
    }

    /**
     * Link articles with each other
     * @param integer $linked_article_id
     * @return bool - result for linking
     */
    public function linkWithArticle($linked_article_id)
    {
        /** Create links */
        if ($linked_article_id != null) {

            $second_article = Model_Article::get($linked_article_id);
            /** Second article has no link */
            if (!$second_article->linked_article) {

                /** If this article was linked */
                if ($this->linked_article) {

                    /** Unlink the old one linked article */
                    $oldLinkedArticle = Model_Article::get($this->linked_article);
                    $oldLinkedArticle->linkArticleAndSave();
                }

                // link second article to first
                $this->linkArticleAndSave($linked_article_id);

                // link first article to second
                $second_article->linkArticleAndSave($this->id);

            /** Second article was linked with other one */
            } elseif ($second_article->linked_article != $this->id) {

                /** We can't link already linked article then show error */
                return false;
            }

            /** If second article was linked with this article then do nothing */

        /** Remove both links */
        } elseif ($this->linked_article) {

            // remove "second <- first" link
            $second_article = Model_Article::get($this->linked_article);
            $second_article->linkArticleAndSave();

            // remove "first <- second" link
            $this->linkArticleAndSave();

        }

        /** If linked_article_id == null and $this->linked_article == null then do nothing*/

        return true;
    }

    /**
     * Returns several articles by ids
     *
     * @param array $ids               - ids of articles to select
     * @param boolean $needClearCache  - pass true to clear cache
     * @return Model_Article[]
     *
     * @todo move to separated Model_Articles
     */
    public static function getSome(array $ids, $needClearCache = false, $excludeUnpublised = false)
    {
        $articles = Dao_Articles::select()
            ->where('id', 'IN', $ids);

        if ($excludeUnpublised) {
           $articles->where('is_published', '=', true);
        }

        $cacheKey = 'getSome:' . implode(',', $ids);

        if ($needClearCache) {
            $articles->clearcache($cacheKey);
        } else {
            $articles->cached(Date::MINUTE * 5, $cacheKey);
        }

        $articles = $articles->execute();
        $articlesModels = array();

        if ($articles) {
            foreach ($articles as $article) {
                $model = new Model_Article();
                $articlesModels[] = $model->fillByRow($article);
            }
        }

        return $articlesModels;
    }

    /**
     * Получить все активные (опубликованные и не удалённые статьи) в порядке убывания айдишников.
     * @todo move to separated Model_Articles
     */
    public static function getActiveArticles($clearCache = false)
    {
        return Model_Article::getArticles(0, false, false, !$clearCache ? Date::MINUTE * 5 : null);
    }


    /**
     * Получить все не удалённые статьи в порядке убывания айдишников.
     * @deprecated - use Feed instead
     */
    public static function getAllArticles()
    {
        return Model_Article::getArticles(0, true, false);
    }

    /**
     * Получает статьи определенного пользователя
     * @param int $uid
     * @param bool $clearCache - позволяет очистить кэш списка
     * @deprecated - use Custom Feed instead
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
     *
     *
     *
     * @todo move to separated Model_Articles
     * @todo remove uid param
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
            $articlesQuery->cached($cachedTime, 'articles_list');
        }

        /**
        * Сначала сортируем по 'order', затем по дате
        */
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

    /**
     * Метод проверяет, есть ли в кеше статьи отсортированные по популярности,
     * если нет, тогда достает их из базы и сортирует в порядке убывания просмотров и кеширует.
     * Затем, полученный массив перемешивает, и достает три первых статьи и возвращает их.
     *
     * @param int $currentArticleId - айди статьи, на странице которой выдаетсяблок популярных статей.
     * @param int $numberOfArticles - сколько популярных статей выводить.
     * @return array of Model_Article - массив объектов Model_Article.
     *
     * @todo move to separated Model_Articles
     */
    public static function getPopularArticles($currentArticleId, $numberOfArticles = 3)
    {
        $memcache = Cache::instance('memcache');
        $full_key = URL::base('https', TRUE) . ':' . 'pop_articles';
        $allArticles = $memcache->get($full_key);

        if (!$allArticles) {
            $allArticles = self::getArticles(false, false, 10);
            $stats = new Model_Stats();

            foreach ($allArticles as $key => $article) {
                $article->views = $stats->get(Model_Stats::ARTICLE, $article->id);
                if ($article->id == $currentArticleId) {
                    unset($allArticles[$key]);
                }

                $coauthorship      = new Model_Coauthors($article->id);
                $article->coauthor = Model_User::get($coauthorship->user_id);
            }

            // сортируем массив статей в порядке убывания по просмотрам
            usort($allArticles, function ($a, $b) {
                return ($a->views < $b->views) ? 1 : -1;
            });

            $memcache->set($full_key, $allArticles, null, Date::MINUTE);
        }

        $mostPopularArticles = array_slice($allArticles, 0, 10);
        shuffle($mostPopularArticles);

        return array_slice($mostPopularArticles, 0, $numberOfArticles);
    }

    /**
     * Gets config for CodeX Editor, containing rules for validation Editor Tools data
     * @return string - Editor's config data
     * @throws Exceptions_ConfigMissedException - Failed to get Editorjs config data
     */
    public static function getEditorConfig()
    {
        try {
            return file_get_contents(APPPATH . DIRECTORY_SEPARATOR . 'config' . DIRECTORY_SEPARATOR . 'editorjs-config.json');
        } catch (Exception $e) {
            throw new Exceptions_ConfigMissedException("EditorJS config not found");
        }
    }
}
