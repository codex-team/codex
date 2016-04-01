<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Github
 */
class Kohana_Oauth_GitHub extends Oauth {

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
     * Получение информации о себе через Github Api
     * @return mixed
     * @throws Kohana_Exception
     */
    public function get_user()
    {
        $gh_token = $this->token;

        if (!$gh_token)
        {
            # TODO: Throw custom Exception for GitHub
            throw new Kohana_Exception('Невозможно получить токен и id');
        }

        $params = array(
            'access_token' => $gh_token,
        );

        $headers = array(
            'user-agent' => 'codex browser'
        );

        $resp = Request::factory('https://api.github.com/user')
            ->method(Request::GET)
            ->headers($headers)
            ->query($params)
            ->execute();

        $resp = json_decode($resp);
        if (isset($resp->error))
        {
            # TODO: Throw custom Exception for Github
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        return $resp;
    }


    /**
     * Попытка авторизации через GitHub Api
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
            # TODO: Throw custom Exception for GitHub
            throw new Kohana_Exception('NO QUERY PARAMS');
        }

        if (isset($params['error']))
        {
            # TODO: Throw custom Exception for GitHub
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

        parse_str($resp, $result);
        if (!isset($result['access_token']))
        {
            # TODO: Throw custom Exception for GitHub
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        $this->token = $result['access_token'];
        return true;
    }


    /**
     * Генерация URL для авторизации через Github Api
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

    public function get_token()
    {
        return $this->token;
    }

}