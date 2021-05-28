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
}
