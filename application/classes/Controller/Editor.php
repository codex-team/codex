<?php defined('SYSPATH') or die('No direct script access.');

use CodexEditor\CodexEditor;

class Controller_Editor extends Controller_Base_preDispatch
{

    /**
     * Action for index page
     * Codex Editor Landing page in https://ifmo.su/
     */
    public function action_landing()
    {
        $this->title = 'CodeX Editor';
        $this->description = 'Block style visual editor for beautiful pages';
        $this->template->content = View::factory('templates/editor/landing', $this->view);
    }

    public function action_preview()
    {
        $article = new Model_Article();
        $article->title = 'Codex Editor';

        $html = Arr::get($_POST, 'html');
        $json = Arr::get($_POST, 'article_json');

        $editor = new CodexEditor($json);

        try {
            $data = json_decode($editor->getData());
            // get only block
            $blocks = $data->data;
        } catch (Exception $e) {
            throw new Kohana_Exception($e->getMessage());
        }

        for ($i = 0; $i < count($blocks); $i++) {
            $render[] = View::factory('templates/editor/plugins/' . $blocks[$i]->type, array('block' => $blocks[$i]->data))
                        ->render();
        }

        $this->template->content = View::factory('templates/editor/article',
            array(
                'render'  => $render,
                'article' => $article
            ));
    }

    /**
     * fetch Action
     * @public
     *
     * Returns JSON response
     */
    public function action_fetchURL()
    {
        $response = $this->parseLink();

        $this->auto_render = false;
        $this->response->headers('Content-Type', 'application/json; charset=utf-8');
        $this->response->body(@json_encode($response));
    }

    /**
     * @private
     *
     * Parses link by ajax request
     */
    private function parseLink()
    {
        $URL = Arr::get($_GET, 'url');

        $response = array();
        $response['success'] = 0;

        if (empty($URL) || !filter_var($URL, FILTER_VALIDATE_URL)) {
            $response['message'] = 'Неправильный URL';
            goto finish;
        }

        /**
         * Make external request
         * Use Kohana Native Request Factory
         */
        $request = Request::factory($URL)
            ->headers('Content-Type', 'utf8')
            ->execute();

        if ($request->status() != '200') {
            $response['message'] = 'Ошибка при обработке ссылки';
            goto finish;
        } else {
            $htmlContent = $request->body();
            $response = array_merge(
                $this->getLinkInfo($URL),
                $this->getMetaFromHTML($htmlContent)
            );

            if (!trim($response['title']) && !trim($response['description'])) {
                $response['message'] = 'Данные не найдены';
            } else {
                $response['success'] = 1;
            }
        }

        finish:
        return $response;
    }

    /**
     * Gets information about link : params, path and so on
     * @param $URL
     * @return array
     */
    private function getLinkInfo($URL)
    {
        $URLParams = parse_url($URL);

        return array(
            'linkUrl'   => $URL,
            'linkText' => Arr::get($URLParams, 'host') . Arr::get($URLParams, 'path', ''),
        );
    }

    /**
     * Parses DOM Document
     * @param $html
     * @return array
     */
    private function getMetaFromHTML($html)
    {
        $DOMdocument = new DOMDocument();
        @$DOMdocument->loadHTML($html);
        $DOMdocument->preserveWhiteSpace = false;

        $nodes = $DOMdocument->getElementsByTagName('title');

        if ($nodes->length > 0) {
            $title = $nodes->item(0)->nodeValue;
        }

        $description = "";
        $keywords    = "";
        $image       = "";

        $metaData = $DOMdocument->getElementsByTagName('meta');

        for ($i = 0; $i < $metaData->length; $i++) {
            $data = $metaData->item($i);

            if ($data->getAttribute('name') == 'description') {
                $description = $data->getAttribute('content');
            }

            if ($data->getAttribute('name') == 'keywords') {
                $keywords = $data->getAttribute('content');
            }

            if ($data->getAttribute('property')=='og:image') {
                $image = $data->getAttribute('content');
            }
        }

        if (empty($image)) {
            $images = $DOMdocument->getElementsByTagName('img');

            if ($images->length > 0) {
                $image = $images->item(0)->getAttribute('src');
            }
        }

        return array(
            'image'         => isset($image) ? $image : '',
            'title'         => isset($title) ? $title : '',
            'description'   => isset($description) ? $description : '',
        );
    }
}
