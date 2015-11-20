<?php defined('SYSPATH') or die('No direct script access.');

class HTTP_Exception_401 extends Kohana_HTTP_Exception_401 {
 
    public function get_response()
    {   
        Kohana_Exception::log($this);
        
        $response = Response::factory()
            ->status(401)
            ->headers('Location', URL::site('/'));

        Model_Methods::telegram_send_error($this->getMessage());

        return $response;
    }
}