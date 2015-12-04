<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 */


$DIGIT = '\d+';
$STRING = '[-a-z\d]+';
$QUERY =  '[0-9a-zA-Zа-яёА-ЯЁ\s\-\.]+$';

Route::set('INDEX_PAGE', '')->defaults(array(
    'controller' => 'index',
    'action' => 'index',
));

Route::set('JOIN_PAGE', 'join')->defaults(array(
    'controller' => 'pages',
    'action' => 'index',
));

Route::set('TASK_LIST', 'task')->defaults(array(
    'controller' => 'pages',
    'action' => 'All',
));

Route::set('TASK_PAGE', 'task/<who>', array('who' => $STRING))->defaults(array(
    'controller' => 'pages',
    'action' => 'whoSet',
));

Route::set('ARTICLE_LIST', 'articles')->defaults(array(
    'controller' => 'articles_index',
    'action' => 'showAllArticles',
));

Route::set('ARTICLE_PAGE', 'article/<article_id>', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'articles_index',
    'action' => 'showArticle'
));

Route::set('NEW_ARTICLE_PAGE', 'articles/new')->defaults(array(
    'controller' => 'articles_index',
    'action' => 'newArticle'
));


// Scripts for articles

Route::set('ADD_ARTICLE_SCRIPT', 'article/addarticle')->defaults(array(
    'controller' => 'articles_action',
    'action' => 'add'
));

Route::set('DEL_ARTICLE_SCRIPT', 'article/delarticle/<article_id>', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'articles_action',
    'action' => 'delete'
));


// Scripts for users

// Route::set('USER_PAGE', 'user/<action>(/<user_id>)', array('user_id' => $DIGIT, 'action' => $STRING))->defaults(array(
//     'controller' => 'users_index',
//     'action' => 'action'
// ));

Route::set('USER_PAGE', 'user(/<user_id>)', array('user_id' => $DIGIT))->defaults(array(

	'controller' => 'users_index',
	'action' => 'showUser'
));


// Scripts for comments

Route::set('ADD_COMMENT_SCRIPT', 'article/addcomment')->defaults(array(
    'controller' => 'comments',
    'action' => 'add'
));

Route::set('DEL_COMMENT_SCRIPT', 'article/delcomment/<comment_id>', array('comment_id' => $DIGIT))->defaults(array(
    'controller' => 'comments',
    'action' => 'delete'
));

Route::set('DESIGN_PREVIEW', 'design/<page>')->defaults(array(
    'controller' => 'index',
    'action' => 'designPreview'
));

Route::set('AUTH', 'auth/<action>')->defaults(array(
    'controller' => 'auth',
    'action' => 'action'
));


// TAGS

Route::set('TAGS', 'tag(/<query>)', array('query' => $QUERY))->defaults(array(
    'controller' => 'articles_tags',
    'action' => 'search',
));

//Script for admin panel---------

Route::set('ADMIN_EDIT_ARTICLE', 'article/<article_id>/edit', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'admin',
    'action' => 'edit'
));


Route::set('ADMIN', 'admin(/<category>(/<list>))', array('category' => 'articles|users',
                                                                'list' => 'unpublished|deleted'))
  ->defaults(array(
        'controller' => 'admin',
        'action' => 'index'
    ));

// - viz redaktor -

Route::set('EDITOR_LANDING', 'editor', array())->defaults(array(
    'controller' => 'editor',
    'action' => 'landing'
));

Route::set('ARTICLE_EDITOR_SAVE_IMG', 'editorsaveimg', array())->defaults(array(
    'controller' => 'articles_edit',
    'action' => 'saveEditorImg'
));

// Defaults
// Route::set('default', '(<controller>(/<action>(/<id>)))')
//     ->defaults(array(
//         'controller' => 'index',
//         'action'     => 'index',
//     ));
