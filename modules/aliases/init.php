<?php

/**
 * Alias System
 * https://ifmo.su/
 * @author CodeX team team@ifmo.su
 */

$DIGIT = '\d+';
$STRING = '[-a-z\d]+';
$QUERY =  '[0-9a-zA-Zа-яёА-ЯЁ\s\-\.]+$';

Route::set('URI', '<route>(/<subaction>)', array(

    'route' => $STRING,

    ))
    ->filter( function(Route $route, $params, Request $request ) {

        $alias = $params['route'];
        $model_uri = Model_Uri::Instance();

        if ( $model_uri->isForbidden($alias) ) {
            return false;
        }

    })
    ->defaults(array(
        'controller' => 'Uri',
        'action' => 'get',
    ));