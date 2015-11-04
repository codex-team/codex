<h1><?= $h1 ? $h1 : "Заголовок страницы не задан" ?></h1>
<div class="articles">
    <?foreach ($items as $article) {?>
        <div class="article">
            <h2><?=$article["TITLE"]?></h2>

            <?if ($article["COVER"]){?>
                <img src="<?=$article["COVER"]?>" alt="<?=$article["TITLE"]?>"/>
            <?}?>

            <?=$article["PREVIEW_TEXT"]?>
            <div class="credits">
                <div class="date"><?=$article["DATE_CREATE_UX"]?></div>
                <div class="writer"><?=$article["WRITER"]?></div>
            </div>
            <p class="actions">
                <a href="/articles/<?=$article["CODE"]?>/">Подробнее...</a>
                <a href="/articles/edit/<?=$article["ID"]?>">Редактировать...</a>
                <a href="/articles/delete/<?=$article["ID"]?>?back=/articles">Удалить...</a>
            </p>
        </div>
    <?}?>
</div>