<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Route transparently extended. Place in "classes" directory of Kohana 3+ application or module.
 *
 * This is in response to Stack Overflow question:
 * http://stackoverflow.com/questions/11552737/kohana-module-route-precedence
 *
 * @author		Micheal Morgan <micheal@morgan.ly>
 * @copyright		(c) 2012 Micheal Morgan
 * @license		MIT
 */

class Route extends Kohana_Route
{
    /**
     * Prepend Route to beginning of stack. If name already exists further in the stack, it is
     * removed.
     *
     *	Route::prepend('default', '(<controller>(/<action>(/<id>)))')
     *		->defaults(array(
     *			'controller' => 'welcome'
     *		));
     *
     * @static
     * @access	public
     * @param   string   route name
     * @param   string   URI pattern
     * @param   array    regex patterns for route keys
     * @return  Route
     */

    public static function prepend($name, $uri_callback = NULL, $regex = NULL)
    {
        // Ensure entry does not already exist so it can be added to the beginning of the stack
        if (isset(Route::$_routes[$name]))
        {
            unset(Route::$_routes[$name]);
        }

        // Create reference
        Route::$_routes = array_merge(array($name => NULL), Route::$_routes);

        // Overwrite reference
        return Route::$_routes[$name] = new Route($uri_callback, $regex);
    }
}