<?php defined('SYSPATH') or die('No direct script access.');

/**
*  Дао для работы с таблицей Tags
*/

class Dao_Tags extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Tags';
    protected $table     = 'Tags';
}
