<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = DB::select('*')->from('articles')->execute();

        $this->template->content = View::factory('templates/articles/list', $this->view);
    }

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');
        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;

        $articles = DB::select('*')->from('articles')->where('id', '=', $id)->execute();
        $comments_table = DB::select('*')->from('comments')->where('article', '=', $id)->order_by('answer', 'ASC', 'id', 'ASC')->execute();
        $comments_table_rebuild = [];

        // пересобираем массив комментариев
        $i = 0;
        foreach($comments_table as $comment):
            $comments_table_rebuild[] = $comment;

            $var_k = $i;
            for ($j = 0; $j < $i; $j++){
                if ($comment['answer'] == $comments_table_rebuild[$j]['id']) {
                    for ($k = $j + 1; $k < $i; $k++){
                        if ($comment['answer'] != $comments_table_rebuild[$k]['answer']){
                            $var_k = $k;
                            break;
                        };
                    };
                    break;
                };
            };
            for ($j = $i; $j >= $var_k; $j--){
                $comments_table_rebuild[$j + 1] = $comments_table_rebuild[$j];
            }

            $comments_table_rebuild[$var_k] = $comment;
            $i++;
        endforeach;
        array_pop($comments_table_rebuild);
        // пересобрали.

        // этот код надо бы сделать красивее
        $article = [];
        foreach($articles as $current_article):
            $article['id'] = $current_article['id'];
            $article['title'] = $current_article['title'];
            $article['text'] = $current_article['text'];
            $article['date'] = $current_article['date'];
        endforeach;
        // конец кода, который надо сделать красивее

        $this->view["comments"] = $comments_table_rebuild;
        $this->view["article"] = $article;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    public function action_newArticle()
    {
        $this->template->content = View::factory('templates/articles/new', $this->view);
    }

}