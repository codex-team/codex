<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Base_preDispatch extends Controller_Template
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
        if ( Kohana::$environment === Kohana::PRODUCTION ) {
            if ( (Arr::get($_SERVER, 'SERVER_NAME') != 'alpha.difual.com') &&
                (Arr::get($_SERVER, 'SERVER_NAME') != 'ifmo.su') ) {
                exit();
            }
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
            $this->template->content     = '';
            $this->template->header      = '';
           
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
        // echo View::factory('profiler/stats');

        if ($this->auto_render) {
            if ( $this->title ) {
                $this->template->title = $this->title;
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
        $exceptions     = array( 'long_desc' , 'blog_text', 'long_description' , 'content' ); // Исключения для полей с визуальным редактором

        foreach ($_POST as $key => $value){

            $value = stripos( $value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $value ;

            if ( in_array($key, $exceptions) === false ){
                $_POST[$key] = Security::xss_clean(HTML::chars($value));
            } else {
                $_POST[$key] = Security::xss_clean( strip_tags(trim($value), '<br><em><del><p><a><b><strong><i><strike><blockquote><ul><li><ol><img><tr><table><td><th><span><h1><h2><h3><iframe>' ));
            }
        }

        foreach ($_GET  as $key => $value) {
            $value = stripos( $value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $value ;
            $_GET[$key] = Security::xss_clean(HTML::chars($value));
        }
    }

    public static function _redis()
    {
        if ( !class_exists("Redis") ){
            return null;
        }
        $redis = new Redis();
        $redis->connect('127.0.0.1', 6379);
        $redis->auth('21gJs32hv3ks');
        $redis->select(0);
        return $redis;
    }

    private function setGlobals()
    {
        // methods
        $this->methods = new Model_Methods();
        View::set_global('methods', $this->methods);

        // modules
        $this->redis = $this->_redis();
        View::set_global('redis', $this->redis);

        $this->memcache = $memcache = Cache::instance('memcache');
        View::set_global('memcache', $memcache);

        $this->session = Session::instance();
        
        $auth = new Dao_Auth();
        if ( $auth->is_authorized() ) {
            $profile = $auth->get_profile();
            $instance = $auth->get_instance();

            if ($instance == 'vkontakte')
                $this->user = Model_User::findByAttribute('vk_id', $profile->uid);
            elseif ($instance == 'facebook')
                $this->user = Model_User::findByAttribute('fb_id', $profile->id);
            else
                $this->user = new Model_User();
        }
        else
            $this->user = new Model_User();

        View::set_global('user', $this->user);
        View::set_global('auth', $auth);
    }

}
