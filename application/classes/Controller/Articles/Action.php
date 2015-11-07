<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        // uid будет опредеться тут, а не в форме
        $user_id        = Arr::get($_POST,'user_id');
        $title          = Arr::get($_POST,'title');
        $description    = Arr::get($_POST,'description');
        $text           = Arr::get($_POST,'text');
        $cover          = Arr::get($_POST,'cover');

        function save_cover($cover)
        {
            $uploaddir = 'public/img/covers/';
            $uploadfile = $uploaddir . basename($cover['name']);
            move_uploaded_file($cover['tmp_name'], $uploadfile);
        }

        save_cover($cover);

        DB::insert('Articles', array('user_id', 'title', 'description', 'text', 'cover'))
            ->values(array($user_id, $title, $description, $text, $cover['name']))
            ->execute();

        $this->redirect('/article');
    }

    public function action_delete()
    {
        $article_id = $this->request->param('article_id');

        DB::update('Articles')->where('id', '=', $article_id)
            ->set('is_removed', '=', 1)
            ->execute();

        DB::update('Comments')->where('article', '=', $article_id)
            ->set('is_removed', '=', 1)
            ->execute();

        $this->redirect('/article');
    }

}