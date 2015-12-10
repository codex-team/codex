<?php defined('SYSPATH') OR die('No Direct Script Access');

/**
 * Created by PhpStorm.
 * User: nostr
 * Date: 10.12.15
 * Time: 13:59
 */
Class Model_Sessions extends Model
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

    public function is_authorized()
    {
        return isset($this->auth_token);
    }

    public function get_user_id()
    {
        $current_session = DB::select('user_id')->from('Sessions')->where('access_token', '=', $this->auth_token)->execute()->as_array();
        if (isset($current_session[0]['user_id']))
            return $current_session[0]['user_id'];
        else
            return false;
    }

    public function find($user_id)
    {
        $user_session = DB::select()->from('Sessions')->where('ip', '=', $this->ip)
            ->and_where('user_agent', '=', $this->user_agent)
            ->and_where('user_id', '=', $user_id)
            ->execute()->as_array();
        if (!empty($user_session[0]['id']))
            return true;
        else
            return false;
    }

    public function checkAccess()
    {
        if (empty($this->auth_token))
            return false;

        $user_session = DB::select()->from('Sessions')->where('ip', '=', $this->ip)
                                                      ->and_where('user_agent', '=', $this->user_agent)
                                                      ->execute()->as_array();
        if (!empty($user_session['access_token']) &&
            $user_session['access_token'] == $this->access_token
            )
            return true;
        else
            return false;
    }

    public function save($user_id, $access_token)
    {
        if (DB::insert('Sessions', array('user_id', 'ip', 'user_agent', 'access_token'))->
            values(array($user_id, $this->ip, $this->user_agent, $access_token))->execute()
            ) {
            return true;
        } else {
            return true;
        }
    }

    public function update($user_id, $access_token)
    {
        if (DB::update('Sessions')->set(array(
            'user_id' => $user_id,
            'ip' => $this->ip,
            'user_agent' => $this->user_agent,
            'access_token' => $access_token
        ))->where('user_id', '=', $user_id)
            ->and_where('ip', '=', $this->ip)
            ->and_where('user_agent', '=', $this->user_agent)
            ->execute()
        )
            return true;
        else
            return false;
    }
}