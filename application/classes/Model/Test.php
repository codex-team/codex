<?php defined('SYSPATH') OR die('No Direct Script Access');

Class Model_Test extends Model
{
    public $id;
    public $title;
    public $short_description;
    public $description;
    public $date;
    public $questions = array();

    private function fillByRow($test_row)
    {
        if (!empty($test_row['id'])) {

            $this->id                   = $test_row['id'];
            $this->title                = $test_row['title'];
            $this->short_description    = $test_row['short_description'];
            $this->description          = $test_row['description'];
            $this->date                 = $test_row['date'];
        }

        return $this;
    }

    public static function getAll()
    {
        $test_rows = DB::select()
                         ->from('Tests')
                         ->execute();

        return self::rowsToModels($test_rows);
    }

    public static function getById($id)
    {
        $test = DB::select()
                         ->from('Tests')
                         ->where('id', '=', $id)
                         ->limit(1)
                         ->execute();


        $model = new Model_Test();
        $model->fillByRow($test[0]);
        $model->questions = self::getQuestionsByTestId($id);
        return $model;
    }

    private static function getQuestionsByTestId($id)
    {
        $questionsQuery = DB::select()
                                ->from('Tests_Questions')
                                ->where('t_id', '=', $id)
                                ->execute();

        $question_row = array();

        $ids = array();
        $i = 0;
        foreach ($questionsQuery as $question) {

            $question_row[$i]['id']          = $question['id'];
            $ids[$i]                         = $question['id'];
            $question_row[$i]['title']       = $question['title'];
            $question_row[$i]['description'] = $question['description'];
            $question_row[$i]['time']        = $question['time'];
            $question_row[$i]['answers']     = array();

            $i++;
        }

        $answersQuery = DB::select()
            ->from('Tests_Answers')
            ->where('q_id', 'in', $ids)
            ->execute();

        foreach ($answersQuery as $answer) {

            $qKey = array_search($answer['q_id'], $ids);

            $question_row[$qKey]['answers'][] = $answer;

        }

        return $question_row;
    }

    private static function rowsToModels($test_rows)
    {
        $tests = array();

        if (!empty($test_rows)) {
            foreach ($test_rows as $test_row) {
                $test = new Model_Test();

                $test->fillByRow($test_row);

                array_push($tests, $test);
            }
        }

        return $tests;
    }

    public static function getResult($test_id, $answers)
    {
        $ids = array();
        $userAnswers = array();
        foreach ($answers as $id => $answer)
        {
            if(is_numeric($id)) {
                array_push($ids, $id);
                array_push($userAnswers, $answer);
            }
        }

        $rightAnswersQuery = DB::select('q_id', 'id')
                                ->from('Tests_Answers')
                                ->where('q_id', 'in', $ids)
                                ->where('is_right', '=', 1)
                                ->execute();

        $rightAnswers = array();
        foreach ($rightAnswersQuery as $current) {
            $rightAnswers[$current['q_id']] = $current['id'];
        }

        $points = 0;
        $userRightAnswers = array();
        for ($i = 0; $i < count($ids); $i++) {
            $userRightAnswers[$ids[$i]] = false;
        }

        for ($i = 0; $i < count($userAnswers); $i++) {
            if ($rightAnswers[$ids[$i]] == $userAnswers[$i]) {
                $points++;
                $userRightAnswers[$ids[$i]] = true;
            }
        }

        $messagesQuery = DB::select('message', 'points')
                        ->from('Tests_Messages')
                        ->where('t_id', '=', $test_id)
                        ->execute();

        $messages = array();
        foreach ($messagesQuery as $current) {
            $messages[$current['points']] = $current['message'];
        }

        $message = '';
        foreach ($messages as $point => $mes) {
            if ($points == $point) {
                $message = $mes;
                break;
            } else {
                if ($points < $point) {
                    break;
                } else {
                    $message = $mes;
                }
            }
        }

        $result = array($points, $userRightAnswers, $message, $rightAnswers);

        return $result;
    }
}
?>