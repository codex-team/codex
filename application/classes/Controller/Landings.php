<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Codex Bot Landing page  in https://ifmo.su/ */
    public function action_bot()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Telegram bot-platform for developers and managers';
        $this->template->content = View::factory('templates/landings/codex_bot', $this->view);
    }

    /** Codex Special Landing page in https://ifmo.su/special */
    public function action_special()
    {
        $this->title = 'CodeX Special';
        $this->description = 'Module for making high contrast site version';
        $this->template->content = View::factory('templates/landings/special', $this->view);
    }

    /**
     * CodeX Media
     */
    public function action_media()
    {
        $this->title = 'CodeX Media';
        $this->description = 'Platfrom for building UGC media';
        $this->template->content = View::factory('templates/landings/media', $this->view);
    }

}
