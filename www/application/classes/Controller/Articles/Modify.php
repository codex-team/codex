<?php defined('SYSPATH') or die('No direct script access.');

use \EditorJS\EditorJS;
use \EditorJS\EditorJSException;

class Controller_Articles_Modify extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /article/add, /article/<article_id>/edit
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN))) {
            throw new HTTP_Exception_403();
        }
    }

    /**
     * Show article edit/create page
     */
    public function action_edit()
    {
        /*
        * Редактирование через Алиас
        * Здесь сперва запрос получает Controller_Uri, которая будет передавать id сущности через query('id')
        */
        if ($article_id = $this->request->query('id') ?: $this->request->param('id')) {
            $article = Model_Article::get($article_id, true);
        } else {
            $article = new Model_Article();
        }

        $feed = new Model_Feed_Articles($article::FEED_PREFIX);

        if ($article->is_published && !$article->dt_publish) {
            $article->dt_publish = date('Y-m-d H:i:s');
        } elseif (!$article->is_published) {
            $article->dt_publish = null;
        }

        $this->view['current_user']       = $this->user;
        $this->view['article']            = $article;
        $this->view['linked_articles']    = Model_Article::getActiveArticles();
        $this->view['languages']          = ['ru', 'en'];
        $this->view['courses']            = Model_Courses::getActiveCoursesNames();
        $this->view['coauthors']          = Model_User::getAll();

        $coauthorship                     = new Model_Coauthors($article->id);
        $this->view["selected_coauthor"]  = $coauthorship->user_id;

        $this->view['selected_courses']   = Model_Courses::getCoursesByArticleId($article);
        $this->view['topFeed']            = $feed->get(5);
        $this->view['quizzes']            = Model_Quiz::getTitles();

        $this->template->content = View::factory('templates/articles/create', $this->view);
    }

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        /*
         * редактирование происходит напрямую из роута вида: <controller>/<action>/<id>
         * так как срабатывает обычный роут, то при отправке формы передается переменная contest_id.
         * Форма отправляет POST запрос
         */
        if (!$this->request->is_ajax()) {
            $this->sendAjaxResponse(array(
                'message' => 'Request is not ajax',
                'success' => 0
            ));
            return;
        }

        $article_id = Arr::get($_POST, 'article_id');
        $article = Model_Article::get($article_id, true);

        $feed = new Model_Feed_Articles($article::FEED_PREFIX);

        /*
         * Articles Title.
         */
        if (!Security::check($csrfToken)) {
            $this->sendAjaxResponse(array('message' => 'CSRF token invalid. Please refresh the page.', 'success' => 0));
            return;
        }

        $pageContent = Arr::get($_POST, 'article_text', '');

        try {
            $editor = new EditorJS($pageContent, Model_Article::getEditorConfig());
        } catch (Exception $e) {
            \Hawk\HawkCatcher::catchException($e);
            $this->sendAjaxResponse(array('message' => 'Fatal Error. Please refresh the page.', 'success' => 0));
            return;
        }

        $article->lang         = Arr::get($_POST, 'lang');
        $article->cover        = Arr::get($_POST, 'cover');
        $article->is_big_cover = (int) Arr::get($_POST, 'is_big_cover', 0);
        $article->title        = Arr::get($_POST, 'title');
        $article->description  = Arr::get($_POST, 'description');
        $article->text         = json_encode(["blocks" => $editor->getBlocks()]);

        $article->is_published = (int) Arr::get($_POST, 'is_published', 0);
        $article->marked       = (int) Arr::get($_POST, 'marked', 0);
        $article->quiz_id      = Arr::get($_POST, 'quiz_id');
        $courses_ids           = Arr::get($_POST, 'courses_ids', 0);

        /**
         * If Article is published, add `dt_publish` value, otherwise default is null
         */
        if ($article->is_published && !$article->dt_publish) {
            $article->dt_publish = date('Y-m-d H:i:s');
        } elseif (!$article->is_published) {
            $article->dt_publish = null;
        }

        /**
         * Link only if this article exists
         */
        if ($article->id) {
            /** Get value for 'linked_article' field */
            $linked_article_id = Arr::get($_POST, 'linked_article', null);

            /** Check if we need to relink articles */
            if ($article->linked_article != $linked_article_id) {
                $articleLinkingResult = $article->linkWithArticle($linked_article_id);

                if (!$articleLinkingResult) {
                    $this->sendAjaxResponse(array('message' => 'You can\'t link already linked article', 'success' => 0));
                    return;
                }
            }
        }

        /**
         * @var string $item_below_key
         * Ключ элемента в фиде, над которым нужно поставить данную статью ('[article|course]:<id>')
         * */
        $item_below_key = Arr::get($_POST, 'item_below_key', 0);

        if (!$article->text) {
            $this->sendAjaxResponse(array('message' => 'Please fill the body.', 'success' => 0));
            return;
        }

        if (!$article->title) {
            $this->sendAjaxResponse(array('message' => 'Please fill the title.', 'success' => 0));
            return;
        }

        if (!$article->description) {
            $this->sendAjaxResponse(array('message' => 'Please fill the description.', 'success' => 0));
            return;
        }

        $uri = Arr::get($_POST, 'uri');
        $alias = Model_Aliases::generateUri($uri);

        if ($article_id) {
            $article->uri = Model_Aliases::updateAlias($article->uri, $alias, Aliases_Controller::ARTICLE, $article_id);
            $article->dt_update = date('Y-m-d H:i:s');
            $article->update();
        } else {
            $article->user_id = $this->user->id;
            $insertedId = $article->insert();
            $article->uri = Model_Aliases::addAlias($alias, Aliases_Controller::ARTICLE, $insertedId);
            // If article is published right after creation set 'dt_publish' immediately
            $article->dt_publish = $article->is_published ? date('Y-m-d H:i:s') : null;
            $article->update();
        }

        $articleCoauthor = Arr::get($_POST, 'coauthor');

        /**
         * Create coauthorship relation article_id : user_id
         */
        $coauthorship = new Model_Coauthors($article->id, $articleCoauthor);

        /**
         * If coauthorship relation doesn't exist in database - create it
         * Otherwise, update it
         */
        if (!empty($articleCoauthor) && $articleCoauthor != $article->user_id) {

            if ($coauthorship->exists()) {
                $coauthorship->update();
            } else {
                $coauthorship->add();
            }

        /** Remove co-author */
        } elseif (empty($articleCoauthor) && $coauthorship->user_id) {
            $coauthorship->remove();
        }

        if (!$courses_ids) {
            Model_Courses::deleteArticles($article->id);

            if ($article->is_published && !$article->is_removed) {
                $feed->add($article->id, $article->dt_publish);

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

                if ($courses_to_delete) {
                    Model_Courses::deleteArticles($article->id, $courses_to_delete);
                }

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

        $isRecent = (int) Arr::get($_POST, 'is_recent', 0);
        $recentArticlesFeed = new Model_Feed_RecentArticles();
        if ($isRecent) {
            $recentArticlesFeed->add($article->id, true);
        } else {
            $recentArticlesFeed->remove($article->id);
        }

        // Очистка кэша фидов
        $this->memcache->delete('en:articles-feed');
        $this->memcache->delete('ru:articles-feed');

        // Если поле uri пустое, то редиректить на обычный роут /article/id
        $redirect = ($uri) ? '/' . $article->uri : '/article/' . $article->id;

        $this->sendAjaxResponse(array(
            'redirect' => $redirect,
            'success' => 1
        ));
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id') ?: $this->request->query('id');

        if (!empty($article_id) && !empty($user_id)) {
            $article = Model_Article::get($article_id);
            $article->remove($user_id);

            /**
             * Delete alias
             */
            if ($article->uri) {
                $alias = Model_Aliases::getAlias($article->uri);
                Model_Aliases::deleteAlias($alias->hash);
            }

            $feed = new Model_Feed_Articles($article::FEED_PREFIX);
            $feed->remove($article->id);
        }

        $this->redirect('/admin/articles');
    }

    /**
     * @param array $response - response which should be returned after attempt to send form
     * $response = [
     *  'redirect' => (string|null) uri of article's redirect only in case of successful save
     *  'success'  => (int) success code, can be 0 or 1
     *  'message'  => (string|null) error message only in case of failed save
     * ]
     */
    private function sendAjaxResponse($response)
    {
        $this->auto_render = false;
        $this->response->body(json_encode($response));
    }
}
