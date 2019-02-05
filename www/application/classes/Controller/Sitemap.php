<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Sitemap extends Controller_Base_preDispatch
{
    protected $cacheKey = 'sitemap';

    public function before()
    {
        parent::before();
        $this->auto_render = false;
    }

    public function action_sitemap()
    {
        $this->response->headers('Content-Type', 'text/xml');
        $xmlResponse = $this->generate_sitemap();
        $this->response->body($xmlResponse);
    }

    /**
     * Generate Sitemap with users and articles data
     */
    public function generate_sitemap()
    {
        $cached = $this->memcache->get($this->cacheKey);

        if ($cached) {
            return $cached;
        }

        /**
         * Create Sitemap instance
         */
        $sitemap = new Model_Sitemap();

        /**
         * Get users and articles
         */
        $users = Model_User::getAll();
        $articles = Model_Article::getActiveArticles();

        $domain_and_protocol = Model_Methods::getDomainAndProtocol();

        $sitemapItems = array();

        /**
         * Gather entities' urls
         */
        foreach ($users as $user) {
            array_push($sitemapItems, $url = $user->uri ? $user->uri : 'user/' . $user->id);
        }

        foreach ($articles as $article) {
            array_push($sitemapItems, $url = $article->uri ? $article->uri : 'article/' . $article->id);
        }

        /**
         * Fill Sitemap model
         */
        foreach ($sitemapItems as $url) {
            $sitemap->add($domain_and_protocol . '/' . $url);
        }

        $result = $sitemap->draw($sitemapItems);

        $this->memcache->set($this->cacheKey, $result);

        return $result;
    }
}
