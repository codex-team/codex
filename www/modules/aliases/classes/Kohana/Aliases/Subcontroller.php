<?php defined('SYSPATH') or die('No direct script access.');

class Kohana_Aliases_Subcontroller
{
    /**
     * Create constants to identify subcontroller
     *
     * const INDEX = 1;
     * const MODIFY = 2;
     */
    const INDEX = 1;
    const MODIFY = 2;

    /**
     * Set up a map of subcontrollers
     *
     * const MAP = array(
     *     Aliases_Subcontroller::INDEX => 'Index',
     *     Aliases_Subcontroller::MODIFY => 'Modify',
     * );
     */
    const MAP = array(
        Aliases_Subcontroller::INDEX => 'Index',
        Aliases_Subcontroller::MODIFY => 'Modify',
    );
}
