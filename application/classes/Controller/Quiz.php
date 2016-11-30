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
            $quiz = Model_Quiz::save($this->request->get());

            $jsonResponse = json_encode([
                'id' => $quiz,
                'message' => 'Successfully created a quiz',
                'ru' => 'Тест успешно создан'
            ]);
        } else {
            $jsonResponse = json_encode([
                'message' => 'Invalid CSRF token',
                'ru' => 'Неверный токен CSRF'
            ]);
        }

        $this->auto_render = false;
        $this->is_ajax = true;
        $this->response->headers('Content-Type', 'application/json');
        $this->response->body($jsonResponse);
    }
}
