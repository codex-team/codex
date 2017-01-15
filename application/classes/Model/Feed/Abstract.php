<?php

class Model_Feed_Abstract extends Model {

    protected $redis;
    protected $prefix;

    protected $timeline_key = null;

    /**
     * Timeline constructor.
     * При создании экземпляра класса можно передать префикс для хранения в фиде различных сущностей.
     * По умолчанию префикс отсутствует.
     *
     * @param string $prefix
     */
    public function __construct($prefix = '')
    {
        $this->redis = Controller_Base_preDispatch::_redis();

        $this->prefix = $prefix;
    }

    /**
     * Получаем идентефикатор, с учетом типа (префикса) элемента
     *
     * @param $id
     * @return string
     */
    public function composeValueIdentity($id)
    {
        if (!$this->prefix) {
            return $id;
        }

        return $this->prefix.':'.$id;
    }

    /**
     * Разбиваем идентефикатор на префих и id
     *
     * @param string $identity
     *
     * @return array - массив из двух элементов (prefix, id)
     */
    public function decomposeValueIdentity($identity) {
        return explode(':', $identity);
    }

    /**
     * Меняем порядок элементов в фиде
     *
     * @param int           $item_id - id элемента, который переставляем
     * @param string|null   $item_below_value - value элемента,
     * после которого в sorted set вставляем $item (перед которым $item будет выводиться).
     * Если передан null, вставляем $item в начало sored set, то есть в конец фида
     *
     * @return string|bool - false при ошибке или новое значение score, представленное в строке
     */
    public function putAbove($item_id, $item_below_value)
    {
        $item_value = $this->composeValueIdentity($item_id);

        if ($this->redis->zRank($this->timeline_key, $item_value) === false) {
            return false;
        }


        //Если в качестве $item_below_value передан null, переставляем элемент в самое начало списка
        if (is_null($item_below_value)) {
            $first_item_value = $this->redis->zRange($this->timeline_key, 0, 0); //actually, array([0] => first_item_value)
            $first_item_score = $this->redis->zScore($this->timeline_key, $first_item_value[0]);

            $this->redis->zAdd($this->timeline_key, $first_item_score-1, $item_value);
        }

        if($this->redis->zRank($this->timeline_key, $item_below_value) === false) {
            return false;
        }

        $item_below_score = $this->redis->zScore($this->timeline_key, $item_below_value);

        //Увеличиваем всем элементам после $item_below_value значение на 1, чтобы точно вставить элемент в нужное место
        $elements_below = $this->redis->zRangeByScore($this->timeline_key, $item_below_score+1, '+inf');

        foreach ($elements_below as $element_value) {
            $this->redis->zIncrBy($this->timeline_key, 1, $element_value);
        }

        return $this->redis->zAdd($this->timeline_key, $item_below_score + 1, $item_value);
    }

    /**
     * Добавляем элемент в фид.
     * Идентефикатор сформируется с учетом префикса текущего экземпляра класса
     *
     * @param int $item_id
     * @param int $item_score
     * @return bool|int
     */
    public function add($item_id, $item_score)
    {
        $value = $this->composeValueIdentity($item_id);

        if ($this->redis->zRank($this->timeline_key, $value) !== false) {
            return false;
        }

        return $this->redis->zAdd($this->timeline_key, $item_score, $value);
    }

    /**
     * Удаляем элемент из фида
     *
     * @param $item_id
     */
    public function remove($item_id)
    {
        $value = $this->composeValueIdentity($item_id);

        $this->redis->zRem($this->timeline_key, $value);
    }


    /**
     * Получаем индентефикаторы элементов фида с $offset по $numberOfItems
     *
     * @param int $numberOfItems - если не указан, возвращает элементы с $offset до последнего
     * @param int $offset - если не указан, возвращает элементы с первого до $numberOfItems
     *
     * @return array - массив идентефикаторов элементов
     */
    public function get($numberOfItems = 0, $offset = 0) {

        $end = $numberOfItems + $offset;

        $end = $this->redis->zCard($this->timeline_key) > $end ? $end : 0;

        return $this->redis->zRevRange($this->timeline_key, $offset, $end - 1);
    }

    /**
     * Метод для первой инициализации фида.
     *
     * @param {array} $items -  ассоциативный массив идентефикаторов элементов с датой создания(поля 'id' и 'dt_create')
     */
    public function init($items)
    {
        foreach ($items as $item) {
            $this->add($item['id'], $item['dt_create']);
        }
    }

    /**
     * Метод для переиндексации списка (индексация с 0)
     */
    public function reindexing() {
        $elements = $this->redis->zRange($this->timeline_key, 0, -1);

        foreach ($elements as $i => $element) {
            $this->redis->zAdd($this->timeline_key, $i, $element);
        }
    }

    /**
     * Очистить фид
     */
    public function clear() {
        $this->redis->del($this->timeline_key);
    }
}
