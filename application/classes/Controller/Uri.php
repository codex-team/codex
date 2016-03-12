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
            /*
             * Если роут системный, то передаем в getRealRoute этот роут. Функция возвращает $route_INDEX контроллер и action - showAll
             */
            $keyFromControllersMap = array_search($model_uri->system, $model_uri->controllersMap);            // Поиск ключа из массива контроллеров
            $realRoute = $model_alias->getRealRoute($model_uri->system, null, true, $keyFromControllersMap);
        }
        else
        {
            /*
             * Возвращает $route_MODIFY контроллер, если $sub_action != null. В остальных случаях $route_INDEX и action - Show/
             */

            $realRoute = $model_alias->getRealRoute($route, $sub_action, false, null);
        }


        $this->response->body( Request::factory($realRoute)->execute() );   // Вызов контроллера и вывод

        /*
         Пример создания нового Алиаса. Устанавливаем нужный type и id статьи/контеста

            $route      = $model_alias->generateAlias($route);
            $hash       = md5($route, true);
            $type       = 2;
            $id         = 3;
            $dt_create  = DATE::$timezone;

            $new_alias = new Model_Alias($route, $hash, $type, $id, $dt_create);
            $new_alias->save();
        */
    }
}



