<?php defined('SYSPATH') OR die('No Direct Script Access');


Class Model_Question extends Model
{
    public $id = 0;
    public $test_id;
    public $heading;
    public $body;
    public $ans_1;
    public $ans_2;
    public $ans_3;
    public $correct;
    public $dt_create;
    public $dt_update;


    public function __construct() {}


    public function insert()
    {
        $idAndRowAffected = Dao_Question::insert()
                                ->set('test_id',        $this->test_id)
                                ->set('heading',        $this->heading)
                                ->set('description',    $this->description)
                                ->set('ans_1',          $this->ans_1)
                                ->set('ans_2',          $this->ans_2)
                                ->set('ans_3',          $this->ans_3)
                                ->set('correct',        $this->correct)
                                ->clearcache('question_list')
                                ->execute();

        if ($idAndRowAffected) {
            $question = Dao_Question::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($question);
        }

        return $idAndRowAffected;
    }


    private function fillByRow($question_row)
    {
        if (!empty($question_row['id'])) {

            $this->id           = $question_row['id'];
            $this->test_id      = $question_row['test_id'];
            $this->heading      = $question_row['heading'];
            $this->body         = $question_row['body'];
            $this->ans_1        = $question_row['ans_1'];
            $this->ans_2        = $question_row['ans_2'];
            $this->ans_3        = $question_row['ans_3'];
            $this->correct      = $question_row['correct'];
            $this->dt_create    = $question_row['dt_create'];
            $this->dt_update    = $question_row['dt_update'];
        }

        return $this;
    }


    public function remove()
    {
        Dao_Test::update()->where('id', '=', $this->id)
            ->set('is_removed', 1)
            ->clearcache('question_list')
            ->execute();

            $this->id = 0;
        }
    }


    public function update()
    {
        Dao_Test::update()->where('id', '=', $this->id)
            ->set('heading',        $this->heading)
            ->set('body',           $this->body)
            ->set('ans_1',          $this->ans_1)
            ->set('ans_2',          $this->ans_2)
            ->set('ans_3',          $this->ans_3)
            ->set('correct',        $this->correct)
            ->set('dt_update',      $this->dt_update)
            ->clearcache($this->id)
            ->execute();
    }


    public static function get($id = 0, $needClearCache = false)
    {
        $question = Dao_Question::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $question->clearcache($id);
        } else {
            $question->cached(Date::MINUTE * 5, $id);
        }

        $question = $question->execute();

        $model = new Model_Question();

        return $model->fillByRow($question);
    }

    public static function getQuestionsByTestId($test_id = 0, $needClearCache = false)
    {
        $questions = Dao_Question::select()
            ->where('test_id', '=', $test_id);

        if ($needClearCache) {
            $questions->clearcache($id);
        } else {
            $questions->cached(Date::MINUTE * 5, $id);
        }

        $questions = $questions->execute();

        $models = [];

        foreach ($questions as $question) {
            $model = new Model_Question();

            $model = $model->fillByRow($question);
            $models->append($model);
        }

        return $models;
    }
}
