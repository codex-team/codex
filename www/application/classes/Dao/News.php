<?php defined('SYSPATH') or die('No direct script access.');

class Dao_News extends Dao_MySQL_Base
{
    protected $cache_key = 'Dao_News';
    protected $table     = 'News';
}
