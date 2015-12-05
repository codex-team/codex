<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Auth extends Dao_Base
{
    private $oauth_token;
    
    /**
     * Конструктор записывает инстанс сессии в приватную $profile.
     */
    public function __construct()
    {
        $this->oauth_token = Cookie::get("oauth_token");
    }

    /**
     * @return true, если пользователь авторизован, иначе false
     */
    public function is_authorized()
    {
        return isset($this->oauth_token);
    }

    /**
     * @return true, если пользователь является гостем, иначе false
     */
    public function is_guest()
    {
        return !isset($this->oauth_token);
    }

    /**
     * Возвращает токен пользователя из сессии.
     * @return Cookie::get("oauth_token")
     */
    public function get_token()
    {
        return $this->oauth_token;
    }

}
