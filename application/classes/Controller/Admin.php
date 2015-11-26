<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{

    public function action_index()
    {
        $category = $this->request->param('category');

        switch ($category){

            case 'articles' : 
                self::articles(); 
                break;

            case 'users' : 
                self::users(); 
                break;

        }
    }

    public function articles()
    {
        $this->view["articles"] = Model_Article::getAllArticles();

        $content = View::factory('templates/admin/articles/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "allArticles", "content" => $content));
    }

    public function users()
    {
        $this->view["users"] = Model_User::getAll();

        $content = View::factory('templates/admin/users/list', $this->view);

        $this->template->content = View::factory("templates/admin/wrapper",
            array("active" => "allUsers", "content" => $content));
    }

}