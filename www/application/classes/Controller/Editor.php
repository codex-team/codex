<?php defined('SYSPATH') or die('No direct script access.');

use Opengraph\Reader;

class Controller_Editor extends Controller_Base_preDispatch
{
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
            $response = array(
                'meta' => array_merge(
                    $this->getLinkInfo($URL),
                    $this->getMetaFromHTML($htmlContent)
                )
            );

            if (!trim($response['meta']['title']) && !trim($response['meta']['description'])) {
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
            'image' => array(
                'url' => ''
            )
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
            $meta['image']['url'] = $opengraph['og:image'][0]['og:image:url'];
        }

        return $meta;
    }
}
