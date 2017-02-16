<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle server errors (500, devision by zero and etc php errors)
 *  and send debug info to developer email
 *  @author Alexander Demyashev (develop@demyashev.com)
 *  @since  10.12.2015 17:49
 */
class Kohana_Exception extends Kohana_Kohana_Exception {

    public static function response(Exception $e)
    {
        // handle error
        if (Kohana::$environment >= Kohana::DEVELOPMENT){

            return parent::response($e);

        } else {

            $view = new View('templates/errors/default');

            /**
            * Send notification to the Telegram
            */
            self::formatErrorForTelegrams($e);

            $response = Response::factory()->status(500)->body($view->render());

            return $response;
        }
    }

    /**
    * Compose error trace for Telegram
    * @param Exception $e - kohana exception object
    */
    private static function formatErrorForTelegrams( $e )
    {

        $protocol = HTTP::$protocol == 'HTTP' ? 'http://' : 'https://';
        if (!empty(Request::current())){
            $path = $protocol . Arr::get($_SERVER, 'SERVER_NAME') . Request::current()->url();
        } else {
            $path = '';
        }

        $telegramMsg = '⚠️ ' . $e->getMessage() . '';
        $telegramMsg .= PHP_EOL .     $e->getFile() . ': ' . $e->getLine() .  PHP_EOL . PHP_EOL;
        $telegramMsg .= $path;

        Model_Methods::sendBotNotification($telegramMsg);

    }
}