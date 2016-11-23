<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Test extends Controller_Base_preDispatch
{
    public function action_index()
    {
        $this->title = 'Тесты';

        $this->view['tests'] = Model_Test::getActiveTests();
        $this->template->content = View::factory('templates/test/index', $this->view);
    }

    public function action_create()
    {
        // Если метод GET:
        if ($this->request->method() == 'GET') {

            $this->title = 'Создание теста';

            // Рендерит шаблон создания теста.
            $this->template->content = View::factory('templates/test/create', $this->view);

        // Если метод POST:
        } elseif ($this->request->method() == 'POST') {
            try {
                // Извлекает тело запроса - JSON.
                $json = (array) json_decode($this->request->body());

                $test = new Model_Test();

                $test->name = $json['name'];
                $test->description = $json['description'];

                // Записывает тест в базу данных.
                $test = $test->insert();

                // Перезаписывает полное тело запроса данными только о вопросах.
                $json = (array) $json['questions'];

                // Для каждого вопроса в списке:
                for ($number = 0; $number < sizeof($json); $number++) {
                    $question = new Model_Question();

                    $json[$number] = (array) $json[$number];

                    $question->number = $number + 1;
                    $question->test_id = $test;
                    $question->heading = $json[$number]['heading'];
                    $question->body = $json[$number]['body'];
                    $question->ans_1 = $json[$number]['ans_1'];
                    $question->ans_2 = $json[$number]['ans_2'];
                    $question->ans_3 = $json[$number]['ans_3'];
                    $question->correct = $json[$number]['correct'];

                    // Записывает вопрос в базу данных.
                    $question->insert();
                }

                // Возвращает сообщение в случае успеха.
                $json = json_encode(['success' => 'Created a test with id ' . $test]);
            } catch (Exception $e) {
                // И в случае ошибки.
                $json = json_encode(['error' => 'Failed to create a test: ' . $e]);
            }

            $this->auto_render = false;
            $this->is_ajax = true;
            $this->response->headers('Content-Type', 'application/json');
            $this->response->body($json);
        }
    }
}

