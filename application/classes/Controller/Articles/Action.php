<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $title          = Arr::get($_POST,'title');
        $description    = Arr::get($_POST,'description');
        $text           = Arr::get($_POST,'text');
        $cover          = Arr::get($_FILES,'cover');

        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $user_id = $this->user->id;

        // saving cover for new article
        function save_cover($cover)
        {
            $new_name = bin2hex(openssl_random_pseudo_bytes(5));
            $cover_new_name = $new_name . '.jpg';

            $uploaddir = 'public/img/covers/';
            $uploadfile = $uploaddir . $cover_new_name;
            move_uploaded_file($cover['tmp_name'], $uploadfile);

            return $cover_new_name;
        }

        $cover['name'] = save_cover($cover);


        // adding new article
        DB::insert('Articles', array('user_id', 'title', 'description', 'text', 'cover'))
            ->values(array($user_id, $title, $description, $text, $cover['name']))
            ->execute();

        $new_article = DB::select('*')->from('Articles')->order_by('id', 'DESC')->execute();
        $article_id = $new_article[0]['id'];

        $this->redirect('/article/' . $article_id);
    }

    public function action_delete()
    {
        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };

        $article_id = $this->request->param('article_id');

        // is_removed = 1 , for this article
        DB::update('Articles')->where('id', '=', $article_id)->set(array('is_removed' => 1))->execute();

        // is_removed = 1, for comments for the article
        DB::update('Comments')->where('article_id', '=', $article_id)->set(array('is_removed' => 1))->execute();

        $this->redirect('/article');
    }

}
