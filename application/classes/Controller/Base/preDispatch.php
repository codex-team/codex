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
            $this->template->content     = '';
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
            if ( $this->title ) $this->template->title = $this->title;
            if ( $this->description ) $this->template->description = $this->description;
        }

        parent::after();
    }

    /**
    * Sanitizes GET and POST params
    * @uses HTMLPurifier
    */
    public function XSSfilter()
    {
        $exceptions     = array( 'long_desc' , 'blog_text', 'long_description' , 'content', 'article_text' ); // Исключения для полей с визуальным редактором

        foreach ($_POST as $key => $value){

            $value = stripos( $value, 'سمَـَّوُوُحخ ̷̴̐خ ̷̴̐خ ̷̴̐خ امارتيخ ̷̴̐خ') !== false ? '' : $value ;

            if ( in_array($key, $exceptions) === false ){
                $_POST[$key] = Security::xss_clean(HTML::chars($value));
            } else {
                $_POST[$key] = Security::xss_clean( strip_tags(trim($value), '<br><em><del><p><a><b><strong><i><strike><blockquote><ul><li><ol><img><tr><table><td><th><span><h1><h2><h3><iframe><div>'));
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

        $redisConfig = Kohana::$config->load('redis.default');
        $redis       = new Redis();

        $redis->connect($redisConfig['hostname'], $redisConfig['port']);
        $redis->auth($redisConfig['password']);
        $redis->select(0);
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
        if ( $auth->is_authorized() ) {

            $user_id = $auth->get_user_id();
            $this->user = Model_User::findByAttribute('id', $user_id);

        } else {

            $this->user = new Model_User();

        }

        View::set_global('user', $this->user);
        View::set_global('auth', $auth);
    }

}
