<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle 404 error
 *  @author Alexander Demyashev (develop@demyashev.com)
 */
class HTTP_Exception_404 extends Kohana_HTTP_Exception_404 {
 
    public function get_response()
    {
        if (Kohana::$environment >= Kohana::DEVELOPMENT)
        {
            return parent::get_response();
        } 
        else 
        {
            /*

            // send debug info to developer
            $to = Kohana::$config->load('main.site.author.email');
            $subject = "404 Not Found";
            $message = "{$this->getMessage()}\n\n{$this->getFile()} on line {$this->getLine()}";
            $header  = "From: robot@" . Arr::get($_SERVER, 'SERVER_NAME'). "\r\n";
         
            @mail($to, $subject, $message, $header);

            */

            $view = View::factory('templates/errors/default');
            $view->set('title',   "404 Not Found");
            $view->set('message', "{$this->getMessage()}");  
            $response = Response::factory()
                ->status(404)
                ->body($view->render());
     
            return $response;
        }
    }
}