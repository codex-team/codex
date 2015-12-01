<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Views extends Model
{

    public function __construct()
    {
    }

    public static function increment($id)
    {

            $redis = Controller_Base_preDispatch::_redis();

            $check = $redis->exists('article-'.$id);

            if ($check == 0) {
                $redis->set('article-'.$id, 0);
            }

            $redis->incr('article-'.$id);

    }

    public static function get($ids)
    {

        $redis = Controller_Base_preDispatch::_redis();

        $views = array(); 

        foreach ($ids as $id){
            array_push($views, $redis->get('article-'.$id)); 
        }

        return $views;

    }
}
