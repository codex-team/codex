<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Internationalization (i18n) class.
 * Checks, whether the language is suppoted,
 * Uses cookies to remember user's chice and
 * Translates pages using php Gettext library
 */
class Internationalization {


	/**
	 * Supported languages
	 */
	const SUP_LANG = array(
		'en' => 'en_US',
		'ru' => 'ru_RU',
	);

	/**
	 * Domain name
	 */
	const DOMAIN = 'ifmo';

	/**
	 * Directory for gettext translations
	 */
	const LOCALE_DIR = DOCROOT . 'locale';


	/**
	 * Verifies if the given language is supported in the project
	 * @param string $locale
	 * @return bool
	 */
	private static function valid($locale) {
		return array_key_exists($locale, Internationalization::SUP_LANG);
	}	

	/**
	 * Chooses the prefurable language
	 * @return string $lang
	 */
	public static function lang_setup() {

		if ( isset ( $_GET['lang'] ) && Internationalization::valid ( $_GET['lang'] ) ) {

	    	setcookie ( 'lang', $_GET['lang'] );
	    	return Internationalization::SUP_LANG[$_GET['lang']];

		} elseif ( isset ( $_COOKIE['lang'] ) && Internationalization::valid ( $_COOKIE['lang'] ) ) {

	    	return Internationalization::SUP_LANG[$_COOKIE['lang']];

		} else {

		 	return Internationalization::SUP_LANG['en'];
		 } 
 	}
 
 	/**
	 * Configures gettext
	 * @param string $language
	 */
	public static function env_setup($lang) {	

		putenv('LANG=' . $lang);
		setlocale(LC_ALL, $lang);

		bindtextdomain ( Internationalization::DOMAIN, Internationalization::LOCALE_DIR );
		bind_textdomain_codeset ( Internationalization::DOMAIN, 'UTF-8' );
		textdomain ( Internationalization::DOMAIN);
	}

}

$lang = Internationalization::lang_setup();
Internationalization::env_setup($lang);
