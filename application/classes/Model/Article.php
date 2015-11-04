<?php defined('SYSPATH') or die('No direct script access.');

class Model_Article extends Model
{
    /**
     *	Article Model
     */


    function GetList($arFilter = false){
        // predebug($arFilter, "GetList:arFilter");

        $strWhere = "";

        if (is_array($arFilter) && $arFilter){
            $arWhere = array();

            // if ($arFilter["!ID"]){
            // $arFilter["ID"] = $arFilter["!ID"];
            // $not 
            // }

            if (isset($arFilter["ID"]) && ($id = $arFilter["ID"])){
                if (is_array($id))
                    $arWhere[] = "ID IN (" . implode(", ", $id) . ")";
                else
                    $arWhere[] = "ID = '$id'";
            }

            if (isset($arFilter["!ID"]) && ($id = $arFilter["!ID"])){
                if (is_array($id))
                    $arWhere[] = "ID NOT IN (" . implode(", ", $id) . ")";
                else
                    $arWhere[] = "ID != '$id'";
            }

            if (isset($arFilter["CODE"]) && ($code = $arFilter["CODE"])){
                $arWhere[] = "CODE = '$code'";
            }

            if ($arWhere)
                $strWhere = "where " . implode(" AND ", $arWhere);
        }

        // todo pagenav

        $sql = "
            select *
            from articles
            $strWhere
            order by date_create desc
            limit 15
        ";

        $items = DB::query(Database::SELECT, $sql)->execute()->as_array();
//        $items = DB::select("*")->from('articles')->execute()->as_array();


        $arResult = array();

        foreach($items as &$item){
            $arResult[] = $this->PrepareViewFields($item);
        }

        return $arResult;
    }

    function GetByCode($code){
        // each item must have unique code
        if ( $arResult = $this->GetList( $arFilter = array( "CODE" => $code ) ) )
            return $arResult[0];
    }

    function GetById($id){
        // each item must have unique id
        if ( $arResult = $this->GetList( $arFilter = array( "ID" => $id ) ) )
            return $arResult[0];
    }

    // 
    function PrepareViewFields(&$arFields){
        if ($arFields["DATE_CREATE"])
            $arFields["DATE_CREATE_UX"] = $this->ButifyDate($arFields["DATE_CREATE"]);

//         if ($arFields["COVER"])
//            $arFields["COVER"] = "";

        return $arFields;
    }

    //
    function ButifyDate($date, $format = "d.m.y H:i"){
        return date($format, strtotime($date));
    }

    static function Db_Date_Now(){
        return date("Y-m-d H:i:s");
    }


    // символьный код состоит из букв, цифр - и _
    function ClearCode($code){
        $code = preg_replace("#[^a-zA-Z0-9\-_]#", "", $code);

        return $code;
    }

    function CheckFields($arFields, $ID){
        $maxTitleLen = 50;
        $maxWriterLen = 50;

        $arErrors = array();

        // 
        if (array_key_exists("TITLE", $arFields)){
            $tmp = $arFields["TITLE"];

            if (!$tmp)
                $arErrors[] = "Название не может быть пустым";

            if (strlen($tmp) > $maxTitleLen)
                $arErrors[] = "Слишком длинное название (макс. $maxTitleLen симв.)";
        }

        // 
        if (array_key_exists("CODE", $arFields)){
            $tmp = $arFields["CODE"];

            if (!$tmp)
                $arErrors[] = "Символьный код не может быть пустым";

            else if ($this->ClearCode($tmp) != $tmp)
                $arErrors[] = "Символьный код содержит запрещенные символы";

            else if ($this->GetList( array( "CODE" => $tmp, "!ID" => $ID )))
                $arErrors[] = "Статья с таким символьным кодом уже существует";
        }

        // 
        if (array_key_exists("DATE_CREATE", $arFields)){
            $tmp = $arFields["DATE_CREATE"];
            // predebug($tmp);

            if (!$tmp)
                $arErrors[] = "Дата не может быть пустой";

            if (!strtotime($tmp))
                $arErrors[] = "Неверный формат даты";
        }

        // 
        if (array_key_exists("WRITER", $arFields)){
            $tmp = $arFields["WRITER"];

            if (!$tmp)
                $arErrors[] = "Автор не может быть пустым";

            if (strlen($tmp) > $maxWriterLen)
                $arErrors[] = "Слишком длинный автор (макс. $maxWriterLen симв.)";
        }

        // TODO check all other fields

        return $arErrors;
    }

    function Add($arFields){
        $insert = DB::insert('articles', array("TITLE", "CODE", "PREVIEW_TEXT", "DETAIL_TEXT","DATE_CREATE", "WRITER"))
            ->values(array($arFields["TITLE"], $arFields["CODE"], $arFields["PREVIEW_TEXT"], $arFields["DETAIL_TEXT"], $arFields["DATE_CREATE"], $arFields["WRITER"]));

        list($insert_id, $affected_rows) = $insert->execute();
        
        return $insert_id;
    }

    function Update($id, $arFields){
        $rows = DB::update('articles')->set(array(
            "TITLE"        => $arFields["TITLE"],
            "CODE"         => $arFields["CODE"],
            "PREVIEW_TEXT" => $arFields["PREVIEW_TEXT"],
            "DETAIL_TEXT"  => $arFields["DETAIL_TEXT"],
            "DATE_CREATE"  => $arFields["DATE_CREATE"],
            "WRITER"       => $arFields["WRITER"]
        ))->where('id', '=', $id)->execute();
        
        return $rows;
    }

    function Delete($id){
        $this->DeleteCover($id);

        return $rows = DB::delete('articles')->where('id', '=', $id)->execute();
    }

    function AddCover($id, $filePath){
        if ($filePath === false)
            return;

        $rows = DB::update('articles')->set(array("COVER" => $filePath))->where('id', '=', $id)->execute();

        return $rows;
    }

    function DeleteCover($id){
        // get old file - delete them
        $article = $this->GetById($id);

        if ($article["COVER"] && file_exists($_SERVER['DOCUMENT_ROOT'] . $article["COVER"]))
            unlink($_SERVER['DOCUMENT_ROOT'] . $article["COVER"]);

        $rows = DB::update('articles')->set(array("COVER" => ''))->where('id', '=', $id)->execute();

        return $rows;
    }

    function SetCover($id, $filePath){
        $this->DeleteCover($id);
        $this->AddCover($id, $filePath);

        return true;
    }


}