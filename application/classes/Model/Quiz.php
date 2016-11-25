<?php defined('SYSPATH') OR die('No Direct Script Access');


Class Model_Test extends Model
{
    public $id = 0;
    public $name;
    public $description;
    public $dt_create;
    public $dt_update;


    public function __construct() {}


    public function insert()
    {
        $idAndRowAffected = Dao_Test::insert()
                                ->set('name',           $this->name)
                                ->set('description',    $this->description)
                                ->clearcache('test_list')
                                ->execute();

        if ($idAndRowAffected) {
            $test = Dao_Test::select()
                ->where('id', '=', $idAndRowAffected)
                ->limit(1)
                ->cached(10*Date::MINUTE)
                ->execute();

            $this->fillByRow($test);
        }

        return $idAndRowAffected;
    }


    private function fillByRow($test_row)
    {
        if (!empty($test_row['id'])) {

            $this->id           = $test_row['id'];
            $this->name         = $test_row['name'];
            $this->description  = $test_row['description'];
            $this->dt_create    = $test_row['dt_create'];
            $this->dt_update    = $test_row['dt_update'];
        }

        return $this;
    }


    public function remove()
    {
        Dao_Test::update()->where('id', '=', $this->id)
            ->set('is_removed', 1)
            ->clearcache('test_list')
            ->execute();

            $this->id = 0;
        }
    }


    public function update()
    {
        Dao_Test::update()->where('id', '=', $this->id)
            ->set('name',           $this->name)
            ->set('description',    $this->description)
            ->set('dt_update',      $this->dt_update)
            ->clearcache($this->id)
            ->execute();
    }


    public static function get($id = 0, $needClearCache = false)
    {
        $test = Dao_Test::select()
            ->where('id', '=', $id)
            ->limit(1);

        if ($needClearCache) {
            $test->clearcache($id);
        } else {
            $test->cached(Date::MINUTE * 5, $id);
        }

        $test = $test->execute();

        $model = new Model_Test();

        return $model->fillByRow($test);
    }
}
