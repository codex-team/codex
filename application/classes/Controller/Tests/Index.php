<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Tests_Index extends Controller_Base_preDispatch
{


    public function action_showAll()
    {
        $this->view['tests'] = Model_Test::getAll();
        $this->template->content = View::factory('templates/tests/list', $this->view);
    }

    public function action_show()
    {
        $this->view['test'] = Model_Test::getById($this->request->param('id'));
        $this->template->content = View::factory('templates/tests/test', $this->view);
    }

    public function action_showResult()
    {
        if ($this->request->is_ajax()) {

            $this->auto_render = false;

            $this->response->headers('Content-type', 'text/html; charset=windows-1251');

            $result = Model_Test::getResult($this->request->param('id'), $_POST);

            $this->response->body(json_encode($result));

        } else {
            die('No direct script access.');
        }

    }
}