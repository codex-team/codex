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
	private $langsSupported = array(
		'en' => 'en_US',
		'ru' => 'ru_RU',
	);

	/**
	 * Domain name
	 */
	private $domain = 'ifmo.su';

	/**
	 * Directory for gettext translations
	 */
	private $localedir = DOCROOT . 'locale';

	private $getLang;
	private $cookieLang;
	private $lang;


	function __construct() {

		if (isset($_GET['lang'])) {
			$this->getLang = $_GET['lang'];
		}

		if (isset($_COOKIE['lang'])) {
				$this->cookieLang = $_COOKIE['lang'];
			}

		$this->langSetup();
		$this->envSetup();
	}


	/**
	 * Verifies if the given language is supported in the project
	 * @param string $locale
	 * @return bool
	 */
	private function valid($locale) {

		return array_key_exists($locale, $this->langsSupported);
	}

	/**
	 * Chooses the prefurable language
	 */
	private function langSetup() {

		if (isset($this->getLang) && $this->valid($this->getLang)) {

	    	setcookie('lang', $this->getLang);
	    	$this->lang = $this->langsSupported[$this->getLang];

		} elseif (isset($this->cookieLang) && $this->valid($this->cookieLang)) {

	    	$this->lang = $this->langsSupported[$this->cookieLang];

		} else {

		 	$this->lang = $this->langsSupported['en'];
		 }
 	}

 	/**
	 * Configures gettext
	 */
	private function envSetup() {

		// Set $lang as value of the environment variable 'LANG'
		putenv('LANG=' . $this->lang);
		setlocale(LC_ALL, $this->lang);
		// Set path for a $domain
		bindtextdomain ($this->domain, $this->localedir);
		// Specify the character encoding in which the messages from the $domain message catalog will be returned
		bind_textdomain_codeset ($this->domain, 'UTF-8' );
		// Set the defualt domain where gettext() will search for the translations
		textdomain ($this->domain);
	}

}
