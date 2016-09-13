<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Codex Bot Landing page  in https://ifmo.su/ */
    public function action_show()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Description for CodeX Bot';
        $this->template->content = View::factory('templates/bot/landing', $this->view);
    }

}
