<h1><?= $h1?></h1>
<div class="articles">
    <div class="article">

        <?if ($item["COVER"]){?>
            <img src="<?=$item["COVER"]?>" alt="<?=$item["TITLE"]?>"/>
        <?}?>

        <?=$item["DETAIL_TEXT"]?>
        <div class="credits">
            <div class="date"><?=$item["DATE_CREATE_UX"]?></div>
            <div class="writer"><?=$item["WRITER"]?></div>
        </div>
        <p class="actions">
            <a href="/articles/edit/<?=$item["ID"]?>">Редактировать...</a>
            <a href="/articles/delete/<?=$item["ID"]?>?back=/articles">Удалить...</a>
        </p>
        <p><a href="/articles">Назад к списку</a></p>
    </div>
</div>