<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 27.02.2016
 * Time: 22:39
 */

class Dao_Alias extends Dao_MySQL_Base
{
    protected $cache_key    = 'Dao_Alias';
    protected $table        = 'Alias';
}
