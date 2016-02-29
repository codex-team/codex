<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Created by PhpStorm.
 * User: Murod's Macbook Pro
 * Date: 27.02.2016
 * Time: 22:43
 */

interface Factory_Alias {
    function hash($uri);
}

class Sha256 implements Factory_Alias {
    function hash($uri)
    {
        return hash('sha256', $uri);
    }
}

class HashSum implements Factory_Alias {
    function hash($uri)
    {
        // Если с Sha256 не получится, попробую старый алгоритм. С sha256 работает довольно медленно
        echo 'My Method';
    }
}

class Model_Alias
{
    public $uri;
    public $hash;
    public $type;
    public $id;
    public $dt_create;

    /**
     * Пустой конструктор для модели статьи, если нужно получить статью из хранилища, нужно пользоваться статическими
     * методами
     */
    public function __construct()
    {
    }

    public static function set($alias)
    {
        $this->uri          =   $alias['uri'];
        $this->hash         =   $alias['hash'];
        $this->type         =   $alias['type'];
        $this->id           =   $alias['id'];
        $this->dt_create    =   $alias['dt_creat'];
    }

    public function insert()
    {
        $idAndRowAffected = Dao_Alias::insert()
                        ->set('uri', $this->uri)
                        ->set('hash', $this->hash)
                        ->set('type', $this->type)
                        ->set('id', $this->id)
                        ->set('dt_create', $this->dt_create)
                        ->clearcache()
                        ->execute();
    }

    private function getAlias($hash = null)
    {
        $alias  =   Dao_Alias::select()
                            ->where('hash', '=', $hash);

        $alias = $alias->execute();

        $model = new Model_Alias();
        return Arr::get($alias, '0', '');
    }

    public function generateAlias($route)
    {
        $hashType = new Sha256();
        $hashedRoute = $hashType->hash($route);

        $alias  = $this->getAlias($hashedRoute);

        $newAlias = $route;

        if ( !empty($alias) )
        {
            for($index = 1; ; $index++)
            {
                $newAlias = $newAlias.'-'.$index;
                if ( empty($this->getAlias($hashType->hash($newAlias))))
                {
                    return $newAlias;
                    break;
                }
            }
        }

        return $newAlias;
    }

    public function getRealRoute($route)
    {
        $model_uri = Model_Uri::Instance();
        $hashType = new Sha256();

        $hashedRoute = $hashType->hash($route);
        $alias = $this->getAlias($hashedRoute);

        if ( empty($alias))
            HTTP::redirect('contests');

        return $model_uri->controllersMap[$alias['type']] . '/' . $alias['id'];
    }

}