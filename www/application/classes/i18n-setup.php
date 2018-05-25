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
     * Language used to configure Gettext
     * @var string
     */
    private $lang;

    /**
     * Calls other functions to setup Gettext
     */
    function __construct()
    {
        $this->langSetup();
        $this->envSetup();
    }

    /**
     * @return string
     */
    public function getLang()
    {
        return $this->lang;
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
        $this->lang = 'en';

        $langFromGetParam = Arr::get($_GET, self::GET_PARAM_NAME);
        $langFromCookies = Arr::get($_COOKIE, self::COOKIE_NAME);

        if ($langFromGetParam && $this->valid($langFromGetParam)) {
            /**
             * If lang in GET params then save this value to cookies
             */
            setcookie(self::COOKIE_NAME, $langFromGetParam);
            $this->lang = $langFromGetParam;

        } elseif ($langFromCookies && $this->valid($langFromCookies)) {
            /**
             * Choose language based on user's previous choice
             */
            $this->lang = $langFromCookies;
        }
    }

    /**
     * Configure gettext
     */
    private function envSetup()
    {
        $locale = $this->langsSupported[$this->lang];

        // Set $lang as value of the environment variable 'LANG'
        putenv('LANG=' . $locale);
        setlocale(LC_ALL, $locale);

        // Set path to the $domain.po and $domain.mo files
        bindtextdomain($this->domain, $this->localedir);

        // Specify the character encoding in which the messages from the $domain message catalog will be returned
        bind_textdomain_codeset($this->domain, 'UTF-8');

        // Set the defualt domain where gettext() will search for the translations
        textdomain($this->domain);
    }
}
