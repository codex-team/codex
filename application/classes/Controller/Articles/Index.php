<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = DB::select('*')->from('Articles')->where('is_removed', '=', 0)->order_by('id', 'DESC')->execute();

        $content = View::factory('templates/articles/list', $this->view);

        $this->template->content = View::factory("templates/articles/wrapper",
                array("active" => "allArticles", "content" => $content));
    }

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');
        $this->title = 'Article #' . $id;
        $this->view["id"] = $id;

        $articles = DB::select('*')->from('Articles')->where('id', '=', $id)->execute();

        $this->view["article"] = $articles[0];

        $comments_table = DB::select('*')->from('Comments')->where('article_id', '=', $id)->where('is_removed', '=', 0)
                              ->order_by('parent_id', 'ASC', 'id', 'ASC')->execute();

        $comments_table_rebuild = array();

        // пересобираем массив комментариев
        $names_for_comments = array();
        $i = 0;
        foreach ($comments_table as $comment):

            // записываем имя автора комментария в массив
            $get_author_name = DB::select('*')->from('Users')->where('id', '=', $comment['user_id'])->execute();
            $get_author_name = $get_author_name[0]['name'];
            $names_for_comments[$comment['id']] = array('author' => $get_author_name);


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
        $this->view["names_for_comments"] = $names_for_comments;
        $content = View::factory('templates/articles/article', $this->view);

        $this->template->content = View::factory("templates/articles/wrapper",
            array("active" => "", "content" => $content));
    }

    public function action_newArticle()
    {
        $content = View::factory('templates/articles/new', $this->view);

        $this->template->content = View::factory("templates/articles/wrapper",
            array("active" => "newArticle", "content" => $content));
    }

}