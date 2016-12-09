<link type="text/css" href="/public/css/quizForm.css?v=<?= filemtime("public/css/quizForm.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" name="quizForm" action="/quiz/add" method="POST">

        <button class="button" type="submit">Сохранить тест</button>

        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />
        <input type="hidden" name="quiz_id" value="<?=  $quiz->id ?>" />

        <input class="quiz-form__quiz-title" type="text" name="title" placeholder="Название теста" required/>
        <textarea class="quiz-form__quiz-description" name="description" placeholder="Описание теста"></textarea>

        <a id="insertMessage">Добавить сообщение</a>

        <button class="button" type="button" id="insertQuestion">Добавить вопрос</button>

    </form>
</div>

<script type="text/javascript" src="/public/js/quizForm.js?v=<?= filemtime("public/js/quizForm.js") ?>"></script>
