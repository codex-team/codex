<?php defined('SYSPATH') or die('No Direct Script Access');


class Model_News extends Model
{
    /**
     * Format for displaying news date
     *
     * @var string
     */
    public const PRETTY_DATE_FORMAT = 'j M';

    /**
     * Default news type
     *
     * @var int
     */
    public const TYPE_DEFAULT = 1;

    /**
     * Release news type
     *
     * @var int
     */
    public const TYPE_RELEASE = 2;

    /**
     * Available news types
     *
     * @var array
     */
    public const AVAILABLE_TYPES = [self::TYPE_DEFAULT, self::TYPE_RELEASE];

    /**
     * News identifier
     *
     * @var int
     */
    public $id;

    /**
     * User identifier who added news
     *
     * @var int
     */
    public $user_id;

    /**
     * News text in Russian
     *
     * @var string
     */
    public $ru_text;

    /**
     * News text in English
     *
     * @var string
     */
    public $en_text;

    /**
     * News type
     *
     * @var int
     */
    public $type;

    /**
     * News displaying date
     *
     * @var string
     */
    public $dt_display;

    /**
     * News creation date
     *
     * @var string
     */
    public $dt_create;

    /**
     * Insert new record in 'News' table
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
            ->set('dt_display', $this->dt_display ?: date('Y-m-d H:i:s'))
            ->set('dt_create', $this->dt_create ?: date('Y-m-d H:i:s'))
            ->execute();

        if ($idAndRowAffected) {
            $this->get($idAndRowAffected);
        }

        return $idAndRowAffected;
    }

    /**
     * Update news
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
     * Get one news with its id
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
     * Get all news
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
     * Convert db rows to models
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
     * Fill the object with db row
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
     * Convert date to user-friendly format
     *
     * @return string
     */
    public function getPrettifiedDtDisplay(): string
    {
        return strtolower(date(self::PRETTY_DATE_FORMAT, strtotime($this->dt_display)));
    }
}
