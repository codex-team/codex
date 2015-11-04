<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Detail extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
//        $this->title = 'Команда CodeX';
//        $this->template->content = View::factory('templates/index', $this->view);
    }

    public function action_showArticle()
    {
        $article_code = $this->request->param('article_code');

        $articles = new Model_Article();
        $this->view["item"] = $articles->GetByCode($article_code);


        $this->title = $this->view["item"]["TITLE"];
        $this->view["h1"]    = $this->view["item"]["TITLE"];

        $this->template->content = View::factory('templates/Articles/detail', $this->view);
    }

}