<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 23.02.2016
 * Time: 13:03
 */

class Model_Uri {

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

    public $system = null;
    private static $_instance;

    private function __construct() {
    }

    private function __clone() {
    }

    public static function Instance() {
        if (self::$_instance == null)
            self::$_instance = new self();

        return self::$_instance;
    }

    public function getForbiddenAliases($action)
    {
        $select = Dao_Forbidden::select()->where('string', '=', $action)->limit(1)->execute();

       return $select;
    }
}
