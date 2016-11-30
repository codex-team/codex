<link type="text/css" href="/public/css/quizNew.css" rel="stylesheet" />

<div class="center_side clear">
    <article class="article">

        <form id="quizForm" name="quizForm" action="/quiz/save" method="POST">

            <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />
            <input type="text" name="quiz_name" placeholder="Название теста" />
            <textarea name="quiz_description" placeholder="Описание теста"></textarea>

            <input type="submit" value="Создать тест" for="quizForm" class="article__button" />

            <div id="anchor"></div>

            <button type="button" id="insertBlock" class="article__button">Добавить вопрос</button>

        </form>

    </article>
</div>

<script src="/public/js/quizNew.js?v=<?= filemtime("public/js/quizNew.js") ?>"></script>
