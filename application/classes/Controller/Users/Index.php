<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Users_Index extends Controller_Base_preDispatch
{

		/*
		* Если в ссылке /user/<user_id> передан user_id, тогда пользователя находят в БД по его id
		* Если в ссылке не передан user_id, тогда пользователя находят в БД по его vk_id, то есть под тем
		*профилем, 	под которым он авторизовался через вк.
		* Если пользователя нет в БД, тогда выводится сообщение об ошибке и просьбе авторизоваться.
		*/


    public function action_showUser()
    {
        $user_id = $this->request->param('user_id');

	    if( !empty($user_id) ){
		    $user = Model_User::get( $user_id );
	    }else{
	        $user = $this->user;
	    }

        $this->view['user'] = $user;
        $this->view['user_id'] = $user_id;
        $this->view['article_list'] = $user->get_articles_list();

        $this->template->content = View::factory('templates/users/user', $this->view);

    }
    public function action_create()
    {
    }
    public function action_index()
    {
        $user_id = $this->request->param('user_id');
        $model = new Model_User($user_id);
        if ($model->is_empty())
        {
            $this->template->content = View::factory('templates/users/error', [
                'user' => $model,
            ]);
        }
        else
        {
            $this->template->content = View::factory('templates/users/user', [
                'user' => $model,
            ]);
        }
    }
    public function action_update()
    {
    }
    public function action_view()
    {
        $user_id = $this->request->param('user_id');
        $model = new Model_User($user_id);
        $this->template->content = View::factory('templates/users/view', [
            'user' => $model,
        ]);
    }
}
