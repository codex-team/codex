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
        }

        $model = array(
            'name' => $this->request->post('quiz.name'),
            'description' => $this->request->post('quiz.description'),
            'questions' => array()
        );

        for (var $number = 1; $number <= $this->request->post('questions_length'); $number++) {
            $model['questions']['heading'] = $this->request->post('question_' . $number . '_heading');
            $model['questions']['body'] = $this->request->post('question_' . $number . '_body');
            $model['questions']['ans_1'] = $this->request->post('question_' . $number . '_ans_1');
            $model['questions']['ans_2'] = $this->request->post('question_' . $number . '_ans_2');
            $model['questions']['ans_3'] = $this->request->post('question_' . $number . '_ans_3');
            $model['questions']['correct'] = $this->request->post('question_' . $number . '_correct');
        }

        Model_Quiz::saveFromJson($model);

        $this->response->body('OK');
    }
}
