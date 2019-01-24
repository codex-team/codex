<?php use Opengraph\Meta;

defined('SYSPATH') or die('No direct script access.');

class Controller_Landings extends Controller_Base_preDispatch
{

    /** Codex Bot Landing page  in https://codex.so/ */
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
}
