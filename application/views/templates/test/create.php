<div class="center_side clear">
    <article id="testCreate" class="article">

        <h1 class="big_header">Создание теста</h1>

        <input type="text" name="test.name" placeholder="Название теста" required />
        <textarea name="test.description" placeholder="Описание теста"></textarea>

        <div id="anchor"></div>

        <button id="insertBlock">Добавить вопрос</button>

        <button id="submit">Создать тест</button>

    </article>
</div>
<script src="/public/js/testCreate.js?v=<?= filemtime("public/js/testCreate.js") ?>"></script>
