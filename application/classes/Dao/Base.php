<?php defined('SYSPATH') or die('No direct script access.');

class Dao_Base {

    protected $table = 'null';

    const USER_INSERT  = 1;
    const USER_UPDATE  = 2;
    const USER_SELECT  = 3;

    private $action;

    protected $limit        = 1;
    protected $cached       = 0;
    protected $keycached    = null;
    protected $whereEquals  = array();
    protected $fields       = array();
    protected $order_by     = array();

    public static function insert()
    {
        $self = new static();
        $self->action = self::USER_INSERT;
        return $self;
    }

    public static function update()
    {
        $self = new static();
        $self->action = self::USER_UPDATE;
        return $self;
    }

    public static function select()
    {
        $self = new static();
        $self->action = self::USER_SELECT;
        return $self;
    }

    public function set($field, $value)
    {
        $this->fields[$field] = $value;
        return $this;
    }

    /**
     * Запрос в котором значение поля $field равно $value.
     *
     * @param String $field поле по которому поставлено условие
     * @param mixed $value значение, которому должно быть равно поле
     * @return $this объект, для построения дальшейшего вызова.
     */
    public function whereEquals($field, $value)
    {
        $this->whereEquals[$field] = $value;
        return $this;
    }

    public function limit($limit)
    {
        $this->limit = $limit;
        return $this;
    }

    /**
     * Use ORDER BY $field $direction from SQL.
     *
     * @param string $field field to sort by
     * @param string $direction direction of sort.
     * @return self
     */
    public function order_by($field, $direction = 'ASC')
    {
        $this->order_by[$field] = $direction;
        return $this;
    }

    public function cached($seconds, $key = null)
    {
        $this->cached = $seconds;
        if ($key) $this->keycached = $this->getKeyCached($key);
        return $this;
    }

    public function clearcache($key)
    {
        $keycached = $this->getKeyCached($key);
        Kohana_Cache::instance('memcache')->delete($keycached);
        return $this;
    }

    public function execute()
    {
        $result = false;
        if ($this->action == self::USER_INSERT) {
            $result = self::insertExecute();
        } elseif ($this->action == self::USER_UPDATE) {
            $result = self::updateExecute();
        } elseif ($this->action == self::USER_SELECT) {
            $result = self::selectExecute();
        }
        return $result;
    }

    private function insertExecute()
    {
        $insert = DB::insert($this->table, array_keys($this->fields))->values(array_values($this->fields))->execute();
        if ($insert) return current($insert);
        return false;
    }

    private function updateExecute()
    {
        if (!$this->whereEquals) throw new Exception('Попытка обновить все записи в таблице!');
        $update = DB::update($this->table)->set($this->fields);
        foreach($this->whereEquals as $key => $value) $update->where($key, '=', $value);
        $update = $update->execute();
        if ($update)  return $update;
        return false;
    }

    private function selectExecute()
    {
        $select = DB::select()->from($this->table);
        foreach($this->whereEquals  as $key => $value) $select->where($key, '=', $value);
        foreach($this->order_by     as $key => $value) $select->order_by($key, $value);

        if ($this->cached && sizeof($this->order_by) == 0) {
            $keycache = $this->getKeyCached();
            $cache = Kohana_Cache::instance('memcache')->get($keycache);
            if ($cache !== null) {
                return $cache;
            }
        }

        if ($this->limit == 1) {
            $select = $select->execute()->current();
        } else {
            $select = $select->execute()->as_array();
        }

        if ($this->cached && sizeof($this->order_by) == 0) {
            Kohana_Cache::instance('memcache')->set($keycache, $select, $this->cached);
        }

        if ($select) return $select;
        return false;
    }

    private function getKeyCached($key = null)
    {
        if ($this->keycached) return $this->keycached;

        $keyprefix = 'dbcache:' . $this->table . ':';
        if (!$key) {
            ksort($this->whereEquals);
            $key = sha1(json_encode($this->whereEquals));
        }

        $this->keycached = $keyprefix . $key;

        return $this->keycached;
    }

} 