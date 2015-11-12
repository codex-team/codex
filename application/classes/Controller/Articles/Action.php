<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $user_id = $this->user->id;

        if (empty($user_id)) {
            $this->redirect('/');
        };

        $model = new Model_Article();

        $model->title          = Arr::get($_POST,'title');
        $model->description    = Arr::get($_POST,'description');
        $model->text           = Arr::get($_POST,'text');
        $cover                 = Arr::get($_FILES,'cover');

        $errors = FALSE;
        $table_values = array();

        if ($model->title != '')       { $table_values['title'] = array('value' => $model->title); }               else { $errors = TRUE; }
        if ($model->description != '') { $table_values['description'] = array('value' => $model->description); }   else { $errors = TRUE; }
        if ($model->text != '')        { $table_values['text'] = array('value' => $model->text); }                 else { $errors = TRUE; }

        if ($errors)
        {
            $this->view["table_values"] = $table_values;

            $content = View::factory('templates/articles/new', $this->view);
            $this->template->content = View::factory("templates/articles/wrapper",
                array("active" => "newArticle", "content" => $content, "table_values" => $table_values));

            return false;
        }

        // getting new name for cover
        $model->cover = $this->methods->save_cover($cover);

        $model->user_id = $user_id;

        $model->is_published = true;            // FIXME изменить, когда будет доступны режимы публикации

        $model->save();

        // redirect to new article
        $this->redirect('/article/' . $model->id);
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id');

        if (!empty($article_id) && !empty($user_id))
        {
            Model_Article::get($article_id)->delete_article($user_id);
        }

        $this->redirect('/article');
    }

}
