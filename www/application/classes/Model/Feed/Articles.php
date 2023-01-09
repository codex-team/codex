<?php defined('SYSPATH') or die('No Direct Script Access');

class Model_Feed_Articles extends Model_Feed_Abstract
{
    protected $timeline_key = 'feed';

    /**
     * Добавляем элемент в фид, передав в score дату создания
     *
     * @param int $item_id
     * @param int $item_dt_create
     *
     * @return bool|int
     */
    public function add($item_id, $item_dt_create)
    {
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
    public function get($numberOfItems = 0, $offset = 0)
    {
        // $benchmark = Profiler::start('parent get', __FUNCTION__);
        $items = parent::get($numberOfItems, $offset);
        // Profiler::stop($benchmark);

        if (is_array($items)) {
            $models_list = array();

            // $benchmark = Profiler::start('foreach ($items as $item_identity)', __FUNCTION__);
            foreach ($items as $item_identity) {
                // $benchmark1 = Profiler::start('decomposeValueIdentity', __FUNCTION__);
                list($prefix, $id) = $this->decomposeValueIdentity($item_identity);
                // Profiler::stop($benchmark1);

                switch ($prefix) {

                    case Model_Article::FEED_PREFIX:
                        // $benchmark2 = Profiler::start('Model_Article::get', __FUNCTION__);
                        $models_list[] = Model_Article::get($id);
                        // Profiler::stop($benchmark2);
                        break;

                    case Model_Courses::FEED_PREFIX:
                        // $benchmark2 = Profiler::start('Model_Courses::get', __FUNCTION__);
                        $models_list[] = Model_Courses::get($id);
                        // Profiler::stop($benchmark2);
                        break;

                    default:
                        $error_text = 'Invalid feed type';
                        throw new Exception($error_text);
                }
            }
            // Profiler::stop($benchmark);

            return $models_list;
        }

        return false;
    }
}
