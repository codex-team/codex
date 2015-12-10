<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle server errors (500, devision by zero and etc php errors) 
 *  and send debug info to developer email
 *  @author Alexander Demyashev (develop@demyashev.com)
 *  @since  09.12.2015 17:49
 */
class Kohana_Exception extends Kohana_Kohana_Exception {

    public static function response(Exception $e)
    {
        // handle error
        if (Kohana::$environment >= Kohana::DEVELOPMENT)
        {
            return parent::response($e);
        }
        else {
            /*

            // send debug info to developer
            $to = Kohana::$config->load('main.site.author.email');
            $subject = "500 Internal Server Error";
            $message = "{$e->getMessage()}\n\n{$e->getFile()} on line {$e->getLine()}";
            $header  = "From: robot@" . Arr::get($_SERVER, 'SERVER_NAME'). "\r\n";
         
            @mail($to, $subject, $message, $header);

            */

            $view = new View('templates/errors/default');
            $view->set('title',   "500 Internal Server Error");
            $view->set('message', "{$e->getMessage()}");

            $response = Response::factory()
                ->status(500)
                ->body($view->render());

            return $response;
        } 
    }
}