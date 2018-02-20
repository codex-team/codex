<?php defined('SYSPATH') or die('No Direct Script Access');

class Model_Coauthors extends Model
{
    public $user_id = null;
    public $article_id;

    public function insert($article_id, $user_id = null)
    {
        $idAndRowAffected = Dao_Coauthors::insert()
                                ->set('user_id', $user_id)
                                ->set('article_id', $article_id)
                                ->clearcache('coauthors_list')
                                ->execute();

        if ($idAndRowAffected) {
            $coauthors = Dao_Coauthors::select()
                ->where('article_id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($coauthors);
        }

        return $idAndRowAffected;
    }

    public function update($article_id, $user_id = null)
    {
        Dao_Coauthors::update()->where('article_id', '=', $article_id)
            ->set('user_id', $user_id)
            ->clearcache($this->article_id)
            ->execute();
    }

    private function fillByRow($coauthors_row)
    {
        if (!empty($coauthors_row['article_id'])) {
            $this->user_id = $coauthors_row['user_id'];
            $this->article_id = $coauthors_row['article_id'];
        }

        return $this;
    }

    public static function get($id = 0, $needClearCache = false)
    {
        $coauthors = Dao_Coauthors::select()
            ->where('article_id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $coauthors->clearcache($id);
        } else {
            $coauthors->cached(Date::MINUTE * 5, $id);
        }

        $coauthors = $coauthors->execute();

        $model = new Model_Coauthors();

        return $model->fillByRow($coauthors);
    }
}