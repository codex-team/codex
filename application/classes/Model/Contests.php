<?php defined('SYSPATH') OR die('No Direct Script Access');

/**
 * Модель контестов, имеет поля, соответствующие полям в базе данных и статические методы для получения
 * контеста и массива контестов по некоторым признакам.
 *
 * @author     Alexander Menshikov
 */
Class Model_Contests extends Model
{
    public $id = 0;
    public $title;
    public $text;
    public $prize;
    public $dt_create;
    public $dt_update;
    public $dt_close;
    public $status;
    public $winner;

    /**
     * Пустой конструктор для модели контестов, если нужно получить контест из хранилища, нужно пользоваться статическими
     * методами
     */
    public function __construct()
    {
    }

    /**
     * Добавляет текущий объект в базу данных и присваивает ему айдишник.
     *
     * @throws Kohana_Exception
     */
    public function insert()
    {
        $idAndRowAffected = Dao_Contests::insert()
                                ->set('title',          $this->title)
                                ->set('text',           $this->text)
                                ->set('prize',          $this->prize)
                                ->set('dt_close',       $this->dt_close)
                                ->set('status',         $this->status)
                                ->set('winner',         $this->winner)
                                ->clearcache()
                                ->execute();

        if ($idAndRowAffected) {
            $contest = Dao_Contests::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($contest);
        }
    }

    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $contest_row array строка из базы данных с создаваемым контестом
     * @return Model_Contests модель, заполненная полями из контеста, либо пустая модель, если была передана пустая строка.
     */
    private function fillByRow($contest_row)
    {
        if (!empty($contest_row['id'])) {

            $this->id           = $contest_row['id'];
            $this->title        = $contest_row['title'];
            $this->text         = $contest_row['text'];
            $this->prize        = $contest_row['prize'];
            $this->dt_create    = $contest_row['dt_create'];
            $this->dt_update    = $contest_row['dt_update'];
            $this->dt_close     = $contest_row['dt_close'];
            $this->status       = $contest_row['status'];
            $this->winner       = $contest_row['winner'];
        }

        return $this;
    }


    /**
     * Удаляет контест, представленный в модели.
     *
     * @param $user_id Number идентификатор пользователя, для проверки прав на удаление контеста
     */
    public function remove($user_id)
    {
        if ($this->id != 0 && $user_id == $this->user_id) {

            Dao_Contests::update()->where('id', '=', $this->id)
                ->set('status', -1)
                ->clearcache()
                ->execute();

            // Контест удален
            $this->id = 0;
        }
    }


    /**
     * Обновляет контест, сохраняя поля модели.
     */
    public function update()
    {
        Dao_Contests::update()->where('id', '=', $this->id)

            ->set('title',          $this->title)
            ->set('text',           $this->text)
            ->set('prize',          $this->prize)
            ->set('dt_close',       $this->dt_close)
            ->set('status',         $this->status)
            ->set('winner',         $this->winner)
            ->set('dt_update',      $this->dt_update)
            ->clearcache()
            ->execute();
    }

    /**
     * Возвращает контест из базы данных с указанным идентификатором, иначе возвращает пустой контест с айдишником 0.
     *
     * @param int $id идентификатор контеста в базе
     * @return Model_Contests экземпляр модели с указанным идентификатором и заполненными полями, если найден в базе или
     * пустую модель с айдишником равным нулю.
     */
    public static function get($id = 0)
    {
        $contest = Dao_Contests::select()
            ->where('id', '=', $id)
            ->limit(1)
            ->execute();

        $model = new Model_Contests();

        return $model->fillByRow($contest);
    }

    /**
     * Получить все активные (опубликованные и не удалённые контесты) в порядке убывания айдишников.
     */
    public static function getActiveContests()
    {
        return Model_Contests::getContests(false, false);
    }


    /**
     * Получить все не удалённые контесты в порядке убывания айдишников.
     */
    public static function getAllContests()
    {
        return Model_Contests::getContests(true, false);
    }

    /**
     * Получить список контестов с указанными условиями.
     *
     * @param $add_removed boolean добавлять ли удалённые контесты в получаемый список контестов
     * @param $add_not_published boolean
     * @return array ModelContests массив моделей, удовлетворяющих запросу
     */
    private static function getContests($add_not_published = false, $add_removed = false)
    {
        $contestsQuery = Dao_Contests::select()->limit(200);        // TODO add pagination.

        if (!$add_removed) {
            $contestsQuery->where('status', '<>', -1);
        }

        if (!$add_not_published) {
            $contestsQuery->where('status', '=', 1);
        }

        $contest_rows = $contestsQuery->order_by('id', 'DESC')->execute();

        return self::rowsToModels($contest_rows);
    }

    private static function rowsToModels($contest_rows)
    {
        $contests = array();

        if (!empty($contest_rows)) {
            foreach ($contest_rows as $contest_row) {
                $contest = new Model_Contests();

                $contest->fillByRow($contest_row);

                array_push($contests, $contest);
            }
        }

        return $contests;
    }
}
