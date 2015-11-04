<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
        $this->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);
    }

    public function action_showArticles()
    {
        // $id = $this->request->param('article_id');

        $this->title = 'Список статей';
        $this->view["h1"]    = "Список статей";

        $articles = new Model_Article();
        $this->view["items"] = $articles->GetList($arFilter = false);

        $this->template->content = View::factory('templates/Articles/list', $this->view);
    }
}