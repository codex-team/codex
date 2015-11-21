<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = Model_Article::getActiveArticles();

        $content = View::factory('templates/articles/list', $this->view);

        $this->template->content = View::factory("templates/articles/wrapper",
                array("active" => "allArticles", "content" => $content));
    }

    public function action_showArticle()
    {
        $articleId = $this->request->param('article_id');
        $this->view["id"] = $articleId;

        $article = Model_Article::get($articleId);

        $this->view["article"] = $article;

        $this->title = $article->title;

        $comments = Model_Comment::getCommentsByArticle($articleId);

        $comments_table_rebuild = $this->methods->rebuildCommentsTree($comments);

        $this->view["comments"] = $comments_table_rebuild;

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