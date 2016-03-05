<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAll()
    {
        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        $this->view["articles"]  = Model_Article::getActiveArticles();
        $this->template->content = View::factory('templates/articles/list', $this->view);
    }

    public function action_show()
    {
        $articleId = $this->request->param('article_id');

        $this->view["id"] = $articleId;

        $needClearCache = Arr::get($_GET, 'clear');

        $article = Model_Article::get($articleId, $needClearCache);
        if ($article->id == 0 || $article->is_removed)
            throw new HTTP_Exception_404();

        $this->stats->hit(Model_Stats::ARTICLE, $articleId);

        $this->view["article"]        = $article;
        $this->view["randomArticles"] = Model_Article::getRandomArticles($articleId);

        $this->title = $article->title;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    public function action_createArticle()
    {
        $article_text = Arr::get($_POST, 'article_text', '');
        if ($article_text)
        {
            echo $article_text;
        }
        $this->template->content = View::factory('templates/articles/create', $this->view);
    }

}
