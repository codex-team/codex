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
        <p>
            <?=
                    _("CodeX is a new team based in ITMO University, unifying students and graduates interested in web-development, design and studying new technologies in practice.");
            ?>
        </p>
        <p><?= _('Our goal — make team with fire in eyes and idealistic tempers.') ?></p>

        <? /** Join button */ ?>
        <? /* <br><a class="button button--green index-page__join-button" href="/join">Вступить в клуб</a> */ ?>

        <?
            /** News list */
            include 'news.php';
        ?>

        <?
            /** Best developers block */
            include 'developers.php';
        ?>

        <?
            /** Articles section */
            include 'articles.php';
        ?>

        <?
            /** Projects section */
            include 'products.php';
        ?>

        <?
            /** Projects section */
            include 'follow.php';
        ?>

        <?
            /** Thanks */
            include 'thanks.php';
        ?>

    </div>
</div>
