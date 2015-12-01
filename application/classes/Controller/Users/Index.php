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

	    if ( !empty($user_id) ){
		    $viewUser = Model_User::get( $user_id );
	    } else {
	        $viewUser = $this->user;
	    }

        if ($this->user->id == $viewUser->id) {
            $isMyPage = true;
        } else {
            $isMyPage = false;
        }

        if (!$viewUser->id) $this->redirect('/');

        $this->title = $viewUser->name ?: 'Пользователь #' . $viewUser->id;
        $this->view['viewUser']  = $viewUser;
        $this->view['isMyPage']  = $isMyPage;
        $this->template->content = View::factory('templates/users/user', $this->view);

    }

    public function action_settings()
    {
        $user = Model_User::get($this->user->id);

        if ($user->vk_uri == '0') $user->vk_uri = '';
        if ($user->instagram_uri == '0') $user->instagram_uri = '';
        $this->view['user'] = $user;

        $this->template->content = View::factory('templates/users/settings', $this->view);
    }

    public function action_edit()
    {
        $maxFileSize   = 2097152;
        $name          = Arr::get($_POST, 'name');
        $vk_url        = Arr::get($_POST, 'vk_uri');
        $instagram_url = Arr::get($_POST, 'instagram_uri');
        $bio           = Arr::get($_POST, 'bio');

        if ( $newAva= $this->methods->SavePostFile('ava', 'users/', $maxFileSize, array('jpg', 'jpeg', 'png')) )
            $this->user->photo = $newAva;

        $vk_uri        = substr(parse_url($vk_url, PHP_URL_PATH), 1);
        $instagram_uri = substr(parse_url($instagram_url, PHP_URL_PATH), 1);

        $this->user->instagram_uri   = $instagram_uri;
        $this->user->vk_uri          = $vk_uri;
        $this->user->bio             = $bio;
        $this->user->name            = $name;
        $this->user->update();

        $this->redirect('user/');
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
