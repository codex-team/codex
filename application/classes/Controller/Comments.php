<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Comments extends Controller_Base_preDispatch
{
    public function action_add()
    {
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $comment = new Model_Comment();

        $comment->article_id    = Arr::get($_POST, 'article_id');
        $comment->text          = Arr::get($_POST, 'text');
        $comment->parent_id     = Arr::get($_POST, 'parent_id', '0');
        $comment->user_id       = $this->user->id;

        if (preg_match('(^[0-9]{1,})', $comment->article_id) != true) {
            $this->redirect('/');
        }

        if ($comment->text == '') {
            $this->redirect('/article/'.$comment->article_id);
        }

        if ($comment->parent_id != 0) {
            $parent_comment = Model_Comment::get($comment->parent_id);
            if ($parent_comment->parent_id != 0) {
                $comment->root_id = $parent_comment->root_id;
            } else {
                $comment->root_id = $parent_comment->id;
            }
        } else {
            $comment->root_id = 0;
        }

        $comment->insert();

        $this->redirect('/article/'.$comment->article_id);
    }

    public function action_delete()
    {
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $comment_id = $this->request->param('comment_id');

        $comment = Model_Comment::get($comment_id);

        $article_id = $comment->delete_comment($this->user);

        $this->redirect('/article/' . $article_id);
    }
}
