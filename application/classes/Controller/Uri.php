<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 23.02.2016
 * Time: 11:48
 */

class Controller_Uri extends Controller {

    public function action_get()
    {
        $route = $this->request->param('route');
        $sub_action = $this->request->param('subaction');

        $model_alias = new Model_Alias();
        $realRoute = $model_alias->getRealRoute($route, $sub_action);

        echo Request::factory($realRoute)->execute();
    }
}



