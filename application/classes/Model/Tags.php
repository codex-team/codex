<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tags Class has several public methods for interaction with database 
 * and validation.
 *
 * @author Zotov Vladislav
 */

Class Model_Tags extends Model_Database
{


public $tag_name;


/**
* @tags_list method defines public param tag_name
* @tag_name which is presented as array with two or one indexes depending on range
* @range defines the scope of searching area - it can be ALL (searchs for all articles) or integer(as article id)
*/

public function tags_list($range){

    if ($range == 'all'){
     $article_query = DB::select('id')->from('Articles');
    }
    elseif(is_int($range)){
        $article_query = DB::select('id')->from('Articles')->where('id','=',$range);
    }
    else{
        return false;
    }
    if($article_query){
        $article_list = $article_query->execute()->as_array();
    }
    else{
        return false;
    }  
    if($article_list !== null){

        for($index = 0; $index < count($article_list); ++$index){
            $link_query = DB::select('tag_id')
            ->from('Tags_articles')
            ->where('article_id','=',$article_list[$index]['id'])
            ->execute()
            ->as_array();
            if($link_query){

                for($inner_index = 0; $inner_index < count($link_query); ++$inner_index){
                    $tags_query = DB::select('name')
                    ->from('Tags')
                    ->where('id','=',$link_query[$inner_index]['tag_id'])
                    ->execute()
                    ->current();
                    if($tags_query){

                        if ($range == 'all'){ 
                            // tag_name variable is represented as array with indexes  [article id] [index key]
                            $this->tag_name [ $article_list[$index]['id'] ] [$inner_index] = $tags_query['name'];
                        }
                        elseif(is_int($range)){
                            // in this case tag_name variable is represented as array with only index [index key]
                            $this->tag_name [$inner_index] = $tags_query['name'];
                        }
                    }
                    else{
                        return false;
                    }
                }
            }
            else{
                return false;
            }
        }
    }
}

/**
* @search_by_query returns array of found articles ids which fit with query
* @query tag by which the query will be made
* @found_article_id array with  index [key] which is keep increasing by sequence, represents found articles ids.
*/

public function search_by_query($query){

    $tags_query = DB::select('id')
    ->from('Tags')
    ->where('name','=',$query)
    ->execute()
    ->current();

    if( $tags_query == 0 ){
        return null;
    } 
    else{ 

        for($index = 0; ; ++$index){

            $link_query = DB::select('article_id')
            ->from('Tags_articles')
            ->where('tag_id','=',$tags_query['id'])
            ->execute()
            ->as_array();

            if($link_query){
                $found_article_id[$index] = $link_query[$index]['article_id'];
            }
            else{
                return null;
            }
            if( $index == (count($link_query)-1) ){
                break;
            }
        }
        return $found_article_id;
    }
}
 

/**
* Validates tags by regular state and length(30 symblols for each tag), returns TRUE if tags are correct.
*/
public function validate_tags($tags){

    if(!empty($tags)){

        if(preg_match('/^[0-9a-zA-Zа-яёА-ЯЁ\s\-\.\,]+$/', $tags)){
            $single_tag = explode(",", $tags);
            for($index = 0; $index < count($single_tag); ++$index){

                if(strlen($single_tag[$index]) > 30){
                    return false;
                }
            }
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

/**
* @insert_tags inserts tags into tables and match them with article id 
*
*/

public function insert_tags($tags,$article_id){

    if(!empty($tags) && !empty($article_id)){ 
        $single_tag = explode(",", $tags);
        for($index = 0; $index < count($single_tag); ++$index){

            $tags_query = DB::select('id')
            ->from('Tags')
            ->where('name','=',$single_tag[$index])
            ->execute()
            ->current();
            if($tags_query == 0){

                $new_tag = DB::insert('tags', array('name'))->values( array($single_tag[$index]) )->execute();
                if($new_tag){

                    $new_tag_id = DB::select('id')
                    ->from('Tags')
                    ->where('name','=',$single_tag[$index])
                    ->execute()
                    ->current();

                    $prepared_tag_id = $new_tag_id['id'];
                }
                else{
                    return false;
                }
            }
            else{
                $prepared_tag_id = $tags_query['id'];
            }
            $new_link = DB::insert('tags_articles', array('article_id','tag_id'))
            ->values( array($article_id, $prepared_tag_id) )
            ->execute();
            if(!$new_link){
                return false;
            }
        }
        return true;
    }
}


}