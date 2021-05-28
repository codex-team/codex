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

        $feed_items = $this->getFeed($user_id);

        $this->view["feed_items"] = $feed_items;

        $this->view['join_requests'] = $viewUser->getUserRequest();

        $this->title = $viewUser->name ?: 'Пользователь #' . $viewUser->id;

        $userArticlesCount = count($feed_items);
        if ($userArticlesCount > 0){
            $this->description = $viewUser->name . " has " . $userArticlesCount . $this->methods->num_decline($userArticlesCount, ' article', ' article', ' articles') . " about web-development, check it out on the CodeX website";
        } else {
            $this->description = $viewUser->name . " on the CodeX website";
            $this->nofollow = true;
        }

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

            if ($this->user->uri) {
                $alias = Model_Aliases::updateAlias($this->user->uri, $alias, Aliases_Controller::USER, $this->user->id);
            } else {
                $alias = Model_Aliases::addAlias($alias, Aliases_Controller::USER, $this->user->id);
            }

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

    /**
     * Get feed items where User is author or coauthor
     * @return Model_Article[]
     */
    public function getFeed($user_id)
    {
        $feed_items  = $this->getUserArticles($user_id);

        foreach ($feed_items as $feed_item) {
            $coauthorship        = new Model_Coauthors($feed_item->id);
            $feed_item->coauthor = Model_User::get($coauthorship->user_id);
        }
        return $feed_items;
    }

    /**
     * Get user's articles from feed
     * @param $user_id - id of articles author or coauthor
     * @return Model_Article[] - array of user's articles
     */
    public function getUserArticles($user_id)
    {
        $userFeedKey = Model_User::composeFeedKey($user_id);
        $userFeed = new Model_Feed_Custom($userFeedKey, Model_Article::FEED_PREFIX);
        $user_feed_items_ids  = $userFeed->get();

        $models_list = array();

        foreach ($user_feed_items_ids as $item) {
            list($prefix, $id) = $userFeed->decomposeValueIdentity($item);
            $models_list[] = Model_Article::get($id);
        }
        return $models_list;
    }

}
