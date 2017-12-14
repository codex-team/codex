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
   * Name of your .mo and .po files
   * (usually named after your domain)
   */
  private $domain = 'ifmo.su';

  /**
   * Directory for gettext translations
   */
  private $localedir = DOCROOT . 'locale';

  /**
   * Chosen language from the GET form
   */
  private $getLang;

  /**
   * Preferable language that is stored in COOKIES
   */
  private $cookieLang;

  /**
   * Language used to configure Gettext
   */
  private $lang;


  /**
   * Calls other functions to setup Gettext
   * @param string $defaultLang
   */
  function __construct($defaultLang='en')
  {
    if (isset($_GET['lang'])) {
      $this->getLang = $_GET['lang'];
    }

    if (isset($_COOKIE['lang'])) {
      $this->cookieLang = $_COOKIE['lang'];
    }

    $this->lang = $this->langsSupported[$defaultLang];
    $this->langSetup();
    $this->envSetup();
  }


  /**
   * Verifies if the given language is supported in the project
   * @param string $locale
   * @return bool
   */
  private function valid($locale)
  {
    return array_key_exists($locale, $this->langsSupported);
  }

  /**
   * Chooses the prefurable language
   */
  private function langSetup()
  {
    // Check whether the user used the GET form
    if (isset($this->getLang) && $this->valid($this->getLang)) {

      // Store user's choice
      setcookie('lang', $this->getLang);
      $this->lang = $this->langsSupported[$this->getLang];

    } elseif (isset($this->cookieLang) && $this->valid($this->cookieLang)) {

      // Choose language based on user's previous choice
      $this->lang = $this->langsSupported[$this->cookieLang];
    }
   }

   /**
   * Configures gettext
   */
  private function envSetup()
  {
    // Set $lang as value of the environment variable 'LANG'
    putenv('LANG=' . $this->lang);
    setlocale(LC_ALL, $this->lang);

    // Set path to the $domain.po and $domain.mo files
    bindtextdomain($this->domain, $this->localedir);

    // Specify the character encoding in which the messages from the $domain message catalog will be returned
    bind_textdomain_codeset($this->domain, 'UTF-8');

    // Set the defualt domain where gettext() will search for the translations
    textdomain($this->domain);
  }
}
