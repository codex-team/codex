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
                    _('CodeX is a team of digital specialists around the world interested in building high-quality open source products on a global market. We are open for young people who want to constantly improve their skills and grow professionally with experiments in cutting-edge technologies.');
            ?>
        </p>
        

        <?
            /** Join block */
            /* include 'join.php'; */
        ?>

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
