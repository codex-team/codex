<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Stats extends Model
{
    const ARTICLE = 1;
    public $redis;


    public function __construct()
    {
        //$this->$redis = Controller_Base_preDispatch::_redis();
    }

    public static function incrementStats($key)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $redis->incr($key);
    }

    /*
    * Форматирует ключ для статистики.
    * Принимает на вход тип статистики, цель (то, к чему она применяется) и дату.
    * Возвращает ключ.
    */
    public static function formatStatsKey($type, $id, $time)
    {
        $key = 'stats:' . $type . ':target:' . $id . ':time:' . $time;

        return $key;
    }

    /*
    * Добавляет статистику в Redis с ключом $key.
    *
    */
    public static function writeStats($key)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $redis->set($key);
    }

    public static function getStats($key)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $views = $redis->get($key); 

        return $views;
    }
}