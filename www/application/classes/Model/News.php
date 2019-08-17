<?php defined('SYSPATH') or die('No Direct Script Access');


class Model_News extends Model
{
    public const TYPE_DEFAULT = 1;
    public const TYPE_RELEASE = 2;

    public $id;
    public $user_id;
    public $ru_text;
    public $en_text;
    public $type;
    public $dt_display;
    public $dt_create;

    /**
     * Добавить новую запись в таблицу 'News'
     *
     * @return mixed
     */
    public function insert()
    {
        $idAndRowAffected = Dao_News::insert()
            ->set('user_id', $this->user_id)
            ->set('ru_text', $this->ru_text)
            ->set('en_text', $this->en_text)
            ->set('type', $this->type)
            ->set('dt_display', $this->dt_display)
            ->execute();

        if ($idAndRowAffected) {
            $this->get($idAndRowAffected);
        }

        return $idAndRowAffected;
    }

    /**
     * Обновить новость
     *
     * @return void
     */
    public function update(): void
    {
        Dao_News::update()
            ->where('id', '=', $this->id)
            ->set('user_id', $this->user_id)
            ->set('ru_text', $this->ru_text)
            ->set('en_text', $this->en_text)
            ->set('type', $this->type)
            ->set('dt_display', $this->dt_display)
            ->clearcache($this->id)
            ->execute();
    }

    /**
     * Получить одну новость по её идентификатору
     *
     * @param int $id
     *
     * @return Model_News
     */
    public function get(int $id): self
    {
        $news = Dao_News::select()
            ->where('id', '=', $id)
            ->limit(1)
            ->cached(DATE::MINUTE * 5, $id)
            ->execute() ?: [];

        $this->fillByRow($news);

        return $this;
    }

    /**
     * Получить все нововости
     *
     * @return array
     */
    public static function getAll(): array
    {
        $news_rows = Dao_News::select()
            ->order_by('dt_display', 'DESC')
            ->execute() ?: [];

        return self::rowsToModels($news_rows);
    }

    /**
     * Преобразовать записи из базы в массив моделей
     *
     * @param array $news_rows
     *
     * @return array
     */
    private static function rowsToModels(array $news_rows): array
    {
        $all_news = [];

        foreach ($news_rows as $news_row) {
            $news = new self();
            $news->fillByRow($news_row);
            $all_news[] = $news;
        }

        return $all_news;
    }

    /**
     * Заполнить объект данными из записи
     *
     * @param array $news_row
     *
     * @return Model_News
     */
    private function fillByRow(array $news_row): self
    {
        if (!empty($news_row['id'])) {
            $this->id         = $news_row['id'];
            $this->user_id    = $news_row['user_id'];
            $this->ru_text    = $news_row['ru_text'];
            $this->en_text    = $news_row['en_text'];
            $this->type       = $news_row['type'];
            $this->dt_display = $news_row['dt_display'];
            $this->dt_create  = $news_row['dt_create'];
        }

        return $this;
    }

    /**
     * Преобразовать и получить дату для человеко-приятного отображения
     *
     * @return string
     */
    public function getPrettifiedDtDisplay(): string
    {
        return strtolower(date('j M', strtotime($this->dt_display)));
    }
}
