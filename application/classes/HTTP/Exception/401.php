<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle 401 error
 *  @author Alexander Demyashev (develop@demyashev.com)
 */
class HTTP_Exception_401 extends Kohana_HTTP_Exception_401 {
 
    public function get_response()
    {   
        Kohana_Exception::log($this);
        
        if (Kohana::$environment >= Kohana::DEVELOPMENT)
        {
            return parent::get_response();
        } 
        else 
        {
            $response = Response::factory()
            ->status(401)
            ->headers('Location', URL::site('/'));
 
            return $response;
        }
        
    }
}