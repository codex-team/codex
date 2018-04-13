<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Controller_Uri extends Controller
{
    /**
     * Process URI
     *
     * @throws Exception
     * @throws Aliases_HTTP_Exception_404
     */
    public function action_get()
    {
        /**
         * Get alias
         */
        $alias = $this->request->param('alias');

        /**
         * Get subaction
         */
        $subAction = $this->request->param('subaction');

        /**
         * Get Controller, Action and Id we looking for
         */
        $model_alias = new Model_Aliases();
        $realRequest = $model_alias->getRealRequestParams($alias, $subAction);

        $controller_name = $realRequest['controller'];
        $action_name = $realRequest['action'];

        /**
         * Create a new class for Controller
         */
        $Controller = new $controller_name($this->request, $this->response);

        /**
         * Set ID as query param
         * In actions use $this->request->query('id') instead of $this->request->param('id')
         */
        $this->request->query('id', $realRequest['id']);

        /**
         * Action is not exist in this Controller
         * then throw Aliases_HTTP_Exception_404
         */
        if (!method_exists($Controller, $action_name)) {
            throw new Aliases_HTTP_Exception_404();
        }

        /**
         * Now just execute real action in initial Request instance
         */
        $Controller->before();
        $Controller->$action_name();
        $Controller->after();
    }
}
