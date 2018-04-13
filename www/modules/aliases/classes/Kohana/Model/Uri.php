<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Model_Uri
{
    private static $_instance;

    public static function Instance()
    {
        if (self::$_instance == null) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    /**
     * Check if this alias is already referenced to system
     *
     * @param string $alias
     *
     * @return boolean
     *
     * @throws Kohana_Exception
     */
    public static function isSystemAlias($alias)
    {
        $system_aliases = Kohana::$config->load('system-aliases')['system'];

        return in_array($alias, $system_aliases) ? 1 : 0;
    }

    /**
     * Class Methods
     */
    private function __construct() {}
    private function __clone() {}
    private function __sleep() {}
    private function __wakeup() {}
}
