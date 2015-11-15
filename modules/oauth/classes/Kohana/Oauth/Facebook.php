<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Oauth_Facebook extends Oauth {

    protected static $config;
    private $token;

    public function __construct($config)
    {
        self::$config = $config;
    }

    public function login_query()
    {
        $state = time();
        $params = array(
            'client_id'     => self::$config['APP_ID'],
            'scope'         => self::$config['SETTINGS'],
            'redirect_uri'  => self::$config['REDIRECT_URI'],
            'state' => $state,
            'response_type' => 'code'
        );
        return self::$config['GET_CODE_URI'].'?'.http_build_query($params);

    }

//   @param code sended at backref
    private function get_access_token()
    {
        $params = Arr::get($_SERVER, 'QUERY_STRING');

        // http://www.php.net/manual/ru/function.parse-str.php
        // parse_str($input_string, $output_array)
        parse_str($params, $params);

        // if we on 1st step -> go to authorization page
        if ( empty($params['code']) )
        {
            Controller::redirect($this->login_query());
        }

        if (!$params)
        {
            throw new Kohana_Exception('NO QUERY PARAMS');
        }

        if (isset($params['error']))
            throw new Kohana_Exception('Error: '.$params['error'].' Description: '.$params['error_description']);
        $params = array(
            'client_id'     => self::$config['APP_ID'],
            'code'          => $params['code'],
            'client_secret' => self::$config['APP_SECRET'],
            'redirect_uri'  => self::$config['REDIRECT_URI']
        );
        $resp = Request::factory(self::$config['GET_TOKEN_URI'])
            ->method(Request::GET)
            ->query($params)
            ->execute();
        parse_str($resp);
        if (!isset($access_token))
        {
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }
        $this->token = $access_token;
        //Session::instance()->set('fb_token', $access_token);
        return true;

    }

    public function get_user()
    {
        $fb_token   = $this->token;
        if (!$fb_token)
        {
            throw new Kohana_Exception('Невозможно получить токен и id');
        }
        $params = array(
            'access_token' => $fb_token,
        );
        $resp          = Request::factory('https://graph.facebook.com/me')
            ->method(Request::GET)
            ->query($params)
            ->execute();
        $resp          = json_decode($resp);
        if (isset($resp->error))
        {
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }
        return $resp;
    }

    public function get_images($user_id)
    {
        $fb_token   = $this->token;

        if (!$fb_token)
        {
            throw new Kohana_Exception('Невозможно получить токен и id');
        }
        $params = array(
            'access_token' => $fb_token,
            #'redirect' => 0,
            'type' => 'large'
        );
        $resp          = Request::factory('https://graph.facebook.com/v2.5/'.$user_id, array(
            'follow' => TRUE))
            ->method(Request::GET)
            ->query($params)
            ->execute();

        return $resp->body();
    }

    public function login()
    {
        return $this->get_access_token();

    }

}