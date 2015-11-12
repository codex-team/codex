<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Oauth_Vkontakte extends Oauth {

  protected static $config;

  public function __construct($config)
  {
    //var_dump($config);
    //die();
    self::$config = $config;
  }

  public function login_query()
  {
    $params = array(
        'client_id'     => self::$config['APP_ID'],
        'scope'         => self::$config['SETTINGS'],
        'redirect_uri'  => self::$config['REDIRECT_URI'],
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
        'code'          => $params['code'],
        'client_secret' => self::$config['APP_SECRET'],
        'redirect_uri'  => self::$config['REDIRECT_URI']
    );
    $resp = Request::factory(self::$config['GET_TOKEN_URI'])
      ->method('GET')
      ->query($params)
      ->execute();

    $resp = json_decode($resp);
    if (empty($resp->access_token))
    {
      throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
    }
    Session::instance()->set('vk_token', $resp->access_token);
    Session::instance()->set('vk_user_id', $resp->user_id);
    return true;
  }

  public function get_user()
  {
    $vk_token = Session::instance()->get('vk_token');
    $vk_user_id = Session::instance()->get('vk_user_id');
    if(!$vk_token || !$vk_user_id)
    {
      throw new Kohana_Exception('Невозможно получить токен и id');
    }
    $params = array(
        'uid' => $vk_user_id,
        'access_token' => $vk_token,
        'fields' => 'photo_50,city'
    );
    $resp = Request::factory('https://api.vk.com/method/users.get')
      ->method('GET')
      ->query($params)
      ->execute();
    $resp           = json_decode($resp);
    if (isset($resp->error))
    {
      throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
    }
    $profile = array_shift($resp->response);
    return $profile;
  }

  public function login()
  {
	return $this->get_access_token();
  }

}