<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Auth extends Dao_Base
{
    private $auth_token;

    /**
     * Конструктор записывает инстанс сессии в приватную $profile.
     */
    public function __construct()
    {
        $this->auth_token = Cookie::get("auth_token");
    }

    /**
     * @return true, если пользователь авторизован, иначе false
     */
    public function is_authorized()
    {
        return isset($this->auth_token);
    }

    /**
     * @return true, если пользователь является гостем, иначе false
     */
    public function is_guest()
    {
        return !isset($this->auth_token);
    }

    /**
     * Возвращает токен пользователя из сессии.
     * @return Cookie::get("oauth_token")
     */
    public function get_token()
    {
        return $this->auth_token;
    }


    public function checkAuthorization()
    {
        $current_session = new Model_Sessions();
        return $current_session->checkAccess($this->auth_token);
    }

}
