<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/contest/add" enctype="multipart/form-data" id="edit_article_form" class="edit_article_form">
            <?if (!isset($contest)) { $contest = new Model_Contests(); }?>

            <input type="hidden" name="contest_id" value="<?= $contest->id; ?>">
            <label for="title">Заголовок:</label>
            <input type="text" name="title" value="<?= $contest->title ? : '';?>">

            <label for="description">Описание:</label>
            <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $contest->description ? : '';?></textarea>

            <label for="contest_text">Содержание:</label>
            <textarea name="contest_text" id="codex_editor" cols="30" rows="10"><?= $contest->text ? : '';?></textarea>

            <p><input type="checkbox" class="contest_status" name="status" value="1" <?= $contest->status ? 'checked' : '';?>>Закончен</p>

            <label for="duration">Дата окончания(YYYY-MM-DD hh:mm:ss)</label>
            <input type="text" name="duration" value="<?= $contest->dt_close ? : '';?>">

            <label for="winner">ID победителя:</label>
            <input type="text" name="winner" value="<?= $contest->winner ? : '';?>">

            <label for="results_contest">Результаты:</label>
            <textarea name="results_contest" id="codex_editor" cols="30" rows="10"><?= $contest->results ? : '';?></textarea>

            <input type="submit" value="Сохранить" name="submit"/>
        </form>

    </article>

</div>
