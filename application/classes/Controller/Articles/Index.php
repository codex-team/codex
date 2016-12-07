<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    
    public function action_showAll()
    {
        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        /**
        * Clear cache hook
        */
        $needClearCache = Arr::get($_GET, 'clear') == 1;

        $this->view["articles"]  = Model_Article::getActiveArticles($needClearCache);
        $this->template->content = View::factory('templates/articles/list_wrapper', $this->view);
    }

    public function action_show()
    {
        if (Arr::get($_GET, 'test')) {
            $this->view['test'] =   View::factory('templates/quizzes/quiz', array('quizData' => array(
                                                                                                'title'             => '',
                                                                                                'description'       => '',
                                                                                                'shortDescription'  => '',
                                                                                                'dtCreate'          => '',
                                                                                                'questions'         => array(
                                                                                                    array(
                                                                                                        'title' => 'Question 1',
                                                                                                        'answers' => array(
                                                                                                            array(
                                                                                                                'text' => 'Option 1',
                                                                                                                'score' => 1,
                                                                                                                'message' => 'Верно!'
                                                                                                            ),
                                                                                                            array(
                                                                                                                'text' => 'Option 2',
                                                                                                                'score' => 0,
                                                                                                                'message' => 'Не угадал..'
                                                                                                            ))
                                                                                                    )
                                                                                                ),
                                                                                                'messages'          => array(0 => 'Плохо',
                                                                                                    1 => 'Норм'),
                                                                                            )));
        }

        $articleId = $this->request->param('id') ?: $this->request->query('id');

        $this->view["id"] = $articleId;

        $needClearCache = Arr::get($_GET, 'clear');

        $article = Model_Article::get($articleId, $needClearCache);

        if ($article->id == 0 || $article->is_removed)
            throw new HTTP_Exception_404();

        /**
         * @var $blocks - Array of JSON objects.
         * Each object contains:
         *  type - plugins type
         *  data - plugins content
         */
        $blocks = json_decode($article->json) ?: array();

        /**
         * Using PHP renderer for Articles
         */
        for($i = 0; $i < count($blocks); $i++)
        {
            $article->blocks[] = View::factory('templates/editor/plugins/' . $blocks[$i]->type, array('block' => $blocks[$i]->data))
                ->render();
        }
        $article->blocks = $article->blocks ?: array();
        $article->json   = $article->json ?: '';

        $this->stats->hit(Model_Stats::ARTICLE, $articleId);

        $this->view["article"]         = $article;
        $this->view["popularArticles"] = Model_Article::getPopularArticles($articleId);

        $this->title = $article->title;
        $this->description = $article->description;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

}
