<?php defined('SYSPATH') or die('No Direct Script Access');

/**
 * Модель курсов, имеет поля, соответствующие полям в базе данных и статические методы для получения
 * контеста и массива контестов по некоторым признакам.
 *
 * @author     Alexander Menshikov
 */
class Model_Courses extends Model
{
    public $id = 0;
    public $uri;
    public $title;
    public $text;
    public $description;
    public $cover;
    public $is_big_cover;
    public $course_articles = [];
    public $course_authors = [];
    public $dt_publish;
    public $dt_create;
    public $dt_update;
    public $is_removed;
    public $is_published;
    public $marked;

    const FEED_PREFIX = 'course';

    /**
     * Пустой конструктор для модели курсов, если нужно получить курс из хранилища, нужно пользоваться статическими
     * методами
     */
    public function __construct()
    {
    }

    /**
     * Добавляет текущий объект в базу данных и присваивает ему ID.
     *
     * @throws Kohana_Exception
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Courses::insert()
            ->set('uri', $this->uri)
            ->set('title', $this->title)
            ->set('text', $this->text)
            ->set('description', $this->description)
            ->set('cover', $this->cover)
            ->set('is_big_cover', $this->is_big_cover)
            ->set('is_removed', $this->is_removed)
            ->set('is_published', $this->is_published)
            ->set('marked', $this->marked)
            ->clearcache('courses_list')
            ->execute();

        if ($idAndRowAffected) {
            $course = Dao_Courses::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($course);
        }

        return $idAndRowAffected;
    }

    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $course_row array строка из базы данных с создаваемым курсом
     * @return Model_Courses модель, заполненная полями из курса, либо пустая модель, если была передана пустая строка.
     */
    private function fillByRow($course_row)
    {
        if (!empty($course_row['id'])) {
            $this->id              = Arr::get($course_row, 'id');
            $this->uri             = Arr::get($course_row, 'uri');
            $this->title           = Arr::get($course_row, 'title');
            $this->text            = Arr::get($course_row, 'text');
            $this->description     = Arr::get($course_row, 'description');
            $this->cover           = Arr::get($course_row, 'cover');
            $this->is_big_cover    = Arr::get($course_row, 'is_big_cover');
            $this->marked          = Arr::get($course_row, 'marked');
            $this->dt_publish      = Arr::get($course_row, 'dt_publish');
            $this->dt_create       = Arr::get($course_row, 'dt_create');
            $this->dt_update       = Arr::get($course_row, 'dt_update');
            $this->is_removed      = Arr::get($course_row, 'is_removed');
            $this->is_published    = Arr::get($course_row, 'is_published');
            $this->course_articles = self::getArticlesFromCourseWithCoauthors($this->id);
            $this->course_authors  = self::getUniqueCourseAuthors($this->course_articles);
        }

        return $this;
    }


    /**
     * Удаляет курс, представленный в модели.
     *
     * @param $user_id Number идентификатор пользователя, для проверки прав на удаление курса
     */
    public function remove()
    {
        if ($this->id != 0) {
            Dao_Courses::update()->where('id', '=', $this->id)
                ->set('is_removed', 1)
                ->set('is_published', 0)
                ->clearcache('courses_list')
                ->execute();

            // Курс удален
            $this->id = 0;
        }
    }


    /**
     * Обновляет курс, сохраняя поля модели.
     */
    public function update()
    {
        Dao_Courses::update()->where('id', '=', $this->id)
            ->set('uri', $this->uri)
            ->set('title', $this->title)
            ->set('text', $this->text)
            ->set('description', $this->description)
            ->set('cover', $this->cover)
            ->set('is_big_cover', $this->is_big_cover)
            ->set('dt_publish', $this->dt_publish)
            ->set('dt_update', $this->dt_update)
            ->set('is_removed', $this->is_removed)
            ->set('is_published', $this->is_published)
            ->set('marked', $this->marked)
            ->clearcache($this->id)
            ->execute();
    }

    /**
     * Добавляет статью к курсу.
     * @param $article_id
     * @param $course_id
     * @return Dao_CoursesArticles::insert
     */
    public static function addArticle($article_id, $course_id)
    {
        $article = Model_Article::get($article_id);
        if (!$article->id) {
            return false;
        }

        $course = Model_Courses::get($course_id);
        if (!$course->id) {
            return false;
        }

        return Dao_CoursesArticles::insert()
                        ->set('course_id', $course_id)
                        ->set('article_id', $article_id)
                        ->set('article_index', 0)
                        ->execute();
    }

    /**
     * Получить список курсов, в которые включена данная статья.
     * @param $article
     * @return bool|array
     */
    public static function getCoursesByArticleId($article)
    {
        if (!$article) {
            return false;
        }

        $selectedCourses = Dao_CoursesArticles::select('course_id')
                                        ->where('article_id', '=', $article->id)
                                        ->execute('course_id');

        return $selectedCourses ? array_keys($selectedCourses) : array();
    }

    /**
     * Открепляет статью от курсов.
     *
     * @param int $article_id
     * @param {int|array} $courses_ids - если передан, то открепляет статью от указанных курсов, иначе ото всех
     * @return Dao_CoursesArticles:remove
     */
    public static function deleteArticles($article_id, $courses_ids = 0)
    {
        $deleteQuery = Dao_CoursesArticles::delete()->where('article_id', '=', $article_id);

        if (!$courses_ids) {
            return $deleteQuery->execute();
        }

        return $deleteQuery->where_in('course_id', $courses_ids)->execute();
    }

    /**
     * Возвращает курс из базы данных с указанным идентификатором, иначе возвращает пустой курс с ID=0.
     *
     * @param int $id идентификатор курса в базе
     * @return Model_Courses экземпляр модели с указанным идентификатором и заполненными полями, если найден в базе или
     * пустую модель с ID=0.
     */
    public static function get($id = 0, $needClearCache = false)
    {
        $course = Dao_Courses::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $course->clearcache($id);
        } else {
            $course->cached(Date::MINUTE * 5, $id);
        }

        $course = $course->execute();

        $model = new Model_Courses();
        return $model->fillByRow($course);
    }

    /**
     * Получить все активные (опубликованные и не удалённые курсы) в порядке убывания ID.
     */
    public static function getActiveCourses($clearCache = false)
    {
        return Model_Courses::getCourses(false, false, !$clearCache ? Date::MINUTE * 5 : null);
    }

    /**
     * Получить все опубликованные курсы, которые содержат хотя бы одну статью
     *
     * @return Model_Courses[] - экземпляр модели с указанным идентификатором и заполненными полями
     */
    public static function getActiveCoursesWithArticles($clearCache = false)
    {
        $courses = Model_Courses::getCourses(false, false, !$clearCache ? Date::MINUTE * 5 : null);
        $courses_with_articles = array();

        foreach ($courses as $course) {
            if (self::getArticles($course->id)) {
                $courses_with_articles[] = $course;
            }
        }

        return $courses_with_articles;
    }

    /**
     * Получить все неудалённые курсы в порядке убывания ID.
     */
    public static function getAllCourses()
    {
        return Model_Courses::getCourses(true, false);
    }

    public static function getActiveCoursesNames()
    {
        $courses = Model_Courses::getActiveCourses();
        $list = array();
        foreach ($courses as $course) {
            $list []= array('id' => $course->id, 'name' => $course->title);
        }
        return $list;
    }

    /**
     * Получить список курсов с указанными условиями.
     *
     * @param $add_removed boolean добавлять ли удалённые курсы в получаемый список курсов
     * @param $add_not_published boolean
     * @return array ModelCourses массив моделей, удовлетворяющих запросу
     */
    private static function getCourses($add_not_published = false, $add_removed = false, $cachedTime = null)
    {
        $coursesQuery = Dao_Courses::select()->limit(200);        // TODO add pagination.

        if (!$add_removed) {
            $coursesQuery->where('is_removed', '=', 0);
        }

        if (!$add_not_published) {
            $coursesQuery->where('is_published', '=', 1);
        }

        if ($cachedTime) {
            $coursesQuery->cached($cachedTime, 'courses_list');
        }
        $course_rows = $coursesQuery->order_by('dt_create', 'DESC')->execute();

        return self::rowsToModels($course_rows);
    }

    private static function rowsToModels($course_rows)
    {
        $courses = array();

        if (!empty($course_rows)) {
            foreach ($course_rows as $course_row) {
                $course = new Model_Courses();
                $course->fillByRow($course_row);
                array_push($courses, $course);
            }
        }

        return $courses;
    }

    /**
     * Получить id статей, входящих в курс
     *
     * @param $course_id
     * @return bool|object
     */
    public static function getArticles($course_id)
    {
        if (!$course_id) {
            return false;
        }

        return Dao_CoursesArticles::select('article_id')->where('course_id', '=', $course_id)->execute();
    }

    /**
     * Get Articles from Course
     * @param [int] $courseId  - ID of Course
     * @return Model_Article[] - Array of Articles
     */
    public static function getArticlesFromCourse($courseId)
    {
        /** getting all articles from course */
        $course_articles = self::getArticles($courseId);

        /** $articleList - empty array. Needs to fill by article ids */
        $articleList = array();

        if ($course_articles) {
            foreach ($course_articles as $articles) {
                $articleList[] = Model_Article::get($articles['article_id']);
            }
        }

        return $articleList;
    }

    /**
     * Get articles from course with coauthors
     * @return Model_Article[]
     */
    public function getArticlesFromCourseWithCoauthors($courseId)
    {
        $course_articles = self::getArticlesFromCourse($courseId);

        foreach ($course_articles as $course_article) {
            $coauthorship        = new Model_Coauthors($course_article->id);
            $course_article->coauthor = Model_User::get($coauthorship->user_id);
        }
        return $course_articles;
    }

     /**
     * Return unique article authors from the Course
     * @param  Model_Article[] - Articles included in specific Course
     * @return Model_User[]    - Array of unique Course authors
     */
    public static function getUniqueCourseAuthors($course_articles)
    {
        $course_authors_ids = array();
        $course_authors     = array();

        foreach ($course_articles as $article) {
            $author_id = $article->author->id;

            if (!in_array($author_id, $course_authors_ids))
            {
                $course_authors_ids[] = $author_id;
                $course_authors[] = Model_User::get($author_id);
            }
        }
        return $course_authors;
    }
}
