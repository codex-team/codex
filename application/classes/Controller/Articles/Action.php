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
        function generateRandomString($length = 15) {
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        function save_cover($cover)
        {
            $cover_extension = pathinfo($cover['name'], PATHINFO_EXTENSION);
            $cover_new_name = generateRandomString() . $cover_extension;

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