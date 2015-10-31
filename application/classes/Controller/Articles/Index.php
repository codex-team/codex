<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;
        $this->view["comments"] = '';
        $this->template->content = View::factory('templates/article/index', $this->view);
    }

}