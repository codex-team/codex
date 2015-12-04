<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Stats extends Model
{
    const ARTICLE = 1;


    public function __construct()
    {
    }

    public static function increment($template)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $redis->incr($template);
    }

    public static function format($type, $id, $time)
    {
        $template = 'stats:' . $type . ':target:' . $id . ':time:' . $time;

        return $template;
    }

    public static function write_stats($template)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $redis->set($template);
    }

    public static function get_views($template)
    {
        $redis = Controller_Base_preDispatch::_redis();

        $views = $redis->get($template); 

        return $views;
    }
}