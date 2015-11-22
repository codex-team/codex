<?php defined('SYSPATH') or die('No direct script access.');


class Dao_TagsArticles extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_TagsArticles';
    protected $table     = 'Tags_articles';
    
}