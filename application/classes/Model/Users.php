<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Users extends ORM
{
    protected $_table_name = 'Users';
    protected $_table_columns = array(
        'id' => NULL,
        'first_name' => NULL,
        'last_name' => NULL,
        'uid' => NULL
    );

}