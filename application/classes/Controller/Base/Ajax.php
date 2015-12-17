<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base_Ajax extends Controller_Base_preDispatch {


    const ACTION_PROFILE_PHOTO = 1;

    /**
    * @var Description of error thrown
    */
    public $error_description = '';

    /**
    * @var string File size limitation
    */
    public $UPLOAD_MAX_SIZE = '30M';


    public function before(){

        $this->auto_render = false;

        parent::before();

        /** Allow access only for ajax requests */
        if (self::_is_ajax()){
            die('No direct access');
        }

    }

    /**
    * Checks for ajax request
    * @author Savchenko P. (@neSpecc)
    */
    public static function _is_ajax()
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && ($_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest');
    }

    /**
    * File transport method
    * Used by dynamic image-loader
    * @author Savchenko P. (@neSpecc)
    */
    public function action_file_uploader()
    {
        /** Reason we use ajax transport. Use constants in this controller  */
        $action = Arr::get($_POST , 'action' , false);

        /** Target id */
        $id = (int)Arr::get($_POST , 'id' , 0);

        /** Uploaded files */
        $files = Arr::get($_FILES, 'files');

        /** Array will be passed to JS transport module */
        $response = array('success' => 0);

        /**
        * Check for correct parametres
        * If find error, write description in $this->error_description
        */
        if ( $this->checkTransport($action, $id, $files) ) {

            switch ($action) {

                case self::ACTION_PROFILE_PHOTO :

                    $filename = $this->methods->saveImage('files', 'users/');

                    if ($filename) {

                        /** Update user */
                        $this->user->photo = $filename;
                        $this->user->update();

                        /** Return success information. @uses client-side callback.saveProfilePhoto handler */
                        $response['success']  = 1;
                        $response['callback'] = 'callbacks.saveProfilePhoto.success("'.$filename.'")';

                    } else {
                        $response['error_description'] = 'File wasn\'t saved';
                    }

                break;

                default: $this->error_description = 'Wrong action'; break;
            }
        } else {
            $response['error_description'] = $this->error_description;
        }

        /**
        * Return script to transport-frame, where fires parent-window transport.callback
        * $response passed as first-parametr to cliednt-side callback function
        */
        $script = '<script>window.parent.transport && window.parent.transport.response(' . @json_encode($response) . ')</script>';

        $this->response->body($script);

    }

    /**
    * Checks for correct parameters for file-transport
    * @
    */
    private function checkTransport($action, $id, $files)
    {
        /** Checking for authorized user */
        if ( !$this->user->id ){
            $this->error_description = 'Access denied'; return FALSE;
        }

        /** Checking for required fields */
        if ( !$action ){
            $this->error_description = 'Action missed'; return FALSE;
        }

        /** Checking for correct files */
        if ( !$files || !Upload::not_empty($files) || !Upload::valid($files) ){
            $this->error_description = 'File is missing or damaged'; return FALSE;
        }

        /** Checking for max size  */
        if ( !Upload::size($files, $this->UPLOAD_MAX_SIZE ) ){
            $this->error_description = 'File size exceeded limit'; return FALSE;
        }

        return TRUE;
    }


}