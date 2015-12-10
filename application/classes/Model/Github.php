<?php defined('SYSPATH') OR die('No Direct Script Access');

/**
 * Модель для получения статистики репозитория. Пример использования:
 * -----------------------------------------------------
 *  $github = new Model_Github();
 *  $last_commit_date = $github->get_last_commit_date();
 *  $commits_count = $github->get_commits_count();
 * -----------------------------------------------------
 *  $github = new Model_Github();
 *  var_dump($github->get_profile_stats('n0str'));
 * -----------------------------------------------------
 *
 * @author     Alexander Menshikov (Nostr)
 */
Class Model_Github extends Model
{
    private $redis;
    private $prefix = "github/";

    public function __construct()
    {
        $this->redis = Controller_Base_preDispatch::_redis();
    }

    /**
     * Возвращает дату последнего коммита
     * @return bool|string
     */
    public function get_last_commit_date()
    {
        return $this->redis->get( $this->prefix . "last_commit_date" );
    }

    /**
     * Возвращает количество коммитов в master
     * @return bool|string
     */
    public function get_commits_count()
    {
        return $this->redis->get( $this->prefix . "commits_count" );
    }

    /**
     * Возвращает число коммитов пользователя в master и дату последнего коммита
     * @param $login - логин пользователя Github
     * @return array
     */
    public function get_profile_stats($login)
    {
        return array(
            "total" => $this->redis->get( $this->prefix . $login . "/total" ),
            "last_commit_date" => $this->redis->get( $this->prefix . $login . "/last_commit_date" )
        );
    }
}