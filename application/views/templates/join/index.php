<div class="center_side clearfix">
    <div class="mobile_logo_small"></div>
    <div class="left_col fl_l">
        <article>
            <p>
                CodeX — это новый клуб в НИУ ИТМО, объединяющий студентов, интересующихся веб-разработкой, дизайном и изучением новых технологий на практике.
            </p>
            <p>
                Наша цель — собрать команду, способную создавать и запускать полноценные проекты в интернете.
            </p>
            <h3>Кого мы ищем</h3>
            <p>
                Приглашаем студентов ИТМО, которые интересуются и занимаются клиентской или серверной веб-разработкой, созданием мобильных приложений, дизайном. Вместе мы будем учиться работать в команде над реальными проектами.
            </p>
            <p>
                В данный момент мы проводим набор первого состава, который станет основой команды.
            </p>
            <h3>Требования</h3>
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
        </article>
    </div>
    <div class="right_col">
        <div class="page_pic">
            <div class="logo_medium"></div>
        </div>
        <form class="blank" id="joinBlank" method="post" action="joinRequest.php">

            <div class="blank_auth" id="blankAuthBlock">
                <a class="button vk_button" href="/auth.php"><i class="icon-vkontakte"></i>Авторизоваться</a>
                <span class="additional">или ввести <u class="pointer" id="blankShowAdditionalFieldsButton">почту</u></span>
            </div>

            <div class="additional_fields hide" id="blankAdditionalFields">
                <label for="blankNameInput">Имя и Фамилия</label>
                <input type="text" name="name" id="blankNameInput">
                <label for="blankEmailInput">Email</label>
                <input type="email" name="email" id="blankEmailInput" autocomplete="off">
            </div>

            <label for="blankSkillsTextarea">Расскажите о своих навыках и опыте</label>
            <textarea name="skills" id="blankSkillsTextarea" rows="5" required=""></textarea>

            <label for="blankWishesTextarea">Чем бы вам хотелось заниматься в клубе?</label>
            <textarea name="wishes" id="blankWishesTextarea" rows="5"></textarea>

            <input type="submit" class="master" id="blankSendButton" value="Отправить" />

        </form>
    </div>
</div>