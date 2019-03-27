<?php use Opengraph\Meta;

defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{
    /**
     * Editor.js package name in NPM/Yarn
     */
    const EDITOR_PACKAGE_NAME = '@editorjs/editorjs';

    /**
     * Codex Bot Landing page  in https://codex.so/bot
     */
    public function action_bot()
    {
        $this->title = 'CodeX Bot';
        $this->description = 'Working team assistant';
        $this->template->content = View::factory('templates/landings/codex_bot', $this->view);
    }

    /** Codex Special Landing page in https://codex.so/special */
    public function action_special()
    {
        $this->title = 'CodeX Special';
        $this->description = 'Module for making high contrast site version';
        $this->template->content = View::factory('templates/landings/special', $this->view);
    }

    /**
     * CodeX Media
     */
    public function action_media()
    {
        $this->title = 'CodeX Media';
        $this->description = 'Platfrom for building UGC media';
        $this->template->content = View::factory('templates/landings/media', $this->view);
    }

    /**
     * Safari Beauty Toolbar
     * https://codex.so/beauty-toolbar
     */
    public function action_beauty_toolbar()
    {
        $this->title = 'Safari Beauty Toolbar';
        $this->description = 'Make the Safari Toolbar more consistent with your brand colors';
        $this->metaImage = 'https://codex.so/public/app/landings/beauty_toolbar/demo.gif';

        $this->meta[] = new Meta('vk:image', 'https://codex.so/public/app/landings/beauty_toolbar/demo.gif');
        $this->meta[] = new Meta('twitter:image', 'https://codex.so/public/app/landings/beauty_toolbar/demo.gif');
        $this->meta[] = new Meta('og:image', 'https://codex.so/public/app/landings/beauty_toolbar/demo.gif');

        /**
         * Detect visits from Product Hunt
         */
        $isFromPH = $this->request->query('ref') == 'producthunt';

        if ($isFromPH){
            Cookie::set('from', 'product hunt', Date::YEAR * 3);
        }

        $this->view['isFromPH'] = $isFromPH;
        $this->template->content = View::factory('templates/landings/beauty_toolbar', $this->view);
    }

    /**
     * CodeX Reactions
     */
    public function action_reactions()
    {
        $this->title = 'CodeX Reactions';
        $this->description = 'Collect a feedback for your content without coding';
        $this->template->content = View::factory('templates/landings/reactions', $this->view);
    }

    /**
     * Codex Editor Landing page
     * https://codex.so/editor
     */
    public function action_editor()
    {
        $this->title = 'CodeX Editor';
        $this->description = 'Block style visual editor for beautiful pages';
        $this->view['version'] = $this->getEditorVersion();

        $landing = View::factory('templates/landings/editor', $this->view);;

        /**
         * On editorjs.io we inject landing as an iframe
         * where we does not need a site header
         */
        if ($this->request->query('frame') === '1') {
            $landing .= '
                <style>
                    .site-header {
                        display: none;
                    }
                </style>   
            ';
        }

        $this->template->content = $landing;
    }

    /**
     * Load Editor package version from NPM
     * @return string
     */
    private function getEditorVersion(){
        try {
            $memcache = Cache::instance('memcache');
            $cacheKey = 'editor-version';
            $version = $memcache->get($cacheKey);

            if (!$version) {
                $req = new Request(sprintf('https://registry.npmjs.org/-/package/%s/dist-tags', self::EDITOR_PACKAGE_NAME));

                $response = json_decode($req->execute()->body());
                $version = $response->latest;

                $memcache->set($cacheKey, $version, Date::HOUR);
            }

            return $version;

        } catch (Exception $e){
            \Hawk\HawkCatcher::catchException($e);
        }

        return '2.11';
    }

}


 