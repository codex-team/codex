<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Codex Bot Landing page  in https://ifmo.su/ */
    public function action_show_bot()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Description for CodeX Bot';
        $this->template->content = View::factory('templates/bot/landing', $this->view);
    }

    /** Codex Org Landing page  in https://ifmo.su/ */
    public function action_show_org()
    {
        $this->title = 'CodeX Org';
        $this->description = 'Description for CodeX Org';
        $this->template->content = View::factory('templates/org/landing', $this->view);
    }

}
