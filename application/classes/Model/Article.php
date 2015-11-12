<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Article extends Model
{

    public function save_cover($cover)
    {
        // generating new filename
        $new_name = bin2hex(openssl_random_pseudo_bytes(5));
        $cover_new_name = $new_name . '.jpg';

        // saving
        $uploaddir = 'public/img/covers/';
        $uploadfile = $uploaddir . $cover_new_name;
        move_uploaded_file($cover['tmp_name'], $uploadfile);

        // return new cover name for db
        return $cover_new_name;
    }

    public function add_article($arr_article_parts)
	{
        // saving
        DB::insert('Articles', array('user_id', 'title', 'description', 'text', 'cover'))
            ->values($arr_article_parts)
            ->execute();

        // getting id of new article
        $new_article = DB::select('*')->from('Articles')->order_by('id', 'DESC')->execute();
        $article_id = $new_article[0]['id'];

        // return article id
        return $article_id;
	}

    public function delete_article($article_id, $user_id)
    {
        // getting id
        $article = DB::select('*')->from('Articles')->where('id', '=', $article_id)->execute();

        // if this it is user's article, we can delete it
        if ($article[0]['user_id'] == $user_id)
        {
            // is_removed = 1 , for this article
            DB::update('Articles')->where('id', '=', $article_id)->set(array('is_removed' => 1))->execute();

            // is_removed = 1, for comments for the article
            DB::update('Comments')->where('article_id', '=', $article_id)->set(array('is_removed' => 1))->execute();
        }
    }

}
