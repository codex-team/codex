<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Comments extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $article_id     = Arr::get($_POST, 'article_id');
        $text           = Arr::get($_POST, 'text');
        $parent_id      = Arr::get($_POST, 'parent_id');

        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $user_id = $this->user->id;

        // getting the
        function get_root_id($id){

            $comment = DB::select('*')->from('Comments')->where('id', '=', $id)->execute();
            $comment = $comment[0];

            if ($comment['parent_id'] != 0){
                get_root_id($comment['parent_id']);
                return $comment['id'];
            } else {
                return $comment['id'];
            }
        }

        if ($parent_id != 0){
            $root_id = get_root_id($parent_id);
        } else {
            $root_id = 0;
        }

        DB::insert('Comments', array('article_id', 'user_id', 'text', 'parent_id', 'root_id'))
            ->values(array($article_id, $user_id, $text, $parent_id, $root_id))->execute();

        $this->redirect('/article/'.$article_id);
    }

    public function action_delete()
    {
        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $comment_id = $this->request->param('comment_id');

        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('Comments')->where('id', '=', $comment_id)->execute();
        $article_id = $comment[0]['article_id'];

        // удаляем комментарий и все его подкомментарии рекурсивно
        function delete_subcomments($parent_id)
        {
            $subcomments = DB::select('*')->from('Comments')->where('parent_id', '=', $parent_id)->execute();

            foreach($subcomments as $comment):
               delete_subcomments($comment['id']);
            endforeach;

            DB::update('Comments')->where('id', '=', $parent_id)->set(array('is_removed' => 1))->execute();
        }
        delete_subcomments($comment_id);

        $this->redirect('/article/' . $article_id);
    }

}