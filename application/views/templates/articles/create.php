<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/article/add" enctype="multipart/form-data" id="edit_article_form">

            Заголовок:
            <? if (isset($article)): ?>
                <input type="hidden" name="article_id" value="<?= $article->id; ?>">
                <input type="text" name="title" value="<?= $article->title; ?>">
            <? else: ?>
                <input type="text" name="title">
            <? endif; ?>

            Содержание:
            <textarea name="article_text" id="codex_editor" cols="30" rows="10">
                <? if (isset($article)): ?>
                    <?= $article->text ?>
                <? else: ?>
                    <h2>Введение</h2>
                <? endif; ?>
            </textarea>

            <div>
                <? if (isset($article) && $article->is_published): ?>
                    <input type="checkbox" name="is_published" value="1" checked> Опубликовать
                <? else: ?>
                    <input type="checkbox" name="is_published"> Опубликовать
                <? endif; ?>
            </div>
            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
