<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Quiz extends Controller_Base_preDispatch
{
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            throw new HTTP_Exception_403();
    }

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf_token');

        $quiz_id = $this->request->param('id', 0);

        $quiz = new Model_Quiz($quiz_id);

        if (Security::check($csrfToken)) {

            $quiz->title        = Arr::get($_POST, 'title');
            $quiz->description  = Arr::get($_POST, 'description');
            $quiz->quiz_data    = Arr::get($_POST, 'quiz_data');

            if ($quiz->title && $quiz->quiz_data && $quiz->description) {
                if ($quiz_id) {

                    $quiz->dt_update = date('Y-m-d H:i:s');
                    $quiz->update();

                } else {

                    $quiz->insert();

                }

            } else {
                $this->view['error'] = true;
            }

            $this->redirect( '/' );
        }

        $this->view['quiz'] = $quiz;
        $this->template->content = View::factory('templates/quiz/form', $this->view);
    }
}
