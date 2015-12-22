<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            throw new HTTP_Exception_403();
    }

    public function action_index()
    {
        $category = $this->request->param('category');
        $list_type = $this->request->param('list');
        $pageContent = '';
        $nav_articles = '';

        switch ($category) {

            case 'articles' :
                $pageContent = self::articles($list_type);
                $nav_articles = View::factory('templates/admin/nav_articles', $this->view);
                break;
            case 'users'    :
                $pageContent = self::users();
                break;
            default         :
                $pageContent = View::factory("templates/admin/dashboard");
                break;
        }

        $this->template->content = View::factory("templates/admin/wrapper", array("content" => $pageContent, "navArticles" => $nav_articles));


    }
    
    public function action_edit()
    {
        $article_id = $this->request->param('article_id');

        $article = Model_Article::get($article_id);

        $this->view["article"] = $article;

        // $this->view["editor"] = View::factory('templates/articles/editor', array("storedNodes" => $article->text));
        $content              = View::factory('templates/admin/articles/edit', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "edit", "content" => $content));
    }

    public function articles($list_type = '')
    {
        switch ($list_type) {

            case 'unpublished' :
                $articles = Model_Article::getUnpublishedArticles();
                break;
            case 'deleted' :
                $articles = Model_Article::getDeletedArticles();
                break;
            case '' :
                $articles = Model_Article::getActiveArticles();
                break;
        }

        foreach ($articles as $article) {
            $article->views = $this->stats->get(Model_Stats::ARTICLE, $article->id);
        }

        $this->view["articles"] = $articles;

        return View::factory('templates/admin/articles/list', $this->view);

    }

    public function users()
    {

        $this->view["users"] = Model_User::getAll();

        return View::factory('templates/admin/users/list', $this->view);

    }

}