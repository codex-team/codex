<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Auth extends Dao_Base
{
    private $profile;

    /**
     * Dao_Auth constructor.
     */
    public function __construct()
    {
        $this->profile = Session::instance()->get('profile');
    }

    public function is_authorized()
    {
        return isset($this->profile);
    }

    public function is_guest()
    {
        return !isset($this->profile);
    }

    public function get_profile()
    {
        return $this->profile;
    }

}
