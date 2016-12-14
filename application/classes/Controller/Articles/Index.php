<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAll()
    {
        $feed = new Model_Feed_Articles();

        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        /**
        * Clear cache hook
        */
        $needClearCache = Arr::get($_GET, 'clear') == 1;

        $this->view["feed_items"] = $feed->get();
        $this->template->content = View::factory('templates/articles/list_wrapper', $this->view);
    }

    public function action_show()
    {

        $articleId = $this->request->param('id') ?: $this->request->query('id');

        $this->view["id"] = $articleId;

        $needClearCache = Arr::get($_GET, 'clear');

        $article = Model_Article::get($articleId, $needClearCache);

        /**
         * get first course that article included in
         */
        $inCourse = Model_Courses::getCoursesByArticleId($article);
        $courseId = current($inCourse);

        if ($courseId) {
            $this->getArticlesFromCourse($articleId, $courseId);
        }

        if ($article->id == 0 || $article->is_removed)
            throw new HTTP_Exception_404();

        /**
         * @var $blocks - Array of JSON objects.
         * Each object contains:
         *  type - plugins type
         *  data - plugins content
         */
        $blocks = json_decode($article->json) ?: array();

        /**
         * Using PHP renderer for Articles
         */
        for($i = 0; $i < count($blocks); $i++)
        {
            $article->blocks[] = View::factory('templates/editor/plugins/' . $blocks[$i]->type, array('block' => $blocks[$i]->data))
                ->render();
        }
        $article->blocks = $article->blocks ?: array();
        $article->json   = $article->json ?: '';

        if ($article->quiz_id) {
            $quiz = new Model_Quiz($article->quiz_id);
            $this->view['quiz'] = $quiz;
        }

        $this->stats->hit(Model_Stats::ARTICLE, $articleId);

        $this->view["article"]         = $article;
        $this->view["popularArticles"] = Model_Article::getPopularArticles($articleId);

        $this->title = $article->title;
        $this->description = $article->description;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    /**
     * Finds current article position in course, get previous and next articles with article list
     * Returns to view
     *
     * @param $articleId - current article id
     * @param $courseId - current course Id
     */
    private function getArticlesFromCourse($articleId, $courseId)
    {
        /** Course information */
        $course = Model_Courses::get($courseId);

        /** getting all articles from course */
        $course_articles = Model_Courses::getArticles($courseId);

        /** $articleList - empty array. Needs to fill by article ids */
        $articleList = array();

        /**
         * search in array of article ids the position of current article
         */
        $counter = 0;
        foreach ($course_articles as $articles) {

            $articleList[] = Model_Article::get($articles['article_id']);

            if ($articles['article_id'] == $articleId) {
                $position = $counter;
            }

            $counter ++;
        }

        /**
         * We know the position of this article in course.
         * If next or previous article exists, then we send it to view
         */
        if ($position + 1 < count($course_articles)) {

            $nextArticleId = $course_articles[$position + 1]['article_id'];
            $nextArticle = Model_Article::get($nextArticleId);

            $this->view["nextArticle"] = $nextArticle;
        }

        if ($position - 1 >= 0) {

            $previousArticleId = $course_articles[$position - 1]['article_id'];
            $previousArticle = Model_Article::get($previousArticleId);

            $this->view["previousArticle"] = $previousArticle;
        }

        $this->view["course"] = $course;
        $this->view["articlesFromCourse"] = $articleList;
    }
}
