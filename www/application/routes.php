<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Set the routes. Each route must have a minimum of a name, a URI and a set of
 * defaults for the URI.
 */

$DIGIT = '\d+';
$STRING = '[-a-z\d]+';
$QUERY =  '[0-9a-zA-Zа-яёА-ЯЁ\s\-\.]+$';

/**
 * System Routes
 */

Route::set('AUTH', 'auth/<action>')->defaults(array(
	'controller' => 'auth',
	'action' => 'action'
));

Route::set('ARTICLE_LIST', 'articles')->defaults(array(
	'controller' => 'Articles_Index',
	'action' => 'showAll',
));

Route::set('CONTESTS_LIST', 'contests')->defaults(array(
	'controller' => 'Contests_Index',
	'action' => 'showAll',
));

Route::set('COVER_IMAGE', 'cover/<social>/<type>/<target>/<version>/cover.jpg')->defaults(array(
    'controller' => 'Cover_Image',
    'action' => 'index'
));

// Add Substance

// Show article edit/create page
Route::set('ADD_ARTICLE_SCRIPT', 'article/writing')->defaults(array(
	'controller' => 'Articles_Modify',
	'action' => 'edit'
));

// Process article save action
Route::set('SAVE_ARTICLE_SCRIPT', 'article/save')->defaults(array(
    'controller' => 'Articles_Modify',
    'action' => 'save'
));

Route::set('ADD_CONTEST_SCRIPT', 'contest/add')->defaults(array(
	'controller' => 'Contests_modify',
	'action' => 'save'
));

Route::set('ADD_COURSE_SCRIPT', 'course/add')->defaults(array(
	'controller' => 'Courses_modify',
	'action' => 'save'
));

Route::set('SAVE_QUIZ_SCRIPT', 'quiz/(<id>/)(<method>)', array(
   'id' => $DIGIT,
   'method' => 'add|save'
))->defaults(array(
   'controller' => 'Quiz',
   'action' => 'save'
));

// Show Substances which doesn't have Uri

Route::set('SHOWARTICLE', 'article(/<id>)')->defaults(array(
	'controller' => 'Articles_Index',
	'action'	 => 'show'
));

Route::set('SHOWCONTEST', 'contest(/<id>)')->defaults(array(
	'controller' => 'Contests_Index',
	'action'	 => 'show'
));

Route::set('SHOWCOURSE', 'course(/<id>)')->defaults(array(
	'controller' => 'Courses_Index',
	'action'	 => 'show'
));

// Edit Substances

Route::set('EDIT_ARTICLE_SCRIPT', 'article/<id>/<action>', array(
    'id' => $DIGIT,
    'action' => 'edit'
))->defaults(array(
    'controller' => 'Articles_Modify'
));

Route::set('EDIT_CONTEST_SCRIPT', 'contest/<id>/save', array('id' => $DIGIT))
	->defaults(array(
	'controller' => 'Contests_Modify',
	'action' => 'save'
));


Route::set('EDIT_COURSE_SCRIPT', 'course/<id>/save', array('id' => $DIGIT))
	->defaults(array(
	'controller' => 'Courses_Modify',
	'action' => 'save'
));

// delete substances
Route::set('DEL_ARTICLE_SCRIPT', 'article/delarticle/<article_id>', array('article_id' => $DIGIT))->defaults(array(
	'controller' => 'Articles_Modify',
	'action' => 'delete'
));

Route::set('DEL_CONTEST_SCRIPT', 'contests/delcontest/<contest_id>', array('contest_id' => $DIGIT))->defaults(array(
	'controller' => 'Contests_Modify',
	'action' => 'delete'
));

Route::set('DEL_COURSE_SCRIPT', 'courses/delcourse/<course_id>', array('course_id' => $DIGIT))->defaults(array(
	'controller' => 'Courses_Modify',
	'action' => 'delete'
));


/**
* Join page
*/
Route::set('JOIN_PAGE', 'join')->defaults(array(
    'controller' => 'pages',
    'action' => 'join',
));
Route::set('TASK_LIST', 'task')->defaults(array(
    'controller' => 'pages',
    'action' => 'All',
));

Route::set('TASK_PAGE', 'task/<who>', array('who' => $STRING))->defaults(array(
    'controller' => 'pages',
    'action' => 'whoSet',
));


/*Route::set('INDEX_PAGE', '')->defaults(array(
    'controller' => 'index',
    'action' => 'index',
));

Route::set('JOIN_PAGE', 'join')->defaults(array(
    'controller' => 'pages',
    'action' => 'index',
));


Route::set('CONTEST_PAGE', 'contest/<contest_id>', array('contest_id' => $DIGIT))->defaults(array(
    'controller' => 'contests_index',
    'action' => 'showContest'
));

*/
// Scripts for users
Route::set('USER_PROFILE', 'user(/<id>)', array('id' => $DIGIT))
	->defaults(array(
	'controller' => 'users_index',
	'action'     => 'show'
));

Route::set('USER_SETTINGS', 'user/settings')->defaults(array(
	'controller' => 'users_index',
	'action'     => 'settings'
));

//Script for admin panel---------

Route::set('ADMIN_EDIT_ARTICLE', 'article/<article_id>/edit', array('article_id' => $DIGIT))->defaults(array(
    'controller' => 'admin',
    'action' => 'edit'
));

Route::set('ADMIN_TOGGLE_BEST_DEVELOPER', 'admin/developer')->defaults(array(
    'controller' => 'admin',
    'action'     => 'developer'
));

Route::set('ADMIN', 'admin(/<category>(/<list>))', array('category' => 'articles|feed|users|contests|courses|requests',
                                                                'list' => 'unpublished|deleted'))
  ->defaults(array(
        'controller' => 'admin',
        'action' => 'index'
    ));

Route::set('SCRIPTS', 'admin/scripts(/<script>)', array('script' => 'resetArticlesTimeline'))->defaults(array(
    'controller' => 'admin',
    'action' => 'scripts'
));


// - viz redaktor -

Route::set('EDITOR_FILE_TRANSORT', 'editor/transport', array())
    ->defaults(array(
        'controller' => 'transport',
        'action' => 'file_uploader'
    ));

Route::set('EDITOR_LANDING', 'editor(/<action>)', array())->defaults(array(
	'controller' => 'editor',
	'action' => 'landing'
));

Route::set('ARTICLE_EDITOR_SAVE_IMG', 'editorsaveimg', array())->defaults(array(
    'controller' => 'articles_edit',
    'action' => 'saveEditorImg'
));

/**
 * Route for Link plugin, CodeX Editor
 * Fetches page data by URL
 */
Route::set('FETCH_URL', 'editor/fetchURL')
->defaults(array(
    'controller' => 'Editor',
    'action'    => 'fetchURL'
));

/**
* Landing pages
*/
Route::set('LANDINGS', '<action>', array(
   'actions' => 'bot|special|media|beauty-toolbar'
))
->filter(function($route, $params, $request) {
    // Replacing the hyphens for underscores.
    $params['action'] = str_replace('-', '_', $params['action']);
    return $params; // Returning an array will replace the parameters.
})
->defaults(array(
   'controller' => 'landings'
));

/**
 * Core
 */

Route::set('AJAX_FILE_TRANSPORT', 'ajax/transport')->defaults(array(
    'controller'      => 'base_ajax',
    'action'          => 'file_uploader'
));


// Defaults
Route::set('ALIASES', '(<controller>(/<action>(/<id>)))')
    ->defaults(array(
        'controller' => 'index',
        'action'     => 'index'
    ));
