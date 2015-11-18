<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Auth extends Dao_Base
{
    private $profile;
    
    /**
     * Конструктор записывает инстанс сессии в приватную $profile.
     */
    public function __construct()
    {
        $this->profile = Session::instance()->get('profile');
    }

    /**
     * @return true, если пользователь авторизован, иначе false
     */
    public function is_authorized()
    {
        return isset($this->profile);
    }

    /**
     * @return true, если пользователь является гостем, иначе false
     */
    public function is_guest()
    {
        return !isset($this->profile);
    }

    /**
     * Возвращает профиль пользователя из сессии.
     * @return Session::instance()->get('profile')
     */
    public function get_profile()
    {
        return $this->profile;
    }

}
