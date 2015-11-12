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

    public function action_facebook()
    {
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
                    $user->fb_id = $profile->id;

                    /*
                     * Загрузить фото профиля целиком: $fb->get_images($profile->id);
                     *
                     */

                    $user->name = $profile->name;

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
     * Генерирует имя для записи в БД из информации профиля ВК
     * @return string
     */
    private function get_vk_name($profile)
    {
        return join(' ', [$profile->first_name, $profile->last_name]);
    }
}