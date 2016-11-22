<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Courses_Index extends Controller_Base_preDispatch
{

    public function action_showAll()
    {
        $this->title = "Курсы команды CodeX";
        $this->description = "Небольшие конкурсы, которые мы проводим, чтобы размяться, поработать с новыми технологиями и подходами и просто развлечься.";

        $courses = Model_Courses::getActiveCourses();

        $this->view['courses'] = array(
            'opened' => array(),
            'closed' => array(),
        );

        foreach ($courses as $course) {

            if ( $course->dt_close > date("Y-m-d H:m:s") ){
                $this->view["courses"]['opened'][] = $course;
            } else {
                $this->view["courses"]['closed'][] = $course;
            }

        }

        $this->template->content = View::factory('templates/courses/list_wrapper', $this->view);
    }

    public function action_show()
    {
        $courseId = $this->request->param('id') ?: $this->request->query('id');

        $course = Model_Courses::get($courseId);

        if ($course->id == 0){
            throw new HTTP_Exception_404();
        }

        $this->view["course"] = $course;

        $this->title = $course->title;
        $this->description = $course->description;

        $this->template->content = View::factory('templates/courses/course', $this->view);
    }

}
