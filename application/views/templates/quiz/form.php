<link type="text/css" href="/public/css/quizForm.css?v=<?= filemtime("public/css/quizForm.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" name="quizForm" action="" method="POST">

        <input class="protected" type="hidden" name="quiz_id" value="<?= $quiz->id ?>" />
        <input class="protected" type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />

        <button class="button quiz-form__button-submit" type="submit">Сохранить тест</button>

        <input class="quiz-form__quiz-title protected" type="text" name="title" placeholder="Название теста" required/>
        <textarea class="quiz-form__quiz-description protected" name="description" placeholder="Описание теста"></textarea>

        <button class="button" type="button" id="resultMessageInsertButton">Добавить сообщение</button>

        <button class="button" type="button" id="questionInsertButton">Добавить вопрос</button>

        <textarea class="quiz-form__share-message" name="shareMessage" placeholder="Сообщение при экспорте результатов в соцсети"></textarea>

    </form>
</div>

<script type="text/javascript" src="/public/js/quizForm.js?v=<?= filemtime("public/js/quizForm.js") ?>"></script>
<script>
    quizForm.init(<?= $quiz->quiz_data; ?>);
</script>