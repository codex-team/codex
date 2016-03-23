<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /article/add, /article/<article_id>/edit
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            $this->redirect('/');
    }

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');
        $article = new Model_Article();

        if (!Security::check($csrfToken)) {
            $this->view['article'] = $article;
            $this->template->content = View::factory('templates/articles/create', $this->view);
        } else {
            if ($article_id = Arr::get($_POST, 'article_id'))
                $article = Model_Article::get($article_id);

            $article->title        = Arr::get($_POST, 'title');
            $article->text         = Arr::get($_POST, 'article_text');
            $article->is_published = Arr::get($_POST, 'is_published')? 1 : 0;
            $article->description  = Arr::get($_POST, 'description');

            $errors = FALSE;

            if ($article->title == '' || $article->text == '' || $article->description == '') { $errors = TRUE; }

            if ($errors) {
                $this->view['article'] = $article;
                $this->template->content = View::factory('templates/articles/create', $this->view);
                return false;
            }

            if ($article_id) {
                $article->dt_update = date('Y-m-d H:i:s');
                $article->update();
            } else {
                $article->user_id = $this->user->id;
                $article->insert();
            }

            $this->redirect('/article/' . $article->id);
        }
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');
        $article = Model_Article::get($article_id);
        $this->view['article'] = $article;
        $this->template->content = View::factory('templates/articles/create', $this->view);
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id');

        if (!empty($article_id) && !empty($user_id)) {
            Model_Article::get($article_id)->remove($user_id);
        }

        $this->redirect('/admin/articles');
    }

}
