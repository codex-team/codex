<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Transport extends Controller_Base_preDispatch {

	private $transportResponse = array(
		'success' => 0
	);

	private $type  = null;

    private $files = null;

    /**
	 * Transport file types
	 */
	const EDITOR_FILE = 1;

    /**
	 * File transport module
	 */
	public function action_file_uploader()
	{
		$this->files = Arr::get($_FILES, 'files');

		if ( !$this->files || !Upload::not_empty($this->files) || !Upload::valid($this->files) ){
			$this->transportResponse['message'] = 'File is missing or damaged';
			goto finish;
		}

		if ( !Upload::size($this->files, '30M') ){
			$this->transportResponse['message'] = 'File size exceeded limit';
			goto finish;
		}

		$filename = $this->saveEditorImage();

		if ($filename) {
			$this->transportResponse['success'] = 1;
			$this->transportResponse['filename'] = $filename;
		}

		finish:
		$this->auto_render = false;
		$this->response->body(@json_encode($this->transportResponse));
	}

	private function saveEditorImage()
	{
		if (Upload::type($this->files, array('jpg', 'jpeg', 'png', 'gif'))){
			$filename = $this->methods->saveImage( $this->files , 'upload/redactor_images/' );
		}
		if ( !$filename ){
			$this->transportResponse['message'] = 'Error while saving';
			return false;
		}
        
		return $filename;
	}
}