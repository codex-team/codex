<?php defined('SYSPATH') or die('No direct script access.');

class Model_Feedback extends Kohana_Model
{
	/**
    * Get the last 10 posts
    * @return ARRAY
    */
    public function get_last_posts($limit, $offset = 0)
    {
        // SQL: SELECT * FROM 'posts' ORDER BY 'id' DESC LIMIT 0, 10
        return DB::select()                 // SELECT - DB:SELECT
            ->from('Feedback')               // Из таблицы 'post'
            ->order_by('id','DESC')       // Сортируем по 'id' в обртном порядке
            ->limit($limit)               // Количество записей с результатом
            ->offset($offset)             // пропустив $offset (по умолчанию 0) записей
            ->execute()                   // Выполняем
            ->as_array();                 // Результат ввиде массива
    }


    /** Создание записей в таблице
    * @param string $title  Текст заголовка
    * @param string $post   Текст сообщения
    */

    public function add_post($title, $post)
	{
 		// INSERT INTO 'posts' SET 'title' = $title, 'post' = $post
 		DB::insert('feedback',array('title','post')) // Добавляем записи 'title' и 'post' в таблицу 'posts'
  		->values(array($title, $post))        // 'title' = $title, 'post' = $post
  		->execute();
	}
}

?>
