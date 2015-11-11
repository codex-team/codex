<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Users_Index extends Controller_Base_preDispatch {
        public function action_showUser()
        {
            //load info from DB
            $userId = $this->request->param('user_id');
            $user = new Model_User($userId);          
            
            if ( $user -> id ) {
            	$viewUser = $user;
            } else {            	
            	$viewUser = $this -> user;
            	$this->view["error"] = "Пожалуйста войдите в аккаунт.";
            }
            if ( empty($user->arr_article) ){
                $this->view["empty_article"] = "У вас еще нет написанных статей.";
            }
            else{
                $article_list = array();
                foreach ($user->arr_article as $article)
                    {
                        foreach ($article as $title)
                            {
                            array_push($article_list, $title);
                        }
                }
            $this->view["article_list"] = $article_list;
            }
            $this->view["user"] = $viewUser;
            $this->view["userId"] = $userId;
            
            $this->template->content = View::factory('templates/users/user', $this->view);
           
        }
    }
