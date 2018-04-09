<link rel="stylesheet" href="/public/css/editor-form.css?v=<?= filemtime("public/css/editor-form.css") ?>">

<div class="center_side">

    <form class="editor-form" method="POST" action="/<?= $contest->id && $contest->uri ? $contest->uri . '/save' : 'contest/add' ?>" enctype="multipart/form-data" id="edit_article_form">

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="contest_id" value="<?= $contest->id; ?>">

        <section class="editor-form__section">
            <label for="title">Название конкурса</label>
            <input type="text" name="title" value="<?= $contest->title ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $contest->uri ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="description">Краткое описание</label>
            <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $contest->description ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <label for="contest_text">Содержание</label>
            <textarea name="contest_text" id="codex_editor" cols="30" rows="10"><?= $contest->text ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <input type="checkbox" class="contest_status" name="status" value="1" <?= $contest->status ? 'checked' : ''; ?>>
            Закончен
        </section>

        <section class="editor-form__section">
            <label for="duration">Дата окончания(YYYY-MM-DD hh:mm:ss)</label>
            <input type="text" name="duration" value="<?= $contest->dt_close ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="winner">ID победителя</label>
            <input type="text" name="winner" value="<?= $contest->winner ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="results_contest">Результаты</label>
            <textarea name="results_contest" id="codex_editor" cols="30" rows="10"><?= $contest->results ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <input class="button button--master" type="submit" value="Сохранить" name="submit"/>
        </section>
    </form>

</div>