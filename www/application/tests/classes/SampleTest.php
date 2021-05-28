<?php defined('SYSPATH') or die('No direct access allowed!');


class SampleTest extends PHPUnit_Framework_TestCase
{
    public function test_add()
    {
        $this->assertEquals(2, 1+1);
    }
}