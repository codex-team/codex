<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Class Controller_Tags
 *
 * @author Zotov Vladislav
 */

class Controller_Articles_Tags extends Controller_Base_preDispatch
{

/**
* Поиск статей по заданному тэгу
*/

public function action_search(){

    if($this->request->param('query')){

        $query = $this->request->param('query');
        $this->title = 'Поиск по тэгу '.$query;
        $articles = Model_Tags::getArticlesByTag($query);
        $this->view["articles"] = array_reverse($articles);

        if(!empty($articles)){

            $content = View::factory('templates/articles/list', $this->view);

            $this->template->content = View::factory("templates/articles/wrapper",
                        array("active" => "allArticles", "search" => "found", "query" => $query, "content" => $content));
        }
        else{

            $content = View::factory('templates/articles/list', $this->view);

            $this->template->content = View::factory("templates/articles/wrapper",
                        array("active" => "allArticles", "search" => "not_found", "query" => $query, "content" => $content));

        }  
    }

    if(!$this->request->param('query')){   

        $this->redirect( 'article' , 302 );
    }
}

/**
*  Библиотека тэгов
*/

public function action_library(){

    $this->title = 'Список тэгов';
    $this->view["tag_list"] = Model_Tags::getUniqueTags();
	$content = View::factory('templates/articles/tag_lib', $this->view);
	$this->template->content = View::factory("templates/articles/wrapper",
	array("active" => "allArticles","search" => "library", "query" => "Список тэгов", "content" => $content));
}

}

