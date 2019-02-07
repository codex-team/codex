<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Sitemap extends Controller_Base_preDispatch
{
    protected $cacheKey = 'sitemap';

    /**
     * Landing items to include
     */
    const landingUrls = array(
        'bot',
        'editor',
        'media',
        'special',
        'beauty-toolbar'
    );

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
        $fullKey = URL::base('https', TRUE) . ':' . $this->cacheKey;

        $cached = $this->memcache->get($fullKey);

        if ($cached) {
            return $cached;
        }

        /**
         * Create Sitemap instance
         */
        $sitemap = new Model_Sitemap();

        $domain_and_protocol = Model_Methods::getDomainAndProtocol();

        /**
         * Add landings
         */
        foreach (self::landingUrls as $item) {
            $sitemap->add([
                'uri' => $domain_and_protocol . '/' . $item
            ]);
        }

        /**
         * Get users and articles
         */
        $users = Model_User::getAll();
        $articles = Model_Article::getActiveArticles();

        /**
         * Add users
         */
        foreach ($users as $user) {
            $dtUpdate = $user->dt_update ? $user->dt_update : $user->dt_create;
            $itemUri = $user->uri ? $user->uri : 'user/' . $user->id;

            $sitemap->add([
                'uri' => $domain_and_protocol . '/' . $itemUri,
                'dt_update' => $dtUpdate
            ]);
        }

        /**
         * Add articles
         */
        foreach ($articles as $article) {
            $dtUpdate = $article->dt_update ? $article->dt_update : $article->dt_create;
            $itemUri = $user->uri ? $article->uri : 'article/' . $article->id;

            $sitemap->add([
                'uri' => $domain_and_protocol . '/' . $itemUri,
                'dt_update' => $dtUpdate
            ]);
        }

        $result = $sitemap->draw();

        $this->memcache->set($fullKey, $result);

        return $result;
    }
}
