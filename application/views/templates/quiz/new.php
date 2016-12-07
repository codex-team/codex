<link type="text/css" href="/public/css/quizNew.css?v=<?= filemtime("public/css/quizNew.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" id="quizForm" name="quizForm" action="/quiz/save" method="POST">

        <button class="button" type="submit">Создать тест</button>

        <input class="quiz-form__input-title" type="text" name="quiz_name" placeholder="Название теста" required />
        <textarea class="quiz-form__input-description" name="quiz_description" placeholder="Описание теста"></textarea>

        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />
        <input type="hidden" name="questions_length" value="1" />

        <button class="button" type="button" id="insertQuestion">Добавить вопрос</button>

    </form>
</div>

<script src="/public/js/quizNew.js?v=<?= filemtime("public/js/quizNew.js") ?>"></script>
