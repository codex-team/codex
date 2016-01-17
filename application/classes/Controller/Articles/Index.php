<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        $this->view["articles"]  = Model_Article::getActiveArticles();
        $this->template->content = View::factory('templates/articles/list', $this->view);
    }

    public function action_showArticle()
    {
        $articleId = $this->request->param('article_id');

        $this->view["id"] = $articleId;

        $article = Model_Article::get($articleId);
        if ($article->id == 0)
            throw new HTTP_Exception_404();

        $this->stats->hit(Model_Stats::ARTICLE, $articleId);

        $this->view["article"]        = $article;
        $this->view["randomArticles"] = Model_Article::getRandomArticles($articleId);

        $this->title = $article->title;

        $comments = Model_Comment::getCommentsByArticle($articleId);

        $comments_table_rebuild = $this->methods->rebuildCommentsTree($comments);

        $this->view["comments"] = $comments_table_rebuild;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    public function action_newArticle()
    {
        // $this->view["editor"] = View::factory('templates/articles/editor', $this->view);
        $this->template->content = View::factory('templates/articles/new', $this->view);
    }

}
