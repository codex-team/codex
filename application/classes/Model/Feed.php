<?php

class Model_Feed extends Model {

    private $redis;

    public function __construct()
    {
        $this->redis = Controller_Base_preDispatch::_redis();
    }

    /**
     * Получаем значение, которое будет записано в Redis ([article|course]:<id>)
     *
     * @param $item
     * @return string
     */

    public function composeValueIdentity($item)
    {
        return self::getType($item).':'.$item->id;
    }


    /**
     * Получаем тип объекта (курс или статья)
     *
     * @param $item
     * @return bool|string
     */
    public function getType($item) {

        switch ($item::FEED_TYPE) {

            case 'article': return 'article';
            case 'course': return 'course';
            default: throw new Exception();

        }

    }

    /**
     * Меняем порядок элементов в фиде
     *
     * @param $item_after - элемент, после которого в sorted set вставляем (перед которым будет выводиться элемент)
     *
     * @return void|bool
     */
    public function putAbove($item, $item_below)
    {
        $item_value = self::composeValueIdentity($item);
        $item_below_value = self::composeValueIdentity($item_below);

        if ($this->redis->zRank('feed', $item_value) === false) {
            return false;
        }

        if($this->redis->zRank('feed', $item_below_value) === false) {
            return false;
        }

        $interval = $this->redis->zScore('feed', $item_below_value) - $this->redis->zScore('feed', $item_value);

        $this->redis->zIncrBy('feed', $interval + 1, $item_value);
    }

    /**
     * Добавляем элемент в фид
     *
     * @param $item
     * @return bool|void
     */
    public function add($item)
    {
        $value = self::composeValueIdentity($item);

        if ($this->redis->zRank('feed', $value) !== false) {
            return false;
        }

        $this->redis->zAdd('feed', strtotime($item->dt_create), $value);

    }

    /**
     * Удаляем элемент из фида
     *
     * @param $item
     */
    public function remove($item)
    {
        $value = self::composeValueIdentity($item);

        $this->redis->zRem('feed', $value);
    }


    /**
     * Добавляем все опубликованные статьи в фид (для инициализации фида в Redis)
     */
    public function addActiveArticles()
    {

        $articles = Model_Article::getActiveArticles();

        foreach ($articles as $article) {
            self::add($article);
        }

    }

    public function get() {

        $list = $this->redis->zRevRange('feed', 0, -1);

        $models_list = array();

        foreach ($list as $i => $item) {

            list($type, $id) = explode(':', $item);

            switch ($type) {

                case 'article':
                    $models_list[$i]['model'] = Model_Article::get($id);
                    break;

                case 'course':
                    $models_list[$i]['model'] = Model_Courses::get($id);
                    break;
                default: throw new Exception();

            }

            $models_list[$i]['type'] = $type;
        }

        return $models_list;
    }
}

