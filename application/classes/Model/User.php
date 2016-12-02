<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id;
    public $name        = '';
    public $photo       = '';
    public $photo_big   = '';
    public $photo_small = '';
    public $dt_create;
    public $dt_update;
    public $vk_id       = 0;
    public $fb_id       = 0;
    public $vk_uri      = '';
    public $fb_uri      = '';
    public $github_id   = 0;
    public $github_uri  = '';
    public $bio         = '';
    public $role        = 1;
    public $is_removed  = 0;



    const ROLE_ANY = 0;
    const ROLE_USER = 1;
    const ROLE_ADMIN = 3;


    /**
     *
     */
    public function __construct()
    {
    }

    /**
    * Returns users models by specified ids
    * @param    array  $ids     ids to select
    * @return   array of Model_User
    */
    public function getUsersByIds($ids)
    {
        $users = Dao_Users::select()
                    ->where_in('id', $ids)
                    ->cached(Date::MINUTE * 10, 'users_by_ids:' . implode(',', $ids))
                    ->execute();


        $models = array();

        foreach ($users as $user_row) {
            $models[] = $this->rowToModel($user_row);
        }

        return $models;
    }

    /**
     * Возвращает модель пользователя по его уникальному атрибуту
     * @param string $attr
     * @param int $value
     * @return Model_User
     */
    public static function findByAttribute($attr = 'id', $value = 0)
    {
        $user = Dao_Users::select()->where($attr, '=', $value)->limit(1);

        /** Cache with key 'uid' */
        if ($attr == 'id') {
            $user = $user->cached(Date::MINUTE * 5, $value);
        }

        $user = $user->execute();

        return self::rowToModel($user);
    }

    /**
     * Возвращает модель пользователя по его id
     * @param int $id
     * @return Model_User
     */
    public static function get($id = 0)
    {
        return self::findByAttribute('id', $id);
    }

    /**
     * Получает из хранилища данных информацию о всех пользователях и превращает её в экземпляры модели
     */
    public static function getAll()
    {
        $users_rows = DB::select()->from('Users')->limit(200)->execute()->as_array();    // TODO(#40) add pagination

        $users = array();

        if (!empty($users_rows)) {
            foreach ($users_rows as $user_row) {
                $user = self::rowToModel($user_row);
                $users[] = $user;
            }
        }

        return $users;
    }

    /**
     * @param $user
     * @return Model_User
     */
    private static function rowToModel($user)
    {
        $model = new Model_User();
        if (!empty($user['id'])) {
            $model->id            = $user['id'];
            $model->name          = $user['name'];
            $model->photo         = $user['photo'];
            $model->photo_small   = $user['photo_small'];
            $model->photo_big     = $user['photo_big'];
            $model->dt_create     = $user['dt_create'];
            $model->dt_update     = $user['dt_update'];
            $model->github_id     = $user['github_id'];
            $model->github_uri    = $user['github_uri'];
            $model->vk_id         = $user['vk_id'];
            $model->vk_uri        = $user['vk_uri'];
            $model->fb_uri        = $user['fb_uri'];
            $model->instagram_uri = $user['instagram_uri'];
            $model->bio           = $user['bio'];
            $model->role          = $user['role'];
            $model->is_removed    = $user['is_removed'];
        }

        return $model;
    }

    /**
     * Удаляет из базы данного пользователя.
     */
    public function remove()
    {
        if ($this->id != 0) {

            DB::update('Users')->where('id', '=', $this->id)
                ->set(array('is_removed' => 1))
                ->execute();

            // Пользователь удалена
            $this->id = 0;
        }
    }

    /**
     * Возвращает статус заполненности модели
     * @return bool
     */
    public function is_empty()
    {
        return empty($this->id);
    }

    /**
     * Создает новую запись в БД
     * @return true, если данные успешно записаны в БД
     */
    public function save($social=null)
    {
        $result = false;

        if ($social == "vk")
        {
            $result = DB::insert('Users', array('name', 'vk_id',
                'photo', 'photo_small', 'photo_big', 'role', 'is_removed'))->
            values(array($this->name, $this->vk_id,
                $this->photo, $this->photo_small, $this->photo_big, $this->role, $this->is_removed))
                ->execute();
        }
        else
        {
            $result = DB::insert('Users', array('name', 'github_id', 'github_uri',
                'photo', 'photo_small', 'photo_big', 'role', 'is_removed'))->
            values(array($this->name, $this->github_id, $this->github_uri,
                $this->photo, $this->photo_small, $this->photo_big, $this->role, $this->is_removed))
                ->execute();
        }

        if ($result)
            return $result;
        else
            return false;
    }


    /**
     * Обновляет запись в БД
     * @return true, если данные успешно записаны в БД
     */
    public function update()
    {
        $update = Dao_Users::update()
            ->set('name',          $this->name)
            ->set('github_id',     $this->github_id)
            ->set('github_uri',    $this->github_uri)
            ->set('photo',         $this->photo)
            ->set('dt_update',     $this->dt_update)
            ->set('photo_small',   $this->photo_small)
            ->set('photo_big',     $this->photo_big)
            ->set('role',          $this->role)
            ->set('is_removed',    $this->is_removed)
            ->set('vk_id',         $this->vk_id)
            ->set('vk_uri',        $this->vk_uri)
            ->set('fb_uri',        $this->fb_uri)
            ->set('instagram_uri', $this->instagram_uri)
            ->set('bio',           $this->bio)
            ->where('id', '=', $this->id)
            ->clearcache($this->id)
            ->execute();


        return !!$update;
    }

    public function checkAccess($roles)
    {
        foreach ($roles as $role)
        {
            if ($role == Model_User::ROLE_ANY || $role == $this->role)
                return true;
        }
        return false;
    }


    /**
     * Возвращает массив опубликованных статей пользователя
     * @return true, если данные успешно записаны в БД
     */
    public function get_articles_list()
    {
        return Model_Article::getByUserId($this->id);
    }


    /**
    * Метод заносит переданные данные о юзере в модель и базу
    * @param $fields - ассоциативный массив "название поля" - "значение"
    */
    public function edit($fields = array())
    {
        // занесение данных в модель
        foreach ($fields as $key => $value) {
            $this->$key = $value;
        }

        // занесения данных в бд
        $this->update();

    }

    /**
    * Saves user join-request
    */
    public function saveJoinRequest($skills, $wishes = NULL)
    {
        return Dao_Requests::insert()
                             ->set('uid', $this->id)
                             ->set('skills', $skills)
                             ->set('wishes', $wishes)
                             ->clearcache($this->id)
                             ->execute();
    }

    /**
    * Get user join-requests
    * @return array with requests
    */
    public function getUserRequests()
    {
        if (!$this->id) return array();

        return Dao_Requests::select()->where('uid','=', $this->id)->cached(Date::MINUTE * 10, $this->id)->execute();
    }
}
