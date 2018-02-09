<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Telegram
 */
class Kohana_Oauth_Telegram extends Oauth
{
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
     * @param [array] $auth_data – array of GET params. Typically - $_GET
     * @return – array with user's data
     * @throws Exception
     */
    public function getProfileData($auth_data)
    {
        $check_hash = Arr::get($auth_data, 'hash', '');
        unset($auth_data['hash']);

        # Convert map to array of strings with key=value format
        $data_check_arr = [];
        foreach ($auth_data as $key => $value) {
            $data_check_arr[] = $key . '=' . $value;
        }

        # Sort and merge array elements into one string
        sort($data_check_arr);
        $data_check_string = implode("\n", $data_check_arr);

        $secret_key = hash('sha256', self::$config['BOT_TOKEN'], true);
        $hash = hash_hmac('sha256', $data_check_string, $secret_key);

        # Check HMAC
        if (strcmp($hash, $check_hash) !== 0) {
            throw new Exception('HMAC verification failed');
        }

        # Check if outdated
        if ((time() - Arr::get($auth_data, 'auth_date', 0)) > 86400) {
            throw new Exception('Authentication date is outdated');
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

    public function get_redirect_uri()
    {
        return self::$config['REDIRECT_URI'];
    }
}
