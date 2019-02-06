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
        $xmlResponse = $this->generate_sitemap();

        $this->response->headers('Content-Type', 'text/xml');
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

        /**
         * Collect Sitemap data
         */
        foreach ($users as $user) {
            $dtUpdate = $user->dt_update ? $user->dt_update : $user->dt_create;
            $itemUri = $user->uri ? $user->uri : 'user/' . $user->id;

            $sitemap->add([
                'uri' => $domain_and_protocol . '/' . $itemUri,
                'dt_update' => $dtUpdate
            ]);
        }

        foreach ($articles as $article) {
            $dtUpdate = $article->dt_update ? $article->dt_update : $article->dt_create;
            $itemUri = $user->uri ? $article->uri : 'article/' . $article->id;

            $sitemap->add([
                'uri' => $domain_and_protocol . '/' . $itemUri,
                'dt_update' => $dtUpdate
            ]);
        }

        $result = $sitemap->draw();

        $this->memcache->set($this->cacheKey, $result);

        return $result;
    }
}
