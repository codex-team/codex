<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Oauth_Odnoklassniki extends Oauth {

  protected static $config;

  public function __construct($config)
  {
    //var_dump($config);
    //die();
    self::$config = $config;
  }

  public function login_query()
  {
    $state = time();
    $params = array(
        'client_id'     => self::$config['APP_ID'],
        //'scope'         => self::$config['SETTINGS'],
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

    if (isset($error))
      throw new Kohana_Exception('Error: '.$error.' Description: '.$error_description);
    $params = array(
        'client_id'     => self::$config['APP_ID'],
        'code'          => $code,
        'client_secret' => self::$config['APP_SECRET'],
        'redirect_uri'  => self::$config['REDIRECT_URI'],
        'grant_type'    => 'authorization_code',
    );
    $resp = Request::factory(self::$config['GET_TOKEN_URI'])
      ->method('POST')
      ->post($params)
      ->execute();
    $resp = json_decode($resp);
    if (!isset($resp->access_token))
    {
      throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
    }
    Session::instance()->set('od_token', $resp->access_token);
    return true;

  }

  public function get_user()
  {
    $od_token   = Session::instance()->get('od_token');
    if (!$od_token)
    {
      throw new Kohana_Exception('Невозможно получить токен и id');
    }
    $sign = md5("application_key=".self::$config['APP_PUBLIC']."method=users.getCurrentUser".md5($od_token.self::$config['APP_SECRET']));
    $params = array(
        'method' => 'users.getCurrentUser',
        'access_token' => $od_token,
        'application_key' => self::$config['APP_PUBLIC'],
        'sig' => $sign
    );
    $resp          = Request::factory('http://api.odnoklassniki.ru/fb.do')
      ->method('GET')
      ->query($params)
      ->execute();
    $resp          = json_decode($resp);
    if (isset($resp->error))
    {
      throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
    }
    return $resp;
  }

  public function login()
  {
    return $this->get_access_token();

  }

}