<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Stats extends Model
{
    const ARTICLE = 1;


    public function __construct()
    {
    }

    public static function increment($article_id)
    {

            $redis = Controller_Base_preDispatch::_redis();

            /*$check = $redis->exists('stats:' . self::ARTICLE . ':target:' . $article_id . ':time:' . 0);

            if ($check == 0) {
                $redis->set('stats:' . self::ARTICLE . ':target:' . $article_id . ':time:' . 0, 0);
            }*/

            $redis->incr('stats:' . self::ARTICLE . ':target:' . $article_id . ':time:' . 0);

    }

    public static function get($ids)
    {

        $redis = Controller_Base_preDispatch::_redis();

        $views = array(); 

        foreach ($ids as $article_id){
            array_push($views, $redis->get('stats:' . self::ARTICLE . ':target:' . $article_id . ':time:' . 0)); 
        }

        return $views;

    }
}