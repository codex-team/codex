<?php defined('SYSPATH') or die('No Direct Script Access');

/**
 * Describes relationships between Articles and Users as coauthors:
 * In Coauthors database table sets corresponding 'article_id' : 'user_id'
 * Can add coauthors to articles, update, remove,
 * get articles by coauthor id, get coauthor by article's id
 *
 * @author Polina Shneider
 */
class Model_Coauthors extends Model
{
    public $user_id = null;
    public $article_id;

    /**
     * Adds new record to database
     * @param  int $article_id - article's ID
     * @param  int $user_id    - coauthor's ID
     * @return int             - inserted ID
     */
    public function insert($article_id, $user_id)
    {
        $idAndRowAffected = Dao_Coauthors::insert()
                                ->set('user_id', $user_id)
                                ->set('article_id', $article_id)
                                ->clearcache('article:' . $article_id)
                                ->execute();

        return $idAndRowAffected;
    }

    /**
     * If record with Article ID already exists, update it
     * @param  int $article_id - Article's ID
     * @param  int $user_id    - ID of co-author User
     */
    public function update($article_id, $user_id = null)
    {
        Dao_Coauthors::update()->where('article_id', '=', $article_id)
            ->set('user_id', $user_id)
            ->clearcache('article:' . $article_id)
            ->execute();
    }

    /**
     * Get Article by its ID from Coauthors table
     * @param  integer $id             - Article ID
     * @param  boolean $needClearCache - pass true to clear cache
     * @return Model_Coauthor          - Model of an Article
     */
    public static function get($id = 0, $needClearCache = false)
    {
        $coauthors = Dao_Coauthors::select()
            ->where('article_id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $coauthors->clearcache('article:' . $id);
        } else {
            $coauthors->cached(Date::MINUTE * 5, 'article:' . $id);
        }

        $coauthors = $coauthors->execute();

        $model = new Model_Coauthors();
        $model->user_id = $coauthors['user_id'];
        $model->article_id = $coauthors['article_id'];

        return $model;
    }

    /**
     * Select from database all records where User is a coauthor
     * @param  integer $uid            - coauthor User ID
     * @param  boolean $needClearCache - pass true to clear cache
     * @return articles ids            - of coautorship with User
     */
    public static function getbyUserId($uid = 0, $needClearCache = false)
    {
        $articles = array();
        $coauthors_rows = Dao_Coauthors::select('article_id')
             ->where('user_id', '=', $uid)
             ->limit(200)
             ->cached(Date::MINUTE * 5, 'user:' . $uid)
             ->execute('article_id');

        if ($coauthors_rows) {
            $articles = array_keys($coauthors_rows);
        }

        return $articles;
    }
}