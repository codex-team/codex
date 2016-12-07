<?php

class Model_Feed extends Model {

    private $redis;
    private $type;

    public function __construct($type = '')
    {
        $this->redis = Controller_Base_preDispatch::_redis();
        $this->type = $type;
    }

    /**
     * Получаем значение, которое будет записано в Redis ([article|course]:<id>)
     *
     * @param $id
     * @return string
     */

    public function composeValueIdentity($id)
    {
        return $this->type.':'.$id;
    }

    /**
     * Меняем порядок элементов в фиде
     *
     * @param $item_id - id элемента, который переставляем
     * @param $item_below_walue - value элемента,
     * после которого в sorted set вставляем $item (перед которым $item будет выводиться)
     *
     * @return void|bool
     */
    public function putAbove($item_id, $item_below_value)
    {
        $item_value = self::composeValueIdentity($item_id);

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
     * @param $item_id
     * @param $item_score
     * @return bool|void
     */
    public function add($item_id, $item_score)
    {
        $value = self::composeValueIdentity($item_id);

        if ($this->redis->zRank('feed', $value) !== false) {
            return false;
        }

        $this->redis->zAdd('feed', strtotime($item_score), $value);

    }

    /**
     * Удаляем элемент из фида
     *
     * @param $item_id
     */
    public function remove($item_id)
    {
        $value = self::composeValueIdentity($item_id);

        $this->redis->zRem('feed', $value);
    }


    /**
     * Добавляем все опубликованные статьи в фид (для инициализации фида в Redis)
     */
    public function addActiveArticles()
    {

        $articles = Model_Article::getActiveArticles();
        $this->type = Model_Article::FEED_TYPE;

        foreach ($articles as $article) {
            $this->add($article->id, $article->dt_create);
        }

    }


    /**
     * Получаем первые id элементов в фиде в количестве $numberOfItems.
     * Если п$numberOfItems не указано, то получаем все элементы в фиде.
     *
     * @param int $numberOfItems
     *
     * @return array - массив моделей статей и курсов
     * @throws Exception
     */
    public function get($numberOfItems = 0) {

        $numberOfItems = $this->redis->zCard('feed') > $numberOfItems ? $numberOfItems : 0;

        $list = $this->redis->zRevRange('feed', -$numberOfItems, -1);

        $models_list = array();

        foreach ($list as $item) {

            list($type, $id) = explode(':', $item);

            switch ($type) {

                case 'article':
                    $models_list[] = Model_Article::get($id);
                    break;

                case 'course':
                    $models_list[] = Model_Courses::get($id);
                    break;

                default:
                    throw new Exception('Invalid type of feed item');

            }
        }

        return $models_list;
    }
}
