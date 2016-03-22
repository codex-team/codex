<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/contest/add" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">

            <label for="title">Заголовок:</label>
            <? if (isset($contest)): ?>
                <input type="hidden" name="contest_id" value="<?= $contest->id; ?>">
                <input type="text" name="title" value="<?= $contest->title; ?>">
                <label for="description">Описание:</label>
                <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $contest->description; ?></textarea>
                <label for="contest_text">Содержание:</label>
                <textarea name="contest_text" id="codex_editor" cols="30" rows="10"><?= $contest->text; ?></textarea>
            <? else: ?>
                <input type="text" name="title">
                <label for="description">Описание:</label>
                <textarea name="description" id="codex_editor" cols="5" rows="5"></textarea>
                <label for="contest_text">Содержание:</label>
                <textarea name="contest_text" id="codex_editor" cols="30" rows="10"></textarea>
            <? endif; ?>

            <? if (isset($contest) && $contest->status): ?>
                <p><input type="checkbox" class="contest_status" name="status" value="1" checked>Закончен</p>
            <? else: ?>
                <p><input type="checkbox" name="status">Закончен</p>
            <? endif; ?>

            <label for="duration">Дата окончания(YYYY-MM-DD hh:mm:ss)</label>
            <? if (isset($contest->dt_close)): ?>
                <input type="text" name="duration" value="<?= $contest->dt_close; ?>">
            <? else: ?>
                <input type="text" name="duration" value="">
            <? endif; ?>
            <label for="winner">ID победителя:</label>
            <? if (isset($contest->winner)): ?>
                <input type="text" name="winner" value="<?= $contest->winner; ?>">
            <? else: ?>
                <input type="text" name="winner" value="">
            <? endif; ?>

            <label for="results_contest">Результаты:</label>
            <? if (isset($contest->results)): ?>
                <textarea name="results_contest" id="codex_editor" cols="30" rows="10"><?= $contest->results; ?></textarea>
            <? else: ?>
                <textarea name="results_contest" id="codex_editor" cols="30" rows="10"></textarea>
            <? endif; ?>


            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
