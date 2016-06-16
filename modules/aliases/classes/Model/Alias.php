<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Alias System
 * https://ifmo.su/
 * @author CodeX team team@ifmo.su
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
        $insert = DB::insert('Aliases',
            array(
                'uri',
                'hash',
                'type',
                'id',
                'dt_create',
                'deprecated'
            ))
            ->values(
                $this->uri,
                $this->hash_raw,
                $this->type,
                $this->id,
                $this->dt_create,
                $this->deprecated
            )
            ->execute();
    }

    public function getAlias($route = null)
    {
        $hashedRouteRaw = md5( $route, true );
        $hashedRoute    = md5( $route );

        $alias = DB::select('*')->from('Aliases')
                                ->where('hash', '=', $hashedRouteRaw)
                                ->limit(1)
                                ->execute();

        return Arr::get($alias, '0');
    }

    public static function generateAlias($route)
    {
        $alias  = self::getAlias( $route );

        $hashedRouteRaw = md5( $route, true );
        $hashedRoute    = md5( $route );

        /*
         * Setting $newAlias [String] = $route as default until we looking for new unengaged alias.
         */

        $newAlias = $route;

        if ( isset( $alias ) && Arr::get($alias, 'deprecated') ) {

            self::deleteAlias($hashedRouteRaw, $hashedRoute);
            return $newAlias;

        }
        elseif ( !empty($alias) && !Arr::get($alias, 'deprecated') ) {

            for($index = 1; ; $index++) {

                $newAlias = $newAlias.'-'.$index;
                $aliasExist = self::getAlias($newAlias);

                if ( empty($aliasExist) ) {

                    return $newAlias;
                    break;

                }
                else {

                    $newAlias = $route;
                }
            }
        }
        elseif ( !empty( $alias ) ) {

            $newAlias = $route;

        }

        return $newAlias;
    }


    /**
     * Returns Controller, Action and Id by alias
     * @param $route [String] - alias from uri
     * @param $sub_action [String] = null - default value
     * @return array with contorller , action and id
     * @throws HTTP_Exception_404
     */

    public function getRealRequestParams( $route, $sub_action = null )
    {
        $model_uri = Model_Uri::Instance();

        $alias = $this->getAlias( $route );

        if ( empty($alias) ) {

            throw new HTTP_Exception_404();

        }

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

    /**
     * Adds new alias to the table Alias
     * @params $alias [String] Alias, $type [int] - substance type, $deprecated [int] - deprecated alias.
     */

    public static function addAlias($alias, $type, $id, $deprecated = 0)
    {
        if ( !empty($alias) ) {

            $newAlias = self::generateAlias($alias);

            $dt_create = DATE::$timezone;
            $model_alias = new Model_Alias($newAlias, $type, $id, $dt_create, $deprecated);
            $model_alias->save();

            self::updateSubstanceUri($newAlias, $type, $id);
        }

        // Если алиас не создан, то возвращаем идентификатор добавленной сущности
        return isset( $model_alias->uri ) ? $model_alias->uri : '';
    }


    /**
     *  Updates Alias and sets Old one deprecated = 1 
     *  $alias [String] - new uri, $type [Int] - substance type (Model_Uri - $controllersMap), $id [Int]
     */

    public static function updateAlias( $oldAlias = null, $alias, $type, $id )
    {
        $hashedRouteRaw = md5($alias, true);
        $hashedRoute    = md5($alias);

        $hashedOldRouteRaw = md5($oldAlias, true);
        $hashedOldRoute    = md5($oldAlias);

        $update = DB::update('Alises')->set(array(
                'deprecated' => '1',
            ))
            ->where('hash', '=', $hashedOldRouteRaw)
            ->execute();

        return self::addAlias($alias, $type, $id);
    }

    public static function deleteAlias( $hash_raw, $hash )
    {
        $delete = DB::delete('Aliases')
                ->where('hash', '=', $hash_raw)
                ->execute();

        return $delete;
    }


    public static function generateUri( $string )
    {
        $model_methods = new Model_Methods();
        $converted_string = $model_methods->rus2translit( $string );

        $converted_string = preg_replace("/[^0-9a-zA-Z]/", "-", $converted_string);

        // replace several hyphen to one
        $converted_string = preg_replace('/-{2,}/', '-', $converted_string);

        // trim hyphen from borders
        $converted_string = trim($converted_string, '-');

        return strtolower( $converted_string );
    }

}