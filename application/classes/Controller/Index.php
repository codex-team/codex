<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Index extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
        $this->title = 'Команда CodeX';
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


    /** Action for html-page preview for designers */
    public function action_designPreview()
    {
        $template = $this->request->param('page');

        $this->auto_render = false;
        $this->response->body(View::factory('templates/design/' . $template)->render());
    }


}
