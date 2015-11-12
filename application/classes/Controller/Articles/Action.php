<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $model = new Model_Article;


        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };
        $user_id = $this->user->id;
        #$user_id = 1;


        $title          = Arr::get($_POST,'title');
        $description    = Arr::get($_POST,'description');
        $text           = Arr::get($_POST,'text');
        $cover          = Arr::get($_FILES,'cover');

        $errors = FALSE;
        $table_values = array();

        if ($title != '')       { $table_values['title'] = array('value' => $title); }               else { $errors = TRUE; }
        if ($description != '') { $table_values['description'] = array('value' => $description); }   else { $errors = TRUE; }
        if ($text != '')        { $table_values['text'] = array('value' => $text); }                 else { $errors = TRUE; }
        #if (!$cover)            { $errors = TRUE; }

        if ($errors)
        {
            $this->view["table_values"] = $table_values;

            $content = View::factory('templates/articles/new', $this->view);
            $this->template->content = View::factory("templates/articles/wrapper",
                array("active" => "newArticle", "content" => $content, "table_values" => $table_values));

            return false;
        }

        // getting new name for cover
        $cover['name'] = $model->save_cover($cover);
        // making an array with values
        $arr_article_parts = array($user_id, $title, $description, $text, $cover['name']);
        // saving article in db
        $article_id = $model->add_article($arr_article_parts);
        // redirect to new article
        $this->redirect('/article/' . $article_id);
    }

    public function action_delete()
    {
        $model = new Model_Article;

        // if user has no id ( = guest user), then redirect to main page
        if (!($this->user->id)) {
            $this->redirect('/');
        };
        $user_id = $this->user->id;

        // getting article id from url
        $article_id = $this->request->param('article_id');
        // function for deleting
        $model->delete_article($article_id, $user_id);
        // redirect to list of articles
        $this->redirect('/article');
    }

}
