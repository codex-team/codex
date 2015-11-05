<?php defined('SYSPATH') OR die('No direct access allowed.');

class Controller_Auth extends Controller_Base_preDispatch
{
    public function action_get_data()
    {
        $profile = Session::instance()->get('profile');
        if(!$profile)
        {
            throw new Kohana_Exception('no user data input');
        }
        $validError = Session::instance()->get_once('validError',array());
        var_dump($profile);
        exit();

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
            case 'vkontakte':
                $data   = array_merge($data, array(
                    'name'  => $profile->first_name.' '.$profile->last_name,
                    'vk_id' => $profile->uid,
                ));
                //field to update if user already exists
                $update = array('vk_id' => $data['vk_id']);
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

    public function action_vk()
    {
        $this->template->title = 'Команда CodeX';
        $this->template->content = View::factory('templates/index', $this->view);

        $vk = Oauth::instance('vkontakte');
        if ($vk->login())
        {
            $profile = $vk->get_user();
            if ($profile)
            {
                $user = Model_Users::factory('Users')->where('uid', '=', ":uid")->param(":uid", $profile->uid)->find();
                if ($user->id)
                {
                    Session::instance()->set('profile', $profile);
                    Controller::redirect('/auth/callback');
                }
                else
                {
                    Session::instance()->set('profile', $profile);
                    $user = Model_Users::factory('Users');
                    $user->uid = $profile->uid;
                    $user->first_name = $profile->first_name;
                    $user->last_name = $profile->last_name;
                    $user->save();
                    Controller::redirect('/auth/callback');
                }
            }
        }

    }

    public function action_callback()
    {
        Controller::redirect('/');
    }
}