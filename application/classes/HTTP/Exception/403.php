<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle 403 error
 *  @author Alexander Demyashev (develop@demyashev.com)
 */
class HTTP_Exception_403 extends Kohana_HTTP_Exception_403 {
 
    public function get_response()
    {
        Kohana_Exception::log($this);

        if (Kohana::$environment >= Kohana::DEVELOPMENT)
        {
            return parent::get_response();
        } 
        else 
        {
            $view = View::factory('templates/errors/default');
            $view->set('title',   "403 Forbidden");
            $view->set('message', "{$this->getMessage()}"); 
               
            $response = Response::factory()
                ->status(403)
                ->body($view->render());
     
            return $response;
        }
}