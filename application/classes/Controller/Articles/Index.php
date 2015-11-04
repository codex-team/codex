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
        $this->template->content = View::factory('templates/articles/article_new', $this->view);
    }

    public function action_addArticle()
    {
        $title = $_POST['title'];
        $text = $_POST['text'];
        $date = date("Y-m-d");

        DB::insert('articles', array('title', 'text', 'date'))->values(array($title, $text, $date))->execute();

        $this->redirect('/article');
    }

    public function action_delArticle()
    {
        $article_id = $this->request->param('article_id');

        DB::delete('articles')->where('id', '=', $article_id)->execute();
        DB::delete('comments')->where('article', '=', $article_id)->execute();

        $this->redirect('/article');
    }

    public function action_addComment()
    {
        $id = $_POST['id'];
        $name = $_POST['name'];
        $comment = $_POST['comment'];
        $answer = $_POST['answer'];

        DB::insert('comments', array('article', 'name', 'comment', 'answer'))->values(array($id, $name, $comment, $answer))->execute();

        $this->redirect('/article/'.$id);
    }

    public function action_delComment()
    {
        $comment_id = $this->request->param('comment_id');

        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('comments')->where('id', '=', $comment_id)->execute();
        foreach($comment as $current_comment):
            $id = $current_comment['article'];
        endforeach;
        // надо бы сделать этот красивее

        DB::delete('comments')->where('id', '=', $comment_id)->execute();
        DB::delete('comments')->where('answer', '=', $comment_id)->execute();

        $this->redirect('/article/'.$id);
    }

}