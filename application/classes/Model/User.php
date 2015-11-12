<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id;
    public $name;
    public $photo;
    public $dt_create;
    public $vk_id;

    public $arr_article;

	/**
	 * @param int $vk_id
     */
	public function __construct($vk_id = 0)
	{
		if (!$vk_id) return;

		$user = DB::select()->from('Users')->where('vk_id', '=', $vk_id)->execute()->current();
		if(!empty($user['id']))
		{
			$this->id = $user['id'];
			$this->name = $user['name'];
			$this->photo = $user['photo'];
			$this->dt_create = $user['dt_create'];
			$this->vk_id = $user['vk_id'];

			$this->arr_article = $this->get_articles_list();
		}
	}

	/**
	 * @return bool
     */
	public function is_empty()
	{
		return empty($this->id);
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
		if (DB::insert('Users', array('name', 'vk_id', 'photo'))->values(array($this->name, $this->vk_id, $this->photo))->execute())
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
