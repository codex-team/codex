<?php defined('SYSPATH') or die('No direct script access.');

class HTTP_Exception_404 extends Kohana_HTTP_Exception_404 {
 
    public function get_response()
    {
        Kohana_Exception::log($this);
        
        $view = View::factory('templates/errors/default');
        $view->set('title', 'Страница не найдена');
        $view->set('message', $this->getMessage());
           
        $response = Response::factory()
            ->status(404)
            ->body($view->render());
 
        return $response;
    }
}