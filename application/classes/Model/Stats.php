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

            $redis->incr('stats:' . self::ARTICLE . ':target:' . $article_id . ':time:' . 0);

    }

    public static function get($articles)
    {

        $redis = Controller_Base_preDispatch::_redis();

        $views = array(); 

        foreach ($articles as $article){
            array_push($views, $redis->get('stats:' . self::ARTICLE . ':target:' . $article->id . ':time:' . 0)); 
        }

        return $views;

    }
}