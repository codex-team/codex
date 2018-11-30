<?php defined('SYSPATH') or die('No Direct Script Access');

class Model_Feed_Custom extends Model_Feed_Abstract
{
    /**
     * Feed key fill be composed on the fly when instance will be created:
     * For example: user:1234, child-pages:12 etc
     * @var string
     */
    protected $timeline_key = '';

    /**
     * Model_Feed_Custom constructor.
     * @param string $feedKey
     */
    public function __construct(string $feedKey, $prefix = '')
    {
        $this->timeline_key = $feedKey;

        parent::__construct($prefix);
    }

    public function get($numberOfItems = 0, $offset = 0)
    {
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
