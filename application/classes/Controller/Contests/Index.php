<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Index extends Controller_Base_preDispatch
{

    public function action_showAllContests()
    {
        $this->title = "Контесты команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        $this->view["contests"]  = Model_Contests::getActiveContests();
        $this->template->content = View::factory('templates/contests/list', $this->view);
    }

}