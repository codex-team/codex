<link type="text/css" href="/public/css/quizNew.css?v=<?= filemtime("public/css/quizNew.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form id="quizForm" name="quizForm" action="/quiz/save" method="POST">

        <button type="submit" class="quiz-form__button">Создать тест</button>

        <input type="text" name="quiz_name" class="quiz-form__input-title" placeholder="Название теста" required />
        <textarea name="quiz_description" class="quiz-form__textarea-description" placeholder="Описание теста"></textarea>

        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />

        <button type="button" id="insertBlock" class="quiz-form__button">Добавить вопрос</button>

    </form>
</div>

<script src="/public/js/quizNew.js?v=<?= filemtime("public/js/quizNew.js") ?>"></script>
