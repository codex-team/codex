<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Courses_Modify extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /course/add, /course/<course_id>/edit
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN))) {
            $this->redirect('/');
        }
    }

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        /*
         * редактирование происходит напрямую из роута вида: <controller>/<action>/<id>
         * так как срабатывает обычный роут, то при отправке формы передается переменная course_id.
         * Форма отправляет POST запрос
         */
        if ($this->request->post()) {
            $course_id = Arr::get($_POST, 'course_id');
            $course = Model_Courses::get($course_id, true);
        }
        /*
         * Редактирование через Алиас
         * Здесь сперва запрос получает Controller_Uri, которая будет передавать id сущности через query('id')
         */
        elseif ($course_id = $this->request->param('id') ?: $this->request->query('id')) {
            $course = Model_Courses::get($course_id);
        } else {
            $course = new Model_Courses();
        }

        $feed = new Model_Feed_Articles($course::FEED_PREFIX);

        if (Security::check($csrfToken)) {
            $course->title          = Arr::get($_POST, 'title');
            $course->text           = Arr::get($_POST, 'course_text');
            $course->cover          = Arr::get($_POST, 'cover');
            $course->is_big_cover   = (int) Arr::get($_POST, 'is_big_cover', 0);
            $course->description    = Arr::get($_POST, 'description');
            $course->marked         = Arr::get($_POST, 'marked', '0');
            $course->is_published   = Arr::get($_POST, 'is_published', '0');
            $course->is_removed     = Arr::get($_POST, 'is_removed', '0');
            $course->dt_close       = Arr::get($_POST, 'duration');
            $course->order          = Arr::get($_POST, 'order');
            $course->uri            = Arr::get($_POST, 'uri');

            /**
             * If Course is published, add `dt_publish` value, otherwise default is null
             */
            if ($course->is_published && !$course->dt_publish) {
                $course->dt_publish = date('Y-m-d H:i:s');
            } elseif (!$course->is_published) {
                $course->dt_publish = null;
            }

            /**
             * @var string $item_below_key
             * Ключ элемента в фиде, над которым нужно поставить данную статью ('[article|course]:<id>')
             * */
            $item_below_key         = Arr::get($_POST, 'item_below_key', 0);

            $uri = Arr::get($_POST, 'uri');
            $alias = Model_Aliases::generateUri($uri);

            if ($course->title && $course->text && $course->description) {
                if ($course_id) {
                    $course->dt_update = date('Y-m-d H:i:s');
                    $course->uri = Model_Aliases::updateAlias($course->uri, $alias, Aliases_Controller::COURSE, $course_id);
                    $course->update();
                } else {
                    $insertedId   = $course->insert();
                    $course->uri = Model_Aliases::addAlias($alias, Aliases_Controller::COURSE, $insertedId);
                    // If course is published right after creation set 'dt_publish' immediately
                    $course->dt_publish = $course->is_published ? date('Y-m-d H:i:s') : null;
                    $course->update();
                }

                if ($course->is_published && !$course->is_removed) {
                    //Добавляем курс в фид
                    $feed->add($course->id, $course->dt_create);

                    //Ставим курс в переданное место в фиде, если это было указано
                    if ($item_below_key) {
                        $feed->putAbove($course->id, $item_below_key);
                    }
                } else {
                    $feed->remove($course->id);
                }


                // Если поле uri пустое, то редиректить на обычный роут /course/id
                $redirect = ($uri) ? $course->uri : '/course/' . $course->id;
                $this->redirect($redirect);
            } else {
                $this->view['error'] = true;
            }
        }
        $this->view['course'] = $course;
        $this->view['topFeed'] = $feed->get(5);
        $this->template->content = View::factory('templates/courses/create', $this->view);
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $course_id = $this->request->param('course_id') ?: $this->request->query('id');

        if (!empty($course_id) && !empty($user_id)) {
            $course = Model_Courses::get($course_id);
            $course->remove();

            $feed = new Model_Feed_Articles($course::FEED_PREFIX);
            $feed->remove($course->id);
        }

        $this->redirect('/admin/courses');
    }
}
