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

		$filename = $this->savePageFile();

		if ($filename) {
			$this->transportResponse['success'] = 1;
			$title = $this->methods->getUriByTitle($this->files['name']);
			$saved_id = $this->methods->newFile(array(
				'filename'  => $filename,
				'title'     => $title,
//				'author'    => $this->user->id,
				'size'      => Arr::get($this->files, 'size', 0) / 1000,
				'extension' => strtolower(pathinfo($filename, PATHINFO_EXTENSION)),
				'type'      => $this->type,
			));
			$this->transportResponse['title']    = $title;
			$this->transportResponse['id']       = $saved_id;
			$this->transportResponse['filename'] = $filename;
		}

		finish:
//		$script = '<script>window.parent.codex.transport.response(' . @json_encode($this->transportResponse) . ')</script>';
		$this->auto_render = false;
		$this->response->body(@json_encode($this->transportResponse));
	}

	private function savePageFile()
	{
		if (Upload::type($this->files, array('jpg', 'jpeg', 'png', 'gif'))){
			$filename = $this->methods->saveImage( $this->files , 'upload/redactor_images/' );
		} else {
			$filename = $this->methods->saveFile( $this->files , 'upload/page_files/' );
		}
		if ( !$filename ){
			$this->transportResponse['message'] = 'Error while saving';
			return false;
		}
        
		return $filename;
		// $data = array(
		//     'page'      => $page_id,
		//     'filename'  => $filename,
		//     'title'     => $title ? $title : $this->rus_lat($file['name']),
		//     'author'    => $this->user->id,
		//     'size'      => $file['size'] / 1000,
		//     'extension' => strtolower(pathinfo($filename, PATHINFO_EXTENSION)),
		// );
		// $this->response['callback'] = 'callback.uploadpageFile.success(' . json_encode($data) . ')';
	}
}