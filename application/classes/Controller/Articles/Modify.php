<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Modify extends Controller_Base_preDispatch
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

        /*
         * редактирвоание происходит напрямую из роута вида: <controller>/<action>/<id>
         * так как срабатывает обычный роут, то при отправке формы передается переменная contest_id.
         * Форма отправляет POST запрос
         */
        if ( $this->request->post()) {
            $article_id = Arr::get($_POST, 'article_id');
            $article = Model_Article::get($article_id, true);
        }
        /*
        * Редактирование через Алиас
        * Здесь сперва запрос получает Controller_Uri, которая будет передавать id сущности через query('id')
        */
        elseif ( $article_id = $this->request->query('id') ?: $this->request->param('id')) {
            $article = Model_Article::get($article_id, true);
        }
        else {
            $article = new Model_Article();
        }

        /*
         * Articles Title.
         */
        if (Security::check($csrfToken)) {

            $article->title        = Arr::get($_POST, 'title');
            $article->text         = Arr::get($_POST, 'article_text');
            $article->is_published = Arr::get($_POST, 'is_published')? 1 : 0;
            $article->description  = Arr::get($_POST, 'description');

            if ($article->title && $article->text && $article->description) {

                $uri = Arr::get($_POST, 'uri');
                $alias = Model_Alias::generateUri( $uri );

                if ($article_id) {
                    $article->uri = Model_Alias::updateAlias($article->uri, $alias, Model_Uri::ARTICLE, $article_id);
                    $article->dt_update = date('Y-m-d H:i:s');
                    $article->update();

                } else {
                    $article->user_id = $this->user->id;
                    $insertedId = $article->insert();
                    $article->uri = Model_Alias::addAlias($alias, Model_Uri::ARTICLE, $insertedId);
                }

                // Если поле uri пустое, то редиректить на обычный роут /article/id
                $redirect = ($uri) ? $article->uri : '/article/' . $article->id;
                $this->redirect( $redirect );

            } else {
                $this->view['error'] = true;
            }
        }

        $this->view['article'] = $article;
        $this->template->content = View::factory('templates/articles/create', $this->view);
    }


    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id') ?: $this->request->query('id');

        if (!empty($article_id) && !empty($user_id)) {
            Model_Article::get($article_id)->remove($user_id);
        }

        $this->redirect('/admin/articles');
    }

}
