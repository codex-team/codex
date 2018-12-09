<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Admin extends Controller_Base_preDispatch
{
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN))) {
            throw new HTTP_Exception_403();
        }
    }

    public function action_index()
    {
        $category = $this->request->param('category');
        $pageContent = '';

        switch ($category) {

            case 'feed':
                $pageContent = self::feed();
                break;
            case 'articles':
                $pageContent = self::articles();
                break;
            case 'users':
                $pageContent = self::users();
                break;
            case 'contests':
                $pageContent = self::contests();
                break;
            case 'courses':
                $pageContent = self::courses();
                break;
            case 'requests':
                $pageContent = self::requests();
                break;
            default:
                $pageContent = View::factory("templates/admin/dashboard");
                break;
        }

        $this->template->content = View::factory("templates/admin/wrapper", array("content" => $pageContent));
    }

    public function action_edit()
    {
        $article_id = $this->request->param('article_id');

        $article = Model_Article::get($article_id);

        $this->view["article"] = $article;

//        $this->view["editor"] = View::factory('templates/articles/editor', array("storedNodes" => $article->text));
        $content                    = View::factory('templates/articles/create', $this->view);

        $this->template->content    = View::factory("templates/admin/wrapper",
            array("active" => "edit", "content" => $content));
    }

    public function articles()
    {
        $articles = Model_Article::getAllArticles();

        foreach ($articles as $article) {
            $article->views = $this->stats->get(Model_Stats::ARTICLE, $article->id);
        }

        $this->view["articles"] = $articles;

        return View::factory('templates/admin/articles/list', $this->view);
    }

    public function users()
    {
        $bestDevelopers = new Model_Feed_Developers();

        $this->view["users"]    = Model_User::getAll();
        $this->view["bestDevs"] = $bestDevelopers->get();

        return View::factory('templates/admin/users/list', $this->view);
    }

    public function feed()
    {
        if (!$this->request->is_ajax()) {
            $feed = new Model_Feed_Articles();

            $this->view["feed"] = $feed->get();
            $this->view["mode"] = !empty($_GET['mode'])? $_GET['mode'] : 'list';

            return View::factory('templates/admin/articles/feed', $this->view);
        }


        $json_data = json_decode(file_get_contents(
            'php://input'
        ));

        $feed = new Model_Feed_Articles($json_data->item_type);

        $feed->putAbove($json_data->item_id, $json_data->item_below_value);

        $this->auto_render = false;
    }

    public function contests()
    {
        $contests = Model_Contests::getAllContests();

        foreach ($contests as $contest) {
            $contest->winner = Model_User::get($contest->winner);
        }

        $this->view["contests"] = $contests;

        return View::factory('templates/admin/contests/list', $this->view);
    }

    public function courses()
    {
        $courses = Model_Courses::getAllCourses();

        $this->view["courses"] = $courses;

        return View::factory('templates/admin/courses/list', $this->view);
    }

    public function requests()
    {
        $requests = Model_User::getRequestsList(true);

        $request_list = array();

        foreach ($requests as $request) {
            if ($request['uid']) {
                $request['user'] = Model_User::get((int)$request['uid']);
            } else {
                $request['user'] = new Model_User();
                $request['user']->name = $request['name'];
            }

            $request_list[] = $request;
        }

        $this->view["requests"] = $request_list;

        return View::factory('templates/admin/requests/list', $this->view);
    }

    public function action_developer()
    {
        if (!$this->request->is_ajax()) {
            return;
        }

        $this->auto_render = false;

        $developersList = new Model_Feed_Developers();

        $is_best = Arr::get($_GET, 'value');
        $id      = Arr::get($_GET, 'id');

        if ($is_best) {
            $developersList->add($id, time());
        } else {
            $developersList->remove($id);
        }
    }

    /**
     * Scripts part
     */

    public function action_scripts()
    {
        $category = $this->request->param('script');

        $result = '';

        switch ($category) {
            case 'resetArticlesTimeline':
                $result = self::scripts_resetArticlesTimeline();
                break;
            case 'resetUsersFeeds':
                $result = $this->scripts_resetUsersFeeds();
                break;
            default:
                break;
        }

        $this->view['result'] = $result;
        $content = View::factory('templates/admin/scripts/list', $this->view);
        $this->template->content = View::factory("templates/admin/wrapper", array("content" => $content));
    }

    public function scripts_resetArticlesTimeline()
    {
        $articles = Model_Article::getActiveArticles();

        /** rebuld array*/
        foreach ($articles as $key => $value) {
            $article = array(
                'id' => $articles[$key]->id,
                'dt_create' => $articles[$key]->dt_publish,
            );
            $articles[$key] = $article;
        }

        // #TODO add to $feed array with courses later
        $feed = new Model_Feed_Articles('article');
        $feed->clear();
        $feed->init($articles);

        return 'Articles timeline was successfully updated';
    }

    /**
     * Clears users feeds and fills them with active articles
     */
    public function scripts_resetUsersFeeds()
    {
        $this->scripts_clearUsersFeeds();
        $this->scripts_fillUsersFeeds();

        return 'Users feeds were successfully reseted';
    }

    /**
     * Clear users feeds
     */
    public function scripts_clearUsersFeeds()
    {
        $authors_ids = DB::query(Database::SELECT, 'SELECT DISTINCT(`user_id`) FROM `Articles`')->execute()->as_array();

        $coauthors_ids = DB::query(Database::SELECT, 'SELECT DISTINCT(`user_id`) FROM `Coauthors`')->execute()->as_array();

        $unique_users_ids = array_unique(array_merge($authors_ids, $coauthors_ids), SORT_REGULAR);

        foreach ($unique_users_ids as $user_id) {
            $userFeedKey = Model_User::composeFeedKey($user_id);
            $userFeed = new Model_Feed_Custom($userFeedKey, Model_Article::FEED_PREFIX);
            $userFeed->clear();
        }
    }

    /**
     * Fill users feeds with active articles
     */
    public function scripts_fillUsersFeeds()
    {
        $articles = Model_Article::getActiveArticles();
        foreach ($articles as $article) {
            $authorFeedKey = Model_User::composeFeedKey($article->user_id);
            $authorFeed = new Model_Feed_Custom($authorFeedKey, Model_Article::FEED_PREFIX);
            $authorFeed->add($article->id, $article->dt_publish);

            $coauthorship = new Model_Coauthors($article->id);

            if ($coauthorship->user_id) {
                $coauthorFeedKey = Model_User::composeFeedKey($coauthorship->user_id);
                $coauthorFeed = new Model_Feed_Custom($coauthorFeedKey, Model_Article::FEED_PREFIX);
                $coauthorFeed->add($article->id, $article->dt_publish);
            }
        }
    }
}
