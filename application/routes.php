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

Route::set('ADD_COMMENT_SCRIPT', 'article/addcomment')->defaults(array(
    'controller' => 'articles_index',
    'action' => 'addComment'
));

Route::set('ARTICLE_PAGE', 'article/<article_id>', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'articles_index',
    'action' => 'showArticle'
));

// Defaults
// Route::set('default', '(<controller>(/<action>(/<id>)))')
//     ->defaults(array(
//         'controller' => 'index',
//         'action'     => 'index',
//     ));