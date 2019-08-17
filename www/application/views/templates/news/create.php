<div class="center_side clear">
    <form name="codex_news" data-module="newsCreate">
        <textarea name="module-settings" hidden>
            {
                "submit_id" : "submitButton",
                "form_url" : "save"
            }
        </textarea>
        <input type="hidden" name="csrf" value="<?= Security::token() ?>" />
        <section>
            <label for="ru_text">In Russian</label>
            <textarea id="ru_text" name="ru_text" required></textarea>
        </section>
        <section>
            <label for="en_text">In English</label>
            <textarea id="en_text" name="en_text" required></textarea>
        </section>
        <section>
            <label for="is_release">Is release</label>
            <input type="checkbox" id="is_release" name="is_release" value="1">
        </section>
        <span id="submitButton" class="button">Create news</span>
    </form>
</div>
