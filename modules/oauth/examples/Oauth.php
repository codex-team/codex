<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Oauth extends Controller {

  public function action_get_data()
  {
    $profile = Session::instance()->get('profile');
    if(!$profile)
    {
      throw new Kohana_Exception('no user data input');
    }
    $validError = Session::instance()->get_once('validError',array());

//    $view = View::factory('account/show');
//    $this->template->sitetitle = 'Доп информация';
//    $this->template->content = $view
//      ->bind('validError', $validError)
//      ->bind('profile',$profile);
//    if($this->request->method() == Request::POST)
//    {

      $pass = substr(md5(uniqid(rand(), false)), 0, 10);
      $data = array(
          'username'         => substr(md5(uniqid(rand(), false)), 1, 11),
          'password'         => $pass,
          // 'password_confirm' => $pass,
          'mail_confirm'     => 1,
      );
      //adding fields that are diffrent
      switch ($profile->referer)
      {
        case 'facebook':
          $data = array_merge($data, array(
              'name'  => $profile->name,
              'fb_id' => $profile->id,
              'email' => $profile->email,
            ));
          //field to update if user already exists
          $update = array('fb_id' => $data['fb_id']);
          break;
        case 'vkontakte':
          $data   = array_merge($data, array(
              'name'  => $profile->first_name.' '.$profile->last_name,
              'vk_id' => $profile->uid,
            ));
          //field to update if user already exists
          $update = array('vk_id' => $data['vk_id']);
          break;
        case 'odnoklassniki':
          $data   = array_merge($data, array(
              'name'  => $profile->first_name.' '.$profile->last_name,
              'od_id' => $profile->uid,
            ));
          //field to update if user already exists
          $update = array('od_id' => $data['od_id']);
          break;
        default:
          throw new Kohana_Exception('No such action referer');
          break;
      }

      try
      {
	$user = ORM::factory('User');
	$user->username		= $data['username'];
	$user->password		= $data['password'];
	$user->mail_confirm	= $data['mail_confirm'];
	$user->name		= $data['name'];

	// orm not work if not set email
	$user->email		= "user@empty.mail";

	if (!empty($data['fb_id'])) { $user->fb_id = $data['fb_id']; }
	if (!empty($data['vk_id'])) { $user->vk_id = $data['vk_id']; }
	if (!empty($data['od_id'])) { $user->od_id = $data['od_id']; }
	if (!empty($data['city']))  { $user->city  = $data['city'];  }
	$user->save();
      }
      catch (ORM_Validation_Exception $e)
      {
//        $user = ORM::factory('User')->where('email', '=', $data['email'])->find();
//        if ($user)
//        {
//          $user->values($update)->update();
//          $this->auth->force_login($user);
//          Controller::redirect('account');
//        }
        Session::instance()->set('validError', $e->errors('model'));
        Controller::redirect('login');
      }
      $user->add('roles', ORM::factory('Role', array('name' => 'login')));
      Auth::instance()->force_login($user);
      Controller::redirect('account');
//    }

  }

  // Vkontakte login example
  public function action_vk_login() {
    $vk = Oauth::instance('vkontakte');
    // if login via oauth ok
    if ($vk->login()) {
      // get user profile
      $profile = $vk->get_user();
      // if get profile ok
      if ($profile) {
        // find current user via orm
        $user = ORM::factory('User')->where('vk_id', '=', "$profile->uid")->find();
        // if user found
        if ($user->id) {
          // update his id
          $user->values(array('vk_id' => $profile->uid, 'mail_comfirm' => 1))->update();
          // then login via his $username and redirect to profile page
          Auth::instance()->force_login($user);
          Controller::redirect('account');
        } else {
          // else create session pipe and redirect to get_data
          $profile->referer = 'vkontakte';
          Session::instance()->set('profile', $profile);
          Controller::redirect('oauth/get_data');
        }
      }
    }
  }

  // Odnoklassniki login example
  public function action_od_login() {
    $od = Oauth::instance('odnoklassniki');
    // if login via oauth ok
    if ($od->login()) {
      // get user profile
      $profile = $od->get_user();
      // if get profile ok
      if ($profile) {
        // find current user via orm
        $user = ORM::factory('User')->where('od_id', '=', "$profile->uid")->find();
        // if user found
        if ($user->id) {
          // update his id
          $user->values(array('od_id' => $profile->uid, 'mail_comfirm' => 1))->update();
          // then login via his $username and redirect to profile page
          Auth::instance()->force_login($user);
          Controller::redirect('account');
        } else {
          // else create session pipe and redirect to get_data
          $profile->referer = 'odnoklassniki';
          Session::instance()->set('profile', $profile);
          Controller::redirect('oauth/get_data');
        }
      }
    }
  }

  // fbontakte login example
  public function action_fb_login() {
    $fb = Oauth::instance('facebook');
    // if login via oauth ok
    if ($fb->login()) {
      // get user profile
      $profile = $fb->get_user();
      // if get profile ok
      if ($profile) {
        // find current user via orm
        $user = ORM::factory('User')->where('fb_id', '=', "$profile->id")->or_where('email', '=', "$profile->email")->find();
        // if user found
        if ($user->id) {
          // update his id
          $user->values(array('fb_id' => $profile->uid, 'mail_comfirm' => 1))->update();
          // then login via his $username and redirect to profile page
          Auth::instance()->force_login($user);
          Controller::redirect('account');
        } else {
          // else create session pipe and redirect to get_data
          $profile->referer = 'facebook';
          Session::instance()->set('profile', $profile);
          Controller::redirect('oauth/get_data');
        }
      }
    }
  }

}
