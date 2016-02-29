<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 23.02.2016
 * Time: 13:03
 */

class Model_Uri {

    const ARTICLE  = 1;
    const CONTEST  = 2;
    const USER     = 3;

    /**
     * Specifies controller to each URI type
     */
    public $controllersMap = array(
        self::ARTICLE => 'article',
        self::USER    => 'user',
        self::CONTEST => 'contest'
    );

    private static $_instance;
    public $hashes = array();

    private function __construct() {
    }

    private function __clone() {
    }

    public static function Instance() {
        if (self::$_instance == null)
            self::$_instance = new self();

        return self::$_instance;
    }

    public function getForbiddenAliases()
    {
        $select = Dao_Forbidden::select()->execute();

        foreach($select as $key => $value)
            $result[] = $value['string'];

        return $result;
    }
}
