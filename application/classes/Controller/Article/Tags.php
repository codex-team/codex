<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Class Controller_Tags
 */
class Controller_Articles_Tags extends Controller_Base_preDispatch
{
/**
* Осуществляет поиск по тэгу. В случае, если пользователь не указал параметр поиска - перенаправляет в раздел статей.
*/
  public function action_search()
  {

    if($this->request->param('query'))
    { 
      $query = $this->request->param('query');
      $this->title = 'Поиск по тэгу: '.$query;
      $tags_obj = new Model_Tags;
      $result = $tags_obj->search_by_query($query);
      if($result !== NULL)
      {
        $this->view["articles"] = DB::select('*')
        ->from('Articles')
        ->where('id', 'IN', $result)
        ->and_where('is_removed', '=', 0)
        ->order_by('id', 'DESC')
        ->execute();

        $content = View::factory('templates/articles/list', $this->view);
        $this->template->content = View::factory("templates/articles/wrapper",
        array("active" => "allArticles", "content" => $content));

      }else{ $this->template->content = 'Ooops! Nothing has been found.'; }

    }else{ $this->redirect( 'article' , 302 ); }

  }

}



/*$tags="test1,test2";      
if($tags_obj->validate_tags($tags))
{ 
 if($tags_obj->insert_tags($tags,8) !== false)
 { 
   if($tags_obj->tags_list(8) !== false)
    {
      var_dump($tags_obj->tag_name );
      exit();
     } 
  }
} 
*/
