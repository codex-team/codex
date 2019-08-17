<?php defined('SYSPATH') or die('No direct script access.');

class Controller_News extends Controller_Base_preDispatch
{
    /**
     * Only admins can add News
     *
     * @throws HTTP_Exception_403
     *
     * @return void
     */
    public function before()
    {
        parent::before();
        if (!$this->user->checkAccess(array(Model_User::ROLE_ADMIN))) {
            throw new HTTP_Exception_403();
        }
    }

    /**
     * Display form for GET
     * Save news for POST
     *
     * @throws HTTP_Exception_405
     *
     * @return void
     */
    public function action_create(): void
    {
        switch ($this->request->method()) {
            case Request::GET:
                $this->displayCreateNewsForm();
                break;
            case Request::POST:
                $this->saveNews();
                break;
            default:
                throw new HTTP_Exception_405();
                break;
        }
    }

    /**
     * Display template for creating News
     *
     * @return void
     */
    private function displayCreateNewsForm(): void
    {
        $this->view['types'] = [
            [
                'name' => 'Default',
                'value' => Model_News::TYPE_DEFAULT
            ],
            [
                'name' => 'Release',
                'value' => Model_News::TYPE_RELEASE
            ]
        ];

        $this->template->content = View::factory('templates/news/create', $this->view);
    }

    /**
     * Save new News
     *
     * @return void
     */
    private function saveNews(): void
    {
        if (!Model_Methods::isAjax()) {
            $this->sendAjaxResponse([
                'message' => 'Request is not ajax',
                'success' => 0
            ]);
            return;
        }

        if (!Security::check(Arr::get($_POST, 'csrf'))) {
            $this->sendAjaxResponse([
                'success' => 0,
                'message' => 'CSRF token invalid. Please refresh the page.'
            ]);
            return;
        }

        $news = new Model_News();

        $news->user_id = $this->user->id;
        $news->en_text = Arr::get($_POST, 'en_text');
        $news->ru_text = Arr::get($_POST, 'ru_text');
        $news->type = Arr::get($_POST, 'type');

        $news->insert();

        $this->sendAjaxResponse([
            'success' => 1,
            'redirect' => '/'
        ]);
    }

    /**
     * @param array $response
     *
     * @return void
     */
    private function sendAjaxResponse(array $response): void
    {
        $this->auto_render = false;
        $this->response->body(json_encode($response));
    }
}
