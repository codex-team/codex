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
    public $hashRaw;
    public $hash;
    public $type;
    public $id;
    public $dt_create;
    public $deprecated;

    public function __construct($uri = null, $type = null, $id = null, $dt_create = null, $deprecated = 0)
    {
        $this->uri          =   $uri;
        $this->hash         =   md5( $this->uri );
        $this->hashRaw      =   md5( $this->uri, true);
        $this->type         =   $type;
        $this->id           =   $id;
        $this->dt_create    =   $dt_create;
        $this->deprecated   =   $deprecated;
    }

    public function save()
    {
        $insert = Dao_Alias::insert()
                        ->set('uri', $this->uri)
                        ->set('hash', $this->hashRaw)
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
        $newAlias = $route;

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
                                     ->execute();

        self::addAlias($alias, $type, $id);
        self::updateSubstanceUri( $alias, $type, $id );
    }

    public static function updateSubstanceUri($alias, $type, $id)
    {
        /*
         * $model_uri->controllersMap[$type] возвращает название сущности.
         * $type должен соответствовать ключу из массива controllersMap в Model_Uri, а значение с Таблицами в БД
         * в переменной $Dao получаем строку "Dao_название-сущности" (Dao_Articles, Dao_Contests и тд)
         */

        $model_uri  = Model_Uri::Instance();
        $type = $model_uri->controllersMap[$type];

        $Dao = 'Dao_' . $type;

        if ( class_exists($Dao) ) {
            $DaoClass = new $Dao();
            $DaoClass->update()->set('uri', $alias)->where('id','=', $id)
                ->clearcache( strtolower($type) . '_list')->execute();
        }
    }

    public static function generateUri( $string )
    {
        $converter = array(
                'а' => 'a',   'б' => 'b',   'в' => 'v',
                'г' => 'g',   'д' => 'd',   'е' => 'e',
                'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
                'и' => 'i',   'й' => 'y',   'к' => 'k',
                'л' => 'l',   'м' => 'm',   'н' => 'n',
                'о' => 'o',   'п' => 'p',   'р' => 'r',
                'с' => 's',   'т' => 't',   'у' => 'u',
                'ф' => 'f',   'х' => 'h',   'ц' => 'c',
                'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
                'ь' => "",    'ы' => 'y',   'ъ' => "",
                'э' => 'e',   'ю' => 'yu',  'я' => 'ya',

                'А' => 'A',   'Б' => 'B',   'В' => 'V',
                'Г' => 'G',   'Д' => 'D',   'Е' => 'E',
                'Ё' => 'E',   'Ж' => 'Zh',  'З' => 'Z',
                'И' => 'I',   'Й' => 'Y',   'К' => 'K',
                'Л' => 'L',   'М' => 'M',   'Н' => 'N',
                'О' => 'O',   'П' => 'P',   'Р' => 'R',
                'С' => 'S',   'Т' => 'T',   'У' => 'U',
                'Ф' => 'F',   'Х' => 'H',   'Ц' => 'C',
                'Ч' => 'Ch',  'Ш' => 'Sh',  'Щ' => 'Sch',
                'Ь' => "",    'Ы' => 'Y',   'Ъ' => "",
                'Э' => 'E',   'Ю' => 'Yu',  'Я' => 'Ya',
                ' ' => '-',   '-' => '-',   '-' => '-',    '.' => '-',
                ',' => '-',   '\'' => '',   '\"' => '',    '(' => '-', ')' => '-',
                '?' => '-',   '#' => '-',   '$' => '-',    '!' => '-',
                '@' => '-',   '%' => '-',   '&' => '-',    '*' => '-',
                '`' => '-',   '\\' => '-',  '/' => '-'//,    '*' => '-'
            );
            // translit
            $tmp = strtr($string, $converter);
            // remove underline from begin and end of line
            $tmp = trim($tmp, "_");
            // replace lines
            $tmp = strtr($tmp, array(
                "__"    => "_",
                "___"   => "_",
                "____"  => "_",
                "_____" => "_",
            ));

            return strtolower( $tmp );
    }

}