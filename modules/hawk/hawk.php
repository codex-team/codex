<?php

require_once("config.php");


class HawkErrorManager
{
    # Define error handlers and load configuration
    public static function init() {
        set_error_handler(array('HawkErrorManager', 'Log'), E_ALL);
        set_exception_handler(array('HawkErrorManager', 'LogException'));
        error_reporting(E_ALL | E_STRICT);
    }

    # Construct logs package and send them to service with access token
    public static function Log($errno, $errstr, $errfile, $errline, $errcontext) {

        $data = array(
            "error_type" => $errno,
            "error_description" => $errstr,
            "error_file" => $errfile,
            "error_line" => $errline,
            "error_context" => $errcontext,
            "debug_backtrace" => debug_backtrace(),
            'http_params' => array(
                'HTTP_REFERER' => isset($_SERVER['HTTP_REFERER'])?$_SERVER['HTTP_REFERER']:'',
                'REQUEST_METHOD' => $_SERVER['REQUEST_METHOD'],
                'REQUEST_TIME' => $_SERVER['REQUEST_TIME'],
                'QUERY_STRING' => $_SERVER['QUERY_STRING'],
                'HTTP_USER_AGENT' => $_SERVER['HTTP_USER_AGENT'],
                'REMOTE_ADDR' => $_SERVER['REMOTE_ADDR'],
                'REQUEST_URI' => $_SERVER['REQUEST_URI']
            ),

            # Access token obtained from official website
            "access_token" => HawkConfig::$ACCESS_TOKEN
        );

        HawkErrorManager::send($data);

    }

    # Construct Exceptions and send them to Logs
    public static function LogException($exception) {
        HawkErrorManager::Log(E_ERROR, $exception->getMessage(), $exception->getFile(), $exception->getLine(), []);
    }

    # Simplified custom exception sender
    public static function sendCustomException($message, $data="", $type=E_USER_WARNING) {
        HawkErrorManager::Log($type, $message, '', '', $data);
    }

    /*******************/
    /* Private section */
    /*******************/

    # Send package to service defined by api_url from settings
    private static function send($package) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, HawkConfig::$API_URL);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($package));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec ($ch);
        curl_close ($ch);
    }
}

