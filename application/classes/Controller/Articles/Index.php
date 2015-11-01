<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;

        $this->view["comments"] = DB::select('*')->from('comments')->where('article', '=', $id)->execute();

        $this->template->content = View::factory('templates/article/index', $this->view);
    }

    public function action_addComment()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];

        DB::insert('comments', array('article', 'name', 'comment'))->values(array($id, $name, $comment))->execute();

        $this->redirect('/article/'.$id);
    }

}