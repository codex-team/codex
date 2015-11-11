<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id;
    public $name;
    public $photo;
    public $dt_create;
    public $vk_id;
    public $arr_article;

	public function __construct($id = 0)
	{
		$user = DB::select()->from('Users')->where('id', '=', $id)->execute()->current();
		$arr_article = DB::select('title')->from('Articles')->execute()->as_array();
		if(!empty($user['id']))
		{
			$this->id = $user['id'];
			$this->name = $user['name'];
			$this->photo = $user['photo'];
			$this->dt_create = $user['dt_create'];
			$this->vk_id = $user['vk_id'];
			$this->arr_article = $arr_article;
		}	
		
		return;
	}
	
	public function is_empty()
	{
		return empty($this->id);
	}

}
