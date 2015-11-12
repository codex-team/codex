<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = DB::select('*')->from('Articles')->where('is_removed', '=', 0)->order_by('id', 'DESC')->execute();

        $content = View::factory('templates/admin/articles/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
                array("active" => "allArticles", "content" => $content));
    }

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');
        $this->title = 'Article #' . $id;
        $this->view["id"] = $id;

        $articles = DB::select('*')
                        ->from('Articles')
                        ->where('id', '=', $id)
                        ->execute();

        $this->view["article"] = $articles[0];

        $comments_table = DB::select('*')
                              ->from('Comments')
                              ->where('article', '=', $id)
                              ->where('is_removed', '=', 0)
                              ->order_by('parent_id', 'ASC', 'id', 'ASC')
                              ->execute();

        $comments_table_rebuild = array();

        // пересобираем массив комментариев
        $i = 0;
        foreach ($comments_table as $comment):
            $comments_table_rebuild[] = $comment;

            $var_k = $i;
            for ($j = 0; $j < $i; $j++) {
                if ($comment['parent_id'] == $comments_table_rebuild[$j]['id']) {
                    for ($k = $j + 1; $k < $i; $k++) {
                        if ($comment['parent_id'] != $comments_table_rebuild[$k]['parent_id']) {
                            $var_k = $k;
                            break;
                        };
                    };
                    break;
                };
            };
            for ($j = $i; $j >= $var_k; $j--) {
                $comments_table_rebuild[$j + 1] = $comments_table_rebuild[$j];
            }

            $comments_table_rebuild[$var_k] = $comment;
            $i++;
        endforeach;
        array_pop($comments_table_rebuild);
        // пересобрали.

        $this->view["comments"] = $comments_table_rebuild;

        $content = View::factory('templates/articles/article', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "", "content" => $content));
    }

    public function action_delete()
    {
        $article_id = $this->request->param('article_id');

        DB::update('Articles')->where('id', '=', $article_id)
            ->set(array('is_removed' => 1))
            ->execute();

        DB::update('Comments')->where('id', '=', $article_id)
            ->set(array('is_removed' => 1))
            ->execute();

        $this->redirect('/admin/article');
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');

        $articles = DB::select('*')
                        ->from('Articles')
                        ->where('id', '=', $article_id)
                        ->execute();

        $this->view["article"] = $articles[0];

        $content = View::factory('templates/admin/articles/edit', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "edit", "content" => $content));
    }

    public function action_update()
    {
        $user_id        = Arr::get($_POST,'user_id');
        $title          = Arr::get($_POST,'title');
        $description    = Arr::get($_POST,'description');
        $text           = Arr::get($_POST,'text');
        $cover          = Arr::get($_POST,'cover');


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

        $article_id = $this->request->param('article_id');

        //Устанавливаем часовой  пояс для корректного вывода dt_update
        date_default_timezone_set("UTC");
        $time = time(); 
        $offset = 3; 
        $time += 3 * 3600;

        DB::update('Articles')->set(array('user_id' => $user_id, 
                                          'title' => $title, 
                                          'description' => $description, 
                                          'text' => $text, 
                                          'cover' => $cover['name'],
                                          'dt_update' => date('Y-m-d H:i:s', $time)))
                              ->where('id', '=', $article_id)
                              ->execute();

        $this->redirect('/admin/article');
    }

    public function action_showAllUsers()
    {
        $this->view["users"] = DB::select('*')->from('Users')->order_by('name', 'DESC')->execute();

        $content = View::factory('templates/admin/users/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
                array("active" => "allUsers", "content" => $content));
    }

}