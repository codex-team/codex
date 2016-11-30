<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Quiz extends Controller_Base_preDispatch
{
    public function action_new()
    {
        //if (/* Request user have permission to create quizzes */) {
            $this->title = 'Создание теста';

            // Рендерит шаблон создания теста.
            $this->template->content = View::factory('templates/quiz/new', $this->view);
        /*} else {
            $this->response = Response::factory()->status(403);
        }*/
    }


    public function action_save()
    {
        if (Security::check('csrf_token')) {
            $quiz = Model_Quiz::save($this->request->post());

            if ($quiz != -1) {
                $this->template->content = View::factory(
                    'templates/quiz/save',
                    ['status' => 'Тест успешно создан']
                );
            } else {
                $this->template->content = View::factory(
                    'templates/quiz/save',
                    ['status' => 'При создании теста произошла ошибка']
                );
            }
        } else {
            $this->template->content = View::factory(
                'templates/quiz/save',
                ['status' => 'Неверный токен CSRF']
            );
        }
    }
}
