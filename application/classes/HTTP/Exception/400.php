<?php defined('SYSPATH') or die('No direct script access.');

class HTTP_Exception_400 extends Kohana_HTTP_Exception_400 {
 
    public function get_response()
    {
        Kohana_Exception::log($this);
        
        $view = View::factory('templates/errors/default');
        $view->set('title', 'Ошибка в запросе');
        $view->set('message', $this->getMessage());
         
        $response = Response::factory()
            ->status(400)
            ->body($view->render());

        Model_Methods::telegram_send_error($this->getMessage());
 
        return $response;
    }
}