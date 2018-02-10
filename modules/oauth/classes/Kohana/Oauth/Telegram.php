<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Class Kohana_Oauth_Telegram
 */
class Kohana_Oauth_Telegram extends Oauth
{
    protected static $config;
    public static $botUsername;
    public static $redirectUri;

    /**
     * @param string $config
     */
    public function __construct($config)
    {
        self::$config = $config;
        self::$botUsername = $config['BOT_USERNAME'];
        self::$redirectUri = $config['REDIRECT_URI'];
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
     *
     * if first name and last name are both presented – return them separated with a space.
     * if first name or last name is presented – return it.
     * otherwise if username is presented – return it.
     * otherwise return user's ID.
     *
     * @return string
     */
    public static function get_tg_name($profile)
    {
        $firstName = Arr::get($profile, 'first_name', '');
        $lastName = Arr::get($profile, 'last_name', '');
        $username = Arr::get($profile, 'username', '');

        if (!empty($firstName) && !empty($lastName)) {
            return join(' ', [$firstName, $lastName]);
        }

        if (!empty($firstName)) {
            return $firstName;
        }

        if (!empty($lastName)) {
            return $lastName;
        }

        if (!empty($username)) {
            return $username;
        }

        return Arr::get($profile, 'id');
    }
}
