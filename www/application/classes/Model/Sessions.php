<?php defined('SYSPATH') or die('No Direct Script Access');

/**
 * Created by PhpStorm.
 * User: nostr
 * Date: 10.12.15
 * Time: 13:59
 */
class Model_Sessions extends Model
{
    public $id;
    public $user_id;
    public $ip;
    public $dt_login;
    public $user_agent;
    public $access_token;


    public function __construct()
    {
        $this->ip = Request::$client_ip;
        $this->user_agent = Request::$user_agent;
        $this->auth_token = Cookie::get("auth_token");
    }


    /**
     * Возвращает статус авторизованности пользователя
     * @return bool
     */
    public function is_authorized()
    {
        return isset($this->auth_token);
    }


    /**
     * Возвращает user_id пользователя по access_token
     * @return Int, otherwise false
     */
    public function get_user_id($token=null)
    {
        if (!$token) {
            $token = $this->auth_token;
        }

        $current_session = Dao_Sessions::select('user_id')
            ->where('access_token', '=', $token)
            ->cached(Date::DAY, 'sessions/' . $token)
            ->limit(1)
            ->execute();

        if (isset($current_session['user_id'])) {
            return $current_session['user_id'];
        } else {
            Dao_Sessions::select()->clearcache('sessions/' . $token);
            return false;
        }
    }


    /**
     * Метод создает новую запись в таблице Sessions с указанным user_id и access_token
     * @param $user_id
     * @param $access_token
     * @return bool
     * @throws Kohana_Exception
     */
    public function save($user_id, $access_token)
    {
        $result = DB::insert('Sessions', array('user_id', 'ip', 'user_agent', 'access_token'))
            ->values(array($user_id, $this->ip, $this->user_agent, $access_token))
            ->execute();

        return $result;
    }
}
