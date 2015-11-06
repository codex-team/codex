<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Users_Index extends Controller_Base_preDispatch {
        public function action_showUser()
        {
            //load info from DB
            //$this->view["users"] = DB::select('*')->from('users')->where('id', '=', $id)->execute(); 
            $userId = $this->request->param('user_id');
            $this->view = array(
                    'firstName' => 'John',
                    'secondName' => 'Smith',
                    'age' => 25,
                    'regDate' => '05.11.2015',
                    'userPhoto' => '/public/img/utilita.jpg',
                    'info' => 'I am working in big company...',
                    'userId' => $userId
            );
            $this->template->content = View::factory('templates/users/user', $this->view);
        }
    }