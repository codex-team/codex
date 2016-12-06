<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 01.04.2016
 * Time: 0:13
 */

class Controller_Users_Modify extends Controller_Base_preDispatch
{
    /**
     * Контроллер рендерит страницу настроек, с переданными данными о пользователе
     * В форме есть csrf токен, с помощью которого отслеживают передачу данных на сервер.
     */
    public function action_settings()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        if(!Security::check($csrfToken)){
            $user = new Model_User($this->user->id);

            $this->view['user'] = $user;

            $this->template->content = View::factory('templates/users/settings', $this->view);
        } else {
            $name          = Arr::get($_POST, 'name');
            $bio           = Arr::get($_POST, 'bio');

            $instagram_uri = $this->methods->parseUri(Arr::get($_POST, 'instagram_uri'));
            $vk_uri        = $this->methods->parseUri(Arr::get($_POST, 'vk_uri'));

            $fields = array('name'          => $name,
                'vk_uri'        => $vk_uri,
                'instagram_uri' => $instagram_uri,
                'bio'           => $bio);

            /*
            * Обновляем Алиас
            */
            $newName = $name;
            $model_alias    = new Model_Alias();
            $model_alias::updateAlias( $this->user->name, $newName, Model_Uri::USER, $this->user->id );

            /**
             * Занесение данных в модель пользователя и в бд.
             */
            $this->user->edit($fields);

            $this->redirect('user/');
        }
    }

}