<?php defined('SYSPATH') OR die('No Direct Script Access');


Class Model_Quiz extends Model
{
    public $id = 0;
    public $title;
    public $description;
    public $json;
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
            ->set('title',          $this->title)
            ->set('json',           $this->json)
            ->set('description',    $this->description)
            ->execute();

        if ($idAndRowAffected) {
            $quiz = Dao_Quizzes::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->execute();

            $this->fillByRow($quiz);
        }

        return $idAndRowAffected;
    }

    public function update()
    {
        Dao_Quizzes::update()->where('id', '=', $this->id)
            ->set('title',       $this->title)
            ->set('description', $this->description)
            ->set('json',        $this->json)
            ->clearcache($this->id)
            ->execute();
    }


    public function get($id = 0, $needClearCache = false)
    {
        $quiz = Dao_Quizzes::select()
            ->where('id', '=', $id)
            ->limit(1)
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
            $this->json         = $quiz_row['json'];
            $this->dt_create    = $quiz_row['dt_create'];
            $this->dt_update    = $quiz_row['dt_update'];
        }

        return $this;
    }

    public static function getTitles() {

        $quizzes = Dao_Quizzes::select(array('id', 'title'))
            ->where('is_removed', '=', 0)
            ->execute();

        $list = array();
        foreach ($quizzes as $quiz) {
            $list[] = array('id' => $quiz['id'], 'title' => $quiz['title']);
        }

        return $list;
    }
}
