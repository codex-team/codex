<div class="center_side clear">
    <form name="codex_news" data-module="newsCreate">
        <textarea name="module-settings" hidden>
            {
                "submit_id" : "submitButton",
                "form_url" : "create"
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
            <label for="type">Type</label>
            <select id="type" name="type" required>
                <? foreach ($types as $type): ?>
                    <option value=<?= $type['value'] ?>><?= $type['name'] ?></option>
                <? endforeach; ?>
            </select>
        </section>
        <section>
            <label for="dt_display">Displayable date</label>
            <input type="text" id="dt_display" name="dt_display" placeholder="4 mar">
        </section>
        <span id="submitButton" class="button">Create news</span>
    </form>
</div>
