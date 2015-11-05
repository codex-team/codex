<?php defined('SYSPATH') OR die('No direct access allowed.');

class Controller_Auth extends Controller_Base_preDispatch
{
    public function action_vk()
    {
        $this->template->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);

        $vk = Oauth::instance('vkontakte');
        if ($vk->login())
        {
            $profile = $vk->get_user();
            if ($profile)
            {
                $user = Model_Users::factory('Users')->where('uid', '=', ":uid")->param(":uid", $profile->uid)->find();
                if ($user->id)
                {
                    Session::instance()->set('profile', $profile);
                    Controller::redirect('/auth/callback');
                }
                else
                {
                    Session::instance()->set('profile', $profile);
                    $user = Model_Users::factory('Users');
                    $user->uid = $profile->uid;
                    $user->first_name = $profile->first_name;
                    $user->last_name = $profile->last_name;
                    $user->save();
                    Controller::redirect('/auth/callback');
                }
            }
        }

    }

    public function action_callback()
    {
        Controller::redirect('/');
    }
}