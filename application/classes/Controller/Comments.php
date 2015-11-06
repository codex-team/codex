<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Comments extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $article = $_POST['article'];
        $user_id = $_POST['user_id'];
        $text = $_POST['text'];
        $parent_id = $_POST['parent_id'];

        DB::insert('comments', array('article', 'user_id', 'text', 'parent_id'))->values(array($article, $user_id, $text, $parent_id))->execute();

        $this->redirect('/article/'.$article);
    }

    public function action_delete()
    {
        $comment_id = $this->request->param('comment_id');

        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('comments')->where('id', '=', $comment_id)->execute();
        $article = $comment[0]['article'];

        // удаляем комментарий и все его подкомментарии рекурсивно
        function delete_subcomments($parent_id)
        {
            $subcomments = DB::select('*')->from('comments')->where('parent_id', '=', $parent_id)->execute();

            foreach($subcomments as $comment):
               delete_subcomments($comment['id']);
            endforeach;

            DB::delete('comments')->where('id', '=', $parent_id)->execute();
        }
        delete_subcomments($comment_id);

        $this->redirect('/article/'.$article);
    }

}