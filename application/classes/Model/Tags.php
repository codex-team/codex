<?php defined('SYSPATH') or die('No direct script access.');

/**
 * Tags Class.
 *
 * @author Zotov Vladislav
 */

Class Model_Tags extends Model_Database
{

/**
* Получает названия всех тэгов (требуется только для библиотеки тэгов)
* 
*/

public static function getAllTags(){

    $all_tags = array();

    $all_tags = Dao_Tags::select('name')->execute();
                  
    return $all_tags;
}

/**
*  Возвращает список тэгов для статьи (по ийди) в виде массива
* 
*/

public static function getTagsByArticle($id){

    if($id !== null){

        $tag_name = Dao_Tags::select('Tags.name')
                              ->join('Tags_articles')
                              ->on('Tags.id', '=', 'Tags_articles.tag_id' )
                              ->join('Articles')
                              ->on('Articles.id', '=', 'Tags_articles.article_id')
                              ->where('Articles.id', '=', $id)
                              ->where('is_removed', '=', false)
                              ->where('is_published', '=', true)
                              ->execute();
    }

    return $tag_name;
}

/**
*  Возвращает список всех тэгов
* 
*/

//FIXME не фильтрует тэги удаленных статей
public static function getUniqueTags(){
   
    $unique = self::getAllTags();

return $unique;
}

/**
*  Возвращает айди статей по заданному тэгу в виде массива
* 
*/

private static function searchByTag($tag_name){

    $article_id = Dao_Articles::select('Articles.id')
                              ->join('Tags_articles')
                              ->on('Articles.id', '=', 'Tags_articles.article_id')
                              ->join('Tags')
                              ->on('Tags.id', '=', 'Tags_articles.tag_id' )
                              ->where('Tags.name', '=', $tag_name)
                              ->where('is_removed', '=', false)
                              ->where('is_published', '=', true)
                              ->execute();

    return  $article_id;
}

/**
*  Возвращает список статей по заданному тэгу
* 
*/

public static function getArticlesByTag($tag_name){

    $article = array();
    $article_id = self::searchByTag($tag_name);

    for($index = 0; $index < count($article_id); $index++){
        // Проверка на нулевой айди статьи
        if ($article_id[$index]["id"] != 0){

            $article[$index] = Model_Article::get($article_id[$index]["id"]);
        }
    }

return $article;

}
 
/**
*  Вносит тэги в БД в соответствии со статьей и кэширует их 
*
*/
//FIXME В дальнейшем желательно использовать транзакцию 
public static function insertTags($tags,$article_id){

    if(!empty($tags) && !empty($article_id)){ 

        $single_tag = explode(",", $tags);

        for($index = 0; $index < count($single_tag); ++$index){

           $is_existing_tag = self::SearchByTag($single_tag[$index]);//существует ли тэг в таблице Tags

            if( empty($is_existing_tag) ){//если нет то добавляем его

                $new_tag = Dao_Tags::insert()
                                     ->set('name', $single_tag[$index])
                                     ->clearcache()
                                     ->execute();
            }
            else{
                $new_tag = $single_tag[$index]; 
            }
            if($new_tag){

                $get_new_tag_id = Dao_Tags::select()//получаем айди текущего тэга и кэшируем тэг
                                            ->where('name', '=', $single_tag[$index])
                                            ->limit(1)
                                            ->cached(10*Date::MINUTE)
                                            ->execute();
                $new_relation_tag_article = Dao_TagsArticles::insert()//создаем связующую запись в Tags_articles
                                                              ->set('tag_id',     $get_new_tag_id["id"])
                                                              ->set('article_id', $article_id)
                                                              ->limit(1)
                                                              ->clearcache()
                                                              ->execute();
                $cache_it =  Dao_TagsArticles::select()// кэшируем эту запись
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
* Функция безвозвратного удаления тэгов по айди статьи (нигде не используется на данный момент)
*
*/

public static function deleteTags($article_id){

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