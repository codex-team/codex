<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Telegram
 */
class Kohana_Oauth_Telegram extends Oauth {

    protected static $config;


    /**
     * @param string $config
     */
    public function __construct($config)
    {
        self::$config = $config;
    }

    /**
     * Official code for user's request checking after Telegram authorization.
     * Return user's ID, first name, last name, username photo URL and auth date.
     *
     * @param $auth_data – array of GET params. Typically - $_GET
     * @return – array with user's data
     * @throws Exception
     */
    function checkTelegramAuthorization($auth_data) {
        $check_hash = $auth_data['hash'];
        unset($auth_data['hash']);
        $data_check_arr = [];
        foreach ($auth_data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);
        $secret_key = hash('sha256', self::$config['BOT_TOKEN'], true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);
        if (strcmp($hash, $check_hash) !== 0) {
            throw new Exception('Data is NOT from Telegram');
        }
        if ((time() - $auth_data['auth_date']) > 86400) {
            throw new Exception('Data is outdated');
        }
        return $auth_data;
    }

    /**
     * Generate name from Telegram profile
     * @return string
     */
    public static function get_tg_name($profile)
    {
        if (!empty($profile['first_name']) || !empty($profile['last_name'])) {
            return join(' ', array($profile['first_name'], $profile['last_name']));
        }
        if (!empty($profile['username'])) {
            return $profile['username'];
        }

        return $profile['id'];
    }

    public function get_bot_name()
    {
        return self::$config['BOT_USERNAME'];
    }

}