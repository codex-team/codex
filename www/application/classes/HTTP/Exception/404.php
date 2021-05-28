<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle 404 error
 *  @author Alexander Demyashev (develop@demyashev.com)
 */
class HTTP_Exception_404 extends Kohana_HTTP_Exception_404
{
    public function get_response()
    {
        if (Kohana::$environment >= Kohana::DEVELOPMENT) {
            return parent::get_response();
        } else {
            $view = new View('templates/errors/404');
            $response = Response::factory()->status(404)->body($view->render());

            return $response;
        }
    }
}
