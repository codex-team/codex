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

    public static function getAlias($hash = null)
    {
        $alias  =   Dao_Alias::select()
                ->where('hash', '=', $hash)->limit(1)->execute();

        return $alias;
    }

    public static function generateAlias($route)
    {
        $alias  = self::getAlias( md5($route, true) );
        $newAlias = $route;

        if ( !empty($alias) )
        {
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;

                if ( empty(self::getAlias(md5($newAlias, true)) ) )
                {
                    return $newAlias;
                    break;
                }
            }
        }

        return $newAlias;
    }

    /*
     * Возвращает прямой путь к контроллеру и экшну.
     */
    public function getRealRoute($route, $sub_action = null)
    {
        $model_uri = Model_Uri::Instance();

        $hashedUri = md5($route, true);     // Хэшируем в md5 полученный роут.

        $alias = $this->getAlias($hashedUri);

        if ( empty($alias) )
            throw new HTTP_Exception_404();

        if ($sub_action == null)
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/show/' . $alias['id'];
        else
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::MODIFY] . '/' . $sub_action . '/' . $alias['id'];
    }

    /*
     * Добавляет новый алиас в таблицу Alias и обновляет uri в сущности $type с идентификатором $id
     */

    public static function addAlias($alias, $type, $id)
    {
        $newAlias    = self::generateAlias($alias);
        $hash        = md5($newAlias, true);
        $dt_create  = DATE::$timezone;

        $model_alias = new Model_Alias($newAlias, $hash, $type, $id, $dt_create);
        $model_alias->save();

        self::updateAlias($newAlias, $type, $id);
    }


    /*
     * Обновляет в сущности uri.
     * @params: $alias - новый uri, $type - сущность, $id - идентификатор
     */

    public static function updateAlias($alias, $type, $id)
    {
        $model_uri  = Model_Uri::Instance();
        $Dao = 'Dao_' . $model_uri->controllersMap[$type];

        if ( class_exists($Dao) ) {

            $DaoClass = new $Dao();
            $DaoClass->update()->set('uri', $alias)->where('id','=', $id)->execute();
        }
    }

}