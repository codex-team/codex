<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Comments_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];
        $answer = $_POST['answer'];

        DB::insert('comments', array('article', 'name', 'comment', 'answer'))->values(array($id, $name, $comment, $answer))->execute();

        $this->redirect('/article/'.$id);
    }

    public function action_delete()
    {
        $comment_id = $this->request->param('comment_id');

        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('comments')->where('id', '=', $comment_id)->execute();
        foreach($comment as $current_comment):
            $id = $current_comment['article'];
        endforeach;
        // надо бы сделать этот красивее

        DB::delete('comments')->where('id', '=', $comment_id)->execute();
        DB::delete('comments')->where('answer', '=', $comment_id)->execute();

        $this->redirect('/article/'.$id);
    }

}