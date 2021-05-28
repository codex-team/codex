<?php defined('SYSPATH') or die('No Direct Script Access');


class Model_Quiz extends Model
{
    public $id = 0;
    public $title;
    public $description;
    public $quiz_data;
    public $dt_create;
    public $dt_update;


    public function __construct($quiz_id = 0)
    {
        if ($quiz_id) {
            $this->get($quiz_id);
        }
    }


    public function insert()
    {
        $idAndRowAffected = Dao_Quizzes::insert()
            ->set('title', $this->title)
            ->set('quiz_data', $this->quiz_data)
            ->set('description', $this->description)
            ->execute();

        if ($idAndRowAffected) {
            $this->get($idAndRowAffected);
        }

        return $idAndRowAffected;
    }

    public function update()
    {
        Dao_Quizzes::update()->where('id', '=', $this->id)
            ->set('title', $this->title)
            ->set('description', $this->description)
            ->set('quiz_data', $this->quiz_data)
            ->set('dt_update', $this->dt_update)
            ->clearcache($this->id)
            ->execute();
    }


    public function get($id = 0, $needClearCache = false)
    {
        $quiz = Dao_Quizzes::select()
            ->where('id', '=', $id)
            ->limit(1)
            ->cached(DATE::MINUTE * 5, $id)
            ->execute();

        $this->fillByRow($quiz);

        return $this;
    }

    private function fillByRow($quiz_row)
    {
        if (!empty($quiz_row['id'])) {
            $this->id           = $quiz_row['id'];
            $this->title        = $quiz_row['title'];
            $this->description  = $quiz_row['description'];
            $this->quiz_data    = $quiz_row['quiz_data'];
            $this->dt_create    = $quiz_row['dt_create'];
            $this->dt_update    = $quiz_row['dt_update'];
        }

        return $this;
    }

    public static function getTitles()
    {
        $quizzes = Dao_Quizzes::select(array('id', 'title'))
            ->where('is_removed', '=', 0)
            ->execute();

        return $quizzes;
    }
}
