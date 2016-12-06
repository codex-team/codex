<?php defined('SYSPATH') OR die('No Direct Script Access');


Class Model_Quiz extends Model
{
    public $id = 0;
    public $name;
    public $description;
    public $dt_create;
    public $dt_update;


    public function __construct() {}


    public function insert()
    {
        $idAndRowAffected = Dao_Quiz::insert()
                                ->set('name',           $this->name)
                                ->set('description',    $this->description)
                                ->clearcache('quiz_list')
                                ->execute();

        if ($idAndRowAffected) {
            $quiz = Dao_Quiz::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($quiz);
        }

        return $idAndRowAffected;
    }


    public static function save($dict)
    {
        $quiz = new Model_Quiz();

        $quiz->name = Arr::get($dict, 'quiz.name');
        $quiz->description = Arr::get($dict, 'quiz.description');

        $quiz = $quiz->insert();

        for ($number = 1; $number <= Arr::get($dict, 'questions_length'); $number++) {
            $question = new Model_Question();

            $pattern = 'question_' . $number . '_';

            $question->number = $number;
            $question->quiz_id = $quiz;
            $question->heading = Arr::get($question, $pattern . 'heading', 'Без названия');
            $question->body = Arr::get($question, $pattern . 'body');
            $question->ans_1 = Arr::get($question, $pattern . 'ans_1', '1');
            $question->ans_2 = Arr::get($question, $pattern . 'ans_2', '2');
            $question->ans_3 = Arr::get($question, $pattern . 'ans_3', '3');
            $question->correct = Arr::get($question, $pattern . 'correct', 1);

            $question->insert();
        }

        return $quiz;
    }


    private function fillByRow($quiz_row)
    {
        if (!empty($quiz_row['id'])) {

            $this->id           = $quiz_row['id'];
            $this->name         = $quiz_row['name'];
            $this->description  = $quiz_row['description'];
            $this->dt_create    = $quiz_row['dt_create'];
            $this->dt_update    = $quiz_row['dt_update'];
        }

        return $this;
    }


    public function remove()
    {
        Dao_Quiz::update()->where('id', '=', $this->id)
            ->set('is_removed', 1)
            ->clearcache('quiz_list')
            ->execute();

            $this->id = 0;
    }


    public function update()
    {
        Dao_Quiz::update()->where('id', '=', $this->id)
            ->set('name',           $this->name)
            ->set('description',    $this->description)
            ->set('dt_update',      $this->dt_update)
            ->clearcache($this->id)
            ->execute();
    }


    public static function get($id = 0, $needClearCache = false)
    {
        $quiz = Dao_Quiz::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $quiz->clearcache($id);
        } else {
            $quiz->cached(Date::MINUTE * 5, $id);
        }

        $quiz = $quiz->execute();

        $model = new Model_Quiz();

        return $model->fillByRow($quiz);
    }
}
