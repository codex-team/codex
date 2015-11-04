<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Comments extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $article = $_POST['article'];
        $uid = $_POST['uid'];
        $text = $_POST['text'];
        $parent_id = $_POST['parent_id'];

        DB::insert('comments', array('article', 'uid', 'text', 'parent_id'))->values(array($article, $uid, $text, $parent_id))->execute();

        $this->redirect('/article/'.$article);
    }

    public function action_delete()
    {
        $comment_id = $this->request->param('comment_id');

        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('comments')->where('id', '=', $comment_id)->execute();
        foreach($comment as $current_comment):
            $article = $current_comment['article'];
        endforeach;
        // надо бы сделать этот красивее

        // нужен код для отметки на комментарии и на всех его подкомментариях
        // is_removed = TRUE
        // рекурсивно по всем сабкомментам

        #DB::delete('comments')->where('id', '=', $comment_id)->execute();
        #DB::delete('comments')->where('parent_id', '=', $comment_id)->execute();

        $this->redirect('/article/'.$article);
    }

}