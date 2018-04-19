<?php defined('SYSPATH') or die('No direct script access.');


class Dao_Quiz extends Dao_MySQL_Base
{
    protected $cache_keys = 'Dao_Quiz';
    protected $table     = 'Quiz';
}
