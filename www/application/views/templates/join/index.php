<div class="join-page">
    <? if (true || !empty($success)): ?>
        <div class="join-page__success">
            <div class="join-page__success-inner">
                <h2>Спасибо!</h2>
                <p>Мы получили вашу заявку. Набор продлится приблизительно две недели, после чего мы свяжемся с вами. А пока подписывайтесь на нашу <a href="https://vk.com/codex_team">группу ВКонтакте</a> и следите за новостями. </p>
            </div>
        </div>
    <? endif ?>

    <div class="join-page__logo">
        <? include(DOCROOT . 'public/app/img/codex-logo.svg'); ?>
    </div>

    <div class="join-page__content center_side clearfix">
        <h1>
            Набор в команду
        </h1>
        <p>
            CodeX — это новый клуб в Университете ИТМО, объединяющий студентов, интересующихся веб-разработкой, дизайном и изучением новых технологий на практике.
        </p>
        <p>
            Мы занимаемся созданием и запуском полноценных продуктов в интернете на всех уровнях. Раз в год мы открываем набор в команду.
        </p>
        <h2>
            Кого мы ищем
        </h2>
        <p>
            Будем рады познакомиться, если вы хотите развиваться в одной из следующих областях. Или сразу во всех.
        </p>
        <ul>
            <li>
                Веб-разработка (Frontend, Backend, DevOps)
            </li>
            <li>
                Мобильная разработка
            </li>
            <li>
                Проектирование и дизайн
            </li>
            <li>
                Тестирование и контроль качества
            </li>
            <li>
                Маркетинг, пиар
            </li>
        </ul>
        <h2>
            Требования
        </h2>
        <p>
            Мы не занимаемся изучением основ. Все обучение проходит самостоятельно, а в команде мы развиваем полученные навыки в боевых задачах. Отсюда первое требование:
        </p>
        <ul>
            <li>
                Наличие начальных навыков
            </li>
        </ul>
        <p>
            Мы работаем очень много, а спим очень мало. Это непросто, поэтому второе требование:
        </p>
        <ul>
            <li>
                Быть готовым к большому количеству ежедневной  самостоятельной работы
            </li>
        </ul>
        <p>
            Ключевой фактор — ваш энтузиазм. Взамен вы получите гигантское количество опыта и новых навыков, интересные и сложные задачи, возможность поучаствовать в создании и запуске проектов на мировом рынке.
        </p>
        <p>
            Для подачи заявки на вступление, авторизуйтесь через VK или почту, через которые можно будет с вами связаться. И заполните небольшую анкету.
        </p>

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
                        <img class="join-page__user-photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>"/>
                        <span class="join-page__user-name"><?= $user->name ?></span>
                    </div>

                <? else: ?>

                    <div class="join-page__auth" id="js-join-auth">
                        <a class="join-page__auth-vk-button" href="/auth/vk">
                            <? include(DOCROOT . 'public/app/img/vk-logo.svg'); ?>
                            Авторизоваться
                        </a>
                        или
                        <span class="join-page__auth-show-email" id="blankShowAdditionalFieldsButton">
                            ввести почту
                        </span>
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
