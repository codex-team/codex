<?php
/**
 * Dao to cache articles' queries.
 *
 * Author: Aleksandr Eliseev.
 */

class Dao_Article extends Dao_Base {
    /**
     * Dao_Article constructor.
     */
    public function __construct()
    {
        $this->table = 'Articles';
        $this->cached(3600);
    }
}