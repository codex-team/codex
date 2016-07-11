<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Pages extends Controller_Base_preDispatch
{


 public function action_index()
    {
    	 $this->title = 'Набор в команду CodeX';
    	  $this->template->content = View::factory('templates/join/index', $this->view);
}

 public function action_All()
    {    
    	
     	 $this->title = 'Задания для вступающих в команду';
    	  $this->template->content = View::factory('templates/task/index', $this->view);
  
    }

 public function action_whoSet()
    {    
    	 $who = $this->request->param('who');


    	 if($who == "developers")
      {
     	 $this->title = 'Задание для веб-разрабочиков';
    	  $this->template->content = View::factory('templates/task/developers', $this->view);
      }
      elseif($who == "designers")
      {
         $this->title = 'Задание для веб-дизайнеров';
    	  $this->template->content = View::factory('templates/task/designers', $this->view);
      }
}



}