<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Pages extends Controller_Base_preDispatch
{
    public function action_join()
    {
        if (Security::check(Arr::get($_POST, 'csrf'))) {
            $this->saveRequest();

            /** Refresh CSRF token */
            Security::token(true);
        }

        $this->view['request'] = $this->user->getUserRequest();

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

        switch ($who) {
            case 'design':
                $this->title = 'Задание для веб-дизайнеров';
                $this->template->content = View::factory('templates/task/design', $this->view);
                break;
            case 'frontend':
                $this->title = 'Задание на frontend-разработку';
                $this->template->content = View::factory('templates/task/frontend', $this->view);
                break;
            case 'backend':
                $this->title = 'Задание на backend-разработку';
                $this->template->content = View::factory('templates/task/backend', $this->view);
                break;
            default:
                throw new HTTP_Exception_404();
                break;
        }
    }

    private function saveRequest()
    {
        $fields = array(
            'skills' => Arr::get($_POST, 'skills'),
            'wishes' => Arr::get($_POST, 'wishes'),
            'email'  => Arr::get($_POST, 'email', null),
            'name'   => Arr::get($_POST, 'name', null),
        );

        if (!$fields['email'] && !$this->user->id) {
            $this->view['error'] = 'Авторизуйтесь или укажите почту, чтобы мы могли с вами связаться.';
            return;
        }

        if ($this->user->id) {
            $fields['uid'] = $this->user->id;
        }

        $this->view['success'] = $this->methods->saveJoinRequest($fields);

        if ($this->view['success']) {
            Model_Methods::sendBotNotification('Зарегистрирована новая заявка на вступление в клуб.');
        }
    }
}
