<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Dao for caching article queries.
 *
 * User: Polina Shneider
 * Date: 19/02/18
 */
class Dao_Coauthors extends Dao_MySQL_Base
{
    protected $cache_key = 'Dao_Coauthors';
    protected $table     = 'Coauthors';
}
