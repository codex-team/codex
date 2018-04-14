<?php defined('SYSPATH') or die('No direct script access.');

class Aliases_Controller
{
    /**
     * Create there constants for project's entities
     *
     * const ARTICLE   = 1;
     * const USER      = 2;
     * const COMPANY   = 3;
     */
    const ARTICLE  = 1;
    const CONTEST  = 2;
    const USER     = 3;
    const COURSE   = 4;

    /**
     * Set up a map of resource to controller
     *
     * const MAP = array(
     *     self::ARTICLE   => 'Articles',
     *     self::USER      => 'Users',
     *     self::COMPANY   => 'Companies',
     * );
     */
    const MAP = array(
        self::ARTICLE   => 'Articles',
        self::CONTEST   => 'Contests',
        self::USER      => 'Users',
        self::COURSE    => 'Courses',
    );
}
