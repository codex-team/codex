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


        // generate random name for cover and saving
        function save_cover($cover)
        {
            $new_name = bin2hex(openssl_random_pseudo_bytes(10));

            $cover_extension = pathinfo($cover['name'], PATHINFO_EXTENSION);
            $cover_new_name = $new_name . $cover_extension;

            $uploaddir = 'public/img/covers/';
            $uploadfile = $uploaddir . basename($cover_new_name);
            move_uploaded_file($cover['tmp_name'], $uploadfile);

            return $cover_new_name;
        }

        $cover['name'] = save_cover($cover);
        // end

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
