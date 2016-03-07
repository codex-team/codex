<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 27.02.2016
 * Time: 22:43
 */

interface Factory_Alias {
    function hash($uri);
}

class Sha256 implements Factory_Alias {
    function hash($uri)
    {
        return hash('sha256', $uri);
    }
}

class HashSum implements Factory_Alias {
    function hash($uri)
    {
        // Если с Sha256 не получится, попробую старый алгоритм. С sha256 работает довольно медленно
        echo 'My Method';
    }
}

class Model_Alias
{
    public $uri;
    public $hash;
    public $type;
    public $id;
    public $dt_create;

    /**
     * Пустой конструктор для модели алиасов, если нужно получить статью из хранилища, нужно пользоваться статическими
     * методами
     */
    public function __construct()
    {
    }

    public function set($alias)
    {
        $this->uri          =   $alias['uri'];
        $this->hash         =   $alias['hash'];
        $this->type         =   $alias['type'];
        $this->id           =   $alias['id'];
        $this->dt_create    =   $alias['dt_creat'];
    }

    public function insert()
    {
        $idAndRowAffected = Dao_Alias::insert()
                        ->set('uri', $this->uri)
                        ->set('hash', $this->hash)
                        ->set('type', $this->type)
                        ->set('id', $this->id)
                        ->set('dt_create', $this->dt_create)
                        ->clearcache()
                        ->execute();
    }

    private function getAlias($hash = null)
    {
        $alias  =   Dao_Alias::select()
                            ->where('hash', '=', $hash)->limit(1);

        $alias = $alias->execute();

        return $alias;
    }

    public function generateAlias($route)
    {

        $hashType = new Sha256();
        $hashedRoute = $hashType->hash($route);

        $alias  = $this->getAlias($hashedRoute);    // Проверяет хэш алиаса, существует ли такой Алиас в БД

        $newAlias = $route;                         // Устанавливаем передаваемый роут как дефолтный

        if ( !empty($alias) )
        {
            /*
             * Если в БД есть Алиас похожий на $route, то в цикле перебираем индексы от 1 до бесконечности,
             * до тех пор, пока не найдем не совпадающий Алиас
             */
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;       // Генерируем Алиасы $route'-'$index
                if ( empty($this->getAlias($hashType->hash($newAlias))))    // Проверка, если нет такого Алиаса, тогда добавляем в БД
                {
                    return $newAlias;
                    break;
                }
            }
        }

        return $newAlias;
    }

    public function getRealRoute($route, $sub_action = null, $system = false, $systemRouteKey = null)
    {
        $model_uri = Model_Uri::Instance();
        $hashType = new Sha256();

        $hashedRoute = $hashType->hash($route);
        $alias = $this->getAlias($hashedRoute);

        if ( empty($alias) && $system == false)     // Если переданные параметры нет в БД и не являются системными
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