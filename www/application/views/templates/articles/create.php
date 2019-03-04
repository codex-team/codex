<div class="center_side">

    <form class="editor-form article-content" name="codex_article" data-module="articleCreate">

        <module-settings hidden>
            {
                "article_textarea" : "article_text",
                "submit_id" : "submitButton",
                "form_url" : "/<?= $article->id && $article->uri ? $article->uri . '/save' : 'article/save' ?>"
            }
        </module-settings>

        <? if (!empty($error)): ?>
            <div class="editor-form__error">
                <?= $error ?: 'Ошибочка во время сохранения' ?>
            </div>
        <? endif ?>

        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <input type="hidden" name="article_id" value="<?= $article->id ?: ''; ?>">

        <input class="editor-form__title" type="text" name="title" required value="<?= $article->title ?: ''; ?>" placeholder="Story title" autocomplete="off">

        <textarea name="article_text" id="article_text" hidden rows="10" hidden><?= $article->text ?: ''; ?></textarea>

        <div class="editor-form__editor">
            <div id="editorjs"></div>
        </div>

        <section class="editor-form__section">

            <label for="uri">URI</label>
            <input class="input" type="text" name="uri" value="<?= $article->uri ?: ''; ?>" autocomplete="off">

        </section>

        <section class="editor-form__section">

            <label for="description">Описание статьи (обязательно)</label>
            <textarea class="editor-form__important-filed input" name="description" required rows="5"><?= $article->description ?: ''; ?></textarea>

        </section>

        <section class="editor-form__section">

            <label for="coauthor">Выбрать соавтора</label>
            <select name="coauthor">
                <option value="" <?= !$selected_coauthor ? 'selected' : ''; ?>>Не выбрано</option>
                <? if ($coauthors): ?>
                    <? foreach ($coauthors as $coauthor): ?>
                        <?
                            $isAdmin = $coauthor->isAdmin;

                            $notAuthor = false;

                            /** For published articles */
                            if ($article->id) {
                                $notAuthor = $coauthor->id !== $article->user_id;
                            /** For new articles */
                            } else {
                                $notAuthor = $coauthor->id !== $current_user->id;
                            }

                           $isSelected = $coauthor->id == $selected_coauthor ? 'selected' : '';
                        ?>
                        <? if ($notAuthor && $isAdmin): ?>
                            <option value="<?= $coauthor->id ?>" <?= $isSelected; ?>>
                                <?= $coauthor->name ?>
                            </option>
                        <? endif; ?>
                    <? endforeach; ?>
                <? endif; ?>
            </select>

        </section>

        <? if (!empty($article->dt_create)): ?>
        <section class="editor-form__section">

            <label for="linked_article">Выберите версию статьи на другом языке</label>
            <select name="linked_article">
                <option value="" <?= !$article->linked_article ? 'selected' : '' ?>>Статья не выбрана</option>
                <? foreach ($linked_articles as $linked_article): ?>
                    <?
                       $isSelected = $article->linked_article == $linked_article->id ? 'selected' : '';
                       $notSelfArticle = $linked_article->id !== $article->id;
                       $differentLang = $linked_article->lang !== $article->lang;
                    ?>
                    <? if ($notSelfArticle && $differentLang): ?>
                        <option value="<?= $linked_article->id; ?>"<?= $isSelected ?>>
                            <?= $linked_article->title ?>
                        </option>
                    <? endif; ?>
                <? endforeach; ?>
            </select>

        </section>
        <? endif; ?>

        <section class="editor-form__section article-lang__section">

            <label for="lang">Выберите язык статьи</label>

            <? foreach ($languages as $language): ?>
                <? $isChecked = $language == $article->lang ? 'checked' : ''; ?>
                <input type="radio" value="<?= $language ?>" name="lang" class="article-lang__radio" <?= $isChecked ?>> <?= $language ?>
            <? endforeach; ?>

        </section>

        <section class="editor-form__section">
            <label for="cover">URL обложки статьи</label>
            <input class="input" type="text" name="cover" value="<?= $article->cover ?: ''; ?>" autocomplete="off">
        </section>

        <section class="editor-form__section">
            <input type="checkbox" id="is_big_cover" name="is_big_cover" value="1" <?= $article->is_big_cover ? 'checked' : ''; ?> >
            <label class="label--on-same-line" for="is_big_cover">Большая обложка</label>
        </section>

        <section class="editor-form__section">

            <label for="quiz_id">Выберите тест, который относится к статье</label>
            <select name="quiz_id">
                <option value="0">Тест не выбран</option>
                <? if ($quizzes): ?>
                    <? foreach ($quizzes as $quiz): ?>
                        <option value="<?= $quiz['id']; ?>" <?= $quiz['id'] == $article->quiz_id?'selected':''; ?>>
                            <?= $quiz['title']; ?>
                        </option>
                    <? endforeach; ?>
                <? endif; ?>
            </select>

        </section>

        <section class="editor-form__section">

            <label for="courses_id">Выберите курс, к которому относится статья</label>
            <select name="courses_ids[]" multiple>
                <option value="0">
                    Не выбран
                </option>
                <? foreach ($courses as $course): ?>
                    <? $is_selected = is_array($selected_courses)?in_array($course['id'], $selected_courses):false; ?>
                    <option value="<?= $course['id']; ?>" <?= $is_selected?'selected':''; ?>>
                        <?= $course['name']; ?>
                    </option>
                <? endforeach; ?>
            </select>

        </section>

        <section class="editor-form__section">

            <label for="item_below_key">Выводить над (в списке первые 5 элементов фида, если не выбрать, статья останется на своем месте)</label>
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
            <input type="checkbox" id="is_published" name="is_published" value="1" <?= $article->is_published ? 'checked' : ''; ?> >
            <label for="is_published" class="label--on-same-line">Опубликовать</label>
        </section>

        <section class="editor-form__section">
            <input type="checkbox" id="marked" name="marked" value="1" <?= $article->marked ? 'checked' : ''; ?> >
            <label for="marked" class="label--on-same-line">Отметить как важную</label>
        </section>

        <section class="editor-form__section">
            <input type="checkbox" id="is_recent" name="is_recent" value="1" <?= $article->is_recent ? 'checked' : ''; ?> >
            <label for="is_recent" class="label--on-same-line">Вывести на главной</label>
        </section>


        <span id="submitButton" class="button button--master" style="margin: 40px 139px 40px">Отправить</span>
    </form>
</div>
