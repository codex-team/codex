<?php

class Controller_Sitemap extends Controller_Base_preDispatch
{
    public function before()
    {
        parent::before();
        $this->auto_render = false;
    }

    public function action_sitemap()
    {
        $this->response->headers('Content-Type', 'text/xml');
        $this->response->body($this->generate_sitemap());
    }

    /**
     * Fill Sitemap with users and articles data
     */
    public function fill_sitemap_data()
    {
        /**
         * Create Sitemap instance
         */
        $sitemap = new Model_Sitemap();

        /**
         * Get users and articles
         */
        $users = Model_User::getAll();
        $articles = Model_Article::getActiveArticles();

        $items_urls = [];

        /**
         * Compose entities' urls
         */
        foreach ($users as $user) {
            $url = $user->uri ? $user->uri : 'user/' . $user->id;
            array_push($items_urls, $url);
        }

        foreach ($articles as $article) {
            $url = $article->uri ? $article->uri : 'article/' . $article->id;
            array_push($items_urls, $url);
        }

        $domain_and_protocol = Model_Methods::getDomainAndProtocol();

        /**
         * Fill Sitemap model
         */
        foreach ($items_urls as $url) {
            $sitemap_item = $domain_and_protocol . '/' . $url;
            $sitemap->add($sitemap_item);
        }

        return $sitemap;
    }

    /**
     * Generate Sitemap XML from model data
     * @return mixed Sitemap XML
     */
    public function generate_sitemap()
    {
        $cacheKey ='sitemap';
        $cached = $this->memcache->get($cacheKey);

        if ($cached) {
            return $cached;
        }

        $sitemap = $this->fill_sitemap_data();

        $xml = new SimpleXMLElement('<xml/>');

        foreach ($sitemap->items as $item) {
            $track = $xml->addChild('url');
            $track->addChild('loc', $item);
        }

        Header('Content-type: text/xml');

        $this->memcache->set($cacheKey, $xml->asXML());

        return $xml->asXML();
    }
}
