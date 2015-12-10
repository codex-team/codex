<?php

/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 04.11.2015
 * Time: 19:10
 */

class Controller_Articles_Edit extends Controller_Base_preDispatch
{
    /**
     * Save editor img from url/file and displays img path from site root
     * it takes all params from $_POST
     * @author Markus3295
     */
    function action_saveEditorImg(){
        // todo check secret key when upload (?)

        $source = Arr::get($_POST, "source");

        if ($source == "url"){
            if (!$url = Arr::get($_POST, "url"))
                die();

            $image_name = uniqid() . ".jpg";

            $uploaddir    = '/upload/redactor/';
            $uploaddirPhp = $_SERVER['DOCUMENT_ROOT'] . $uploaddir;

            $response = Request::factory($url)->execute();
            $file = new SplFileObject($uploaddirPhp . $image_name, 'w');
            $file->fwrite($response->body());

            echo $uploaddir . $image_name;
            die();

        } else if ($source == "file") {
            $filePath = $this->methods->SavePostFile("EDITOR_IMG", "redactor/", 2097152, array('jpg','jpeg','gif','png','bmp'));

            echo $filePath;
            die();
        }
    }
}
