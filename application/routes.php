<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 */

$DIGIT = '\d+';
$STRING = '[-a-z\d]+';

Route::set('INDEX_PAGE', '')->defaults(array(
    'controller' => 'index',
    'action' => 'index'
));

Route::set('ARTICLE_VIEW', 'article/<article_id>')->defaults(array(
    'controller' => 'articles_index',
    'action' => 'showArticle'
));

// Defaults
// Route::set('default', '(<controller>(/<action>(/<id>)))')
//     ->defaults(array(
//         'controller' => 'index',
//         'action'     => 'index',
//     ));