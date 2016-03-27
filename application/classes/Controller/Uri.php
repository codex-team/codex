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

        $realRoute = $model_alias->getRealRoute( $route, $sub_action);

        $request = Request::factory($realRoute, array(
            'follow' => TRUE
        ))->execute();

        $this->response->body( $request );


        /*
         Пример создания нового Алиаса.

            $id - идентификатор

            $new_alias = Model_Alias::addAlias($route, Model_Uri::CONTEST, $id);

            types :
                const ARTICLE  = 1;
                const CONTEST  = 2;
                const USER     = 3;

        */
    }
}



