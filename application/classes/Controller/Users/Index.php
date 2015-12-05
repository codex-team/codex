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

    /**
     * Контроллер передает данные о юзере на странцу настроек и принимает изменения при нажатии  submit
     * отслеживает submit с помощью csrf токена
     */
    public function action_settings()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        if(!Security::check($csrfToken)){
            $user = Model_User::get($this->user->id);

            $this->view['user'] = $user;
            $this->template->content = View::factory('templates/users/settings', $this->view);
        } else {
            $name          = Arr::get($_POST, 'name');
            $vk_url        = Arr::get($_POST, 'vk_uri');
            $instagram_url = Arr::get($_POST, 'instagram_uri');
            $bio           = Arr::get($_POST, 'bio');

            // сохранение авы
            if ( $newAva= $this->methods->SavePostFile('ava', 'users/', array('jpg', 'jpeg', 'png')) ){
                $this->user->photo = $newAva;
            }

            // parse_url парсит урл и отсекает uri юзера
            // substr  возвращает нуль, если передали пусту строку
            $vk_uri        = substr(parse_url($vk_url, PHP_URL_PATH), 1);
            $instagram_uri = substr(parse_url($instagram_url, PHP_URL_PATH), 1);

            // если передали пусту строку
            if($vk_uri == '0') $vk_uri = null;
            if($instagram_uri == '0') $instagram_uri = null;

            // занесение данных в модель
            $this->user->vk_uri        = $vk_uri;
            $this->user->instagram_uri = $instagram_uri;
            $this->user->bio           = $bio;
            $this->user->name          = $name;
            
            // занесения данных в бд
            $this->user->update();

            $this->redirect('user/');
        }
    }

}
