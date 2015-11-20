<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Articles_Index extends Controller_Base_preDispatch
{

    public function action_showAllArticles()
    {
        $this->title = "Статьи команды CodeX";
        $this->description = "Здесь собраны заметки о нашем опыте и исследованиях в области веб-разработки, дизайна, маркетинга и организации рабочих процессов";

        $this->view["articles"]  = Model_Article::getActiveArticles();
        $this->template->content = View::factory('templates/articles/list', $this->view);
    }

    public function action_showArticle()
    {
        $articleId = $this->request->param('article_id');
        $this->view["id"] = $articleId;

        $article = Model_Article::get($articleId);

        $this->view["article"] = $article;

        $this->title = $article->title;

        $comments = Model_Comment::getCommentsByArticle($articleId);

        $comments_table_rebuild = array();

        $i = 0;
        foreach ($comments as $comment):
            $comments_table_rebuild[] = $comment;

            $var_k = $i;
            for ($j = 0; $j < $i; $j++) {
                if ($comment->parent_id == $comments_table_rebuild[$j]->id) {
                    for ($k = $j + 1; $k < $i; $k++) {
                        if ($comment->parent_id != $comments_table_rebuild[$k]->parent_id) {
                            $var_k = $k;
                            break;
                        };
                    };
                    break;
                };
            };
            for ($j = $i; $j >= $var_k; $j--) {
                $comments_table_rebuild[$j + 1] = $comments_table_rebuild[$j];
            }

            $comments_table_rebuild[$var_k] = $comment;
            $i++;
        endforeach;
        array_pop($comments_table_rebuild);
        // пересобрали.

        $this->view["comments"] = $comments_table_rebuild;

        $this->template->content = View::factory('templates/articles/article', $this->view);
    }

    public function action_newArticle()
    {
        $this->template->content = View::factory('templates/articles/new', $this->view);
    }

}