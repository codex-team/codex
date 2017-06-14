<div class="center_side">

    <form class="editor-form" method="POST" action="/<?= $course->id && $course->uri ? $course->uri . '/save' : 'course/add' ?>" enctype="multipart/form-data" id="edit_article_form">

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="course_id" value="<?= $course->id; ?>">

        <section class="editor-form__section">
            <label for="title">Название курса</label>
            <input type="text" name="title" value="<?= $course->title ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="uri">URI</label>
            <input type="text" name="uri" value="<?= $course->uri ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="description">Краткое описание</label>
            <textarea name="description" id="codex_editor" cols="5" rows="5"><?= $course->description ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <label for="course_text">Содержание</label>
            <textarea name="course_text" id="codex_editor" cols="30" rows="10"><?= $course->text ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <label for="course_cover">Обложка</label>
            <input type="text" name="cover" id="codex_editor" value="<?= $course->cover ?: ''; ?>" />
        </section>

        <section class="editor-form__section">
            <label for="item_below_key">Выводить над (в списке первые 5 элементов фида, если не выбрать, курс останется на своем месте)</label>
            <select name="item_below_key">
                <option value="0">---</option>
                <? foreach ($topFeed as $item): ?>
                    <option value="<?= $item::FEED_PREFIX.':'.$item->id; ?>">
                        <?= $item->title; ?>
                    </option>
                <? endforeach ?>
            </select>
        </section>

        <section class="editor-form__section">
            <input type="checkbox" name="is_published" value="1" <?= $course->is_published ? 'checked' : ''; ?>>
            Опубликован
        </section>

        <section class="editor-form__section">
            <input type="checkbox" name="marked" value="1" <?= $course->marked ? 'checked' : ''; ?>>
            Важный курс
        </section>

        <input type="hidden" name="is_removed" value="0">

        <section class="editor-form__section">
            <input type="submit" value="Сохранить" name="submit"/>
        </section>
    </form>

</div>
