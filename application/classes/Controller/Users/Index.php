<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Users_Index extends Controller_Base_preDispatch
{

        /*
        * Если в ссылке /user/<user_id> передан user_id, тогда пользователя находят в БД по его id
        * Если в ссылке не передан user_id, тогда пользователя находят в текущей сессии авторизации.
        * Если пользователя нет в БД, тогда выводится сообщение об ошибке и просьбе авторизоваться.
        */


    public function action_show()
    {
        $user_id = $this->request->param('id') ?: $this->request->query('id');
        $isAlias = $this->request->query('id');

        if (!empty($user_id)) {
            $viewUser = Model_User::get($user_id);
            if ($viewUser->uri && !$isAlias) {
                $this->redirect($viewUser->uri);
            }
        } else {
            $viewUser = $this->user;
        }

        if (!$viewUser->id) {
            throw new HTTP_Exception_404();
        }

        /**
        * Clear cache hook
        */
        $needClearCache = Arr::get($_GET, 'clear') == 1;

        $feed_items  = Model_Article::getArticlesByUserId($viewUser->id, $needClearCache);

        if ($viewUser->isCoauthor()) {
            $coauthor_feed_items = Model_Article::getArticlesByCoauthorId($viewUser->id);
            $this->view["feedItems"] = array_merge($coauthor_feed_items, $feed_items);
        } else {
            $this->view["feedItems"] = $feed_items;
        }

        $this->view['join_requests'] = $viewUser->getUserRequest();

        $this->title = $viewUser->name ?: 'Пользователь #' . $viewUser->id;
        $this->view['viewUser']  = $viewUser;
        $this->view['isMyPage']  = $this->user->id == $viewUser->id;

        $this->template->content = View::factory('templates/users/user', $this->view);
    }

    /**
     * Контроллер рендерит страницу настроек, с переданными данными о пользователе
     * В форме есть csrf токен, с помощью которого отслеживают передачу данных на сервер.
     */
    public function action_settings()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        if (!Security::check($csrfToken)) {
            $user = Model_User::get($this->user->id);

            $this->view['user'] = $user;

            $this->template->content = View::factory('templates/users/settings', $this->view);
        } else {
            $name          = Arr::get($_POST, 'name');
            $bio           = Arr::get($_POST, 'bio');
            $alias         = Arr::get($_POST, 'alias');

            $instagram_uri = $this->methods->parseUri(Arr::get($_POST, 'instagram_uri'));
            $vk_uri        = $this->methods->parseUri(Arr::get($_POST, 'vk_uri'));

            $alias = Model_Alias::updateAlias($this->user->uri, $alias, Model_Uri::USER, $this->user->id);

            $fields = array(
                'name'          => $name,
                'vk_uri'        => $vk_uri,
                'instagram_uri' => $instagram_uri,
                'bio'           => $bio,
                'uri'           => $alias
                );

            /**
             * Занесение данных в модель пользователя и в бд.
             */
            $this->user->edit($fields);

            $this->redirect('user/');
        }
    }
}
