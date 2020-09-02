<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Vkontakte
 */
class Kohana_Oauth_Vkontakte extends Oauth {

    protected static $config;


    /**
     * @param string $config
     */
    public function __construct($config)
    {
        self::$config = $config;
    }


    /**
     * Получение информации о себе через VK Api
     * @param $fields - поля для получения информации о пользователе
     * @return $profile - профиль пользователя
     * @throws Kohana_Exception
     */
    public function get_user($fields)
    {
        $vk_token = Session::instance()->get('vk_token');
        $vk_user_id = Session::instance()->get('vk_user_id');

        if(!$vk_token || !$vk_user_id)
        {
            # TODO: Throw custom Exception for VK
            throw new Kohana_Exception('Невозможно получить токен и id');
        }

        $params = array(
            'uid' => $vk_user_id,
            'access_token' => $vk_token,
            'fields' => $fields,
            'v' => 5.21
        );

        $resp = Request::factory('https://api.vk.com/method/users.get')
            ->method('GET')
            ->query($params)
            ->execute();

        $resp = json_decode($resp);
        if (isset($resp->error))
        {
            # TODO: Throw custom Exception for VK
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        $profile = array_shift($resp->response);
        return $profile;
    }


    /**
     * Попытка авторизации через VK Api
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
            # TODO: Throw custom Exception for VK
            throw new Kohana_Exception('NO QUERY PARAMS');
        }

        if (isset($error)) # TODO: not $params['error'] ?
        {
            # TODO: Throw custom Exception for VK
            throw new Kohana_Exception('Error: '.$error.' Description: '.$error_description);
        }

        $params = array(
            'client_id'     => self::$config['APP_ID'],
            'code'          => $params['code'],
            'client_secret' => self::$config['APP_SECRET'],
            'redirect_uri'  => self::$config['REDIRECT_URI'],
            'v' => 5.21
        );

        $resp = Request::factory(self::$config['GET_TOKEN_URI'])
            ->method('GET')
            ->query($params)
            ->execute();

        $resp = json_decode($resp);
        if (empty($resp->access_token))
        {
            # TODO: Throw custom Exception for VK
            throw new Kohana_Exception('Error: '.$resp->error.' Description: '.$resp->error_description);
        }

        Session::instance()->set('vk_token', $resp->access_token);
        Session::instance()->set('vk_user_id', $resp->user_id);
        return true;
    }


    /**
     * Генерация URL для авторизации через VK Api
     * @return string
     */
    public function login_query()
    {
        $params = array(
            'client_id'     => self::$config['APP_ID'],
            'scope'         => self::$config['SETTINGS'],
            'redirect_uri'  => self::$config['REDIRECT_URI'],
            'response_type' => 'code',
            'v' => 5.21
        );

        return self::$config['GET_CODE_URI'].'?'.http_build_query($params);
    }

}
