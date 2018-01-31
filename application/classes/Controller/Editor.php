<?php defined('SYSPATH') or die('No direct script access.');

use CodexEditor\CodexEditor;
use Opengraph\Reader;

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
        $lang = Arr::get($_POST, 'lang');

        if ($lang === 'en') {
            $json = Arr::get($_POST, 'article_text_en');
        } else {
            $json = Arr::get($_POST, 'article_text');
        }
        
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
            'url'   => $URL,
            'domain' => Arr::get($URLParams, 'host') . Arr::get($URLParams, 'path', ''),
        );
    }

    /**
     * Extracts meta information from page HTML
     * @param string $html
     * @return array
     */
    private function getMetaFromHTML($html)
    {

        $meta = array(
            'title' => '',
            'description' => '',
            'image' => ''
        );

        /**
         * Use OpenGraph reader
         * @see {@link https://github.com/euskadi31/Opengraph}
         * @var Reader
         */
        $reader = new Reader();

        /**
         * Convert page body to the UTF-8
         */
        $html = mb_convert_encoding((string) $html, 'UTF-8', 'auto');

        /**
         * Parse page body
         */
        $reader->parse('<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' . $html, true);

        /**
         * Extract open-graph tags
         */
        $opengraph = $reader->getArrayCopy();

        /**
         * Fill the Title
         */
        if (!empty($opengraph['og:title'])) {
            $meta['title'] = $opengraph['og:title'];
        } else if (!empty($opengraph['non-og-title'])) {
            $meta['title'] = $opengraph['non-og-title'];
        } else {
            $dom = new \DOMDocument();
            @$dom->loadHTML($html);
            $titleNodes = $dom->getElementsByTagName('title');
            $meta['title'] = $titleNodes->length > 0 ? $titleNodes->item(0)->nodeValue : '';
        }

         /**
         * Fill the Description
         */
        if (!empty($opengraph['og:description'])) {
            $meta['description'] = $opengraph['og:description'];
        } else if (!empty($opengraph['non-og-description'])) {
            $meta['description'] = $opengraph['non-og-description'];
        }

        /**
         * Fill an Image
         */
        if (!empty($opengraph['og:image'][0]['og:image:url'])){
            $meta['image'] = $opengraph['og:image'][0]['og:image:url'];
        }

        return $meta;
    }
}
