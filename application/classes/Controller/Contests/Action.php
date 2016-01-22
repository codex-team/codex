<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Action extends Controller_Base_preDispatch
{

         public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN)))
            throw new HTTP_Exception_403();
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
