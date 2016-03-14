<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 27.02.2016
 * Time: 22:43
 */

class Model_Alias
{
    public $uri;
    public $hash;
    public $type;
    public $id;
    public $dt_create;

    public function __construct($uri = null, $hash = null, $type = null, $id = null, $dt_create = null)
    {
        $this->uri          =   $uri;
        $this->hash         =   $hash;
        $this->type         =   $type;
        $this->id           =   $id;
        $this->dt_create    =   $dt_create;
    }

    public function save()
    {
        $insert = Dao_Alias::insert()
                        ->set('uri', $this->uri)
                        ->set('hash', $this->hash)
                        ->set('type', $this->type)
                        ->set('id', $this->id)
                        ->set('dt_create', $this->dt_create)
                        ->execute();
    }

    private function getAlias($hash = null)
    {
        $alias  =   Dao_Alias::select()
                ->where('hash', '=', md5($hash, true))->limit(1)->execute();

        return $alias;
    }

    public function generateAlias($route)
    {
        $alias  = $this->getAlias($route);
        $newAlias = $route;
        if ( !empty($alias) )
        {
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;

                if ( empty($this->getAlias(md5($newAlias, true)) ) )
                {
                    return $newAlias;
                    break;
                }
            }
        }

        return $newAlias;
    }

    /**
     *@params $systemRouteKey - индекс переданного системного роута( из массива ControllersMap )
     */
    public function getRealRoute($route, $sub_action = null, $system = false, $systemRouteKey = null)
    {
        $model_uri = Model_Uri::Instance();

        $alias = $this->getAlias($route);

        if ( empty($alias) && $system == false)
            throw new HTTP_Exception_404();

        if ($system == true)
        {
            return $model_uri->controllersMap[$systemRouteKey] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/showAll/';
        }

        if ($sub_action == null)
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/show/' . $alias['id'];
        else
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::MODIFY] . '/' . $sub_action . '/' . $alias['id'];
    }

}