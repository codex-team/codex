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
        $alias  = $this->getAlias($route);              // Проверяет хэш алиаса, существует ли такой Алиас в БД
        $newAlias = $route;                             // Устанавливаем передаваемый роут как дефолтный

        if ( !empty($alias) )
        {
            /*
             * Если в БД есть Алиас похожий на $route, то в цикле перебираем индексы от 1 до бесконечности,
              до тех пор, пока не найдем несуществующий Алиас
             */
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;                       // Генерируем Алиасы $route'-'$index

                if ( empty($this->getAlias(md5($newAlias, true)) ) )    // Проверка cгенерированного Алиаса
                {
                    return $newAlias;
                    break;
                }
            }
        }

        return $newAlias;                                               // Возвращает новый Алиас
    }

    public function getRealRoute($route, $sub_action = null, $system = false, $systemRouteKey = null)
    {
        $model_uri = Model_Uri::Instance();

        $alias = $this->getAlias($route);

        if ( empty($alias) && $system == false)        // Если переданные параметры нет в БД и не являются системными
            throw new HTTP_Exception_404();

        if ($system == true)
        {
            /**
             * @systemRouteKey - индекс переданного системного роута( из массива ControllersMap )
             */

            return $model_uri->controllersMap[$systemRouteKey] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/showAll/';
        }

        if ($sub_action == null)
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/show/' . $alias['id'];
        else
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::MODIFY] . '/' . $alias['id'] . '/' . $sub_action;
    }

}