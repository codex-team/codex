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
     * parses link by ajax request
     */
    public function action_parseLink()
    {
        $url = $this->get_url();
        $url_params = parse_url($url);

        if (!$url) {
            exit(0);
        }

        $html   = $this->file_get_contents_curl($url);
        $result = $this->get_meta_from_html($html);

        $result = array_merge(

            $this->get_meta_from_html($html),

            array(
                'linkUrl'   => $url,
                'linkText' => Arr::get($url_params, 'host') . Arr::get($url_params, 'path', ''),
            )

        );

        $this->auto_render = false;
        $this->response->headers('Content-Type', 'application/json; charset=utf-8');
        $this->response->body(@json_encode($result));
    }

    private function file_get_contents_curl($url)
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 8);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');

        $data = curl_exec($ch);
        curl_close($ch);

        return $data;
    }

    private function get_url()
    {
        if (!isset($_GET['url'])) {
            return false;
        }

        $url = Arr::get($_GET, 'url');

        if (filter_var($url, FILTER_VALIDATE_URL) === false) {
            return false;
        }

        return $url;
    }

    private function get_meta_from_html($html)
    {
        $doc = new DOMDocument();
        @$doc->loadHTML($html);
        $nodes = $doc->getElementsByTagName('title');

        $title = $nodes->item(0)->nodeValue;
        $description = "";
        $keywords = "";
        $image = "";

        $metas = $doc->getElementsByTagName('meta');

        for ($i = 0; $i < $metas->length; $i++) {
            $meta = $metas->item($i);
            if ($meta->getAttribute('name') == 'description') {
                $description = $meta->getAttribute('content');
            }
            if ($meta->getAttribute('name') == 'keywords') {
                $keywords = $meta->getAttribute('content');
            }
            if ($meta->getAttribute('property')=='og:image') {
                $image = $meta->getAttribute('content');
            }
        }

        return array(
            'image'         => $image,
            'title'         => $title,
            'description'   => $description,
        );
    }
}
