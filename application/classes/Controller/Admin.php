<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_index()
    {
        $category     = $this->request->param('category');
        $pageContent  = '';

        switch ($category){

            case 'articles' : $pageContent = self::articles(); break;
            case 'users'    : $pageContent = self::users(); break;
            default         : $pageContent = View::factory("templates/admin/dashboard"); break;
        }

        $this->template->content = View::factory("templates/admin/wrapper", array("content" => $pageContent));

    }

    public function articles()
    {
        $this->view["articles"] = Model_Article::getAllArticles();

        return View::factory('templates/admin/articles/list', $this->view);

    }

    public function users()
    {
        $this->view["users"] = Model_User::getAll();

        return View::factory('templates/admin/users/list', $this->view);

    }

}