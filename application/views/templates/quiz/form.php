<link type="text/css" href="/public/css/quizForm.css?v=<?= filemtime("public/css/quizForm.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" name="quizForm" method="POST">
        <input type="hidden" name="quiz_id" value="<?= $quiz->id ?>" />
        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />

        <h1 id="title"><? if ($quiz->id): ?>Редактирование<? else: ?>Создание<? endif; ?> теста</h1>

        <label class="quiz-form__label quiz-form__quiz-title-label">Название теста</label>
        <input class="quiz-form__quiz-title" type="text" name="title" placeholder="Введите название теста" required/>

        <label class="quiz-form__label quiz-form__quiz-description-label">Описание теста</label>
        <textarea class="quiz-form__quiz-description" name="description" placeholder="Введите описание теста"></textarea>

        <a id="questionInsertAnchor" style="display:none;"></a>

        <button class="button master" type="button" id="questionInsertButton">Добавить вопрос</button>

        <label class="quiz-form__label quiz-form__message-message-label">Сообщения результатов теста</label>
        <label class="quiz-form__label quiz-form__message-score-label">Порог</label>
        <label class="quiz-form__label quiz-form__share-message-label">Сообщение для экспорта в соцсети</label>

        <div id="resultMessagesHolder">
            <a id="resultMessageInsertAnchor" style="display:none;"></a>

            <button class="button" type="button" id="resultMessageInsertButton">Добавить сообщение</button>
        </div>

        <textarea class="quiz-form__share-message" name="shareMessage" form="null" placeholder="Введите сообщение (для вставки в сообщение количества набранных баллов используйте переменную $score)"></textarea>

        <div class="quiz-form__quiz-buttons-holder">
            <button class="button master quiz-form__button-submit" type="submit" formaction="/quiz/<?= $quiz->id ? "$quiz->id" + '/' : '' ?>save">Сохранить тест</button>
            <? if ($quiz->id): ?><button class="button quiz-form__button-delete" type="submit" formaction="<?= $quiz->id ?>">Удалить тест</button><? endif; ?>
        </div>
    </form>
</div>

<script type="text/javascript" src="/public/js/quizForm.js?v=<?= filemtime("public/js/quizForm.js") ?>"></script>
<script>quizForm.init(<?= $quiz->quiz_data; ?>);</script>
