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
        $parameter = $this->request->param('route');
        $sub = $this->request->param('subaction');

        $action = new Model_HashUri($parameter);

        $Uri = Model_Uri::Instance();
        $route = $Uri->getAlias($action->hash());

        $controller = $Uri->getTypeDefinition($route['type']);
        $id = $route['id'];

        $realRequest = $controller.'/'.$id.'/'.$sub;

        echo Request::factory($realRequest)->execute();
    }

    public function action_add()
    {
        /*
         * Есть недорабоктки....
         */

        //$parameter = $this->request->param('whatever');

        //$route = new Query($parameter);

        //$newAlias = $route->generateNewString();
        //$new = new Query($newAlias);
        //$newHash = $new->hash(2);

        //$Uri = Model_Uri::Instance();


        //$Uri->setNewAlias($newAlias, $newHash, '1', '10');

    }

}



