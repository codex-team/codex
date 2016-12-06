<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Modify extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /article/add, /article/<article_id>/edit
     */
    public function before()
    {
        parent::before();
        /*if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            $this->redirect('/');
    */}

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        $feed = new Model_Feed();

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
            $article->json         = Arr::get($_POST, 'article_json', '');
            $article->is_published = Arr::get($_POST, 'is_published') ? 1 : 0;
            $article->marked       = Arr::get($_POST, 'marked') ? 1 : 0;
            $article->order        = (int) Arr::get($_POST, 'order');
            $article->description  = Arr::get($_POST, 'description');
            $courses_id            = Arr::get($_POST, 'courses_id', 0);

            /**
             * @var string $item_below_key
             * Ключ элемента в фиде, над которым нужно поставить данную статью ('[article|course]:<id>')
             * */
            $item_below_key         = Arr::get($_POST, 'item_below_key', 0);

            if ($article->title && $article->json && $article->description) {

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
                    $article->update();
                }

                if (!$courses_id) {

                    Model_Courses::deleteArticles($article->id);
                    $feed->add($article);

                    //Ставим статью в переданное место в фиде, если это было указано
                    if ($item_below_key) {
                        list($ib_type, $ib_id) = explode(':', $item_below_key);

                        switch ($ib_type) {
                            case 'article':
                                $feed->putAbove($article, Model_Article::get($ib_id));
                                break;
                            case 'course':
                                $feed->putAbove($article, Model_Courses::get($ib_id));
                                break;
                        }
                    }

                } else {

                    $current_courses = Model_Courses::getCurrentCoursesIds($article);

                    $courses_to_delete = array_diff($current_courses, $courses_id);
                    $courses_to_add = array_diff($courses_id, $current_courses);

                    Model_Courses::deleteArticles($article->id, $courses_to_delete);

                    foreach ($courses_to_add as $course_id) {
                        Model_Courses::addArticle($article->id, $course_id);
                    }

                    $feed->remove($article);
                }

                // Если поле uri пустое, то редиректить на обычный роут /article/id
                $redirect = ($uri) ? $article->uri : '/article/' . $article->id;
                $this->redirect( $redirect );

            } else {
                $this->view['error'] = true;
            }
        }

        $this->view['article']          = $article;
        $this->view['courses']          = Model_Courses::getActiveCoursesNames();
        $this->view['selected_courses'] = Model_Courses::getCurrentCoursesIds($article);
        $this->view['topFeed']          = $feed->get(5);

        $this->template->content = View::factory('templates/articles/create', $this->view);
    }


    public function action_delete()
    {
        $feed = new Model_Feed();

        $user_id = $this->user->id;
        $article_id = $this->request->param('article_id') ?: $this->request->query('id');

        if (!empty($article_id) && !empty($user_id)) {
            $article = Model_Article::get($article_id);
            $article->remove($user_id);

            $feed->remove($article);
        }

        $this->redirect('/admin/articles');
    }

}
