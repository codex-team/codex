<?php defined('SYSPATH') or die('No direct script access.');
class Controller_Users_Index extends Controller_Base_preDispatch
{
    public function action_showUser()
    {
        //load info from DB
        $user_id = $this->request->param('user_id');
        $user = new Model_User($user_id);
        if ( $user -> id )
        {
            $viewUser = $user;
        }
        else
        {
            $viewUser = $this->user;
            $this->view["error"] = "Пожалуйста войдите в аккаунт.";
        }
        $this->view["user"] = $viewUser;
        $this->view["user_id"] = $user_id;
        $this->template->content = View::factory('templates/users/user', $this->view);
    }
    public function action_create()
    {
    }
    public function action_index()
    {
        $user_id = $this->request->param('user_id');
        $model = new Model_User($user_id);
        if ($model->is_empty())
        {
            $this->template->content = View::factory('templates/users/error', [
                'user' => $model,
            ]);
        }
        else
        {
            $this->template->content = View::factory('templates/users/user', [
                'user' => $model,
            ]);
        }
    }
    public function action_update()
    {
    }
    public function action_view()
    {
        $user_id = $this->request->param('user_id');
        $model = new Model_User($user_id);
        $this->template->content = View::factory('templates/users/view', [
            'user' => $model,
        ]);
    }
}