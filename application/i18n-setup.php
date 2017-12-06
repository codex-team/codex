<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Verifies if the given $locale is supported in the project
 * @param string $locale
 * @return bool
 */
function valid($locale) {
   return in_array($locale, ['en_US', 'ru_RU']);
}


if (isset($_GET['language']) && valid($_GET['language'])) {

    $lang = $_GET['language'];
    setcookie('language', $lang);

} elseif (isset($_COOKIE['language']) && valid($_COOKIE['language'])) {

    $lang = $_COOKIE['language'];
}

putenv('LANG=' . $lang);
setlocale(LC_ALL, $lang);

// Give domain name of your .po and .mo files
$domain = 'main';
$localedir = DOCROOT . 'locale';
bindtextdomain($domain, $localedir);
bind_textdomain_codeset($domain, 'UTF-8');
textdomain($domain);
