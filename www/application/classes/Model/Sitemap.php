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
     * @return string
     */
    public function draw($sitemapItems)
    {
        $xml = new SimpleXMLElement('<urlset/>');
        $xml->addAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $xml->addAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        $xml->addAttribute('xsi:schemaLocation', 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd');

        foreach ($sitemapItems as $item) {
            $track = $xml->addChild('url');
            $track->addChild('loc', $item);
        }

        return $xml->asXML();
    }
}
