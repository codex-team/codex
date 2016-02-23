<?php
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

        $action = new Query($parameter);
        $Uri = Model_Uri::Instance();
        $route = $Uri->getAlias($action->hash());

        $controller = $Uri->getTypeDefinition($route['type']);
        $id = $route['id'];

        $realRequest = $controller.'/'.$id.'/'.$sub;

        echo Request::factory($realRequest)->execute();
    }

    public function action_add()
    {
        /*$parameter = $this->request->param('whatever');

        $route = new Query($parameter);

        $newAlias = $route->generateNewString();
        $new = new Query($newAlias);
        $newHash = $new->hash(2);

        $Uri = Model_Uri::Instance();

        $Uri->setNewAlias($newAlias, $newHash, '1', '10');*/
    }

}


class Query {

    const KEY = 31;

    private $string;

    public function __construct($string)
    {
        $this->string = $string;
    }

    public function hash()
    {
        $length = strlen($this->string);

        $pow[0] = 1;

        for($i = 1; $i < $length; $i++)
            $pow[$i] = $pow[$i - 1] * self::KEY;

        $hash = 0;
        for($i = 1; $i < $length; $i++)
            $hash += $pow[$i] * ord($this->string[$i]);

        return $hash;
    }

    public function generateNewString()
    {

        $Uri = Model_Uri::Instance();

        $aliases = $Uri->getAliases();

        if ( isset($aliases[$this->hash()]) )
        {
            for($index = 1; ; $index++) {
                $newString = $this->string . '-' . $index; // New String

                $obj = new Query($newString);
                $newHash = $obj->hash();

                if ( !isset($aliases[$newHash])) {
                    return $newString;
                    break;
                }
            }
        }
        else {
            return $this->string;
        }
    }
}


