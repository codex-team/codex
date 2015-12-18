<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base_Ajax extends Controller_Base_preDispatch {


    /**
    * Constants means action we did with transfered file
    */
    const TRANSPORT_ACTION_PROFILE_PHOTO = 1;
    const TRANSPORT_ACTION_ARTICLE_COVER = 2;

    /**
    * @var string File size limitation
    */
    public $UPLOAD_MAX_SIZE = '30M';


    public function before(){

        $this->auto_render = false;

        parent::before();

    }

    /**
    * Returns true if ajax request accepted
    * @return bool
    * @author Savchenko P. (@neSpecc)
    * @example if (!self::_is_ajax()) die('No direct access');
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
        */
        $dataValidationError = $this->getTransportValidationError($action, $id, $files);

        if ( $dataValidationError ) {

            $response['error_description'] = $dataValidationError;

        } else switch ($action) {

            case self::TRANSPORT_ACTION_PROFILE_PHOTO :

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

            default:  $response['error_description'] = 'Wrong action'; break;
        }


        /**
        * Return script to transport-frame, where fires parent-window transport.callback
        * $response passed as first-parameter to client-side callback function
        */
        $script = '<script>window.parent.transport && window.parent.transport.response(' . @json_encode($response) . ')</script>';

        $this->response->body($script);

    }

    /**
    * Checks for correct parameters for file-transport
    * @return string error description or '' (empty) if all fields are correct
    */
    private function getTransportValidationError($action, $id, $files)
    {
        /** Checking for authorized user */
        if ( !$this->user->id ){
            return 'Access denied';
        }

        /** Checking for required fields */
        if ( !$action ){
            return 'Action missed';
        }

        /** Checking for correct files */
        if ( !$files || !Upload::not_empty($files) || !Upload::valid($files) ){
            return 'File is missing or damaged';
        }

        /** Checking for max size  */
        if ( !Upload::size($files, $this->UPLOAD_MAX_SIZE ) ){
            return 'File size exceeded limit';
        }

        return '';
    }


}