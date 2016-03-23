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
                        ->clearcache()
                        ->execute();
    }

    public static function getAlias($route = null)
    {
        $hashedRoute = md5($route, true);

        $alias  =   Dao_Alias::select()
                ->where('hash', '=', $hashedRoute)->limit(1)->cached(10*Date::MINUTE)->execute();

        return $alias;
    }

    public static function generateAlias($route)
    {
        $alias  = self::getAlias( $route );
        $newAlias = $route;

        if ( !empty($alias) )
        {
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;

                if ( empty(self::getAlias($newAlias) ) )
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

    /*
     * Возвращает прямой путь к контроллеру и экшну.
     */
    public function getRealRoute($route, $sub_action = null)
    {
        $model_uri = Model_Uri::Instance();

        $alias = $this->getAlias( $route );

        if ( empty($alias) )
            throw new HTTP_Exception_404();

        if ($sub_action == null)
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::INDEX] . '/show/' . $alias['id'];
        else
            return $model_uri->controllersMap[$alias['type']] . '_' . $model_uri->actionsMap[$model_uri::MODIFY] . '/' . $sub_action . '/' . $alias['id'];
    }

    /*
     * Добавляет новый алиас в таблицу Alias и обновляет uri в сущности $type с идентификатором $id
     * @params $newAlias - сгенерированный алиас, $hash - хэш от алиаса, $dt_create - дата создания.
     * Создается новый экземпляр класса Model_Alias и передается в конструктор переменные. Метод save() записывает в таблицу данные.
     * Обновляем в сущности (Articles, Contests, Users) значение поля uri. ( cм. Статический метод updateAlias() )
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
     * Обновляет в сущности (Articles, Contests, Users и тд) поле uri.
     * @params: $alias - новый uri, $type - тип сущности (см Model_Uri - $controllersMap), $id - идентификатор
     */

    public static function updateAlias($alias, $type, $id)
    {
        $model_uri  = Model_Uri::Instance();

        /*
         * $model_uri->controllersMap[$type] возвращает название сущности.
         * $type должен соответствовать ключу из массива controllersMap в Model_Uri, а значение с Таблицами в БД
         * в переменной $Dao получаем строку "Dao_название-сущности" (Dao_Articles, Dao_Contests и тд)
         */

        $Dao = 'Dao_' . $model_uri->controllersMap[$type];

        if ( class_exists($Dao) ) {

            $DaoClass = new $Dao();
            $DaoClass->update()->set('uri', $alias)->where('id','=', $id)->clearcache()->execute();
        }
    }

}