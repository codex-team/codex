<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Action extends Controller_Base_preDispatch
{
    /**
     * this method prevent no admin users visit /contest/add, /contest/<contest_id>/edit
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            $this->redirect('/');
    }

    public function action_add()
    {
        $contest_id = Arr::get($_POST, 'contest_id');
        $contest    = Model_Contests::get($contest_id);

        if (!$contest_id || !$contest)
            $contest = new Model_Contests();

        $contest->title        = Arr::get($_POST, 'title');
        $contest->text         = Arr::get($_POST, 'contest_text');
        $contest->status       = Arr::get($_POST, 'status') ? 1 : 0;
        $contest->description  = Arr::get($_POST, 'description');
        $contest->winner       = Arr::get($_POST, 'winner');
        $contest->results      = Arr::get($_POST, 'results_contest');
        $contest->dt_close     = Arr::get($_POST, 'duration');

        $errors = FALSE;

        if ($contest->title == '')       { $errors = TRUE; }
        if ($contest->text == '')        { $errors = TRUE; }
        if ($contest->description == '') { $errors = TRUE; }
        if ($contest->dt_close == '')    { $errors = TRUE; }

        if ($errors) {
            $this->template->content = View::factory('templates/contests/create', $this->view);
            return false;
        }

        if ($contest_id) {
            $contest->dt_update = date('Y-m-d H:i:s');
            $contest->update();
        }
        else {
            $contest->insert();
        }

        $this->redirect('/contest/' . $contest->id);
    }

    public function action_edit()
    {
        $contest_id = $this->request->param('contest_id');
        $contest = Model_Contests::get($contest_id);
        $this->view['contest'] = $contest;
        $this->template->content = View::factory('templates/contests/create', $this->view);
    }
    public function action_delete()
    {
        $user_id = $this->user->id;
        $contest_id = $this->request->param('contest_id');

        if (!empty($contest_id) && !empty($user_id))
        {
            Model_Contests::get($contest_id)->remove();
        }

        $this->redirect('/admin/contests');
    }

}
