<?php defined('SYSPATH') or die('No direct script access.');

class Model_Tags extends Model_Database
{

public $tag_name;
public $found_article_id;
public $is_found;
// $range область вывода статей при 'all' - все тэги всех статей при '0,1,2..' вывод тэгов по id статьи
public function tags_list($range)
    {
         // проверка области вывода тэгов
    	 if ( $range == 'all' )
    	 {
         // формирование запроса
         $article_query = DB::select('id')
         ->from('articles');

         }
          elseif( is_int($range)  )
          {
             $article_query = DB::select('id')
             ->from('articles')
             ->where('id','=',$range);
          }
       
	
        // выплнение запроса ,если он сформирован
        if($article_query)
        {
        	 $article_list = $article_query->execute()->as_array();
        }
            
           else
            {
        		$article_list = null;
        	    $this->tag_name = null;
        	}  
        
        if ( $article_list !== null )
        {   
          	for($i = 0; $i < count($article_list); ++$i)
              //выбор тэгов статьи из табл. tags_articles
          	{
          		$link_query = DB::select('tag_id')
        		->from('tags_articles')
        		->where('article_id','=',$article_list[$i]['id'])
        		->execute()
        	    ->as_array();
             
        		for($i_2 = 0; $i_2 < count($link_query); ++$i_2)
                 // выбор и обработка каждого тэга из табл. tags
        	    {

                 $tags_query = DB::select('name')
        		->from('tags')
        		->where('id','=',$link_query[$i_2]['tag_id'])
        		->execute()
        	    ->current();
                   if ( $range == 'all' )

    	           {   // в tag_name тэги передаются как массив с индексами [id статьи] [порядковый номер начиная с нуля]
        	          $this->tag_name [ $article_list[$i]['id'] ] [$i_2] = $tags_query['name'];
        	       }

        	        elseif( is_int($range)  )

                    {   // если область вывода задана по номеру статьи то тэги передаются в tag_name как массив и единственным индексом [порядковый номер начиная с нуля]
                    	$this->tag_name [$i_2] = $tags_query['name'];
                    }

        		}


           	}
     
          

        }


     }



  	public function search_by_query($query)
  		{
          //примитивная защита от sql-inj
          if ( ctype_alnum($query) )

          {
             
           $tags_query = DB::select('id')
            ->from('tags')
        	->where('name','=',$query)
        	->execute()
        	->current();
               // поиск не дал результата 
        	   if( $tags_query == 0 )

        	   {
                 $this->is_found=FALSE;  
                 $this->found_article_id=null;
        	   } 
                // есть совпадения хотя бы по одному тэгу
        	   else

        	   {    

        	        $this->is_found=TRUE; 

                     for($i = 0; ; ++$i)
                     {

                       $link_query = DB::select('article_id')
                       ->from('tags_articles')
        	           ->where('tag_id','=',$tags_query['id'])
        	           ->execute()
        	           ->as_array();
                        
                        $this->found_article_id[$i] = $link_query[$i]['article_id'];

                        if ( $i == (count($link_query)-1) ) {break;}
                       
                     }
                 

        	   }

          }else{  $this->is_found=FALSE; $this->found_article_id=null;  }

  		}

        			    

	
}