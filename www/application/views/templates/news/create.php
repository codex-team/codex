<div class="news-create-page">
    <form class="news-create-page__form" name="codex_news" data-module="newsCreate">
        <textarea name="module-settings" hidden>
            {
                "submit_id" : "submitButton",
                "form_url" : "create"
            }
        </textarea>
        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <section>
            <label class="news-create-page__form-label" for="ru_text">In Russian</label>
            <textarea class="input news-create-page__form-input" id="ru_text" name="news_ru_text" required></textarea>
        </section>
        <section>
            <label class="news-create-page__form-label" for="en_text">In English</label>
            <textarea class="input news-create-page__form-input" id="en_text" name="news_en_text" required></textarea>
        </section>
        <section>
            <label class="news-create-page__form-label" for="type">Type</label>
            <select class="input news-create-page__form-input" id="type" name="type" required>
                <? foreach ($types as $type): ?>
                    <option value=<?= $type['value'] ?>><?= $type['name'] ?></option>
                <? endforeach; ?>
            </select>
        </section>
        <section>
            <label class="news-create-page__form-label" for="dt_display">Displayable date</label>
            <input class="input news-create-page__form-input" type="text"
                   id="dt_display" name="dt_display" placeholder="<?= $dtDisplayPlaceholder ?>">
        </section>
        <span id="submitButton" class="button">Create news</span>
    </form>
</div>
