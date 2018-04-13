<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Modify extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /contest/add, /contest/<contest_id>/edit
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN))) {
            $this->redirect('/');
        }
    }

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        /*
         * редактирвоание происходит напрямую из роута вида: <controller>/<action>/<id>
         * так как срабатывает обычный роут, то при отправке формы передается переменная contest_id.
         * Форма отправляет POST запрос
         */
        if ($this->request->post()) {
            $contest_id = Arr::get($_POST, 'contest_id');
            $contest = Model_Contests::get($contest_id, true);
        }
        /*
         * Редактирование через Алиас
         * Здесь сперва запрос получает Controller_Uri, которая будет передавать id сущности через query('id')
         */
        elseif ($contest_id = $this->request->param('id') ?: $this->request->query('id')) {
            $contest = Model_Contests::get($contest_id);
        } else {
            $contest = new Model_Contests();
        }

        if (Security::check($csrfToken)) {
            $contest->title        = Arr::get($_POST, 'title');
            $contest->uri          = Arr::get($_POST, 'uri');
            $contest->text         = Arr::get($_POST, 'contest_text');
            $contest->status       = Arr::get($_POST, 'status') ? 1 : 0;
            $contest->description  = Arr::get($_POST, 'description');
            $contest->winner       = Arr::get($_POST, 'winner');
            $contest->results      = Arr::get($_POST, 'results_contest');
            $contest->dt_close     = Arr::get($_POST, 'duration');

            $uri = Arr::get($_POST, 'uri');
            $alias = Model_Aliases::generateUri($uri);

            if ($contest->title && $contest->text && $contest->description && $contest->dt_close) {
                if ($contest_id) {
                    $contest->dt_update = date('Y-m-d H:i:s');
                    $contest->uri = Model_Aliases::updateAlias($contest->uri, $alias, Aliases_Controller::CONTEST, $contest_id);
                    $contest->update();
                } else {
                    $insertedId   = $contest->insert();
                    $contest->uri = Model_Aliases::addAlias($alias, Aliases_Controller::CONTEST, $insertedId);
                }

                // Если поле uri пустое, то редиректить на обычный роут /contest/id
                $redirect = ($uri) ? $contest->uri : '/contest/' . $contest->id;
                $this->redirect($redirect);
            } else {
                $this->view['error'] = true;
            }
        }
        $this->view['contest'] = $contest;
        $this->template->content = View::factory('templates/contests/create', $this->view);
    }

    public function action_delete()
    {
        $user_id = $this->user->id;
        $contest_id = $this->request->param('contest_id') ?: $this->request->query('id');

        if (!empty($contest_id) && !empty($user_id)) {
            Model_Contests::get($contest_id)->remove();
        }

        $this->redirect('/admin/contests');
    }
}
