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

        /**
         * Till what date and time people can join the club
         * @param string $last_chance_to_join - string in Date format Y-m-d H:i
         */
        // $this->view['joinTimeLeft'] = Model_Methods::countDownJoinTime("2020-09-20 23:59");

        /**
         * If LANG from i18n equals "en" then show english page
         */
        if (LANG == 'en') {
            $this->title = 'Join CodeX team';
            $this->description = 'How to join CodeX';
            $this->template->content = View::factory('templates/join/index-en', $this->view);
        } else {
            $this->title = 'Набор в команду CodeX';
            $this->description = 'Как вступить в CodeX';
            $this->template->content = View::factory('templates/join/index', $this->view);
        }
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
                $this->description = 'Веб-дизайн: вступительные испытания';
                $this->template->content = View::factory('templates/task/design', $this->view);
                break;
            case 'frontend':
                $this->title = 'Задание на frontend-разработку';
                $this->description = 'Frontend: вступительные испытания';
                $this->template->content = View::factory('templates/task/frontend', $this->view);
                break;
            case 'backend':
                $this->title = 'Задание на backend-разработку';
                $this->description = 'Backend: вступительные испытания';
                $this->template->content = View::factory('templates/task/backend', $this->view);
                break;
            default:
                throw new HTTP_Exception_404();
                break;
        }
    }

    private function saveRequest()
    {
        $name = HTML::chars(Arr::get($_POST, 'name', null));
        $email = HTML::chars(Arr::get($_POST, 'email', null));
        $skills = HTML::chars(Arr::get($_POST, 'skills'));
        $wishes = HTML::chars(Arr::get($_POST, 'wishes'));

        $fields = array(
            'skills' => $skills,
            'wishes' => $wishes,
            'email'  => $email,
            'name'   => $name
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
            /**
             * If user is registered then show link to the profile
             * otherwise show email and mailto link
             */
            if ($this->user->id) {
                $name = $this->user->name;
                $id = $this->user->id;
                $host = Arr::get($_SERVER, 'HTTP_HOST');

                $link = "{$host}/user/{$id}";
                $footer = "👤 [$link]($link)";
            } else {
                $footer = "✉️ {$email}";
            }

            $text = "🦄 {$name} wants to join the team\n" .
                    "\n" .
                    "🛠 *Skills*\n" .
                    "{$skills}\n" .
                    "\n" .
                    "💫 *Wishes*\n" .
                    "{$wishes}\n" .
                    "\n" .
                    "{$footer}";

            $parse_mode = 'Markdown';
            $disable_web_page_preview = true;

            Model_Methods::sendBotNotification($text, $parse_mode, $disable_web_page_preview);
        }
    }
}
