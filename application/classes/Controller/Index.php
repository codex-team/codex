<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Index extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
        $this->template->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);

        $user = Oauth::instance('vkontakte')->get_profile();
        if ($user)
        {
            echo "Добрый день, " . $user->first_name;
        }
        else
        {
            echo "<a href='/auth/vk'>Вход</a>";
        }
    }

}