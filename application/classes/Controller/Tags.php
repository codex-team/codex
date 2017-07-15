<?php defined('SYSPATH') or die('No direct script access.');

class Controller_Tags extends Controller_Base_preDispatch
{
    public function action_initial()
    {
        $inner_route = $this->request->param('inner_route');
        $tags_obj = new Model_Tags ;

        if (($inner_route == null) || ($inner_route == 'list')) {
            $this->title = 'Список тэгов';
            $tags_obj->tags_list('all');
            $this->template->content = var_dump($tags_obj->tag_name);
        }


        if (($inner_route == 'search')) {
            $this->title = 'Поиск по тэгам';
            $query="ftag,thtag";
            $queries=explode(",", $query);

            for ($i=0; $i<count($queries); ++$i) {
                $tags_obj->search_by_query($queries[$i]);
                $output[$i] = $tags_obj->found_article_id;
            }

            $this->template->content = var_dump($output);
        }
    }
}
