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
}
