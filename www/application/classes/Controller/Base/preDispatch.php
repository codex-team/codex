<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base_preDispatch extends Template
{
    /** Wrapper template name */
    public $template = 'main';

    /** Data to pass into view */
    public $view = array();

    /**
     * @var Model_User активный пользователь.
     */
    protected $user;

    /**
     * The before() method is called before your controller action.
     * In our template controller we override this method so that we can
     * set up default values. These variables are then available to our
     * controllers if they need to be modified.
     */
    public function before()
    {
        /** Disallow requests from other domains */
        if (Kohana::$environment === Kohana::PRODUCTION) {
            if ((Arr::get($_SERVER, 'SERVER_NAME') != 'codex.so') &&
                (Arr::get($_SERVER, 'SERVER_NAME') != 'ifmo.su')) {
                exit();
            }

            /** Mark requests as secure and working with HTTPS  */
            $this->request->secure(true);
        }

        parent::before();

        // XSS clean in POST and GET requests
        self::XSSfilter();


        $GLOBALS['SITE_NAME']   = "CodeX";
        $GLOBALS['FROM_ACTION'] = $this->request->action();

        $this->setGlobals();


        if ($this->auto_render) {
            // Initialize with empty values
            $this->template->title = $this->title = $GLOBALS['SITE_NAME'];
            $this->template->keywords    = '';
            $this->template->description = '';
            $this->template->metaImage   = null;
            $this->template->metaImageVK = null;
            $this->template->meta        = array(
                new \Opengraph\Meta('vk:image', Model_Methods::getDomainAndProtocol() . '/public/app/img/meta_img_vk.png'),
                new \Opengraph\Meta('tw:image', Model_Methods::getDomainAndProtocol() . '/public/app/img/meta_img.png'),
                new \Opengraph\Meta('og:image', Model_Methods::getDomainAndProtocol() . '/public/app/img/meta_img.png')
            );
            $this->template->content     = '';
            $this->template->nofollow    = false;
            $this->template->enableMetrika = false;
        }
    }

    /**
     * The after() method is called after your controller action.
     * In our template controller we override this method so that we can
     * make any last minute modifications to the template before anything
     * is rendered.
     */
    public function after()
    {
        //        echo View::factory('profiler/stats');

        if ($this->auto_render) {
            if ($this->title) {
                $this->template->title = $this->title;
            }
            if ($this->description) {
                $this->template->description = $this->description;
            }
            if ($this->nofollow) {
                $this->template->nofollow = $this->nofollow;
            }
            if ($this->meta) {
                $this->template->meta = $this->meta;
            }
        }

        parent::after();
    }

    /**
    * Sanitizes GET and POST params
    * @uses HTMLPurifier
    */
    public function XSSfilter()
    {
        /**
         * @var array Исключения для полей с визуальным редактором
         */
        $exceptionsAllowingHTML = array( 'contest_text', 'results_contest', 'news_ru_text', 'news_en_text');

        /**
         * Exception for CodeX Editor that has own sanitize methods in vendor package
         * @var array
         */
        $exceptionsForCodexEditor = array('article_text');

        foreach ($_POST as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $sub_key => $sub_value) {
                    $sub_value = stripos($sub_value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $sub_value ;
                    $_POST[$key][$sub_key] = Security::xss_clean(HTML::chars($sub_value));
                }

                continue;
            }

            $value = stripos($value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $value ;

            /**
             * $exceptionsAllowingHTML — allow html tags (does not fire HTML Purifier)
             * $exceptionsForCodexEditor — do nothing
             */
            if (in_array($key, $exceptionsAllowingHTML) === false && in_array($key, $exceptionsForCodexEditor) === false) {
                $_POST[$key] = Security::xss_clean(HTML::chars($value));
            } elseif (in_array($key, $exceptionsForCodexEditor) === false) {
                $_POST[$key] = strip_tags(trim($value), '<br><em><del><p><a><b><strong><i><strike><blockquote><ul><li><ol><img><tr><table><td><th><span><h1><h2><h3><iframe><div><code>');
            }
        }

        foreach ($_GET  as $key => $value) {
            $value = stripos($value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $value ;
            $_GET[$key] = Security::xss_clean(HTML::chars($value));
        }
    }

    public static function _redis()
    {
        if (!class_exists("Redis")) {
            return null;
        }

        $redisConfig = Kohana::$config->load('redis.default');

        $redisHost = Arr::get($redisConfig, 'hostname', '127.0.0.1');
        $redisPort = Arr::get($redisConfig, 'port', '6379');
        $redisPswd = Arr::get($redisConfig, 'password', '');
        $redisDB   = Arr::get($redisConfig, 'database', '0');

        $redis = new Redis();
        $redis->connect($redisHost, $redisPort);
        $redis->auth($redisPswd);
        $redis->select($redisDB);

        return $redis;
    }

    private function setGlobals()
    {
        // methods
        $this->methods = new Model_Methods();
        View::set_global('methods', $this->methods);

        // stats
        $this->stats = new Model_Stats();
        View::set_global('stats', $this->stats);

        // modules
        $this->redis = $this->_redis();
        View::set_global('redis', $this->redis);

        $this->memcache = $memcache = Cache::instance('memcache');
        View::set_global('memcache', $memcache);

        $this->session = Session::instance();

        $auth = new Model_Sessions();
        if ($auth->is_authorized()) {
            $user_id = $auth->get_user_id();
            $this->user = Model_User::findByAttribute('id', $user_id);
        } else {
            $this->user = new Model_User();
        }

        View::set_global('user', $this->user);
        View::set_global('auth', $auth);
    }

    /**
     * @param array $response - response which should be returned after attempt to send form
     * $response = [
     *  'redirect' => (string|null) uri of article's redirect only in case of successful save
     *  'success'  => (int) success code, can be 0 or 1
     *  'message'  => (string|null) error message only in case of failed save
     * ]
     *
     * @return void
     */
    protected function sendAjaxResponse(array $response): void
    {
        $this->auto_render = false;
        $this->response->body(json_encode($response));
    }
}
