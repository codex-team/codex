<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Facebook
 */
class Kohana_Oauth_Facebook extends Oauth {

    protected static $config;
    private $token;


    /**
     * @param string $config
     */
    public function __construct($config)
    {
        self::$config = $config;
    }


    /**
     * Получение изображений через Facebook Api
     * @param $user_id
     * @return mixed
     * @throws Kohana_Exception
     */
    public function get_images($user_id)
    {
        $fb_token = $this->token;

        if (!$fb_token)
        {
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('Невозможно получить токен и id');
        }

        $params = array(
            'access_token' => $fb_token,
            #'redirect' => 0,
            'type' => 'large'
        );

        $resp = Request::factory('https://graph.facebook.com/v2.5/'.$user_id, array(
            'follow' => TRUE))
            ->method(Request::GET)
            ->query($params)
            ->execute();

        return $resp->body();
    }


    /**
     * Получение информации о себе через Facebook Api
     * @return mixed
     * @throws Kohana_Exception
     */
    public function get_user()
    {
        $fb_token = $this->token;

        if (!$fb_token)
        {
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('Невозможно получить токен и id');
        }

        $params = array(
            'access_token' => $fb_token,
        );

        $resp = Request::factory('https://graph.facebook.com/me')
            ->method(Request::GET)
            ->query($params)
            ->execute();

        $resp = json_decode($resp);
        if (isset($resp->error))
        {
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        return $resp;
    }


    /**
     * Попытка авторизации через Facebook Api
     * @return bool
     * @throws Kohana_Exception
     */
    public function login()
    {
        return $this->get_access_token();

    }


    /**
     * Получение access token для авторизации
     * @return bool
     * @throws Kohana_Exception
     */
    private function get_access_token()
    {
        $params = Arr::get($_SERVER, 'QUERY_STRING');

        parse_str($params, $params);

        if ( empty($params['code']) )
        {
            Controller::redirect($this->login_query());
        }

        if (!$params)
        {
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('NO QUERY PARAMS');
        }

        if (isset($params['error']))
        {
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('Error: '.$params['error'].' Description: '.$params['error_description']);
        }

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
            # TODO: Throw custom Exception for Facebook
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        $this->token = $access_token;
        //Session::instance()->set('fb_token', $access_token); #TODO: Why is it commented?
        return true;
    }


    /**
     * Генерация URL для авторизации через Facebook Api
     * @return string
     */
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

}