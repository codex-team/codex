<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $title = $_POST['title'];
        $text = $_POST['text'];
        $date = date("Y-m-d");

        DB::insert('articles', array('title', 'text', 'date'))->values(array($title, $text, $date))->execute();

        $this->redirect('/article');
    }

    public function action_delete()
    {
        $article_id = $this->request->param('article_id');

        DB::delete('articles')->where('id', '=', $article_id)->execute();
        DB::delete('comments')->where('article', '=', $article_id)->execute();

        $this->redirect('/article');
    }

}