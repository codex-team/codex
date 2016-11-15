<div class="center_side">

        <section class="test_main" id="test_main">

            <div class="question_header" id="question_header">

                <p class="question_title" id="title"><?= $test->title; ?></p>
                <p class="question_description" id="description"><?= $test->description;?></p>
                <hr class="progressbar_front invisible" id="bar_front">
                <hr class="progressbar_background invisible" id="bar_back">

            </div>

            <div class="question_options invisible" id="options"></div>

            <a href="/tests"><input class="test_button" type="button" value="Назад" id="back_button"></a>

            <input class="test_button attention right_button" type="button" value="Пройти" id="pass_button">

            <input class="test_button invisible attention" type="button" value="Ответить" id="answer_button">

            <div class="center_side invisible" id="share">

                <div class="sharing">

                    <span class="but tg fl_r" data-share-type="telegram" title="Forward in Telegram"><i class="icon-paper-plane"></i></span>
                    <span class="but tw fl_r" data-share-type="twitter" title="Tweet"><i class="icon-twitter"></i></span>
                    <span class="but fb fl_r" data-share-type="facebook" title="Share on the Facebook"><i class="icon-facebook-squared"></i></span>

                    <span class="main_but pointer vk fl_r" data-share-type="vkontakte"><i class="icon-vkontakte"></i> Поделиться</span>
                    Поделитесь результатом

                </div>

            </div>
        </section>

        <script src="/public/js/test.js"></script>
        <script>
            window.test = new Test(<?= json_encode($test); ?>);
        </script>
</div>