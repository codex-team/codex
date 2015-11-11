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

                $user = DB::select('*')->from('Users')->where('vk_id', '=', ":vk_id")->param(":vk_id", $profile->uid)->execute();
                #$user = Model_Users::factory('Users')->where('uid', '=', ":uid")->param(":uid", $profile->uid)->find();
                if (!isset($user[0]))
                {
                    DB::insert('Users', array('name', 'vk_id'))->values(array($profile->first_name . " " . $profile->last_name, $profile->uid))->execute();
                    /*$user = Model_Users::factory('Users');
                    $user->uid = $profile->uid;
                    $user->first_name = $profile->first_name;
                    $user->last_name = $profile->last_name;
                    $user->save();
                    */
                }
                $this->auth_callback('/');
            }
        }
        else
        {
            # Add auth error view
            $this->auth_callback('/');
        }

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
}