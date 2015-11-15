<?php defined('SYSPATH') or die('No direct script access.');

class HTTP_Exception_403 extends Kohana_HTTP_Exception_403 {
 
    public function get_response()
    {
        Kohana_Exception::log($this);

        $view = View::factory('templates/errors/default');
        $view->set('title', 'Доступ запрещен');
        $view->set('message', $this->getMessage());
           
        $response = Response::factory()
            ->status(403)
            ->body($view->render());
 
        return $response;
    }
}