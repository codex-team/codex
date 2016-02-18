<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Dao for caching article queries.
 *
 * User: eliseev
 * Date: 17/11/15
 */
class Dao_Articles extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Articles';
    protected $table     = 'Articles';

}