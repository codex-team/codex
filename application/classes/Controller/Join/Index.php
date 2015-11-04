<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Join_Index extends Controller_Base_preDispatch
{


 public function action_index()
    {
    	 $this->title = 'Набор в команду CodeX';
    	  $this->template->content = View::factory('templates/join/index', $this->view);
}



}