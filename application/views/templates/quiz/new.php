<link type="text/css" href="/public/css/quizNew.css" rel="stylesheet" />

<div class="center_side clear">
    <article class="article">

        <form id="quizForm" name="quizForm" action="/quiz/save" method="POST">

            <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />
            <input type="text" name="quiz.name" placeholder="Название теста" />
            <textarea name="quiz.description" placeholder="Описание теста"></textarea>

            <div id="anchor"></div>

        </form>

        <button id="insertBlock" class="article__button">Добавить вопрос</button>
        <input type="submit" for="quizForm" class="article__button" />

    </article>
</div>

<script src="/public/js/quizNew.js?v=<?= filemtime("public/js/quizNew.js") ?>"></script>
