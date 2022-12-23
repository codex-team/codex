<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Transport extends Controller_Base_preDispatch
{
    private $transportResponse = array(
        'success' => 0
    );

    private $type = null;
    private $file = null;

    /**
     * Where all image files will be stored
     * Can be overridden, for example, for storing in a temporary dir
     */
    private $mediaDir = 'upload/redactor_images/';

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

            $this->file = $this->methods->getFile($url);
            $imageData = $this->saveEditorMedia();

            if ($imageData) {
                $this->transportResponse['success'] = 1;
                $this->transportResponse['file']    = array(
                    'url'    => '/' . $this->mediaDir . 'o_' . Arr::get($imageData, 'name'),
                    'width'  => Arr::get($imageData, 'width', 0),
                    'height' => Arr::get($imageData, 'height', 0)
                );
            }
            goto finish;
        }

        /**
         * Get file from $_FILES and detect its type
         */
        $this->file = Arr::get($_FILES, 'media');

        if ( ! $this->file || ! Upload::not_empty($this->file) || ! Upload::valid($this->file)) {
            $this->transportResponse['message'] = 'File is missing or damaged';
            goto finish;
        }

        if ( ! Upload::size($this->file, self::MAX_MEDIA_SIZE)) {
            $this->transportResponse['message'] = 'File size exceeded '.self::MAX_MEDIA_SIZE.' limit';
            goto finish;
        }

        $imageData = $this->saveEditorMedia($this->file);

        if ($imageData) {
            $this->transportResponse['success'] = 1;
            $this->transportResponse['file']    = array(
                'url'    => '/' . $this->mediaDir . Arr::get($imageData, 'name'),
                'width'  => Arr::get($imageData, 'width', 0),
                'height' => Arr::get($imageData, 'height', 0)
            );
        } else {
            $this->transportResponse['message'] = 'Something went wrong while saving the file';
        }

        finish:
        $this->auto_render = false;
        $this->response->body(@json_encode($this->transportResponse));
    }

    private function saveEditorMedia()
    {
        $mediaType = $this->detectMediaType();

        switch ($mediaType) {
            case 'photo':
                $imageData = $this->methods->saveImage($this->file, $this->mediaDir);
                break;
            case 'video':
                $imageData = $this->methods->saveVideo($this->file, $this->mediaDir);
                break;
            default:
                $this->transportResponse['message'] = 'Unsupported file type';
                $imageData = false;
                break;
        }

        return $imageData;
    }

    private function detectMediaType() {
        $isPhoto = Upload::type($this->file, array('jpg', 'jpeg', 'png'));
        $isVideo = Upload::type($this->file, array('mp4', 'mov', 'gif'));

        if ($isPhoto) {
            return 'photo';
        } elseif ($isVideo) {
            return 'video';
        } else {
            return NULL;
        }
    }
}
