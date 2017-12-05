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

        /**
         * Get recent articles list
         */
        $recentArticlesFeed = new Model_Feed_RecentArticles();
        $recentArticles = $recentArticlesFeed->get();
        $this->view['recentArticles'] = Model_Article::getSome($recentArticles);


        $this->title = 'CodeX Team';
        $this->template->content = View::factory('templates/index/index', $this->view);
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
