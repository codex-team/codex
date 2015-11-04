<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        // uid будет опредеться тут, а не в форме
        $uid = $_POST['uid']; // = 0
        $title = $_POST['title'];
        $description = $_POST['description'];
        $text = $_POST['text'];
        // cover - картинка
        $cover = $_POST['cover'];

        DB::insert('articles', array('uid', 'title', 'description', 'text', 'cover'))->values(array($uid, $title, $description, $text, $cover))->execute();

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