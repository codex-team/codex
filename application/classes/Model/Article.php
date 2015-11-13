<?php defined('SYSPATH') OR die('No Direct Script Access');

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

    /**
     * Пустой конструктор для модели статьи, если нужно получить статью из хранилища, надо пользоваться методом
     * Model_Article::get()
     */
    public function __construct()
    {
    }

    /**
     * Удаляет статью, представленную в модели.
     *
     * @param $user_id Number идентификатор пользователя, для проверки прав на удаление статьи
     */
    public function delete_article($user_id)
    {
        if ($this->id != 0 && $user_id == $this->user_id)
        {
            DB::update('Articles')->where('id', '=', $this->id)
                ->set(array('is_removed' => 1))->execute();

            // Статья удалена
            $this->id = 0;
        }
    }

    /**
     * Добавляет текущий объект в базу данных и присваивает ему айдишник.
     *
     * @throws Kohana_Exception
     */
    public function insert()
    {
        $idAndRowAffected = DB::insert('Articles', array('title', 'text', 'description', 'cover', 'user_id', 'is_published'))
            ->values(array($this->title, $this->text, $this->description, $this->cover, $this->user_id, $this->is_published))
            ->execute();

        if ($idAndRowAffected)
        {
            $article = DB::select()->from('Articles')->where('id', '=', $idAndRowAffected[0])->execute()->current();

            $this->fillByRow($article);
        }
    }


    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $article array строка из базы данных со статьёй
     * @return Model_Article модель, заполненная полями из статьи, либо пустая модель, если была передана пустая строка.
     */
    private function fillByRow($article)
    {
        if (!empty($article['id'])) {
            $this->id           = $article['id'];
            $this->title        = $article['title'];
            $this->text         = $article['text'];
            $this->description  = $article['description'];
            $this->cover        = $article['cover'];
            $this->user_id      = $article['user_id'];
            $this->dt_create    = $article['dt_create'];
            $this->dt_update    = $article['dt_update'];
            $this->is_removed   = $article['is_removed'];
            $this->is_published = $article['is_published'];
        }

        return $this;
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
        $article = DB::select()->from('Articles')->where('id', '=', $id)->execute()->current();

        $model = new Model_Article();

        return $model->fillByRow($article);
    }


    public static function getActiveArticles()
    {
        $articles = DB::select()->from('Articles')->where('is_removed', '=', false)
            ->where('is_published', '=', true)
            ->order_by('id', 'DESC')->execute()->as_array();

        $article_models = array();

        if (!empty($articles)) {
            foreach ($articles as $article) {
                $model = new Model_Article();

                $model->fillByRow($article);

                array_push($article_models, $model);
            }
        }

        return $article_models;
    }

}
