<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Codex Bot Landing page  in https://ifmo.su/ */
    public function action_bot()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Description for CodeX Bot';
        $this->template->content = View::factory('templates/bot/landing', $this->view);
    }

    /** Codex Special Landing page in https://ifmo.su/special */
    public function action_special()
    {
        $this->title = 'CodeX Special';
        $this->description = 'Module for making high contrast site version';
        $this->template->content = View::factory('templates/special/landing', $this->view);
    }

}
