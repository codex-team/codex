<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Transport extends Controller_Base_preDispatch
{
    private $transportResponse = array(
        'success' => 0
    );
    
    private $file = null;

    /**
     * Where all image files will be stored
     * Can be overridden, for example, for storing in a temporary dir
     */
    private $mediaDir = 'upload/editor';

    private const MAX_MEDIA_SIZE = '30M';

    /**
     * File transport module
     */
    public function action_file_uploader()
    {
        $json_data = json_decode(file_get_contents(
            'php://input'
        ));

        if (isset($json_data->url)) {
            $url = $json_data->url;

            if (!$url) {
                $this->transportResponse['message'] = 'Image URL is missing';
                goto finish;
            }

            /**
             * Download file from URL
             */
            $this->file = $this->methods->getFile($url);
        } else {
            /**
             * Get file from $_FILES
             */
            $this->file = Arr::get($_FILES, 'media');
        }

        if ( ! $this->file || ! Upload::valid($this->file) ) {
            $this->transportResponse['message'] = 'File is missing or damaged';
            goto finish;
        }

        if ( ! Upload::size($this->file, self::MAX_MEDIA_SIZE)) {
            $this->transportResponse['message'] = 'File size exceeded '.self::MAX_MEDIA_SIZE.' limit';
            goto finish;
        }

        try {
            $fileUrl = Model_Methods::saveMedia($this->file, $this->mediaDir);
        
            $this->transportResponse['success'] = 1;
            $this->transportResponse['file'] = array(
                'url' => $fileUrl
            );
        } catch (Exception $e) {
            $this->transportResponse['message'] = 'Something went wrong while saving the file';
        }

        finish:
        $this->auto_render = false;
        $this->response->body(@json_encode($this->transportResponse));
    }

}
