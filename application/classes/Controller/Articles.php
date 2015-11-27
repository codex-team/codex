<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles extends Controller_Base_preDispatch
{
    public function action_all()
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

        $article = Model_Article::get($articleId);

        $this->view["article"] = $article;

        $this->title = $article->title;

        $comments = Model_Comment::getCommentsByArticle($articleId);

        $comments_table_rebuild = $this->methods->rebuildCommentsTree($comments);

        $this->view["comments"] = $comments_table_rebuild;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    public function action_new()
    {
        $this->template->content = View::factory('templates/articles/new', $this->view);
    }

    public function action_add()
    {
        $user_id = $this->user->id; 

        if (empty($user_id)) {
            $this->redirect('/');
        };

        $article = new Model_Article();

        $article->title          = Arr::get($_POST,'title');
        $article->description    = Arr::get($_POST,'description');
        $article->text           = Arr::get($_POST,'text');
        $cover                   = Arr::get($_FILES,'cover');

        $errors = FALSE;
        $table_values = array();

        if ($article->title != '')       { $table_values['title'] = array('value' => $article->title); }
            else { $errors = TRUE; }
        if ($article->description != '') { $table_values['description'] = array('value' => $article->description); }
            else { $errors = TRUE; }
        if ($article->text != '')        { $table_values['text'] = array('value' => $article->text); }
            else { $errors = TRUE; }

        if (!Upload::valid($cover) or
            !Upload::not_empty($cover) or
            !Upload::type($cover, array('jpg', 'jpeg', 'png')) or
            !Upload::size($cover, '10M'))
        {
            $table_values['cover'] = TRUE;
            $errors = TRUE;
        }

        if ($errors)
        {
            $this->view["table_values"] = $table_values;

            $content = View::factory('templates/articles/new', $this->view);
            $this->template->content = View::factory("templates/articles/wrapper",
                array("active" => "newArticle", "content" => $content, "table_values" => $table_values));

            return false;
        }

        // getting new name for cover
        $article->cover = $this->methods->save_cover($cover);

        $article->user_id = $user_id;

        $article->is_published = true;            // FIXME изменить, когда будет доступны режимы публикации

        $article->insert();

        // redirect to new article
        $this->redirect('/article/' . $article->id);
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id');

        if (!empty($article_id) && !empty($user_id))
        {
            Model_Article::get($article_id)->remove($user_id);
        }

        $this->redirect('/admin/articles');
    }

    public function action_edit()
    {
        $user_id = $this->user->id;

        if (empty($user_id)) {
            $this->redirect('/');
        };

        $articleId = $this->request->param('article_id');
        $this->view["id"] = $articleId;

        $article = Model_Article::get($articleId);
        $table_values = array();


        $table_values['title'] = array('value' => $article->title);
        $table_values['description'] = array('value' => $article->description);
        $table_values['text'] = array('value' => $article->text);

        $this->view["table_values"] = $table_values;

        $this->template->content = View::factory('templates/articles/new', $this->view);
    }

}
