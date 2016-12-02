<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Dao for caching courses queries.
 *
 * User: Alexander Menshikov
 * Date: 17/11/15
 */
class Dao_Courses extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Courses';
    protected $table     = 'Courses';

}