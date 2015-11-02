<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = DB::select('*')->from('articles')->execute();

        $this->template->content = View::factory('templates/article/article_list', $this->view);
    }

    public function action_showArticle()
    {
        $id = $this->request->param('article_id');

        $this->title = 'Article #'.$id;
        $this->view["id"] = $id;

        $articles = DB::select('*')->from('articles')->where('id', '=', $id)->execute();
        #$comments = DB::select('*')->from('comments')->where('article', '=', $id)->execute();
        $this->view["comments"] = DB::select('*')->from('comments')->where('article', '=', $id)->execute();

        # этот код надо бы сделать красивее
        $article = [];
        foreach($articles as $current_article):
            $article['id'] = $current_article['id'];
            $article['title'] = $current_article['title'];
            $article['text'] = $current_article['text'];
            $article['date'] = $current_article['date'];
        endforeach;

        $this->view["subcomments"] = DB::select('*')->from('comments')->where('article', '=', $id)->execute();
        # конец кода, который нао сделать красивее

        $this->view["article"] = $article;

        $this->template->content = View::factory('templates/article/index', $this->view);
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

        # получаем id статьи для редиректа
        $comment = DB::select('*')->from('comments')->where('id', '=', $comment_id)->execute();
        foreach($comment as $current_comment):
            $id = $current_comment['article'];
        endforeach;
        # надо бы сделать этот красивее

        DB::delete('comments')->where('id', '=', $comment_id)->execute();
        DB::delete('comments')->where('answer', '=', $comment_id)->execute();

        $this->redirect('/article/'.$id);
    }

}