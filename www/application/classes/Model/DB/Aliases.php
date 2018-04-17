<?php defined('SYSPATH') or die('No direct script access.');

class Model_DB_Aliases extends Kohana_Model_DB_Aliases
{
    /**
     * Insert a new one alias to database
     *
     * @param string  $uri
     * @param string  $hash
     * @param integer $type
     * @param integer $id
     * @param integer $dt_create
     * @param int     $deprecated
     *
     * @return object
     */
    public static function insert($uri, $hash, $type, $id, $dt_create, $deprecated = 0)
    {
        return Dao_Aliases::insert()
                          ->set('uri', $uri)
                          ->set('hash', $hash)
                          ->set('type', $type)
                          ->set('id', $id)
                          ->set('dt_create', $dt_create)
                          ->set('deprecated', $deprecated)
                          ->execute();
    }

    /**
     * Find route in database
     *
     * @param string $hash
     *
     * @return object
     */
    public static function select($hash)
    {
        $hashBinToHex = bin2hex($hash);

        return Dao_Aliases::select()
                          ->where('hash', '=', $hash)
                          ->limit(1)
                          ->cached(Date::MINUTE * 5, $hashBinToHex)
                          ->execute();
    }

    /**
     * Mark route as deprecated
     *
     * @param string $hash
     *
     * @return object
     */
    public static function update($hash)
    {
        $hashBinToHex = bin2hex($hash);

        return Dao_Aliases::update()
                           ->where('hash', '=', $hash)
                           ->set('deprecated', 1)
                           ->clearcache($hashBinToHex)
                           ->execute();
    }

    /**
     * Delete route from database
     *
     * @param string $hash
     *
     * @return object
     */
    public static function delete($hash)
    {
        $hashBinToHex = bin2hex($hash);

        return Dao_Aliases::delete()
                           ->where('hash', '=', $hash)
                           ->clearcache($hashBinToHex)
                           ->execute();
    }
}

