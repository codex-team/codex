<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Tags extends Dao_MySQL_Base {

    protected $cache_key = 'Dao_Tags';
    protected $table     = 'Tags';

    /**
    * Usage:
    * Dao_Users::select()->where('id', '=', $userId)->limit(1)->cached->execute();
    * Dao_Users::select()->where('id', '=', $userId)->limit(1)->cached(Date::MINUTE * 5, $userId, array('userById'))->execute();
    * Dao_Users::select()->where('id', '>', $userId)->order_by('id', 'DESC')->limit(10)->cached(Date::HOUR)->execute();
    */

}
