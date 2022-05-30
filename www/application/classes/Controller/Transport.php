<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Transport extends Controller_Base_preDispatch
{
    private $transportResponse = array(
        'success' => 0
    );

    private $type  = null;
    private $file = null;

    /**
     * Where all image files will be stored
     * Can be overridden, for example, for storing in a temporary dir
     */
    private $imagesDir = 'upload/redactor_images/';

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
            $imageData = $this->saveEditorImage();

            if ($imageData) {
                $this->transportResponse['success'] = 1;
                $this->transportResponse['file']    = array(
                    'url'    => '/' . $this->imagesDir . 'o_' . Arr::get($imageData, 'name'),
                    'width'  => Arr::get($imageData, 'width', 0),
                    'height' => Arr::get($imageData, 'height', 0)
                );
            }
            goto finish;
        }

        $this->file = Arr::get($_FILES, 'image');

        if ( ! $this->file || ! Upload::not_empty($this->file) || ! Upload::valid($this->file)) {
            $this->transportResponse['message'] = 'File is missing or damaged';
            goto finish;
        }

        if ( ! Upload::size($this->file, '30M')) {
            $this->transportResponse['message'] = 'File size exceeded limit';
            goto finish;
        }

        $imageData = $this->saveEditorImage($this->file);

        if ($imageData) {
            $this->transportResponse['success'] = 1;
            $this->transportResponse['file']    = array(
                'url'    => '/' . $this->imagesDir . 'o_' . Arr::get($imageData, 'name'),
                'width'  => Arr::get($imageData, 'width', 0),
                'height' => Arr::get($imageData, 'height', 0)
            );
        }

        finish:
        $this->auto_render = false;
        $this->response->body(@json_encode($this->transportResponse));
    }

    private function saveEditorImage()
    {
        if (Upload::type($this->file, array('jpg', 'jpeg', 'png', 'gif'))) {
            $imageData = $this->methods->saveImage($this->file, $this->imagesDir);

            if ($imageData) {
                return $imageData;
            }

            $this->transportResponse['message'] = 'Error while saving';
        } else {
            $this->transportResponse['message'] = 'Unsupported file type';
        }

        return false;
    }
}
