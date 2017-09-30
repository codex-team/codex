<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Index extends Controller_Base_preDispatch
{

    /** Action for index page */
    public function action_index()
    {
        /** New year landing */
        if (Security::check(Arr::get($_POST, 'csrf'))) {
            $this->NewYearRequestSubmitted();

            /** Refresh CSRF token */
            Security::token(true);
        }

        // $this->view['ny_user_requests'] = $this->user->getUserRequest();

        /**
        * Select best developers
        */
        $modelUser = new Model_User();

        $developersList = new Model_Feed_Developers();

        $bestDevelopersIds = $developersList->get();

        $this->view['bestDevelopers'] = $modelUser->getUsersByIds($bestDevelopersIds);


        $this->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);
    }

    /** Action for html-page preview for designers */
    public function action_designPreview()
    {
        $template = $this->request->param('page');

        $this->auto_render = false;
        $this->response->body(View::factory('templates/design/' . $template)->render());
    }

    /**
    * Handles New-Year landing form with designers blanks
    */
    public function NewYearRequestSubmitted()
    {
        $this->view['savingResult'] = false;
        $this->view['errorMessage'] = 'Что-то пошло не так. Повторите попытку позднее';

        $skills = trim(Arr::get($_POST, 'skills'));
        $wishes = trim(Arr::get($_POST, 'wishes'));

        if (!$this->user->id) {
            $this->view['errorMessage'] = 'Авторизуйтесь, чтобы мы могли с вами связаться';
            return;
        }

        if (!$skills) {
            $this->view['errorMessage'] = 'Напишите пару слов о себе';
            return;
        }

        $this->view['savingResult'] = $this->user->saveJoinRequest($skills, $wishes);
    }
}
