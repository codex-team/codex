<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle server errors (500, devision by zero and etc php errors)
 *  and send debug info to developer email
 *  @author Alexander Demyashev (develop@demyashev.com)
 *  @since  10.12.2015 17:49
 */
class Kohana_Exception extends Kohana_Kohana_Exception
{
    public static function response($e)
    {
        \Hawk\Catcher::get()->sendException($e);

        if (Kohana::$environment == Kohana::DEVELOPMENT) {

            return parent::response($e);

        } else {

            $view = new View('templates/errors/default');

            $response = Response::factory()->status(500)->body($view->render());

            return $response;
        }
    }
}
