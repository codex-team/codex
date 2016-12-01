<?php

class Model_Feed extends Model {

    private $redis;
    private $value;

    public function __construct(&$item)
    {
        $this->redis = Controller_Base_preDispatch::_redis();
        $this->value = self::getValue($item);
    }

    /**
     * Получаем значение, которое будет записано в Redis ([article|course]:<id>)
     *
     * @param $item
     * @return string
     */

    public function getValue(&$item)
    {
        return self::getType($item).$item->id;
    }


    /**
     * Получаем тип объекта (курс или статья)
     *
     * @param $item
     * @return bool|string
     */
    public function getType(&$item) {

        if (get_class($item) == 'Model_Article') {
            return 'article:';
        } elseif (get_class($item) == 'Model_Course') {
           return 'course:';
        } else {
            return false;
        }

    }

    /**
     * Меняем порядок элементов в фиде
     *
     * @param $item_after - элемент, после которого в sorted set вставляем (перед которым будет выводиться элемент)
     *
     * @return void|bool
     */
    public function changeFeedOrder($item_after)
    {
        $item_after_value = self::getValue($item_after);

        if ($this->redis->zRank('feed', $this->value) === false) {
            return false;
        }

        if($this->redis->zRank('feed', $item_after_value) === false) {
            return false;
        }

        $interval = $this->redis->zScore('feed', $item_after_value) - $this->redis->zScore('feed', $this->value);

        $this->redis->zIncrBy('feed', $interval + 1, $this->value);
    }

    /**
     * Добавляем элемент в фид в Redis
     *
     * @param $item
     */
    public function addToFeedList()
    {

        var_dump($this->value);

        if ($this->redis->zRank('feed', $this->value) === false) {
            $this->redis->zAdd('feed', time(), $this->value);
        }

    }

    /**
     * Удаляем статью из фида
     *
     * @param $item
     */
    public function remFromFeedList()
    {
        $this->redis->zRem('feed', $this->value);
    }


    /**
     * Добавляем все опубликованные статьи в фид (для инициализации фида в Redis)
     */
    public function addActiveArticlesToFeedList()
    {

        $articles = Model_Article::getActiveArticles();

        foreach ($articles as $article) {
            $article->feed->addToFeedList();
        }

    }
}

