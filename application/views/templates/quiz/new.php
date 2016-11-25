<link type="text/css" href="/public/css/quizNew.css" rel="stylesheet" />

<div class="center_side clear">
    <article class="article">

        <h1 class="article__title">Создание теста</h1>

        <form id="quizForm" name="quizForm" action="/quiz/save" method="GET">

            <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />
            <input type="text" name="quiz.name" placeholder="Название теста" />
            <textarea name="quiz.description" placeholder="Описание теста"></textarea>

            <button id="nextBlock">Следующий блок</button>

        </form>

    </article>
</div>

<script src="/public/js/quizNew.js?v=<?= filemtime("public/js/quizNew.js") ?>"></script>
