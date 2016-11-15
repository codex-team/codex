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
        $columns = array(
                            array('Tests_Questions.id', 'questionId'),
                            'title',
                            'description',
                            'time',
                            array('Tests_Answers.id', 'answerId'),
                            'q_id',
                            'answer'
                        );

        $questionsQuery = DB::select_array($columns)
                                ->from('Tests_Questions')
                                ->join('Tests_Answers', 'inner')
                                ->on('Tests_Questions.id', '=', 'Tests_Answers.q_id')
                                ->where('t_id', '=', $id)
                                ->order_by('Tests_Questions.id')
                                ->execute();

        $questions = array();
        $currentQuestion = array(
                                    'index' => -1,
                                    'id'    => 0
                                );

        foreach ($questionsQuery as $question) {

            $answer = array(
                'id'     => $question['answerId'],
                'answer' => $question['answer']
            );

            $questionData = array(
                'id'            => $question['questionId'],
                'title'         => $question['title'],
                'description'   => $question['description'],
                'time'          => $question['time'],
                'answers'       => array($answer)
            );

            if ($currentQuestion['id'] == $question['questionId']) {

                $questions[ $currentQuestion['index'] ]['answers'][] = $answer;

                continue;
            }

            $currentQuestion['index']++;
            $currentQuestion['id'] = $question['questionId'];
            $questions[] = $questionData;
        }

        return $questions;
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

    /**
     * Функция принимает id теста
     * и массив ответов пользователя вида
     * <id вопроса> => <id варианта ответа>.
     *
     * Возвращает объект result, который содержит
     * количество набранных очков, сообщение и правильные ответы
     *
     * @param $test_id
     * @param $answers
     * @return array
     */
    public static function getResult($test_id, $answers)
    {
        $ids = array();
        //$userAnswers = array();
        foreach ($answers as $id => $answer)
        {
                $ids[] = $id;
        }

        /**
         * Делаем запрос в базу на выбор верных вариантов ответов на вопросы,
         * id которых есть в $ids.
         */
        $rightAnswersQuery = DB::select('q_id', 'id')
                                ->from('Tests_Answers')
                                ->where('q_id', 'in', $ids)
                                ->where('is_right', '=', 1)
                                ->execute();

        $rightAnswers = array();
        foreach ($rightAnswersQuery as $current) {
            $rightAnswers[$current['q_id']] = $current['id'];
        }

        /**
         * Считаем набранные очки
         */
        $points = 0;
        foreach ($answers as $id => $answer) {
            $points += ($answer == $rightAnswers[$id] ? 1 : 0);
        }

        /**
         * Делаем запрос в базу на выбор сообщений,
         * принадлежащих данному тесту
         */
        $messagesQuery = DB::select('message', 'points')
                        ->from('Tests_Messages')
                        ->where('t_id', '=', $test_id)
                        ->order_by('points')
                        ->execute();

        /**
         * Выбираем сообщение в соответствие с набранными очками
         */
        if(!empty($messagesQuery[0])) {

            foreach ($messagesQuery as $current) {

                if ($current['points'] > $points) {
                    break;
                }

                $message = $current['message'];
            }

        }

        $result = array(
                        'points'         => $points,
                        'message'        => $message,
                        'rightAnswers'   => $rightAnswers
                       );

        return $result;
    }
}
?>
