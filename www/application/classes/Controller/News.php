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
     * Display template for creating News
     *
     * @return void
     */
    public function action_create(): void
    {
        $this->template->content = View::factory('templates/news/create', $this->view);
    }

    /**
     * Save new News
     *
     * @return void
     */
    public function action_save(): void
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
        $news->is_release = Arr::get($_POST, 'is_release', 0);

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
