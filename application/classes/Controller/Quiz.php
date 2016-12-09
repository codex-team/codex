<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Quiz extends Controller_Base_preDispatch
{
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            throw new HTTP_Exception_403();
    }

    public function action_new()
    {
        if (!Security::check($this->request->post('csrf_token'))) {
            $this->template->content = View::factory('templates/quiz/new', $this->view);
            return;
        }

        $arr = array(
            'name' => $this->request->post('quiz.name'),
            'description' => $this->request->post('quiz.description'),
            'questions' => array()
        );

        if (!Arr::get($arr, 'name')) {
            $this->template->content = View::factory('templates/quiz/new', $this->view);
            return;
        }

        for ($number = 1; $number <= $this->request->post('questions_length'); $number++) {
            $arr['questions'][$number]['heading'] = $this->request->post('question_' . $number . '_heading');
            $arr['questions'][$number]['body'] = $this->request->post('question_' . $number . '_body');
            $arr['questions'][$number]['ans_1'] = $this->request->post('question_' . $number . '_ans_1');
            $arr['questions'][$number]['ans_2'] = $this->request->post('question_' . $number . '_ans_2');
            $arr['questions'][$number]['ans_3'] = $this->request->post('question_' . $number . '_ans_3');
            $arr['questions'][$number]['correct'] = $this->request->post('question_' . $number . '_correct');

            if (!Arr::get($arr['questions'][$number], 'heading') ||
                !Arr::get($arr['questions'][$number], 'ans_1') ||
                !Arr::get($arr['questions'][$number], 'ans_2') ||
                !Arr::get($arr['questions'][$number], 'ans_3') ||
                !Arr::get($arr['questions'][$number], 'correct')) {
                    $this->template->content = View::factory('templates/quiz/new', $this->view);
                    return;
                }
        }

        $model = new Model_Quiz();
        $model->saveFromArray($arr);

        $this->response->body('OK');
    }
}
