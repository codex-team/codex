<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tags Class has several public methods for interaction with database .
 *
 * @author Zotov Vladislav
 */

Class Model_Tags extends Model_Database
{




/**
*  method defines public param tag_name
* 
*/

public static function GetTagsByArticle($id){


    $tag_name = array();
    $index = 0;
    
    
    if($id !== null){

            $tags_articles_tag_id =  Dao_TagsArticles::select('tag_id')
                                                       ->where('article_id','=',$id)
                                                       ->execute();

            if (!empty($tags_articles_tag_id)) {
                foreach ($tags_articles_tag_id as $tag_id) {

                    
                    $tag_record =  Dao_Tags::select('name')
                                             ->where('id','=',$tag_id)
                                             ->execute();
                    $tag_name[$index] = $tag_record[0]["name"];

                    $index++;
                }
            }

        return $tag_name;
    }
}

public static function GetAllTags(){

    $all_tags = array();
    $articles = Model_Article::getActiveArticles();

    if(!empty($articles)){

        foreach ($articles as $article) {

            $article->id = intval($article->id);
            $all_tags[$article->id] = self::GetTagsByArticle($article->id);

        
        }
    }
    return $all_tags;
}
public static function GetUniqueTags(){
    $index = 0;
    $one_demention = array();
    $multiarray = self::GetAllTags();
    foreach ($multiarray as $inner_array) {
        $one_demention = array_merge($one_demention, $inner_array); 
        ++$index;
       
    }
    
    return array_unique($one_demention);

}

/**
* returns array of found articles ids which fit with query
* 
* 
*/

private static function SearchByTag($tag_name){

    $article_id = array();
    $tag = Dao_Tags::select('id')
                     ->where('name','=',$tag_name)
                     ->execute();

    if(!empty($tag)){

        $article_ids = Dao_TagsArticles::select('article_id')
                                         ->where('tag_id','=',$tag[0]["id"])
                                         ->execute();

        for ($index = 0; $index < count($article_ids); $index++ ) {

            $article_id[$index] = $article_ids[$index]["article_id"];
        }
    }

    return  $article_id;
}

public static function GetArticlesByTag($tag_name){

    $article = array();
    $article_id = self::SearchByTag($tag_name);

    for($index = 0; $index < count($article_id); $index++){

        $article[$index] = Model_Article::get($article_id[$index]);

    }

return array_reverse($article);

}
 



/**
*  inserts tags into tables and matches them with article id 
*
*/

public static function InsertTags($tags,$article_id){

    if(!empty($tags) && !empty($article_id)){ 

        $single_tag = explode(",", $tags);

        for($index = 0; $index < count($single_tag); ++$index){

           $is_existing_tag = self::SearchByTag($single_tag[$index]);

            if( empty($is_existing_tag) ){

                $new_tag = Dao_Tags::insert()
                                     ->set('name', $single_tag[$index])
                                     ->clearcache()
                                     ->execute();
            }
            else{
                $new_tag = $single_tag[$index]; 
            }
            if($new_tag){

                $get_new_tag_id = Dao_Tags::select()
                                            ->where('name', '=', $single_tag[$index])
                                            ->limit(1)
                                            ->cached(10*Date::MINUTE)
                                            ->execute();
                $new_relation_tag_article = Dao_TagsArticles::insert()
                                                              ->set('tag_id',     $get_new_tag_id["id"])
                                                              ->set('article_id', $article_id)
                                                              ->limit(1)
                                                              ->clearcache()
                                                              ->execute();
                $cache_it =  Dao_TagsArticles::select()
                                               ->where('article_id', '=', $article_id)
                                               ->limit(1)
                                               ->cached(10*Date::MINUTE)
                                               ->execute();  
            }
        }           return true;
    }
    else{
                    return false;
    }
}


/**
*  deletes tags and tag_articles records
*
*/

public static function DeleteTags($article_id){

    if(isset($article_id)){

        $tag_ids_to_delete = Dao_TagsArticles::select('tag_id')
                                               ->where('article_id', '=', $article_id)
                                               ->execute();
        $tags_articles_clear = Dao_TagsArticles::delete()
                                                 ->where('article_id', '=', $article_id)
                                                 ->clearcache()
                                                 ->execute();
        for ($index = 0; $index < count($tag_ids_to_delete) ; $index++){ 

            $tags_clear = Dao_Tags::delete()
                                    ->where('id', '=',  $tag_ids_to_delete[$index]["tag_id"])
                                    ->clearcache()
                                    ->execute();
        }
        return  $tag_ids_to_delete;   
    }
    else{
        return false;
    }
}
}