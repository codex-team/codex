<?php defined('SYSPATH') or die('No Direct Script Access');
/**
 * Содержит функции для работы с redis и
 * статистикой просмотров.
 *
 * @author Ivan Zhuravlev
 */
class Model_Stats extends Model
{
    const ARTICLE = 1;
    private static $redis;


    public function __construct()
    {
        if (!self::$redis) {
            self::$redis = Controller_Base_preDispatch::_redis();
        }
    }

    /*
    * Если статистики с такими параметрами нет, то
    * создает ее.
    * Если есть, то инкрементирует (увеличивает на 1).
    */
    public function hit($type, $id, $time = 0)
    {
        if (!self::$redis) {
            return;
        }

        $key = self::getKey($type, $id, $time);

        if (!self::$redis->get($key)) {
            self::$redis->set($key, 1);
        }

        self::$redis->incr($key);
    }

    /*
    * Форматирует ключ для статистики.
    * Принимает на вход тип статистики, цель (то, к чему она применяется) и дату.
    * Возвращает ключ.
    */
    public function getKey($type, $id, $time)
    {
        $key = 'stats:' . $type . ':target:' . $id . ':time:' . $time;

        return $key;
    }

    public function get($type, $id, $time = 0)
    {
        if (!self::$redis) {
            return;
        }

        $key = self::getKey($type, $id, $time);

        $views = self::$redis->get($key);

        return $views;
    }
}
