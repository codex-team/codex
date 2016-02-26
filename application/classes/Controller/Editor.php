<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Editor extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_landing()
    {
        $this->title = 'CodeX Editor';
        $this->description = 'Block style visual editor for beautiful pages';
        $this->template->content = View::factory('templates/editor/landing', $this->view);
    }

}
