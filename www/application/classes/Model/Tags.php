<?php defined('SYSPATH') or die('No direct script access.');

class Model_Tags extends Model_Database
{
    public $tag_name;
    private $found_article_id;


  // $range область вывода статей при 'all' - все тэги всех статей при '0,1,2..' вывод тэгов по id статьи
  public function tags_list($range)
  {
      // проверка области вывода тэгов
     if ($range == 'all') {
         // формирование запроса
     $article_query = DB::select('id')->from('articles');
     } elseif (is_int($range)) {
         $article_query = DB::select('id')->from('articles')->where('id', '=', $range);
     } else {
         return false;
     }
    // выплнение запроса ,если он сформирован
    if ($article_query) {
        $article_list = $article_query->execute()->as_array();
    } else {
        return false;
    }
      if ($article_list !== null) {
          for ($i = 0; $i < count($article_list); ++$i) {
              //выбор тэгов статьи из табл. tags_articles
            $link_query = DB::select('tag_id')
            ->from('tags_articles')
            ->where('article_id', '=', $article_list[$i]['id'])
            ->execute()
        ->as_array();
              if ($link_query) {
                  for ($i_2 = 0; $i_2 < count($link_query); ++$i_2) {
                      // выбор и обработка каждого тэга из табл. tags
            $tags_query = DB::select('name')
                ->from('tags')
                ->where('id', '=', $link_query[$i_2]['tag_id'])
                ->execute()
              ->current();
                      if ($tags_query) {
                          if ($range == 'all') {   // в tag_name тэги передаются как массив с индексами [id статьи] [порядковый номер начиная с нуля]
                  $this->tag_name [ $article_list[$i]['id'] ] [$i_2] = $tags_query['name'];
                          } elseif (is_int($range)) {
                              // если область вывода задана по номеру статьи то тэги передаются в tag_name как массив и единственным индексом [порядковый номер начиная с нуля]
                 $this->tag_name [$i_2] = $tags_query['name'];
                          }
                      } else {
                          return false;
                      }
                  }
              } else {
                  return false;
              }
          }
      }
  }

    public function search_by_query($query)
    {
        $tags_query = DB::select('id')
   ->from('tags')
     ->where('name', '=', $query)
   ->execute()
   ->current();
    // поиск не дал результата
   if ($tags_query == 0) {
       return null;
   }
    // есть совпадения хотя бы по одному тэгу
   else {
       for ($i = 0; ; ++$i) {
           $link_query = DB::select('article_id')
        ->from('tags_articles')
        ->where('tag_id', '=', $tags_query['id'])
        ->execute()
        ->as_array();
           if ($link_query) {
               $this->found_article_id[$i] = $link_query[$i]['article_id'];
           } else {
               return null;
           }
           if ($i == (count($link_query)-1)) {
               break;
           }
       }
       return $this->found_article_id;
   }
    }
 
    public function validate_tags($tags)
    {
        if (!empty($tags)) {
            if (preg_match('/^[0-9a-zA-Zа-яёА-ЯЁ\s\-\.\,]+$/', $tags)) {
                $single_tag = explode(",", $tags);
                for ($i = 0; $i < count($single_tag); ++$i) {
                    if (strlen($single_tag[$i]) > 30) {
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public function insert_tags($tags, $article_id)
    {
        if (!empty($tags) && !empty($article_id)) {
            $single_tag = explode(",", $tags);
            for ($i = 0; $i < count($single_tag); ++$i) {
                $tags_query = DB::select('id')
       ->from('tags')
       ->where('name', '=', $single_tag[$i])
       ->execute()
       ->current();
                if ($tags_query == 0) {
                    $new_tag = DB::insert('tags', array('name'))->values(array($single_tag[$i]))->execute();
                    if ($new_tag) {
                        $new_tag_id = DB::select('id')
            ->from('tags')
            ->where('name', '=', $single_tag[$i])
            ->execute()
            ->current();
                        $prepared_tag_id = $new_tag_id['id'];
                    } else {
                        return false;
                    }
                } else {
                    $prepared_tag_id = $tags_query['id'];
                }
                $new_link = DB::insert('tags_articles', array('article_id','tag_id'))->values(array($article_id, $prepared_tag_id))->execute();
                if (!$new_link) {
                    return false;
                }
            }
            return true;
        }
    }
}
