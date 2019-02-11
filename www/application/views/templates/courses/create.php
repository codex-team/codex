<div class="center_side">

    <form class="editor-form article-content" method="POST" action="/<?= $course->id && $course->uri ? $course->uri . '/save' : 'course/add' ?>" enctype="multipart/form-data" id="edit_article_form">

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="course_id" value="<?= $course->id; ?>">

        <section class="editor-form__section">
            <label for="title">Название курса</label>
            <input class="input" type="text" name="title" id="title" value="<?= $course->title ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="uri">URI</label>
            <input class="input" type="text" name="uri" id="uri" value="<?= $course->uri ?: ''; ?>">
        </section>

        <section class="editor-form__section">
            <label for="description">Краткое описание</label>
            <textarea class="editor-form__important-filed input" name="description" id="description" cols="5" rows="5"><?= $course->description ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <label for="course_text">Содержание</label>
            <textarea class="editor-form__important-filed input" name="course_text" id="course_text" cols="30" rows="10"><?= $course->text ?: ''; ?></textarea>
        </section>

        <section class="editor-form__section">
            <label for="course_cover">Обложка</label>
            <input class="input" type="text" name="cover" id="course_cover" value="<?= $course->cover ?: ''; ?>" />
        </section>

        <section class="editor-form__section">
            <input type="checkbox" id="is_big_cover" name="is_big_cover" value="1" <?= $course->is_big_cover ? 'checked' : ''; ?>>
            <label class="label--on-same-line" for="is_big_cover">Большая обложка</label>
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
            <input type="checkbox" id="is_published" name="is_published" value="1"  <?= $course->is_published ? 'checked' : ''; ?>>
            <label class="label--on-same-line" for="is_published">Опубликован</label>
        </section>

        <section class="editor-form__section">
            <input type="checkbox" id="marked" name="marked" value="1"  <?= $course->marked ? 'checked' : ''; ?>>
            <label class="label--on-same-line" for="marked">Важный курс</label>
        </section>

        <input type="hidden" name="is_removed" value="0">

        <section class="editor-form__section">
            <input class="button button--master" type="submit" value="Сохранить" name="submit"/>
        </section>
    </form>

</div>
