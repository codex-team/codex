<?php

class Model_Comment extends Model
{
    public $id;
    public $user_id;
    public $status;
    public $text;
    public $article_id;
    public $root_id;
    public $parent_id;
    public $dt_create;
    public $dt_update;
    public $is_removed;

    /**
     * Пустой конструктор для модели коментария, если нужно получить коментарий из базы, нужно пользоваться статическими
     * методами.
     */
    public function __construct()
    {
    }

    /**
     * Добавляет комментарий в бд
     */
    public function insert()
    {
        $idAndRowAffected = DB::insert('Comments', array('article_id', 'user_id', 'text', 'parent_id', 'root_id'))
                    ->values(array($this->article_id, $this->user_id, $this->text, $this->parent_id, $this->root_id))
                    ->execute();

        if ($idAndRowAffected) {
            $comment = DB::select()->from('Comments')->where('id', '=', $idAndRowAffected[0])->execute()->current();

            $this->fillByRow($comment);
        }
    }

    /**
     * Удаляем комментарий и все его подкомментарии
     *
     * @param $user айди текущего пользователя, чтобы комментарий мог удалить только владелец
     * @return mixed айди статьи для редиректа
     */
    public function delete_comment($user)
    {
        // получаем id статьи для редиректа
        $comment = DB::select('*')->from('Comments')->where('id', '=', $this->id)->execute();
        $article_id = $comment[0]['article_id'];

        if ($this->user_id != $user->id) {
            return $article_id;
        }

        // удаляем комментарий и все его подкомментарии рекурсивно
        function delete_subcomments($parent_id)
        {
            $subcomments = DB::select('*')->from('Comments')->where('parent_id', '=', $parent_id)->execute();

            foreach ($subcomments as $comment):
                delete_subcomments($comment['id']);
            endforeach;

            DB::update('Comments')->where('id', '=', $parent_id)->set(array('is_removed' => 1))->execute();
        }
        delete_subcomments($this->id);

        return $article_id;
    }

    /**
     * Возвращает комментарий из базы данных с указанным идентификатором, иначе возвращает пустую статью с айдишником 0.
     *
     * @param int $id идентификатор комментария в базе
     * @return Model_Comment модель комментария с указанным айдишником, либо пустая модель с айдишником равным нулю.
     */
    public static function get($id = 0)
    {
        $comment_row = DB::select()->from('Comments')->where('id', '=', $id)->execute()->current();

        $model = new Model_Comment();

        return $model->fillByRow($comment_row);
    }

    /**
     * Заполняет текущий объект строкой из базы данных.
     *
     * @param $comment_row array строка из базы данных с создаваемым коментарием
     * @return Model_Comment модель, заполненная полями комментария из массива, либо пустая модель, если была передана
     * пустая строка.
     */
    private function fillByRow($comment_row)
    {
        if (!empty($comment_row['id'])) {
            $this->id = $comment_row['id'];
            $this->user_id = $comment_row['user_id'];
            $this->status = $comment_row['status'];
            $this->text = $comment_row['text'];
            $this->article_id = $comment_row['article_id'];
            $this->root_id = $comment_row['root_id'];
            $this->parent_id = $comment_row['parent_id'];
            $this->dt_create = $comment_row['dt_create'];
            $this->dt_update = $comment_row['dt_update'];
            $this->is_removed = $comment_row['is_removed'];
        }

        return $this;
    }

    public static function getCommentsByArticle($article_id)
    {
        $comments = array();

        if (!empty($article_id)) {
            $comment_rows = DB::select()->from('Comments')->where('article_id', '=', $article_id)
                ->where('is_removed', '=', 0)
                ->order_by('id', 'ASC')
                ->order_by('parent_id', 'ASC')
                ->execute();

            foreach ($comment_rows as $comment_row) {
                $comment = new Model_Comment();

                $comment->fillByRow($comment_row);

                array_push($comments, $comment);
            }
        }

        return $comments;
    }

    public static function countCommentsByArticle($article_id)
    {
        if (!empty($article_id)) {
            $commentsCount = DB::select(array(DB::expr('COUNT(id)') , 'counter'))
                            ->from('Comments')
                            ->where('article_id', '=', $article_id)
                            ->where('is_removed', '=', 0)
                            ->cached(Date::MINUTE * 10)
                            ->execute()
                            ->get('counter');
        }

        return $commentsCount;
    }
}
