<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id;
    public $name;
    public $photo;
    public $photo_big;
    public $photo_small;
    public $dt_create;
    public $vk_id;
	/**
	 * @param int $vk_id
     */
	public function __construct()
	{
        $this->name = '';
        $this->photo = '';
        $this->photo_big = '';
        $this->photo_small = '';
        $this->vk_id = 0;
	}

	/**
	 * @return bool
     */
	public function is_empty()
	{
		return empty($this->id);
	}

    public static function findOne($id = 0)
    {
        return get_user_by_attr('id', $id);
    }

    public static function findByAttribute($attr = 'id', $value = 0)
    {
        $model = new Model_User();

        $user = DB::select()->from('Users')->where($attr, '=', $value)->execute()->current();
        if(!empty($user['id']))
        {
            $model->id = $user['id'];
            $model->name = $user['name'];
            $model->photo = $user['photo'];
            $model->dt_create = $user['dt_create'];
            $model->vk_id = $user['vk_id'];
        }
        return $model;
    }


	/**
	 * Заполняет модель параметрами
	 * @param $name
	 * @param $photo
	 * @param $vk_id
	 * @throws Kohana_Exception
     */
	public function load($name, $photo, $vk_id)
	{
		$this->name = $name;
		$this->photo = $photo;
		$this->vk_id = $vk_id;
	}

	/**
	 * Создает новую запись в БД
	 * @return true, если данные успешно записаны в БД
	 */
	public function save()
	{
		if (DB::insert('Users', array('name', 'vk_id', 'photo', 'photo_small', 'photo_big'))->values(array($this->name, $this->vk_id, $this->photo, $this->photo_small, $this->photo_big))->execute())
			return true;
		else
			return false;
	}

    /**
     * Возвращает массив статей пользователя
     * @return true, если данные успешно записаны в БД
     */
	public function get_articles_list()
	{
        return DB::select('title', 'id')->from('Articles')->where('user_id', '=', $this->id)->execute()->as_array();
	}

}
