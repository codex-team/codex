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