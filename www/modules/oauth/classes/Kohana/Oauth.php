<?php defined('SYSPATH') or die('No direct script access.');

abstract class Kohana_Oauth {

	protected static $instance;

	public static function instance($service)
	{
		$config = Kohana::$config->load('oauth');
		$class = 'Oauth_' . ucfirst($service);
		return Kohana_Oauth::$instance = new $class($config -> get($service));
	}
}
