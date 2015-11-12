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

    public function save()
    {
        $idAndRowAffected = DB::insert('Articles', array('title', 'text', 'description', 'cover', 'user_id', 'is_published'))
            ->values(array($this->title, $this->text, $this->description, $this->cover['name'], $this->user_id, $this->is_published))
            ->execute();

        if ($idAndRowAffected)
        {
            $article = DB::select()->from('Articles')->where('id', '=', $idAndRowAffected[0])->execute()->current();

            $this->fillModelByRow($article, $this);
        }
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
        self::fillModelByRow($article, $model);

        return $model;
    }

    /**
     * Превращает строку базы данных в объект модели
     *
     * @param $article array строка из базы данных со статьёй
     * @param $model Model_Article модель, которая будет заполняться
     * @return Model_Article модель, заполненная полями из статьи, либо пустая модель, если была передана пустая строка.
     */
    private static function fillModelByRow($article, $model)
    {
        if (!empty($article['id'])) {
            $model->id = $article['id'];
            $model->title = $article['title'];
            $model->text = $article['text'];
            $model->description = $article['description'];
            $model->cover = $article['cover'];
            $model->user_id = $article['user_id'];
            $model->dt_create = $article['dt_create'];
            $model->dt_update = $article['dt_update'];
            $model->is_removed = $article['is_removed'];
            $model->is_published = $article['is_published'];
        }
    }

    /**
     * Сохранение файла обложки для статьи
     *
     * @param $cover переменная с файлом
     * @return string новое имя файла
     */
    public function save_cover($cover)
    {
        // generating new filename
        $new_name = bin2hex(openssl_random_pseudo_bytes(5));
        $cover_new_name = $new_name . '.jpg';

        // saving
        $uploaddir = 'upload/covers/';
        $uploadfile = $uploaddir . $cover_new_name;
        move_uploaded_file($cover['tmp_name'], $uploadfile);

        // return new cover name for db
        return $cover_new_name;
    }

}
