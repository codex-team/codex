<?php defined('SYSPATH') or die('No direct script access.');
/**
 *  Handle 403 error
 */
class HTTP_Exception_403 extends Kohana_HTTP_Exception_403 {

    public function get_response()
    {
        require_once 'modules/hawk/hawk.php';
        HawkErrorManager::sendCustomException("Error 403");
        if ( Kohana::$environment >= Kohana::DEVELOPMENT ){

            return parent::get_response();

        } else {

            $view = new View('templates/errors/403');
            $response = Response::factory()->status(403)->body($view->render());

            return $response;
        }
    }
}
