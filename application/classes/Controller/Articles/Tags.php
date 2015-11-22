<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Class Controller_Tags
 */
class Controller_Articles_Tags extends Controller_Base_preDispatch
{
/**
* Returns a list of articles which match query param in route
*/
  public function action_search()
    {
        if($this->request->param('query')){

            $query = $this->request->param('query');
            $this->title = 'Поиск по тэгу '.$query;
            $articles = Model_Tags::GetArticlesByTag($query);
            $this->view["articles"] = $articles;
            $tags = array();

                for($index = 0; $index < count($articles); $index++){

                    $tags[$articles[$index]->id] = Model_Tags::GetTagsByArticle($articles[$index]->id);
                }

            $this->view["tags_list"] = $tags;

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
        else{
        	$this->redirect( 'article' , 302 );
        }
    }

    /**
	* Returns a full list of tags
	*/

  public function action_library()
    {
        $this->title = 'Список тэгов';
        $this->view["tag_list"] = Model_Tags::GetUniqueTags();
    	$content = View::factory('templates/articles/tag_lib', $this->view);
    	$this->template->content = View::factory("templates/articles/wrapper",
    	array("active" => "allArticles","search" => "library", "query" => "Список тэгов", "content" => $content));
	}

}

