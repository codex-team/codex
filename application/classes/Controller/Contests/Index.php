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

    public function action_showContest()
    {
        $contestId = $this->request->param('contest_id');

        $this->view["id"] = $contestId;

        $contest = Model_Contests::get($contestId);
        if ($contest->id == 0)
            throw new HTTP_Exception_404();

//        $this->stats->hit(Model_Stats::CONTEST, $contestId);

        $this->view["contest"] = $contest;

        $this->title = $contest->title;

        $this->template->content = View::factory('templates/contests/contest', $this->view);
    }

}