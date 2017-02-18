<link type="text/css" href="/public/css/quizForm.css?v=<?= filemtime("public/css/quizForm.css") ?>" rel="stylesheet" />

<div class="center_side clear">
    <form class="quiz-form" name="quizForm" method="POST">
        <input type="hidden" name="quiz_id" value="<?= $quiz->id ?>" />
        <input type="hidden" name="csrf_token" value="<?= Security::token(); ?>" />

        <h1 class="quiz-form__page-title"><? if ($quiz->id): ?>Редактирование<? else: ?>Создание<? endif; ?> теста</h1>

        <label class="quiz-form__label quiz-form__quiz-title-label">Название теста</label>
        <input class="quiz-form__quiz-title" type="text" name="title" placeholder="Введите название теста" required/>

        <label class="quiz-form__label quiz-form__quiz-description-label">Описание теста</label>
        <textarea class="quiz-form__quiz-description" name="description" placeholder="Введите описание теста"></textarea>

        <a id="questionInsertAnchor" style="display:none;"></a>

        <button class="quiz-form__add-question-button button master" type="button" id="questionInsertButton">Добавить вопрос</button>

        <table class="quiz-form__messages">
            <thead class="quiz-form__messages-head">
                <th class="quiz-form__label quiz-form__message-message-label">Сообщения результатов теста</th>
                <th class="quiz-form__label quiz-form__message-score-label">Порог</th>
                <th class="quiz-form__label quiz-form__share-message-label">Сообщение для экспорта в соцсети</th>
            </thead>
            <tr>
                <td class="quiz-form__messages-holder-column" colspan="2">
                    <table class="quiz-form__messages-holder">
                        <tbody id="resultMessagesHolder">
                            <tr id="resultMessageInsertAnchor">
                                <td class="quiz-form__add-message-button-column">
                                    <button class="quiz-form__add-message-button button" type="button" id="resultMessageInsertButton">Добавить сообщение</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                <td class="quiz-form__share-message-column">
                    <textarea class="quiz-form__share-message" name="shareMessage" form="null" placeholder="Введите сообщение (для вставки в сообщение количества набранных баллов используйте переменную $score)"></textarea>
                </td>
            </tr>
        </table>

        <div class="quiz-form__quiz-buttons-holder">
            <button class="button master quiz-form__button-submit" type="submit" formaction="/quiz/<?= $quiz->id ? "$quiz->id" + '/' : '' ?>save">Сохранить тест</button>
            <? if ($quiz->id): ?><button class="button quiz-form__button-delete" type="submit" formaction="<?= $quiz->id ?>">Удалить тест</button><? endif; ?>
        </div>
    </form>
</div>

<script type="text/javascript" src="/public/js/quizForm.js?v=<?= filemtime("public/js/quizForm.js") ?>"></script>
<script>quizForm.init(<?= $quiz->quiz_data; ?>);</script>
