<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Pages extends Controller_Base_preDispatch
{


    public function action_join()
    {

        if (Security::check( Arr::get($_POST, 'csrf') )) {

            $this->saveRequest();

            /** Refresh CSRF token */
            Security::token(true);

        }

        $this->view['request'] = $this->user->getUserRequests();

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


    	if ( $who == "developers" ){

            $this->title = 'Задание для веб-разрабочиков';
            $this->template->content = View::factory('templates/task/developers', $this->view);

        } elseif ( $who == "designers" ){

            $this->title = 'Задание для веб-дизайнеров';
            $this->template->content = View::factory('templates/task/designers', $this->view);
        }
    }

    private function saveRequest(){

        $fields = array(
            'skills' => Arr::get($_POST, 'skills'),
            'wishes' => Arr::get($_POST, 'wishes'),
            'email'  => Arr::get($_POST, 'email', NULL),
            'name'   => Arr::get($_POST, 'name', NULL),
        );

        if ( !$fields['email'] && !$this->user->id) {
            $this->view['error'] = 'Авторизуйтесь или укажите почту, чтобы мы могли с вами связаться.';
            return;
        }

        if ($this->user->id) {
            $fields['uid'] = $this->user->id;
        }

        Model_Methods::bot_notification('Новая заявка на вступление в клуб!');

        $this->view['success'] = $this->methods->saveJoinRequest($fields);

    }

}