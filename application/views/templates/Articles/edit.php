<?php
/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 04.11.2015
 * Time: 19:13
 */

$date      = $item["DATE_CREATE"] ? htmlentities($item["DATE_CREATE"]) : Model_Article::Db_Date_Now();
$has_cover = isset($item["COVER"]) && $item["COVER"] != "NULL";
$id        = $item["ID"];
?>
<h1><?= $h1?></h1>
<div class="errors" style='color: red;'>
    <?
    //
    if (isset($item["ERRORS"]) && ($arErrors = $item["ERRORS"])){
        ?>
        <p>Исправьте ошибки: <br/>
            <?
            //
            foreach ($arErrors as $i => $error) {

                echo $i + 1 . ") $error</br>";
            }
            ?>
        </p>
    <?}?>
</div>


<form action="/articles/edit/<?=$id ? $id : "new"?>" class="edit_article" method="post" enctype="multipart/form-data">
    <input type="hidden" name="ACTION" value="EDIT_ARTICLE" />
    <input type="hidden" name="article[ID]" value="<?=$id?>"/>

    <label >Название: <input type="text" name="article[TITLE]" value="<?=htmlspecialchars($item["TITLE"])?>" required/></label>
    <label >Символьный код: <input type="text" name="article[CODE]" value="<?=htmlspecialchars($item["CODE"])?>" required/></label>
    <label >Автор: <input type="text" name="article[WRITER]" value="<?=htmlspecialchars($item["WRITER"])?>" required/></label>
    <label >Дата: <input type="text" name="article[DATE_CREATE]" value="<?=$date?>" required/></label>
    <label >Описание для анонса: <textarea name="article[PREVIEW_TEXT]" id=""  required><?=htmlspecialchars($item["PREVIEW_TEXT"])?></textarea></label>
    <label >Детальное описание: <textarea id="detail_text" name="article[DETAIL_TEXT]" id=""  required><?=htmlspecialchars($item["DETAIL_TEXT"])?></textarea></label>

    <label >Обложка: </label>
    <div class="cover">
        <?if ($has_cover){?><img id="cover_img" src="<?=htmlentities($item["COVER"])?>"/><?}?>
        <p class="tcenter <?if ($has_cover){?>hidden<?}?>" id="no_cover">- Нет обложки -</p>

        <p class="actions tcenter">
            <a href="#" id="change_cover_btn">Добавить / Изменить</a>

            <a href="#" class="<?if (!$has_cover){?>hidden<?}?>" id="delete_cover">Удалить</a>
        </p>

        <input id="change_cover_i" class="hidden_file" type="file" name="COVER" value="" />
        <input id="delete_cover_i" type="hidden" name="article[DELETE_COVER]" value="N" />
    </div>

    <div><button>Добавить / Изменить</button><div class="clear"></div></div>

    <?if ($id){?>
        <p class="actions">
            <a href="/articles/<?=$item["CODE"]?>/">Назад к статье</a>
            <a href="/articles/delete/<?=$id?>?back=/articles">Удалить...</a>
        </p>
    <?}?>
</form>