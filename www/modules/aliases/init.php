<?php defined('SYSPATH') or die('No direct script access.');

$STRING = '[0-9a-zA-Z-]*';

/**
 * Process request by uri with Uri controller
 */
Route::prepend('URI', '<alias>(/<subaction>)', array(
        'alias' => $STRING,
    ))->filter(
        function (Route $route, $params, Request $request) {
            $alias = $params['alias'];
            /**
             * If this uri is a system Alias then process it as usual
             */
            if (Model_Uri::isSystemAlias($alias)) {
                return false;
            }
        }
    )->defaults(array(
        'controller' => 'Uri',
        'action' => 'get',
    ));
