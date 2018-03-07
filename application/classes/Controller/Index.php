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
        $this->view['recentArticles'] = $this->getRecentArticles();

        $this->title = 'CodeX Team';
        $this->description = 'Club of web-development, design and marketing. We build team learning how to build full-valued projects on the world market.';
        $this->template->content = View::factory('templates/index/index', $this->view);
    }

    /**
     * Prepare recent articles list, add coauthor if exists
     * @return Model_Article[]
     */
    public function getRecentArticles()
    {
        $recentArticlesFeed = new Model_Feed_RecentArticles();
        $recentArticles = $recentArticlesFeed->get();
        $recent_articles = array();

        if (!empty($recentArticles)) {
            $recent_articles = Model_Article::getSome($recentArticles);
            foreach ($recent_articles as $recent_article) {
                $recent_article->coauthorship = new Model_Coauthors($recent_article->id);
                $recent_article->coauthor = Model_User::get($recent_article->coauthorship->user_id);
            }
        }
        return $recent_articles;
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
