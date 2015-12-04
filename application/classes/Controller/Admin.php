<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_index()
    {
        $category = $this->request->param('category');
 
        switch ($category){

            case 'articles' : 
                $content = self::articles(); 
                break;

            case 'users' : 
                $content = self::users(); 
                break;
        }

        $this->title = "Панель администрирования";
        $this->template->content = View::factory("templates/admin/wrapper",
            array("content" => $content));

    }

    public function articles()
    {

        $articles = Model_Article::getAllArticles(); 

        $this->view["articles"] = $articles;

        $this->view["views"] = Model_Stats::get($articles);

        $this->view["users"] = Model_User::getAllForAdmin();

        return View::factory('templates/admin/articles/list', $this->view);

    }

    public function users()
    {

        $this->view["users"] = Model_User::getAll();

        return View::factory('templates/admin/users/list', $this->view);

    }

}