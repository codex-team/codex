<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Dao for caching contests queries.
 *
 * User: Alexander Menshikov
 * Date: 17/11/15
 */
class Dao_Contests extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Contests';
    protected $table     = 'Contests';

}