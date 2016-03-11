<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Action extends Controller_Base_preDispatch
{

    public function action_add()
    {
        $user_id = $this->user->id;

        if (empty($user_id)) {
            $this->redirect('/');
        };

        $article_id = Arr::get($_POST, 'article_id');
        $article    = Model_Article::get($article_id);

        if ($article->user_id != $user_id && !$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            throw new HTTP_Exception_403();

        if (!$article_id || !$article)
            $article = new Model_Article();

        $article->title          = Arr::get($_POST,'title');
        $article->text           = html_entity_decode(str_replace('amp;', '', Arr::get($_POST,'text')));
        $article->is_published   = (Arr::get($_POST, 'is_published'))? 1 : 0;
//        $cover                   = Arr::get($_FILES,'cover');

        $errors = FALSE;
        $table_values = array();

        if ($article->title != '')       { $table_values['title'] = array('value' => $article->title); }
            else { $errors = TRUE; }
        if ($article->text != '')        { $table_values['text'] = array('value' => $article->text); }
            else { $errors = TRUE; }

/*       if (!Upload::valid($cover) or
           !Upload::not_empty($cover) or
           !Upload::type($cover, array('jpg', 'jpeg', 'png')) or
           !Upload::size($cover, '10M'))
       {
           $table_values['cover'] = TRUE;
           $errors = TRUE;
       }
*/

        if ($errors)
        {
            $this->template->content = View::factory('templates/articles/create', $this->view);
            return false;
        }

//      $article->cover = $this->methods->save_cover($cover);

        $article->user_id = $user_id;

        if ($article_id)
        {
            $article->update();
        }
        else
        {
            $article->insert();
        }

        $this->redirect('/article/' . $article->id);
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');
        $article = Model_Article::get($article_id);

        if ($article->author->id == $this->user->id){
            $this->view['article'] = $article;
            $this->template->content = View::factory('templates/articles/create', $this->view);
        } else {
            throw new HTTP_Exception_403();
        }
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

}
