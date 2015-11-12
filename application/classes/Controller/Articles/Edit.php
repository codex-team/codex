<?php

/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 04.11.2015
 * Time: 19:10
 */

class Controller_Articles_Edit extends Controller_Base_preDispatch
{
    function action_showNewEditor(){
        $this->template->content = View::factory('templates/articles/new_editor', $this->view);
    }

    function action_saveImgFromFile(){

        $methods = new Model_Methods();
        $filePath = $methods->SavePostFile("EDITOR_IMG", "images/", 2097152, array('jpg','jpeg','gif','png','bmp'));

        echo $filePath;
        die();
    }

    function action_saveImgFromUrl(){
        if (!$url = Arr::get($_POST, "url"))
            die();

        $image_name = uniqid() . ".jpg";

        $uploaddir    = '/upload/images/';
        $uploaddirPhp = $_SERVER['DOCUMENT_ROOT'] . $uploaddir;

        $response = Request::factory($url)->execute();
        $file = new SplFileObject($uploaddirPhp . $image_name, 'w');
        $file->fwrite($response->body());

        echo $uploaddir . $image_name;
        die();
    }

}