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
    public $hash_raw;
    public $hash;
    public $type;
    public $id;
    public $dt_create;
    public $deprecated;

    public function __construct($uri = null, $type = null, $id = null, $dt_create = null, $deprecated = 0)
    {
        $this->uri          =   $uri;
        $this->hash         =   md5( $this->uri );
        $this->hash_raw     =   md5( $this->uri, true);
        $this->type         =   $type;
        $this->id           =   $id;
        $this->dt_create    =   $dt_create;
        $this->deprecated   =   $deprecated;
    }

    public function save()
    {
        $insert = Dao_Alias::insert()
                        ->set('uri', $this->uri)
                        ->set('hash', $this->hash_raw)
                        ->set('type', $this->type)
                        ->set('id', $this->id)
                        ->set('dt_create', $this->dt_create)
                        ->set('deprecated', $this->deprecated)
                        ->clearcache('hash:'. $this->hash)
                        ->execute();


    }

    public static function getAlias($route = null)
    {
        $hashedRouteRaw = md5( $route, true );
        $hashedRoute    = md5( $route );

        $alias  =   Dao_Alias::select()
                ->where('hash', '=', $hashedRouteRaw)
                ->limit(1)
                ->cached( 5 * Date::MINUTE, 'hash:' . $hashedRoute)
                ->execute();

        return $alias;
    }

    public static function generateAlias($route)
    {
        $alias  = self::getAlias( $route );
        $hashedRouteRaw = md5( $route, true );
        $hashedRoute    = md5( $route );

        /*
         * Setting $newAlias = $route as default until we looking for new unengaged alias.
         */
        $newAlias = $route;

        if ( $alias['deprecated'] ) {
            self::deleteAlias($hashedRouteRaw, $hashedRoute);
            return $newAlias;
        }

        if ( !empty($alias) )
        {
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;

                $aliasExist = self::getAlias($newAlias);

                if ( !$aliasExist )
                {
                    return $newAlias;
                    break;
                }
                else
                {
                    $newAlias = $route;
                }
            }
        }

        return $newAlias;
    }


    /**
     * Returns Controller, Action and Id by alias
     * @param $route - alias from uri
     * @param $sub_action = null - default value
     * @return array with contorller , action and id
     * @throws HTTP_Exception_404
     */

    public function getRealRequestParams($route, $sub_action = null)
    {
        $model_uri = Model_Uri::Instance();

        $alias = $this->getAlias( $route );

        if ( empty($alias) )
            throw new HTTP_Exception_404();

        if ($sub_action == null)
            return array(
                'controller' => 'Controller_' . $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::INDEX],
                'action'     => 'action_show',
                'id'         => $alias['id']
            );
        else
            return array(
                'controller' => 'Controller_' . $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::MODIFY],
                'action'     => 'action_' . $sub_action ,
                'id'         => $alias['id']
            );
    }

    /*
     * Добавляет новый алиас в таблицу Alias и обновляет uri в сущности $type с идентификатором $id
     * @params $newAlias - сгенерированный алиас, $hash - хэш от алиаса, $dt_create - дата создания.
     * Создается новый экземпляр класса Model_Alias и передается в конструктор переменные. Метод save() записывает в таблицу данные.
     * Обновляем в сущности (Articles, Contests, Users) значение поля uri. ( cм. Статический метод updateAlias() )
     */

    public static function addAlias($alias, $type, $id, $deprecated = 0)
    {
        $newAlias    = self::generateAlias($alias);
        $dt_create  = DATE::$timezone;

        $model_alias = new Model_Alias($newAlias, $type, $id, $dt_create, $deprecated);
        $model_alias->save();

        self::updateSubstanceUri( $newAlias, $type, $id );

        return $model_alias->uri;
    }


    /*
     * Обновляет в сущности (Articles, Contests, Users и тд) поле uri.
     * @params: $alias - новый uri, $type - тип сущности (см Model_Uri - $controllersMap), $id - идентификатор
     */

    public static function updateAlias($oldAlias = null, $alias, $type, $id)
    {
        $hashedRouteRaw = md5($alias, true);
        $hashedRoute    = md5($alias);

        $hashedOldRouteRaw = md5($oldAlias, true);
        $hashedOldRoute    = md5($oldAlias);

        $update = Dao_Alias::update()->set('deprecated', 1)
                                     ->where('hash', '=', $hashedOldRouteRaw)
                                     ->clearcache('hash:' .$hashedOldRoute)
                                     ->execute();

        $newAlias = self::addAlias($alias, $type, $id);
    }

    public static function deleteAlias($hash_raw, $hash)
    {
        $delete = Dao_Alias::delete()->where('hash', '=', $hash_raw)
                                    ->clearcache('hash:' . $hash)
                                    ->execute();
    }

    public static function updateSubstanceUri($newAlias, $type, $id)
    {
        /*
         * $model_uri->controllersMap[$type] возвращает название сущности.
         * $type должен соответствовать ключу из массива controllersMap в Model_Uri, а значение с Таблицами в БД
         * в переменной $Dao получаем строку "Dao_название-сущности" (Dao_Articles, Dao_Contests и тд)
         */

        $model_uri  = Model_Uri::Instance();
        $type = $model_uri->controllersMap[$type];

        $Dao = 'Dao_' . $type;

        if ( class_exists($Dao) )
        {
            $DaoClass = new $Dao();
            $DaoClass->update()->set('uri', $newAlias)->where('id','=', $id)
                ->clearcache( strtolower($type) . '_list');
        }
    }

    public static function generateUri( $string )
    {
        $model_methods = new Model_Methods();
        $converted_string = $model_methods->rus2translit( $string );

        $converted_string = preg_replace("/[^0-9a-zA-Z]/", "-", $converted_string);
        // заменяем несколько дефисов на один
        $converted_string = preg_replace('/-{2,}/', '-', $converted_string);
        // отсекаем лишние дефисы по краям
        $converted_string = trim($converted_string, '-');


        return strtolower( $converted_string );
    }

}