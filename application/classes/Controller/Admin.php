<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = Model_Article::getAllArticles();

        $content = View::factory('templates/admin/articles/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "allArticles", "content" => $content));
    }

    public function action_delete()
    {
        $user_id    = $this->user->id;
        $article_id = $this->request->param('article_id');

        if (!empty($article_id) && !empty($user_id)) {
            Model_Article::get($article_id)->remove($user_id);
        }

        $this->redirect('/admin/article');
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');

        $article = Model_Article::get($article_id);

        $this->view["article"] = $article;

        $content = View::factory('templates/admin/articles/edit', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "edit", "content" => $content));
    }

    public function action_update()
    {
        $title       = Arr::get($_POST, 'title');
        $description = Arr::get($_POST, 'description');
        $text        = Arr::get($_POST, 'text');
        $cover       = Arr::get($_FILES, 'cover');

        $cover_name = $this->methods->save_cover($cover);

        $article_id = $this->request->param('article_id');

        $article              = Model_Article::get($article_id);
        $article->title       = $title;
        $article->description = $description;
        $article->text        = $text;

        if (!empty($cover_name)) {
            $article->cover = $cover_name;
        }

        $article->update();

        $this->redirect('/admin/article');
    }

    public function action_showAllUsers()
    {
        $this->view["users"] = Model_User::getAll();

        $content = View::factory('templates/admin/users/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "allUsers", "content" => $content));
    }

    public function action_deleteUser()
    {

        $user_id    = $this->user->id;
        $deleted_id = $this->request->param('user_id');

        if (!empty($deleted_id) && !empty($user_id)) {
            Model_User::get($deleted_id)->remove($user_id);
        }

        $this->redirect('/admin/users');

    }

}