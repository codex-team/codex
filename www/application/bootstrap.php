<?php defined('SYSPATH') or die('No direct script access.');

// -- Environment setup --------------------------------------------------------

// Load the core Kohana class
require SYSPATH.'classes/Kohana/Core'.EXT;

if (is_file(APPPATH.'classes/Kohana'.EXT))
{
    // Application extends the core
    require APPPATH.'classes/Kohana'.EXT;
}
else
{
    // Load empty core extension
    require SYSPATH.'classes/Kohana'.EXT;
}

/**
 * Set the default time zone.
 *
 * @link http://kohanaframework.org/guide/using.configuration
 * @link http://www.php.net/manual/timezones
 */
date_default_timezone_set('Europe/Moscow');

/**
 * Set the default locale.
 *
 * @link http://kohanaframework.org/guide/using.configuration
 * @link http://www.php.net/manual/function.setlocale
 */
setlocale(LC_ALL, 'en_US.utf-8');

/**
 * Enable the Kohana auto-loader.
 *
 * @link http://kohanaframework.org/guide/using.autoloading
 * @link http://www.php.net/manual/function.spl-autoload-register
 */
spl_autoload_register(array('Kohana', 'auto_load'));

/**
 * Optionally, you can enable a compatibility auto-loader for use with
 * older modules that have not been updated for PSR-0.
 *
 * It is recommended to not enable this unless absolutely necessary.
 */
//spl_autoload_register(array('Kohana', 'auto_load_lowercase'));

/**
 * Enable the Kohana auto-loader for unserialization.
 *
 * @link http://www.php.net/manual/function.spl-autoload-call
 * @link http://www.php.net/manual/var.configuration#unserialize-callback-func
 */
ini_set('unserialize_callback_func', 'spl_autoload_call');

// -- Configuration and initialization -----------------------------------------

/**
 * Set the default language
 */
I18n::lang('en-us');

/**
 * Gettext setup
 */
// @todo remove i18n setup
//require APPPATH . 'classes/i18n-setup.php';
//define('LANG', Internationalization::instance()->getLang());
define('LANG', 'en');

/**
* Composer autoloader
*/
require VENDORPATH . 'autoload.php';

/**
* Load Dotenv
* @see https://github.com/vlucas/phpdotenv
* @since 2017.16.02 @neSpecc
*/
if (is_file(DOCROOT.'.env')) {

    $dotenv = new Dotenv\Dotenv(DOCROOT);
    $dotenv->load();

}

/**
 * Hawk PHP Catcher
 *
 * @link https://hawk.so/docs
 */
if (isset($_SERVER['HAWK_TOKEN'])) {
    \Hawk\Catcher::init([
        'integrationToken' => $_SERVER['HAWK_TOKEN']
    ]);
}

/**
 * Set Kohana::$environment if a 'KOHANA_ENV' environment variable has been supplied.
 *
 * Note: If you supply an invalid environment name, a PHP warning will be thrown
 * saying "Couldn't find constant Kohana::<INVALID_ENV_NAME>"
 */
if (isset($_SERVER['KOHANA_ENV']))
{
    Kohana::$environment = constant('Kohana::'.strtoupper($_SERVER['KOHANA_ENV']));
}

/**
* Turn off notices and strict errors on production
* @since 2017.16.02 @neSpecc
*/
if ( Kohana::$environment === Kohana::PRODUCTION ) {

    error_reporting(E_ALL ^ E_NOTICE ^ E_STRICT);

}

/**
 * Initialize Kohana, setting the default options.
 *
 * The following options are available:
 *
 * - string   base_url    path, and optionally domain, of your application   NULL
 * - string   index_file  name of your index file, usually "index.php"       index.php
 * - string   charset     internal character set used for input and output   utf-8
 * - string   cache_dir   set the internal cache directory                   APPPATH/cache
 * - integer  cache_life  lifetime, in seconds, of items cached              60
 * - boolean  errors      enable or disable error handling                   TRUE
 * - boolean  profile     enable or disable internal profiling               TRUE
 * - boolean  caching     enable or disable internal caching                 FALSE
 * - boolean  expose      set the X-Powered-By header                        FALSE
 */
Kohana::init(array(
    'errors' => true, // We need errors=true for errors catching
    'base_url'   => '/',
    'index_file' => false
));

Cookie::$salt = 'asdahsdfzfcsEERfAf';
Cookie::$httponly = TRUE;

Cookie::$expiration = Date::WEEK;

/**
 * Attach the file write to logging. Multiple writers are supported.
 */
Kohana::$log->attach(new Log_File(APPPATH.'logs'));

/**
 * Attach a file reader to config. Multiple readers are supported.
 */
Kohana::$config->attach(new Config_File);

/**
 * Enable modules. Modules are referenced by a relative or absolute path.
 */
Kohana::modules(array(
    'aliases'    => MODPATH.'aliases',  // Alias module
    'oauth'       => MODPATH.'oauth',       // Basic authentication
    'cache'      => MODPATH.'cache',      // Caching with multiple backends
    // 'codebench'  => MODPATH.'codebench',  // Benchmarking tool
    'database'   => MODPATH.'database',   // Database access
    'image'      => MODPATH.'image',      // Image manipulation
    'minion'     => MODPATH.'minion',     // CLI Tasks
    'orm'        => MODPATH.'orm',        // Object Relationship Mapping
    'unittest'   => MODPATH.'unittest',   // Unit testing
    // 'userguide'  => MODPATH.'userguide',  // User guide and API documentation
    // 'email'         => MODPATH.'email',
    // 'messages'      => MODPATH.'messages',

));

require APPPATH.'routes'.EXT;
