<div class="join-page">
    <? if (!empty($success)): ?>
        <div class="join-page__success">
            <h2>Спасибо!</h2>
            <p>Мы получили вашу заявку. Набор продлится приблизительно две недели, после чего мы свяжемся с вами. А пока подписывайтесь на нашу <a href="https://vk.com/codex_team">группу ВКонтакте</a> и следите за новостями. </p>
        </div>
    <? endif ?>

    <div class="join-page__content center_side clearfix">

        <div class="join-page__left">

            <div class="codex-logo show-in-mobile"></div>

            <p>
                CodeX — это новый клуб в НИУ ИТМО, объединяющий студентов, интересующихся веб-разработкой, дизайном и изучением новых технологий на практике.
            </p>
            <p>
                Наша цель — собрать команду, способную создавать и запускать полноценные проекты в интернете.
            </p>

            <h3>
                Кого мы ищем
            </h3>

            <p>
                Приглашаем студентов ИТМО, которые интересуются и занимаются клиентской или серверной веб-разработкой, созданием мобильных приложений, дизайном. Вместе мы будем учиться работать в команде над реальными проектами.
            </p>

            <h3>
                Требования
            </h3>

            <p>
                Мы не будем изучать основы веб-разработки или дизайна. Мы будем учиться писать профессиональный и крутой код, создавать качественные проекты на достойном уровне.
            </p>
            <p>
                Поэтому первое и основное требование для вступающих в команду — <b>наличие навыков</b> в веб-разработке или дизайне.
            </p>
            <p>
                На собраниях мы будем обсуждать идеи, рассказывать о своих разработках, брэйнштормить, пить кофе, писать код и делиться опытом. Но основная часть работы каждого члена команды будет делаться самостоятельно и на полном энтузиазме. Поэтому второе и не менее важное требование — <b>быть готовым к большому количеству самостоятельной работы и экспериментов</b>.
            </p>
            <p>
                Для вступления в клуб авторизуйтесь через ВКонтакте или оставьте email адрес, по которому с вами можно будет связаться. А еще заполните небольшую анкету о себе.
            </p>

        </div>

        <div class="join-page__right">

            <div class="codex-logo mobile-hide"></div>

            <? if ( !$request ): ?>
                <form class="join-page__form" id="joinBlank" method="post" action="/join">

                    <input type="hidden" name="csrf" value="<?= Security::token() ?>">

                    <? if (!empty($error)): ?>
                        <div class="join-page__error">
                            Авторизуйтесь или укажите почту, чтобы мы могли с вами связаться.
                        </div>
                    <? endif ?>

                    <? if ($user->id): ?>

                        <div class="join-page__user">
                            <img class="join-page__user-photo" src="//ifmo.su/<?= $user->photo ?>" alt="<?= $user->name ?>"/>
                            <span class="join-page__user-name"><?= $user->name ?></span>
                        </div>

                    <? else: ?>

                        <div class="join-page__auth" id="js-join-auth">
                            <a class="button vk_button" href="/auth/vk"><i class="icon-vkontakte"></i>Авторизоваться</a>
                            <span class="additional">или ввести <u class="pointer" id="blankShowAdditionalFieldsButton">почту</u></span>
                        </div>

                    <? endif ?>

                    <div class="hide" id="blankAdditionalFields">
                        <label for="name">
                            Имя и Фамилия
                        </label>
                        <input class="input" type="text" name="name" id="name" value="<?= Arr::get($_POST, 'name') ?>">
                        <label for="js-email">
                            Email
                        </label>
                        <input class="input" type="email" name="email" id="js-email" autocomplete="off">
                    </div>

                    <label for="skills">Расскажите о своих навыках и опыте</label>
                    <textarea class="input" name="skills" id="skills" rows="5" required=""><?= Arr::get($_POST, 'skills') ?></textarea>

                    <label for="wishes">Чем бы вам хотелось заниматься в клубе?</label>
                    <textarea class="input" name="wishes" id="wishes" rows="5"><?= Arr::get($_POST, 'wishes') ?></textarea>

                    <input class="button button--master" type="submit" id="blankSendButton" value="Отправить" />

                </form>

            <? else: ?>

                <? $lastRequest = array_pop($request); ?>

                <h4>Заявка отправлена</h4>

                <? if (!empty($lastRequest['skills'])): ?>

                    <h5>Навыки</h5>
                    <p><?= $lastRequest['skills'] ?></p>

                <? endif ?>

                <? if (!empty($lastRequest['wishes'])): ?>

                    <h5>Пожелания</h5>
                    <p><?= $lastRequest['wishes'] ?></p>

                <? endif ?>

                <div class="join-page__success join-page__success--compact">
                    По окончании набора мы с вами свяжемся
                </div>

            <? endif ; ?>

            <script type="text/javascript">
                codex.docReady(function () {
                    codex.join.init();
                });
            </script>

        </div>
    </div>
</div>
