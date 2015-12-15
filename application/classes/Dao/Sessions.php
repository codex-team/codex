<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Dao for caching article queries.
 *
 * User: Alexander Menshikov (Nostr)
 * Date: 17/11/15
 */
class Dao_Sessions extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Sessions';
    protected $table     = 'Sessions';

}