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
            $profile = $vk->get_user('photo_50,photo_200,photo_max,city');

            if ($profile)
            {
                $token = Session::instance()->get('vk_token');
                Cookie::set("auth_token", $token);

                $user = Model_User::findByAttribute('vk_id', $profile->uid);
                if ($user->is_empty())
                {
                    $user = new Model_User();
                    $user->vk_id = $profile->uid;
                    $user->photo_small = $profile->photo_50;
                    $user->photo = $profile->photo_200;
                    $user->photo_big = $profile->photo_max;
                    $user->name = $this->get_vk_name($profile);

                    if ($result = $user->save('vk'))
                    {
                        $inserted_id = $result[0];
                        $new_session = new Model_Sessions();
                        $new_session->save($inserted_id, $token);
                    }
                }
                else
                {
                    $new_session = new Model_Sessions();
                    if (!$new_session->get_user_id($token))
                        $new_session->save($user->id, $token);
                }
            }
        }
        else
        {
            # Add auth error view
        }
        Controller::redirect($this->get_return_url());

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
        Controller::redirect($this->get_return_url());
    }


    /**
     * Осуществляет авторизацию в github. В случае, если пользователь авторизован в первый раз - добавляет новую запись
     * в таблицу Users. Модель пользователя помещается в сессию "profile". Далее проиходит редирект на /auth/callback
     */
    public function action_github()
    {
        if ( $error = $this->request->query('error_code') )
        {
            $this->generate_auth_error();
        }

        $gh = Oauth::instance('github');
        if ($gh->login())
        {
            $profile = $gh->get_user();

            if ($profile)
            {
                $token = $gh->get_token();
                Cookie::set("auth_token", $token);

                $user = Model_User::findByAttribute('github_id', $profile->id);
                if ($user->is_empty())
                {
                    $user = new Model_User();
                    if ($profile->name)
                        $user->name = $profile->name;
                    else
                        $user->name = $profile->login;

                    $user->github_id = $profile->id;
                    $user->github_uri = $profile->login;
                    $user->photo = $profile->avatar_url;

                    if ($result = $user->save())
                    {
                        $inserted_id = $result[0];
                        $new_session = new Model_Sessions();
                        $new_session->save($inserted_id, $token);
                    }
                }
                else
                {
                    $new_session = new Model_Sessions();
                    if (!$new_session->get_user_id($token))
                        $new_session->save($user->id, $token);
                }
            }
        }
        else
        {

        }
        Controller::redirect($this->get_return_url());
    }


    /**
     * Деавторизует пользователя путем очищения куки "auth_token". Возвращает на главную страницу.
     */
    public function action_logout()
    {
        Cookie::delete("auth_token");
        Controller::redirect($this->get_return_url());
    }


    /**
     * @return URL для возвращения на предыдущую страницу
     */
    private function get_return_url()
    {
        return Request::initial()->referrer();
    }


    /**
     * Метод, вызываемый при ошибке авторизации со стороны соц. сети
     * @return HTTP_Exception_FacebookException
     */
    private function generate_auth_error()
    {
        $error_code = $this->request->query('error_code');
        $error_message = $this->request->query('error_message');

        throw new HTTP_Exception_FacebookException('Ошибка #:error_code : :error_message', array(
            ':error_code' => $error_code,
            ':error_message' => $error_message,
        ));
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
