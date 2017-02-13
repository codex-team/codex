<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Feedback extends Controller_Base_preDispatch
{
	public function action_posts(){
		$posts = Model::factory('Feed_Feedback');
      	$first = array();
 
      	$this->template->title            = 'Kohana 3.0 Model Test';
      	$this->template->meta_keywords    = 'PHP, Kohana, KO3, Framework, Model';
      	$this->template->meta_description = 'A test of the KO3 framework Model';
      	$this->template->styles  = array();
      	$this->template->scripts = array();
 	 	
 	 	$first['msg']      = '';
   		$first['msg_type'] = '';
    
   // Обрабатываем POST
   if($_POST)
   {
      $ret = $this->_add_post(
         Security::xss_clean(Arr::get($_POST, 'title', '')), // Очищаем элемент $_POST['title']
         Security::xss_clean(Arr::get($_POST, 'post', ''))); // Очищаем элемент $_POST['post']
 
      if(isset($ret['error']))
      {
         $first['msg']      = $ret['error']; // Текст ошибки
         $first['msg_type'] = 'error';       // Класс сообщения в отображении
      }
      else
      {
         $first['msg']      = 'Сохранено.';
         $first['msg_type'] = 'success';
      }
   }           

      // Получаем 10 последних записей
      $first['posts'] = $posts->get_last_posts(10);
      $this->template->content = View::factory('templates/feedback', $first);

	}

	/**
 	* Метод посредник для добавления записи в таблицу
 	* @param string $title         Текст заголовка
 	* @param string $post_content  Текст сообщения
 	* @access private
 	*/
	private function _add_post($title, $post_content)
	{
   		// Загружаем модель
   		$post = Model::factory('Feed_Feedback');
 
   		// Проверям обязательные поля
   		if(empty($title))
   		{
      		return(array('error' => 'Пожалуйста введите заголовок.'));
   		}
   		elseif(empty($post_content))
   		{
      		return(array('error' => 'Пожалуйста введите сообщение.'));
   		}
 
   		// Записываем в базу данных
   		$post->add_post($title, $post_content);
   		return TRUE;
	}
}