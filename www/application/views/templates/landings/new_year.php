<link rel="stylesheet" href="/public/app/landings/new-year/new-year.css?v=<?= filemtime("public/app/landings/new-year/new-year.css") ?>">
<? if ( !empty($ny_user_requests) ): ?>

    <?
        /** Show saving-success message and hide landing */
        if ( !empty($savingResult) && $savingResult ):
    ?>
        <div class="center_side p_rel">
            <div class="ny_request_saved">
                Спасибо!<br/>
                Мы получили вашу заявку.
            </div>
        </div>
    <? endif; ?>

<? else: ?>
    <div class="ny_land">
        <div class="center_side">

            <h1>Поздравляем с Новым годом!</h1>

            <p>
                С момента первого собрания CodeX прошло два месяца.
                Мы находимся на пути формирования команды молодых и увлеченных своим делом специалистов.
            </p>
            <p>
                Мы выстроили круглосуточную систему взаимопомощи и поддержки на основе GitHub, Telegram, Dropbox и собственных разработок.
                Мы работаем много, для нас важна каждая строчка кода или элемент дизайна.
                Наши главные&nbsp;принципы&nbsp;—&nbsp;качество и&nbsp;профессионализм.
            </p>

            <? /** <a class="text_link" href="/articles">Почитать о нашей деятельности</a> */ ?>

            <p>
                В даный момент мы ищем опытных веб-дизайнеров, которые хотят найти единомышленников
                 и улучшить свои навыки в реальных задачах.
            </p>

            <script>
                var nyLandToggleForm = function (event) {

                    var form = document.getElementById('nyLandingForm');

                    if ( form.className.includes('hide') ) {

                        form.className = form.className.replace('hide', '');
                        setTimeout(function() {
                            form.className = form.className.replace('pulled', '');
                        }, 20);

                    } else {
                        form.className += ' pulled hide';
                    }
                };
            </script>

            <div class="show_blank pointer" onclick="nyLandToggleForm(event)">Как вступить в клуб</div>

            <?
                $errorGiven = isset($savingResult) && !$savingResult && !empty($errorMessage);
                $formShowed = $user->id || $errorGiven;
            ?>

            <div class="form <?= !$formShowed ? 'hide pulled' : '' ?>" id="nyLandingForm">

                <? if ($errorGiven): ?>
                    <div class="error"><?= $errorMessage ?></div>
                <? endif ?>

                <span class="number">1</span>
                <p>Участие в CodeX подразумевает большое количество самостоятельной и командной работы. Вы должны быть готовы посвящать клубу значительную часть своего времени каждый день.</p>

                <span class="number">2</span>
                <p>Мы ищем дизайнеров, обладающих опытом и хорошим вкусом. Однако, для нас не менее важны ваши навыки веб-разработки: хорошее знание технологий верстки, умение программировать и знание передовых мировых сервисов.</p>

                <? if ( ! $user->id ): ?>

                    <a href="/auth/vk" class="auth">
                        <i class="icon-vkontakte"></i>
                        <div class="offer">Чтобы оставить заявку, авторизуйтесь через VK</div>
                        Так мы сможем с вами связаться
                    </a>

                <? else: ?>

                    <form action="/" method="post">

                        <input type="hidden" name="csrf" value="<?= Security::token() ?>" >

                        <label for="skills">Расскажите о своем опыте и навыках, приложите ссылки на работы</label>
                        <textarea name="skills" id="skills" rows="3" required ></textarea>

                        <label for="wishes">Чем бы вы хотели заниматься в клубе</label>
                        <textarea name="wishes" id="wishes" rows="3"></textarea>

                        <input class="button button--master" class="submit" type="submit" value="Подать заявку" />
                    </form>

                <? endif; ?>

            </div>
        </div>
    </div>
<? endif; ?>