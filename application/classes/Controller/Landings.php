<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_show()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Description for CodeX Bot';
        $this->template->content = View::factory('templates/bot/landing', $this->view);
    }

}
