<?php

class Model_Sitemap extends Model
{
    public $items = [];

    public function __construct()
    {
    }

    /**
     * @param $item_uri string Sitemap item uri
     */
    public function add($item_uri)
    {
        array_push($this->items, $item_uri);
    }

    /**
     * Generate sitemap.xml
     * @param array $sitemapItems
     * @type string $sitemapItems['uri'] - item uri
     * @type string $sitemapItems['dt_update'] - date item was modified
     * @return string
     */
    public function draw()
    {
        $xml = new SimpleXMLElement('<urlset/>');
        $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xml->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        $xml->addAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

        foreach ($this->items as $item) {
            $track = $xml->addChild('url');
            $track->addChild('loc', $item['uri']);
            $track->addChild('lastmod', $item['dt_update']);
        }

        return $xml->asXML();
    }
}
