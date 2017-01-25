<?php

class Model_Feed_Articles extends Model_Feed_Abstract {

    protected $timeline_key = 'feed';

    /**
     * Добавляем элемент в фид, передав в score дату создания
     *
     * @param int $item_id
     * @param int $item_dt_create
     *
     * @return bool|int
     */
    public function add($item_id, $item_dt_create) {
        return parent::add($item_id, strtotime($item_dt_create));
    }

    /**
     * Получаем массив моделей статей и курсов.
     *
     * @param int $numberOfItems - количество элементов, которое хотим получить. Если не указан - получаем все
     *
     * @return bool|array
     * @throws Exception
     */
    public function get($numberOfItems = 0, $offset = 0) {

        $items = parent::get($numberOfItems, $offset);

        if (is_array($items)) {
            $models_list = array();

            foreach ($items as $item_identity) {

                list($prefix, $id) = $this->decomposeValueIdentity($item_identity);

                switch ($prefix) {

                    case Model_Article::FEED_PREFIX:
                        $models_list[] = Model_Article::get($id);
                        break;

                    case Model_Courses::FEED_PREFIX:
                        $models_list[] = Model_Courses::get($id);
                        break;

                    default:
                        $error_text = 'Invalid feed type';
                        throw new Exception($error_text);
                }
            }
            return $models_list;
        }

        return false;
    }

}
