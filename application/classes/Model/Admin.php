<?php defined('SYSPATH') or die('No direct script access.');

class Model_Admin extends Model_Database
{
	public $user_id = 0;
	public $title = '';
	public $description = '';
	public $text = '';
	public $cover = '';
	public $dt_update = '';

	public function __construct(){
	}

	public function loadArticles(){
		return DB::select('*')->from('Articles')
							  ->where('is_removed', '=', 0)
							  ->and_where('is_published', '=', 0)
							  ->order_by('id', 'DESC')
							  ->execute()
							  ->as_array();
	}

	public function editArticle($id = ''){
		return DB::select('*')->from('Articles')
                        	  ->where('id', '=', $id)
                       		  ->execute();
	}

	public function updateArticle($id = ''){

		return DB::update('Articles')->set(array('user_id' => $this->user_id, 
                                          'title' => $this->title, 
                                          'description' => $this->description, 
                                          'text' => $this->text, 
                                          'cover' => $this->cover,
                                          'dt_update' => $this->dt_update))
                              ->where('id', '=', $id)
                              ->execute();

	}


	public function loadUsers(){
		return DB::select('*')->from('Users')
							  ->where('is_removed', '=', 0)
							  ->order_by('id', 'DESC')
							  ->execute()
							  ->as_array();
	}

	public function removeUser($user_id)
    {
        if ($this->id != 0 && $user_id == $this->user_id)
        {
            DB::update('Users')->where('id', '=', $this->id)
              				   ->set(array('is_removed' => 1))
              				   ->execute();

            $this->id = 0;
        }
    }

    public static function getUser($id = 0)
    {
        $user = DB::select()->from('Users')->where('id', '=', $id)->execute()->current();
        
        return $user;
    }

}