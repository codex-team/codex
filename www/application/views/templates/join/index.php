<div class="join-page">
    <? if (!empty($success)): ?>
        <div class="join-page__success">
            <div class="join-page__success-inner">
                <h2>Спасибо!</h2>
                <p>Мы получили вашу заявку. Прием заявок продлится до 20 сентября, после чего мы с вами свяжемся. А пока подписывайтесь на нашу <a href="https://vk.com/codex_team">группу ВКонтакте</a> и следите за новостями. </p>
            </div>
        </div>
    <? endif ?>

    <div class="join-page__logo">
        <? include(DOCROOT . 'public/app/img/codex-logo.svg'); ?>
    </div>

    <div class="join-page__content center_side clearfix">
        <div class="read-in join-page__read-in">
            Read in
            <a class="read-in-item read-in-item--english" href="<?= "/join?lang=en" ?>">English</a>
        </div>
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
            Будем рады познакомиться, если вы хотите развиваться в одной из следующих областей. Или сразу во всех.
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

        <!--
        <section class="join-component join-component--compact">
            <div class="join-component__label">
                До окончания набора
            </div>

            <time class="join-component__time">
                <span data-time="days" class="join-component__time-item">
                    <?//= $joinTimeLeft['days_left'] ?>
                </span>
                <span class="join-component__time-delimiter"></span>
                <span data-time="hrs" class="join-component__time-item">
                    <?//= $joinTimeLeft['hours_left'] ?>
                </span>
                <span class="join-component__time-delimiter join-component__time-delimiter--blinking"></span>
                <span data-time="mins" class="join-component__time-item">
                    <?//= $joinTimeLeft['minutes_left'] ?>
                </span>
            </time>
        </section>
        -->

        <? include __DIR__ . '/../blocks/form-join.php'; ?>
    </div>
</div>
