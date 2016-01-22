<div class="center_side clear">
    <article class="article" itemscope itemtype="http://schema.org/Article">

        <? if (isset($contest->dt_update)) {
            echo "<meta itemprop=\"dateModified\" content=\"<?= date(DATE_ISO8601, strtotime($contest->dt_update)) ?>\" />";
        } ?>

        <meta itemprop="datePublished" content="<?= date(DATE_ISO8601, strtotime($contest->dt_create)) ?>" />

        <h1 class="big_header" itemprop="headline">
            <?= $contest->title ?>
        </h1>
        <div class="article_info">
            <div class="ava_holder" itemscope itemtype="http://schema.org/Person" itemprop="author">    
                <time><?= Date::fuzzy_span(strtotime($contest->dt_create)) ?></time>
                <span class="list_user_ava"></span>
            </div>
        </div>
        <div class="article_content"  itemprop="contestBody">
            <?= nl2br($contest->text) ?>
        </div>

    </article>
</div>
