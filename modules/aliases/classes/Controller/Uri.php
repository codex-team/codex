<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Alias System
 * https://ifmo.su/
 * @author CodeX team team@ifmo.su
 * Khaydarov Murod
 */

class Controller_Uri extends Controller {

    public function action_get()
    {
        $route      = $this->request->param('route');
        $sub_action = $this->request->param('subaction');
        
        $model_alias = new Model_Alias();

        /**
        * Get Controller, action and ID we looking for
        */
        $realRequest = $model_alias->getRealRequestParams( $route, $sub_action );

        $controller_name = $realRequest['controller'];
        $action_name     = $realRequest['action'];

        $Controller = new $controller_name( $this->request, $this->response );

        /**
        * Set ID as query param
        * In actions use $this->request->query('id') instead of $this->request->param('id')
        */
        $this->request->query('id', $realRequest['id']);

        /**
        * Now just execute real action in initial Request instance
        */

        $Controller->before();
        $Controller->$action_name();
        $Controller->after();
    }
}



