<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Contests_Index extends Controller_Base_preDispatch
{

    public function action_showAll()
    {
        $this->title = "Конкурсы команды CodeX";
        $this->description = "Небольшие конкурсы, которые мы проводим, чтобы размяться, поработать с новыми технологиями и подходами и просто развлечься.";

        $contests = Model_Contests::getActiveContests();

        $this->view['contests'] = array(
            'opened' => array(),
            'closed' => array(),
        );

        foreach ($contests as $contest) {

            if ( $contest->dt_close > date("Y-m-d H:m:s") ){
                $this->view["contests"]['opened'][] = $contest;
            } else {
                $this->view["contests"]['closed'][] = $contest;
            }

        }

        $this->template->content = View::factory('templates/contests/list_wrapper', $this->view);
    }

    public function action_show()
    {
        $contestId = $this->request->param('id') ?: $this->request->query('id');

        $contest = Model_Contests::get($contestId);

        if ($contest->id == 0){
            throw new HTTP_Exception_404();
        }


        /** Add remaining days value */
        if ($contest->dt_close){

            $remainingTime = strtotime($contest->dt_close) - time();
            $contest->daysRemaining = floor( $remainingTime / Date::DAY );
        }

        /**
        * Add winner User information
        */
        if ($contest->winner) {
            $contest->winner = Model_User::get($contest->winner);
        }

        $this->view["contest"] = $contest;

        $this->title = $contest->title;
        $this->description = $contest->description;

        $this->template->content = View::factory('templates/contests/contest', $this->view);
    }

}
