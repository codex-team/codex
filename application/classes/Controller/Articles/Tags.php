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
         $tags_obj = new Model_Tags;
         $result = $tags_obj->search_by_query($query);
         $tags_obj->tags_list('all');
         $this->view["tags_list"] = $tags_obj->tag_name;

            if($result !== NULL){
                
				$this->view["articles"] = Model_Article::getActiveArticles();
                 // gets list of active articles and excludes not maching ones
				 // @delete state of article - whether it fits or not, if not this article is excluded from the list 
                for ($index=0; $index <= count($this->view["articles"]) ; $index++) { 
               	    $delete = 1;
					for ($index_inner=0; $index_inner < count($result) ; $index_inner++) { 
						if ($result[$index_inner] == $this->view["articles"][$index]->id) {
                      		$delete = 0;
						}
					}  
					if ($delete == 1) {
                		unset($this->view["articles"][$index]);
					}
				}
				$state = "found";
            }
            else{ 
        		$this->view["articles"] = Model_Article::getActiveArticles();
            	$state = "not_found";
            }
    		$content = View::factory('templates/articles/list', $this->view);
        	$this->template->content = View::factory("templates/articles/wrapper",
        	array("active" => "allArticles","search" => $state, "query" => $query, "content" => $content));
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
        $tags_obj = new Model_Tags;
        $tags_obj->tags_list('all');

    	$content = View::factory('templates/articles/tag_lib', array("tag_list" => $tags_obj->tag_name));
    	$this->template->content = View::factory("templates/articles/wrapper",
    	array("active" => "allArticles","search" => "library", "query" => "Список тэгов", "content" => $content));
	}

}

/**
* Example of inserting tags for article to db ,where article id is 8 and tags are test1,test2
*/

/*$tags="test1,test2";      
if($tags_obj->validate_tags($tags)){ 
	if($tags_obj->insert_tags($tags,8) !== false){ 
		if($tags_obj->tags_list(8) !== false){
    		var_dump($tags_obj->tag_name );
    		exit();
    	} 
    }
} 
*/
