<?php

defined('SYSPATH') or die('No direct script access.');

class Controller_Auth extends Controller {

  public function action_login() {
	$this->template->content = View::factory('auth/login');
  }

  public function action_logout() {
	Auth::instance()->logout();
	HTTP::redirect('login');
  }

}
