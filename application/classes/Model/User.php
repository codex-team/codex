<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_User extends Model
{
    public $id ;
    public $name;

	public function __construct($id = 0)
	{
		$user = DB::select()->from('Users')->where('id', '=', $id)->execute()->current();
		if(!empty($user['id']))
		{
			$this->id = $user['id'];
			$this->name = $user['first_name'] . ' ' . $user['last_name'];
		}
		
		
		return;
	}
	
	public function is_empty()
	{
		return empty($id);
	}

}
