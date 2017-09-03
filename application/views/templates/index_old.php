<?
    /** New Year Landing */
    //include 'landings/new_year.php';
?>
<?
    /** Joining meetup */
    // include 'landings/meetup.php';
    // include 'landings/masterclass.php';
?>
<div class="index-page">
    <div class="center_side">


        <?
            /**
            * Contests promotion
            */
            /*
            <div class="contest_alert">
                <a href="/contest/2">конкурс на создание ui kit »</a>
                <div class="line"></div>
            </div>
            */
        ?>



        <div class="codex-logo"></div>
        <p>CodeX — это новый клуб в НИУ ИТМО, объединяющий студентов, интересующихся веб-разработкой, дизайном и изучением новых технологий на практике.</p>
        <p>Наша цель — собрать команду молодых специалистов с горящими глазами и идеалистическим настроем.</p>

        <?
            /** News list */
            include 'news.php';
        ?>

        <? /** Join button */ ?>
           <br><a class="button button--green index-page__join-button" href="/join">Вступить в клуб</a>
        <? ?>

        <?
            /** Best developers block */
            include 'developers.php';
        ?>

    </div>
</div>
