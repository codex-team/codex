<?php defined('SYSPATH') or die('No direct script access.');

class Model_Methods extends Model
{
	/**
	*	Site Methods Model
	*/


    /**
    * Склонение существительных после числительных
    * @param string $num - числительное
    * @param string $nominative - именительный падеж
    * @param string $genitive_singular - родительный падеж, единственное число
    * @param string $genitive_plural - родительный падеж, множественное число
    */
    public function num_decline($num, $nominative, $genitive_singular, $genitive_plural)
    {
        if($num > 10 && ( floor(($num % 100) / 10) )  == 1){
                return $genitive_plural;
        } else {
            switch($num % 10){
                case 1: return $nominative;
                case 2: case 3: case 4: return $genitive_singular;
                case 5: case 6: case 7: case 8: case 9: case 0: return $genitive_plural;
            }
        }
    }


}