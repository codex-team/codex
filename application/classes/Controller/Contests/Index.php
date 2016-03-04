<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Index extends Controller_Base_preDispatch
{

    public function action_showAllContests()
    {
        $this->title = "Конкурсы команды CodeX";
        $this->description = "Здесь собраны конкурсы, которые проводятся внутри нашей команды";

        $this->view["contests"]  = Model_Contests::getActiveContests();
        $this->template->content = View::factory('templates/contests/list', $this->view);
    }

    public function action_show()
    {
        $contestId = $this->request->param('id');

        $contest = Model_Contests::get($contestId);
        if ($contest->id == 0)
            throw new HTTP_Exception_404();

//        $this->stats->hit(Model_Stats::CONTEST, $contestId);

        /** Add remaining days value */
        if ($contest->dt_close){

            $remainingTime = strtotime($contest->dt_close) - time();
            $contest->daysRemaining = floor( $remainingTime / Date::DAY );
        }

        $this->view["contest"] = $contest;

        $this->title = $contest->title;
        $this->description = "Небольшой конкурс внутри НИУ ИТМО, который позволит вам показать свой творческий и профессиональный потенциал, соревнуясь за небольшие презенты.";

        $this->template->content = View::factory('templates/contests/contest', $this->view);
    }

}