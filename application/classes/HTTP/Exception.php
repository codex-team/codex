<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle anothers HTTP errors
 *  @author Alexander Demyashev (develop@demyashev.com)
 */
class HTTP_Exception extends Kohana_HTTP_Exception {
 
    public function get_response()
    {
        Kohana_Exception::log($this);
 
        if (Kohana::$environment >= Kohana::DEVELOPMENT)
        {
            return parent::get_response();
        }
        else
        {
            /*
            
            // send debug info to developer
            $to = Kohana::$config->load('main.site.author.email');
            $subject = "HTTP Error";
            $message = "{$this->getMessage()}\n\n{$this->getFile()} on line $this->getLine()}";
            $header  = "From: robot@" . Arr::get($_SERVER, 'SERVER_NAME'). "\r\n";
         
            @mail($to, $subject, $message, $header);

            */

            $view = View::factory('templates/errors/default');
            $view->set('title', 'Произошла ошибка');
            $view->set('message', "({$this->getCode()}) {$this->getMessage()}");
 
            $response = Response::factory()
                ->status($this->getCode())
                ->body($view->render());
 
            return $response;
        }
    }
}