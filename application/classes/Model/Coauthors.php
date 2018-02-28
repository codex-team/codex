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
    public function insert($article_id, $user_id = null)
    {
        $idAndRowAffected = Dao_Coauthors::insert()
                                ->set('user_id', $user_id)
                                ->set('article_id', $article_id)
                                ->clearcache('user:' . $user_id)
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
     * Fill by row Model_Coauthor
     * @param  resource $coauthors_row - data from database
     * @return  Model_Coauthor
     */
    private function fillByRow($coauthors_row)
    {
        if (!empty($coauthors_row['article_id'])) {
            $this->user_id = $coauthors_row['user_id'];
            $this->article_id = $coauthors_row['article_id'];
        }

        return $this;
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

        return $model->fillByRow($coauthors);
    }
    /**
     * Select from database all records where User is a coauthor
     * @param  integer $uid            - coauthor User ID
     * @param  boolean $needClearCache - pass true to clear cache
     * @return Array[]                 - articles in coautorship with User
     */
    public static function getbyUserId($uid = 0, $needClearCache = false)
    {
        $coauthors_rows = Dao_Coauthors::select()
            ->where('user_id', '=', $uid)
            ->limit(200)
            ->cached(Date::MINUTE * 5)
            ->execute();

        $coauthors = self::rowsToModels($coauthors_rows);

        $articles = array();

        if (!empty($coauthors)) {
            foreach ($coauthors as $coauthor) {
                $article = $coauthor->article_id;
                array_push($articles, $article);
            }
        }
        return $articles;
    }
    /**
     * Converts database rows to Coauthor Models
     * @param  resource $coauthor_rows - multiple from database
     * @return Model_Coauthor[]        - multiple Coauthor Models
     */
    private static function rowsToModels($coauthor_rows)
    {
        $coauthors = array();

        if (!empty($coauthor_rows)) {
            foreach ($coauthor_rows as $coauthor_row) {
                $coauthor = new Model_Coauthors();

                $coauthor->fillByRow($coauthor_row);

                array_push($coauthors, $coauthor);
            }
        }

        return $coauthors;
    }
}