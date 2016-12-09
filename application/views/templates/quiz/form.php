<link type="text/css" href="/public/css/quizForm.css?v=<?= filemtime("public/css/quizForm.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" name="quizForm" action="/quiz/save" method="POST">

        <button class="button" type="submit">Сохранить тест</button>

        <input class="quiz-form__input-title" type="text" name="title" placeholder="Название теста" required />
        <textarea class="quiz-form__input-description" name="description" placeholder="Описание теста"></textarea>

        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />

        <a id="insertMessage">Добавить сообщение</a>

        <button class="button" type="button" id="insertQuestion">Добавить вопрос</button>

    </form>
</div>

<script src="/public/js/quizForm.js?v=<?= filemtime("public/js/quizForm.js") ?>"></script>
