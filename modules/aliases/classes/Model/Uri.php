<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Alias System
 * https://ifmo.su/
 * @author CodeX team team@ifmo.su
 */

class Model_Uri {

    private static $_instance;

    /*
     *  Controllers
     */

    const ARTICLE  = 1;
    const CONTEST  = 2;
    const USER     = 3;

    /*
     * Actions
     */
    const INDEX     = 1;
    const MODIFY    = 2;

    /**
     * Specifies controller to each URI type
     */

    public $controllersMap = array(
        self::ARTICLE   => 'Articles',
        self::CONTEST   => 'Contests',
        self::USER      => 'Users',
    );

    public $actionsMap  = array(
        self::INDEX     => 'Index',
        self::MODIFY    => 'Modify',
    );

    /**
     * CLass Methods
     */

    private function __construct() {
    }

    private function __clone() {
    }

    public static function Instance() {
        if (self::$_instance == null)
            self::$_instance = new self();

        return self::$_instance;
    }

    public function isForbidden($alias)
    {
        $system = Kohana::$config->load('forbidden')['system'];
        return in_array($alias, $system) ? 1 : 0;
    }
}
