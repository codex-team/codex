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

        $model_uri = Model_Uri::Instance();
        $model_alias = new Model_Alias();


        if ($model_uri->system != null)
        {
            $keyFromControllersMap = array_search($model_uri->system, $model_uri->controllersMap);
            $realRoute = $model_alias->getRealRoute($model_uri->system, null, true, $keyFromControllersMap);
        }
        else
        {
            /*
             * Возвращает $route_MODIFY контроллер, если $sub_action != null. В остальных случаях $route_INDEX и action - Show/
             */
            $realRoute = $model_alias->getRealRoute($route, $sub_action, false, null);
        }


        $this->response->body( Request::factory($realRoute)->execute() );
        /*
         Пример создания нового Алиаса.

            $route      = $model_alias->generateAlias($route);
            $hash       = md5($route, true);
            $type       = TYPE;
            $id         = ID;
            $dt_create  = DATE::$timezone;

            $new_alias = new Model_Alias($route, $hash, $type, $id, $dt_create);
            $new_alias->save();

            types :
                const ARTICLE  = 1;
                const CONTEST  = 2;
                const USER     = 3;

        */
    }
}



