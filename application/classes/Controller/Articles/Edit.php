<?php

/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 04.11.2015
 * Time: 19:10
 */

class Controller_Articles_Edit extends Controller_Base_preDispatch
{
    public function action_showEditor()
    {
        $article_id = $this->request->param('article_id');

        $articles = new Model_Article();
        $this->view["item"] = false;

        if (isset($_POST["ACTION"]) && ($_POST["ACTION"] == "EDIT_ARTICLE")){
            if ($arErrors = $articles->CheckFields($_POST["article"], $_POST["article"]["ID"])){
                $this->view["item"] = $_POST["article"];

                // todo об ошибке загрузки файла пока ни как не сообщается пользователю
                $this->view["item"]["ERRORS"] = $arErrors;
            } else {
                $id = intVal($_POST["article"]["ID"]);

                if ($id)
                    $articles->Update($id, $_POST["article"]);
                else
                    $id = $articles->Add($_POST["article"]);

                $metods = new Model_Methods();

                // save article cover
                // todo ResizeFile($filePath, ...)
                if ($_POST["article"]["DELETE_COVER"] == "Y" && $id){
                    $articles->SetCover($id, false);
                }
                else if (
                    $_POST["article"]["DELETE_COVER"] == "N"
                    && ( $filePath = $metods->SavePostFile("COVER", "covers/", 2097152, array('jpg','jpeg','gif','png','bmp')) )
                ){
                    $articles->SetCover($id, $filePath);
                }

                $this->redirect("/articles/edit/$id");
            }
        }
        else if ($article_id != "new") {
            if (!$this->view["item"] = $articles->GetById($article_id))
                $this->redirect("/404");
        }

        $title = "";
        if ($this->view["item"])
            $title = "Редактирование статьи";
        else
            $title = "Добавление статьи";

        $this->title      = $title;
        $this->view["h1"] = $title;

        $this->template->content = View::factory('templates/Articles/edit', $this->view);
    }

    function action_deleteArticle(){
        $article_id = $this->request->param('article_id');

        $articles = new Model_Article();
        // TODO: check rights 4 delete
        $articles->Delete($article_id);

        $metods = new Model_Methods();
        $back = $_REQUEST["back"] ?  $metods->DecodeUrl($_REQUEST["back"]) : "/";

        $this->redirect($back);
    }

}