<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Users_Index extends Controller_Base_preDispatch {
        public function action_showUser()
        {
            //load info from DB
            $userId = $this->request->param('user_id');
            //$userId = 1;
            if(isset($userId))
            {
            	$this->view["users"] = DB::select('*')->from('Users')->where('id', '=', $userId)->execute(); 
            	$this->view["userId"] = $userId;
                $this->template->content = View::factory('templates/users/user', $this->view);
            }
            else
            {
            	$this->view["error"] = "error";
            	$this->template->content = View::factory('templates/users/user', $this->view);
            }
        }
    }
