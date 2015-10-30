<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
        $this->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);
    }

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        echo($id); exit();
    }

}