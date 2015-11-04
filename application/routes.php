<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 */

$DIGIT = '\d+';
$STRING = '[-a-zA-Z\d_]+';

Route::set('INDEX_PAGE', '')->defaults(array(
    'controller' => 'index',
    'action' => 'index'
));

Route::set('ARTICLE_LIST', 'articles')->defaults(array(
    'controller' => 'articles_index',
    'action' => 'showArticles'
));

Route::set('ARTICLE_DETAIL', 'articles/<article_code>', array('article_code' => $STRING))->defaults(array(
    'controller' => 'articles_detail',
    'action' => 'showArticle'
));

Route::set('ARTICLE_EDIT', 'articles/edit/<article_id>', array('article_id' => $DIGIT . '|new'))->defaults(array(
    'controller' => 'articles_edit',
    'action' => 'showEditor'
));


Route::set('ARTICLE_DELETE', 'articles/delete/<article_id>', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'articles_edit',
    'action' => 'deleteArticle'
));


//Route::set('ARTICLE_PAGE', 'article/(<article_uri>)', array('article_id' => $DIGIT))->defaults(array(
//    'controller' => 'articles_index',
//    'action' => 'showArticle'
//));

// Defaults
// Route::set('default', '(<controller>(/<action>(/<id>)))')
//     ->defaults(array(
//         'controller' => 'index',
//         'action'     => 'index',
//     ));