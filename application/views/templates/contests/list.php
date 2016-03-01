<div class="center_side clear">

    <div class="page_header">
        <h1>Конкурсы команды CodeX</h1>
        <div class="description">
            Чтобы развлечься и попрактиковаться в новых областях, мы проводим небольшие конкурсы, в которых каждый может продемонстрировать свой творческий потенциал, соревнуясь за небольшие презенты.
        </div>
    </div>
    
    <div class="blog">

        <div class="contests-list">

            <div class="contests-lead--lable">
                <div class="contests-lead--text">Now</div>
            </div>

            

            <? foreach ($contests['opened'] as $contest): ?>

                <div class="contests-item">
                    <div class="contests-item--date">
                        <?= date_format(date_create($contest->dt_create), 'd M'); ?><br>—<br><?= date_format(date_create($contest->dt_close), 'd M'); ?>
                    </div>
                    <div class="contests-item--icon">
                        <img src="//placehold.it/60x60?text=icon" alt="">
                    </div>
                    <div class="contests-item--info">
                        <h2 class="contests-item--title">
                            <a href="/contest/<?= $contest->id ?>" class="contests-item--title-link"><?= $contest->title; ?></a>
                        </h2>
                        <div class="contests-item--description">Описание</div>
                    </div>
                </div>

            <? endforeach; ?>

            <div class="contests-lead--lable">
                <div class="contests-lead--text">Past</div>
            </div>

            <? foreach ($contests['closed'] as $contest): ?>

                <div class="contests-item">
                    <div class="contests-item--date">
                        <?= date_format(date_create($contest->dt_create), 'd M'); ?><br>—<br><?= date_format(date_create($contest->dt_close), 'd M'); ?>
                    </div>
                    <div class="contests-item--icon">
                        <img src="//placehold.it/60x60?text=icon" alt="">
                    </div>
                    <div class="contests-item--info">
                        <h2 class="contests-item--title">
                            <a href="/contest/<?= $contest->id ?>" class="contests-item--title-link"><?= $contest->title; ?></a>
                        </h2>
                        <div class="contests-item--description">Описание</div>
                    </div>
                </div>

            <? endforeach; ?>

        </div>
        
    </div>

</div>
<? /*

    <? foreach ($articles as $current_article): ?>
        <article class="article">

            <div class="article_image">
                <img src="/upload/covers/<?= $current_article->cover ?>"
                         alt="<?= $current_article->title ?>"
                         title="<?= $current_article->title ?>"/>
            </div>

            <div>
                <h2 class="articleTitle"><?= $current_article->title ?></h2>

                <p>
                    <?= $current_article->description ?>
                </p>
            </div>

            <div class="article_footer article_underscore">
                <a href="/article/<?= $current_article->id ?>" class="read_more">Читать дальше</a>

                <p class="article_tags">
                    <a href='/article/delarticle/<?= $current_article->id ?>'>Удалить</a>
                </p>
            </div>
        </article>
    <? endforeach; ?>

    <? if (count($articles) == 0): ?>
        <article class="article">
            <p>Здесь пока нет ничего =(</p>

            <p>Вы можете стать первым.</p>

            <p><a href="/article/newarticle">Добавить статью</a></p>
        </article>
    <? endif; ?>

    */?>


