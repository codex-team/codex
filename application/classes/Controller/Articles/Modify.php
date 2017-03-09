<?php defined('SYSPATH') or die('No direct script access.');

use \CodexEditor\CodexEditor;

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
        if ($this->request->post()) {
            $article_id = Arr::get($_POST, 'article_id');
            $article = Model_Article::get($article_id, true);
        }
        /*
        * Редактирование через Алиас
        * Здесь сперва запрос получает Controller_Uri, которая будет передавать id сущности через query('id')
        */
        elseif ($article_id = $this->request->query('id') ?: $this->request->param('id')) {
            $article = Model_Article::get($article_id, true);
        } else {
            $article = new Model_Article();
        }

        $feed = new Model_Feed_Articles($article::FEED_PREFIX);

        /*
         * Articles Title.
         */
        if (!Security::check($csrfToken)) {
            goto theEnd;
        }

        $pageContent = Arr::get($_POST, 'article_json', '');

        try {

            $editor = new CodexEditor($pageContent);

        } catch (Kohana_Exception $e) {

            throw new Kohana_Exception($e->getMessage());

        }

        $article->title        = Arr::get($_POST, 'title');
        $article->json         = $editor->getData();
        $article->is_published = Arr::get($_POST, 'is_published') ? 1 : 0;
        $article->marked       = Arr::get($_POST, 'marked') ? 1 : 0;
        $article->description  = Arr::get($_POST, 'description');
        $article->quiz_id      = Arr::get($_POST, 'quiz_id');
        $courses_ids           = Arr::get($_POST, 'courses_ids', 0);

        /**
         * @var string $item_below_key
         * Ключ элемента в фиде, над которым нужно поставить данную статью ('[article|course]:<id>')
         * */
        $item_below_key = Arr::get($_POST, 'item_below_key', 0);

        if ( !$article->title ){
            $this->view['error'] = 'Не заполнен заголовок';
            goto theEnd;
        }

        if ( !$article->json ){
            $this->view['error'] = 'А где само тело статьи?';
            goto theEnd;
        }

        if ( !$article->description ){
            $this->view['error'] = 'Не заполнено описание. Это важное поле: опишите коротко, о чем пойдет речь в статье';
            goto theEnd;
        }


        $uri = Arr::get($_POST, 'uri');
        $alias = Model_Alias::generateUri($uri);

        if ($article_id) {
            $article->uri = Model_Alias::updateAlias($article->uri, $alias, Model_Uri::ARTICLE, $article_id);
            $article->dt_update = date('Y-m-d H:i:s');
            $article->update();
        } else {
            $article->user_id = $this->user->id;
            $insertedId = $article->insert();
            $article->uri = Model_Alias::addAlias($alias, Model_Uri::ARTICLE, $insertedId);
            $article->update();
        }

        if (!$courses_ids) {

            Model_Courses::deleteArticles($article->id);

            if ($article->is_published && !$article->is_removed) {
                $feed->add($article->id, $article->dt_create);

                //Ставим статью в переданное место в фиде, если это было указано
                if ($item_below_key) {
                    $feed->putAbove($article->id, $item_below_key);
                }
            } else {
                $feed->remove($article->id);
            }

        } else {

            $current_courses = Model_Courses::getCoursesByArticleId($article);

            if ($current_courses) {

                $courses_to_delete = array_diff($current_courses, $courses_ids);
                $courses_to_add = array_diff($courses_ids, $current_courses);

                Model_Courses::deleteArticles($article->id, $courses_to_delete);

                foreach ($courses_to_add as $course_id) {
                    Model_Courses::addArticle($article->id, $course_id);
                }

            } else {

                foreach ($courses_ids as $course_id) {
                    Model_Courses::addArticle($article->id, $course_id);
                }

            }

            $feed->remove($article->id);
        }

        // Если поле uri пустое, то редиректить на обычный роут /article/id
        $redirect = ($uri) ? $article->uri : '/article/' . $article->id;
        $this->redirect($redirect);

        theEnd:

        $this->view['article']          = $article;
        $this->view['courses']          = Model_Courses::getActiveCoursesNames();
        $this->view['selected_courses'] = Model_Courses::getCoursesByArticleId($article);
        $this->view['topFeed']          = $feed->get(5);
        $this->view['quizzes']          = Model_Quiz::getTitles();

        $this->template->content = View::factory('templates/articles/create', $this->view);
    }


    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id') ?: $this->request->query('id');

        if (!empty($article_id) && !empty($user_id)) {
            $article = Model_Article::get($article_id);
            $article->remove($user_id);

            $feed = new Model_Feed_Articles($article::FEED_PREFIX);
            $feed->remove($article->id);
        }

        $this->redirect('/admin/articles');
    }

}
