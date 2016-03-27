<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Modify extends Controller_Base_preDispatch
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

    public function action_save()
    {
        $csrfToken = Arr::get($_POST, 'csrf');

        if ($contest_id = $this->request->param('id')) {
            $contest = Model_Contests::get($contest_id);
        } else {
            $contest = new Model_Contests();
        }

        if (Security::check($csrfToken)) {
            $contest->title        = Arr::get($_POST, 'title');
            $contest->text         = Arr::get($_POST, 'contest_text');
            $contest->status       = Arr::get($_POST, 'status') ? 1 : 0;
            $contest->description  = Arr::get($_POST, 'description');
            $contest->winner       = Arr::get($_POST, 'winner');
            $contest->results      = Arr::get($_POST, 'results_contest');
            $contest->dt_close     = Arr::get($_POST, 'duration');

            $translitedTitle = Model_Alias::generateUri( $contest->title );

            if ($contest->title && $contest->text && $contest->description && $contest->dt_close) {
                if ($contest_id) {
                    $contest->dt_update = date('Y-m-d H:i:s');
                    $contest->update();
                    Model_Alias::updateAlias($contest->uri, $translitedTitle, Model_Uri::CONTEST, $contest_id);
                    $contest->uri = $translitedTitle;
                } else {
                    $insertedId   = $contest->insert();
                    $contest->uri = Model_Alias::addAlias($translitedTitle, Model_Uri::CONTEST, $insertedId);
                }
                $this->redirect('/' . $contest->uri);
                return;
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
        $contest_id = $this->request->param('id');

        if (!empty($contest_id) && !empty($user_id))
        {
            Model_Contests::get($contest_id)->remove();
        }

        $this->redirect('/admin/contests');
    }

}
