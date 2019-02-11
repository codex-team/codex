<?php defined('SYSPATH') or die('No direct script access.');

use EditorJS\EditorJS;
use EditorJS\EditorJSException;
use Opengraph\Meta;

class Controller_Articles_Index extends Controller_Base_preDispatch
{
    public function action_showAll()
    {
        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        /**
         * Clear cache hook
         */
        $needClearCache = Arr::get($_GET, 'clear') == 1;

        $this->view["feed_items"] = $this->getFeed();

        $this->template->content = View::factory('templates/articles/list_wrapper', $this->view);
    }

    public function action_show()
    {
        $articleId = $this->request->param('id') ?: $this->request->query('id');
        $isAlias = $this->request->query('id');

        if (!empty($articleId)) {
            $viewArticle = Model_Article::get($articleId);
            if ($viewArticle->uri && !$isAlias) {
                $this->redirect($viewArticle->uri);
            }
        }

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

        if ($article->id == 0 || $article->is_removed) {
            throw new HTTP_Exception_404();
        }

        /**
         * Array with rendered blocks
         */
        $article->blocks = array();

        if ($article->text) {
            /**
             * If blocks were rendered correctly, set article's blocks property
             */
            try {
                $article->blocks = $this->drawArticleBlocks($article->text);
            } catch (Exception $e) {
                \Hawk\HawkCatcher::catchException($e);
            }

        }

        if ($article->quiz_id) {
            $quiz = new Model_Quiz($article->quiz_id);
            $this->view['quiz'] = $quiz;
        }

        $this->stats->hit(Model_Stats::ARTICLE, $articleId);

        $this->view["article"]         = $article;

        $this->view["popularArticles"] = Model_Article::getPopularArticles($articleId);

        $coauthorship                  = new Model_Coauthors($article->id);
        $this->view["coauthor"]        = Model_User::get($coauthorship->user_id);

        /**
         * Do not index this article if it isn't published
         */
        if (!$article->is_published) {
            $this->nofollow = true;
        }

        /**
         * Check if user can edit an article
         * Pass article uri to articleEditLink variable
         * used in header template for Edit link href
         */
        if ($this->user->isAdmin) {
            $articleUri = $article->uri ? : "article/" . $article->id;
            $this->template->articleEditLink = "/" . $articleUri . "/edit";
        }

        /**
         * If this article is not on the user's site language then change lang
         */
        if (LANG !== $article->lang) {
            Internationalization::instance()->setLang($article->lang);
        }

        $this->title = $article->title;
        $this->description = $article->description;

        $this->meta[] = new Meta('vk:image', sprintf('%s/cover/vk/article/%d/%d/cover.jpg', Model_Methods::getDomainAndProtocol(), $article->id, strtotime($article->dt_update)));
        $this->meta[] = new Meta('twitter:image', sprintf('%s/cover/tw/article/%d/%d/cover.jpg', Model_Methods::getDomainAndProtocol(), $article->id, strtotime($article->dt_update)));

        $this->meta[] = new Meta('og:image', sprintf('%s/cover/fb/article/%d/%d/cover.jpg', Model_Methods::getDomainAndProtocol(), $article->id, strtotime($article->dt_update)));
        $this->meta[] = new Meta('og:image:width', 600);
        $this->meta[] = new Meta('og:image:height', 315);

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    /**
     * Get feed items with coauthor value
     * @return Model_Article[] || Model_Courses[]
     */
    public function getFeed()
    {
        $cacheKey = LANG . ':articles-feed';
        $cached = $this->memcache->get($cacheKey);

        if ($cached) {
            return $cached;
        }

        /**
         * Prepare Feed model
         */
        $feed = new Model_Feed_Articles();

        /**
         * Get articles and courses feed items
         */
        $feed_items  = $feed->get();

        /**
         * List of published feed items ids
         */
        $published_feed_items_ids = array();

        /**
         * Items to be removed from articles list
         */
        $items_to_be_deleted = array();

        foreach ($feed_items as $index => $feed_item) {
            $coauthorship        = new Model_Coauthors($feed_item->id);
            $feed_item->coauthor = Model_User::get($coauthorship->user_id);

            /**
             * Fill up list of available feed items
             */
            array_push($published_feed_items_ids, $feed_item->id);

            /**
             * If article was linked to another one and it's lang is not equal
             * client's lang then remove this article from feed array
             */
            if (!empty($feed_item->linked_article) && $feed_item->lang != LANG) {
                $items_to_be_deleted[$index] = $feed_item;
            }

        }

        /**
         * Remove copies of articles if eng and rus version are available
         */
        foreach ($items_to_be_deleted as $index => $item_to_be_deleted) {
            if (!empty($item_to_be_deleted->linked_article) && in_array($item_to_be_deleted->linked_article, $published_feed_items_ids)) {
                unset($feed_items[$index]);
            }
        }

        $this->memcache->set($cacheKey, $feed_items);

        return $feed_items;
    }

    /**
     * Renders template for each block
     * @param string $content - json encoded data
     * @return array - rendered template blocks with Editor data
     * @throws EditorJSException - EditorJS errors
     * @throws Exceptions_ConfigMissedException - Failed to get EditorJS config data
     * @throws Kohana_Exception
     */
    private function drawArticleBlocks($content)
    {
        $editor = new EditorJS($content, Model_Article::getEditorConfig());
        $blocks = $editor->getBlocks();

        $renderedBlocks = array();

        /**
         * Using PHP renderer for Articles
         */
        for ($i = 0; $i < count($blocks); $i++) {
            $renderedBlocks[] = View::factory('templates/editor/plugins/' . $blocks[$i]['type'], array(
                'block' => (object) $blocks[$i]['data']
            ))->render();
        }

        return $renderedBlocks;
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
        $position = 0;

        foreach ($course_articles as $articles) {
            $articleList[] = Model_Article::get($articles->id);

            if ($articles->id == $articleId) {
                $position = $counter;
            }

            $counter ++;
        }

        /**
         * We know the position of this article in course.
         * If next or previous article exists, then we send it to view
         */
        if ($position + 1 < count($course_articles)) {
            $nextArticleId = $course_articles[$position + 1]->id;
            $nextArticle = Model_Article::get($nextArticleId);

            $this->view["nextArticle"] = $nextArticle;
        }

        if ($position - 1 >= 0) {
            $previousArticleId = $course_articles[$position - 1]->id;
            $previousArticle = Model_Article::get($previousArticleId);

            $this->view["previousArticle"] = $previousArticle;
        }

        $this->view["course"] = $course;
        $this->view["articlesFromCourse"] = $articleList;
    }
}
