<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 23.02.2016
 * Time: 13:03
 */

class Model_Uri {

    const Article = 0;
    const Contest = 1;
    const User = 2;

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

    public function hash($string)
    {
        $length = strlen($string);

        $pow[0] = 1;

        for($i = 1; $i < $length; $i++)
            $pow[$i] = $pow[$i - 1] * self::KEY;

        $hash = 0;
        for($i = 1; $i < $length; $i++)
            $hash += $pow[$i] * ord($string[$i]);

        return $hash;
    }

    public function getAliases()
    {
        $select = DB::select('*')->from('alias')->execute();
        $aliases = $select->as_array();

        foreach($aliases as $key => $value)
            $hashes[$value['hash']] = $value['string'];

        $this->hashes = $hashes;
        return $this->hashes;
    }

    public function setNewAlias($string, $hash, $type, $id)
    {

        $insert = DB::insert('Alias', array(
            'string', 'hash', 'type', 'id'
        ))->values(array(
            $string, $hash, $type, $id
        ))
        ->execute();
    }

    public function getAlias($hash)
    {
        $select = DB::select('*')->from('Alias')->where('hash', '=', $hash)->execute()->as_array();
        return Arr::get($select, '0', '');
    }

    public function getForbiddenAliases()
    {
        $select = DB::select('*')->from('Forbidden')->execute()->as_array();;

        foreach($select as $key => $value)
            $result[] = $value['string'];

        return $result;
    }

    public function getTypeDefinition($type)
    {
        switch($type) {
            case self::Article:
                return 'article';
                break;
            case self::Contest:
                return 'contest';
                break;
            case self::User:
                return 'user';
                break;
        }
    }
}
