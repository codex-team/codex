<?php defined('SYSPATH') or die('No direct script access.');

class Dao_User extends Dao_Base {

    protected $table = 'users';

    public static function is_guest()
    {
        return isset(Session::instance()->get('profile'));
    }

}
