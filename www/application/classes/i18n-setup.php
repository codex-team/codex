<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Internationalization (i18n) class.
 * Checks, whether the language is suppoted,
 * Uses cookies to remember user's chice and
 * Translates pages using php Gettext library
 */
class Internationalization
{
    const GET_PARAM_NAME = 'lang';
    const COOKIE_NAME = 'lang';

    /**
     * Supported languages
     *
     * First item uses as a default value
     */
    private $langsSupported = array(
        'en' => 'en_US',
        'ru' => 'ru_RU',
    );

    /**
     * Name of your .mo and .po files
     * (usually named after your domain)
     */
    private $domain = 'codex.so';

    /**
     * Directory for gettext translations
     */
    private $localedir = DOCROOT . 'locale';

    /**
     * Language used to configure Gettext
     * @var string
     */
    private $lang;

    private static $_instance;

    /**
     * Main instance method
     */
    public static function instance()
    {
        if (!self::$_instance) {
            self::$_instance = new self();
            self::$_instance->langSetup();
            self::$_instance->envSetup();
        }

        return self::$_instance;
    }

    /**
     * Set private functions cause Singleton
     */
    private function __clone () {}
    private function __sleep () {}
    private function __wakeup () {}

    /**
     * Calls other functions to setup Gettext
     */
    private function __construct()
    {
    }

    /**
     * @return string
     */
    public static function getLang()
    {
        return self::instance()->lang;
    }

    public static function setLang($lang)
    {
        setcookie(self::COOKIE_NAME, $lang, 0, '/');
        self::instance()->lang = $lang;
    }

    /**
     * Verifies if the given language is supported in the project
     *
     * @param string $locale
     *
     * @return bool
     */
    private function valid($locale)
    {
        return array_key_exists($locale, $this->langsSupported);
    }

    /**
     * Chooses the preferable language
     */
    private function langSetup()
    {
        /**
         * Set default language
         */
        $this->lang = array_keys($this->langsSupported)[0];

        /**
         * Force use default lang
         */
        return;

        $langFromGetParam = Arr::get($_GET, self::GET_PARAM_NAME);
        $langFromCookies = Arr::get($_COOKIE, self::COOKIE_NAME);

        /**
         * Choose language based on user's previous choice
         */
        if ($langFromCookies && $this->valid($langFromCookies)) {
            $this->lang = $langFromCookies;
        } else {
            $this->setLang($this->lang);
        }

        /**
         * If lang in GET params then save this value to cookies
         */
        if ($langFromGetParam && $this->valid($langFromGetParam)) {
            $this->setLang($langFromGetParam);
        }
    }

    /**
     * Configure gettext
     */
    private function envSetup()
    {
        $locale = $this->langsSupported[$this->lang];

        /**
         * Set $lang as value of the environment variable 'LANG'
         */
        putenv('LANG=' . $locale);
        setlocale(LC_ALL, $locale);

        /**
         * Set path to the $domain.po and $domain.mo files
         */
        bindtextdomain($this->domain, $this->localedir);

        /**
         * Specify the character encoding in which the messages from the $domain message catalog will be returned
         */
        bind_textdomain_codeset($this->domain, 'UTF-8');

        /**
         * Set the default domain where gettext() will search for the translations
         */
        textdomain($this->domain);
    }
}
