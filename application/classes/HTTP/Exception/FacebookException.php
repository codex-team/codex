<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Catch all errors and log them
 *
 *  @author Alexander Demyashev
 *  @since  14.11.2015 00:13
 */


class HTTP_Exception_FacebookException extends HTTP_Exception  {

    protected $_code = 502;


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
            $view->set('title', 'Произошла ошибка');
            $view->set('message', $this->getMessage());

            $response = Response::factory()
                ->status($this->getCode())
                ->body($view->render());

            return $response;
        }
    }
}