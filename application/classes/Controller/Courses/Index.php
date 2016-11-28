<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Courses_Index extends Controller_Base_preDispatch
{

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
