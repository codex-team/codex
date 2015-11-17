<?php defined('SYSPATH') OR die('No direct access allowed.');

/**
 * Class Controller_Auth
 */
class Controller_Auth extends Controller_Base_preDispatch
{

    /**
     * Осуществляет авторизацию в ВК. В случае, если пользователь авторизован в первый раз - добавляет новую запись
     * в таблицу Users. Модель пользователя помещается в сессию "profile". Далее проиходит редирект на /auth/callback
     */
    public function action_vk()
    {
        $vk = Oauth::instance('vkontakte');
        if ($vk->login())
        {
            $profile = $vk->get_user();

            if ($profile)
            {
                Session::instance()->set('profile', $profile);
                Session::instance()->set('instance', 'vkontakte');

                $user = Model_User::findByAttribute('vk_id', $profile->uid);
                if ($user->is_empty())
                {
                    $user = new Model_User();
                    $user->vk_id = $profile->uid;
                    $user->photo_small = $profile->photo_50;
                    $user->photo = $profile->photo_200;
                    $user->photo_big = $profile->photo_max;
                    $user->name = $this->get_vk_name($profile);

                    $user->save();
                }
            }
        }
        else
        {
            # Add auth error view
        }
        $this->auth_callback('/');

    }


    /**
     * Осуществляет авторизацию в facebook. В случае, если пользователь авторизован в первый раз - добавляет новую запись
     * в таблицу Users. Модель пользователя помещается в сессию "profile". Далее проиходит редирект на /auth/callback
     */
    public function action_facebook()
    {
        if ( $error = $this->request->query('error_code') )
        {
            $this->generate_auth_error();
        }

        $fb = Oauth::instance('facebook');
        if ($fb->login())
        {
            $profile = $fb->get_user();

            if ($profile)
            {
                Session::instance()->set('profile', $profile);
                Session::instance()->set('instance', 'facebook');

                $user = Model_User::findByAttribute('fb_id', $profile->id);
                if ($user->is_empty())
                {
                    $user = new Model_User();
                    $user->name = $profile->name;
                    $user->fb_id = $profile->id;
                    # TODO: Проверить загрузку на альфе $user->photo = $fb->get_images($profile->id);
                    # TODO: Загрузить фото профиля целиком: $fb->get_images($profile->id);

                    $user->save();
                }
            }
        }
        else
        {

        }
        $this->auth_callback('/');
    }


    /**
     * Деавторизует пользователя путем очищения сессии "profile". Возвращает на главную страницу.
     */
    public function action_logout()
    {
        Session::instance()->delete('profile');
        Session::instance()->delete('instance');
        Controller::redirect('/');
    }


    /**
     * Место для пост-авторизации. В конце осуществляет редирект страницу $page.
     */
    private function auth_callback($page='/')
    {
        Controller::redirect($page);
    }


    /**
     * Метод, вызываемый при ошибке авторизации со стороны соц. сети
     * @return HTTP_Exception_FacebookException
     */
    private function generate_auth_error()
    {
        $error_code = $this->request->query('error_code');
        $error_message = $this->request->query('error_message');

        throw new HTTP_Exception_FacebookException('Ошибка #:error_code : :error_message', [
            ':error_code' => $error_code,
            ':error_message' => $error_message,
        ]);
    }


    /**
     * Генерирует имя для записи в БД из информации профиля ВК
     * @return string
     */
    private function get_vk_name($profile)
    {
        return join(' ', [$profile->first_name, $profile->last_name]);
    }
}
