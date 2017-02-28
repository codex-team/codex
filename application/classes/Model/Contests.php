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
    public $uri;
    public $title;
    public $text;
    public $content;
    public $blocks;
    public $description;
    public $results;
    public $prize;
    public $dt_create;
    public $dt_update;
    public $dt_close;
    public $status;
    public $winner;
    public $list_icon;

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
                                ->set('content',        $this->content)
                                ->set('prize',          $this->prize)
                                ->set('dt_close',       $this->dt_close)
                                ->set('status',         $this->status)
                                ->set('winner',         $this->winner)
                                ->set('results',        $this->results)
                                ->set('description',    $this->description)
                                ->clearcache('contests_list')
                                ->execute();

        if ($idAndRowAffected) {
            $contest = Dao_Contests::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($contest);
        }

        return $idAndRowAffected;
    }

    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $contest_row array строка из базы данных с создаваемым контестом
     * @return Model_Contests модель, заполненная полями из контеста, либо пустая модель, если была передана пустая строка.
     */
    private function fillByRow($contest_row)
    {
        if (empty($contest_row['id'])) return $this;

        foreach ($contest_row as $fieldname => $value) {
            if (property_exists($this, $fieldname)) $this->$fieldname = $value;
        }

        return $this;
    }


    /**
     * Удаляет контест, представленный в модели.
     *
     * @param $user_id Number идентификатор пользователя, для проверки прав на удаление контеста
     */
    public function remove()
    {
        if ($this->id != 0) {

            Dao_Contests::update()->where('id', '=', $this->id)
                ->set('status', -1)
                ->clearcache('contests_list')
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
            ->set('uri',            $this->uri)
            ->set('title',          $this->title)
            ->set('text',           $this->text)
            ->set('content',        $this->content)
            ->set('results',        $this->results)
            ->set('prize',          $this->prize)
            ->set('dt_close',       $this->dt_close)
            ->set('status',         $this->status)
            ->set('winner',         $this->winner)
            ->set('dt_update',      $this->dt_update)
            ->set('results',        $this->results)
            ->set('description',    $this->description)
            ->clearcache($this->id)
            ->execute();
    }

    /**
     * Возвращает контест из базы данных с указанным идентификатором, иначе возвращает пустой контест с айдишником 0.
     *
     * @param int $id идентификатор контеста в базе
     * @return Model_Contests экземпляр модели с указанным идентификатором и заполненными полями, если найден в базе или
     * пустую модель с айдишником равным нулю.
     */
    public static function get($id = 0, $needClearCache = false)
    {
        $contest = Dao_Contests::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $contest->clearcache($id);
        } else {
            $contest->cached(Date::MINUTE * 5, $id);
        }

        $contest = $contest->execute();

        $model = new Model_Contests();
        return $model->fillByRow($contest);
    }

    /**
     * Получить все активные (опубликованные и не удалённые контесты) в порядке убывания айдишников.
     */
    public static function getActiveContests($clearCache = false)
    {
        return Model_Contests::getContests(false, false, !$clearCache ? Date::MINUTE * 5 : null);
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
    private static function getContests($add_not_published = false, $add_removed = false, $cachedTime = null)
    {
        $contestsQuery = Dao_Contests::select()->limit(200);        // TODO add pagination.

        if (!$add_removed) {
            $contestsQuery->where('status', '<>', -1);
        }

        if (!$add_not_published) {
            $contestsQuery->where('status', '=', 1);
        }

        if ($cachedTime) {
            $contestsQuery->cached($cachedTime, 'contests_list');
        }
        $contest_rows = $contestsQuery->order_by('dt_create', 'DESC')->execute();

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
