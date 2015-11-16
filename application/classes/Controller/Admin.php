<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->view["articles"] = Model::factory('Admin')->loadArticles();

        $content = View::factory('templates/admin/articles/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
                array("active" => "allArticles", "content" => $content));
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id');

        if (!empty($article_id) && !empty($user_id))
        {
            Model_Article::get($article_id)->remove($user_id);
        }

        $this->redirect('/admin/article');
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');

        $article = array();

        $article = Model::factory('Admin')->editArticle($article_id);

        $this->view["article"] = $article[0];

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

        $cover['name'] = Model::factory('Methods')->save_cover($cover);

        $article_id = $this->request->param('article_id');

        //Устанавливаем часовой  пояс для корректного вывода dt_update
        date_default_timezone_set("UTC");
        $time = time(); 
        $offset = 3; 
        $time += 3 * 3600;

        $model = new Model_Admin();
        $model->user_id = $user_id;
        $model->title = $title;
        $model->description = $description;
        $model->text = $text;
        $model->cover = $cover['name'];
        $model->dt_update = date('Y-m-d H:i:s', $time);
        $model->updateArticle($article_id);

        $this->redirect('/admin/article');
    }

    public function action_showAllUsers()
    {
        $this->view["users"] = Model::factory('Admin')->loadUsers();

        $content = View::factory('templates/admin/users/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
                array("active" => "allUsers", "content" => $content));
    }

    public function action_deleteUser(){

        $user_id = $this->user->id;
        $deleted_id = $this->request->param('user_id');

        if (!empty($deleted_id) && !empty($user_id))
        {
            Model_Article::getUser($deleted_id)->removeUser($user_id);
        }

        $this->redirect('/admin/users');

    }

}