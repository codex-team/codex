<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id            = 0;
    public $name          = '';
    public $photo         = '';
    public $photo_big     = '';
    public $photo_small   = '';
    public $vk_id         = 0;
    public $fb_id         = 0;
    public $vk_uri        = '';
    public $fb_uri        = '';
    public $github_id     = 0;
    public $github_uri    = '';
    public $instagram_uri = '';
    public $bio           = '';
    public $role          = 1;
    public $is_removed    = 0;
    public $is_admin      = false;
    public $dt_create;

    const ROLE_ANY = 0;
    const ROLE_USER = 1;
    const ROLE_ADMIN = 3;


    /**
     * User Model's constructor
     *
     * Call Model_User($id) to get user model with defined id.
     */
    public function __construct($id = 0)
    {
        if (!$id) return;

        self::get($id);
    }

    /**
     * Получает строку пользователя из бд и оправляет на заполнение модели
     */
    private function get($id)
    {
        $user_row = Dao_Users::select()
            ->where('id', '=', $id)
            ->cached(Date::DAY * 30, 'user_id:' . $id)
            ->limit(1)
            ->execute();

        if (!$user_row) return false;

        self::fillByRow($user_row);
    }

    /**
     * Заполняет модель согласно строке из бд
     */
    private function fillByRow($row)
    {
        if (!empty($row)) {

            foreach ($row as $field => $value) {

                if (property_exists($this, $field)) {

                    $this->$field = $value;
                }
            }

            $this->is_admin = $this->role == self::ROLE_ADMIN ? true : false;
        }

        return $this;
    }

    /**
     * Добавляем нового пользователя согласно модели
     * @return id пользователя или false
     */
    public function insert()
    {
        $user = Dao_Users::insert()
            ->set('name',          $this->name)
            ->set('photo',         $this->photo)
            ->set('photo_small',   $this->photo_small)
            ->set('photo_big',     $this->photo_big)
            ->set('github_id',     $this->github_id)
            ->set('github_uri',    $this->github_uri)
            ->set('vk_id',         $this->vk_id)
            ->set('vk_uri',        $this->vk_uri)
            ->set('fb_uri',        $this->fb_uri)
            ->set('instagram_uri', $this->instagram_uri)
            ->execute();

        if (!$user) return false;

        return $this->id = $user;
    }

    /**
     * Обновляет запись пользователя в бд согласно модели
     */
    private function update()
    {
        return Dao_Users::update()
            ->where('id', '=', $this->id)
            ->set('name',          $this->name)
            ->set('photo',         $this->photo)
            ->set('photo_small',   $this->photo_small)
            ->set('photo_big',     $this->photo_big)
            ->set('github_id',     $this->github_id)
            ->set('github_uri',    $this->github_uri)
            ->set('vk_id',         $this->vk_id)
            ->set('vk_uri',        $this->vk_uri)
            ->set('fb_uri',        $this->fb_uri)
            ->set('instagram_uri', $this->instagram_uri)
            ->set('bio',           $this->bio)
            ->set('role',          $this->role)
            ->set('is_removed',    $this->is_removed)
            ->clearcache('user_id:' . $this->id)
            ->execute();
    }

    /**
     * Удаляет пользователя
     * is_removed = 1
     */
    public function remove()
    {
        $this->is_removed = 1;

        return $this->update();
    }

    /**
    * Метод заносит переданные данные о юзере в модель и базу
    * @param $fields - ассоциативный массив "название поля" - "значение"
    */
    public function edit($fields = array())
    {
        foreach ($fields as $key => $value) {
            $this->$key = $value;
        }

        return $this->update();
    }

    /**
     * Обновляет роль пользователя
     */
    public function promote($new_role = 1)
    {
        $this->role = $new_role;

        return $this->update();
    }

    /**
     * Возвращает массив пользователей
     *
     * @param int $offset
     * @param int $limit
     * @param int $role
     * @param int $is_removed
     */
    public static function getAll(
        $offset     = 0,
        $limit      = 200,
        $role       = 0,
        $is_removed = false
    ) {
        $users_rows = Dao_Users::select();

        if ($limit)                $users_rows->limit($limit);
        if ($offset)               $users_rows->offset($offset);
        if ($role != 0)            $users_rows->where('role', '=', $role);
        if ($is_removed !== false) $users_rows->where('is_removed', '=', $is_removed);

        $users_rows = $users_rows->execute();

        $users = array();

        if (!empty($users_rows)) {
            foreach ($users_rows as $user_row) {
                $user = new Model_User();
                $user = $user->fillByRow($user_row);
                $users[] = $user;
            }
        }

        return $users;
    }

    /**
     * Возвращает массив статей пользователя
     */
    public function getArticles()
    {
        return Model_Article::getByUserId($this->id);
    }

    /**
    * Saves user join-request
    */
    public function saveJoinRequest($skills, $wishes = NULL)
    {
        return Dao_Requests::insert()
            ->set('uid',    $this->id)
            ->set('skills', $skills)
            ->set('wishes', $wishes)
            ->clearcache('request_by_uid:' . $this->id)
            ->execute();
    }

    /**
    * Get user join-request
    * @return array with request
    */
    public function getUserRequest()
    {
        if (!$this->id) return array();

        return Dao_Requests::select()
            ->where('uid', '=', $this->id)
            ->cached(Date::DAY * 30, 'request_by_uid:' . $this->id)
            ->execute();
    }

    /**
     * Возвращает модель пользователя по его уникальному атрибуту
     * @param string $attr
     * @param int $value
     * @return Model_User
     */
    public function findByAttribute($attr = 'id', $value = 0)
    {
        $user = Dao_Users::select()
            ->where($attr, '=', $value)
            ->limit(1);

        /** Cache with key 'user_id' */
        if ($attr == 'id') {
            $user->cached(Date::MINUTE * 5, 'user_id:' . $value);
        }

        $user = $user->execute();

        return self::fillByRow($user);
    }
}
