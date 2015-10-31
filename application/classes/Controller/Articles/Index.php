<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;

        $this->view["comments"] = '';

        # место для кода создания массива комментариев для статьи

        $this->template->content = View::factory('templates/article/index', $this->view);
    }

    public function action_addComment()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];

        # место для кода сохранения комментария в бд

        $this->redirect('/article/'.$id);
    }

}