<?php defined('SYSPATH') or die('No direct script access.');


/**
 * Hawk PHP Errors Sender
 *
 * Firstly you need to set up config file.
 * Create config/hawk.php as a copy of sample file or fill it yourself.
 *
 * Config file should return an array with 'token' [and 'url'] field.
 *
 * Simple usage:
 * @example Model_Hawk::Log($exception);
 */
class Model_Hawk extends Model
{
    const catcherUrl = 'https://hawk.so/catcher/php';

    /**
     * Get Hawk config params
     *
     * @return $params['token']     Project token from settings
     *         $params['url']       PHP Hawk catcher URL
     *
     * @return FALSE                If no config file was found
     */
    public static function returnConfig() {

        $configFilename = 'hawk';
        $config = Kohana::$config->load($configFilename);

        if ( !(array)$config ) {

            return false;

        }

        $params = array(
            'token' => Arr::get($config, 'token', ''),
            'url' => Arr::get($config, 'url', self::catcherUrl)
        );

        return $params;
    }

    /**
     * Public function for logging server error.
     *
     * @example Model_Hawk::Log($e);
     *
     * @param $exception      Error you want to save
     * @return                Hawk server response
     *                        or FALSE if config file does not exist
     */
    public static function Log($exception) {

        $params = self::returnConfig();

        /**
         * If no config file was found then ignore sending
         */
        if ($params === FALSE) {

            return FALSE;

        }

        $data = array(
            "error_type" => $exception->getCode() ? : E_ERROR,
            "error_description" => $exception->getMessage(),
            "error_file" => $exception->getFile(),
            "error_line" => $exception->getLine(),
            "error_context" => array(),
            "debug_backtrace" => debug_backtrace(),
            'http_params' => $_SERVER,
            "access_token" => $params['token'],
            "GET" => $_GET,
            "POST" => $_POST
        );

        return self::_send($data, $params);
    }

    /**
     * Send package with error data to Hawk service.
     * Private param $_url should be defined.
     *
     * @param $data     Array with error info
     * @return          Hawk server response
     */
    private static function _send($data, $params) {

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $params['url']);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close($ch);

        return $server_output;
    }
}
