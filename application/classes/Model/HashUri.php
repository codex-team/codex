<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 25.02.2016
 * Time: 16:36
 */

class Model_HashUri {

    const KEY = 31;

    private $string;

    public function __construct($string)
    {
        $this->string = $string;
    }

    public function hash()
    {
        $length = strlen($this->string);

        $pow[0] = 1;

        for($i = 1; $i < $length; $i++)
            $pow[$i] = $pow[$i - 1] * self::KEY;

        $hash = 0;
        for($i = 1; $i < $length; $i++)
            $hash += $pow[$i] * ord($this->string[$i]);

        return $hash;
    }

    public function generateNewString()
    {

        $Uri = Model_Uri::Instance();

        $aliases = $Uri->getAliases();

        if ( isset($aliases[$this->hash()]) )
        {
            for($index = 1; ; $index++) {
                $newString = $this->string . '-' . $index; // New String

                $obj = new Model_HashUri($newString);
                $newHash = $obj->hash();

                if ( !isset($aliases[$newHash])) {
                    return $newString;
                    break;
                }
            }
        }
        else {
            return $this->string;
        }
    }
}
