<div class="center_side clear">

    <div class="page_header clearfix">

        <div class="follow_us fl_r">
            Мы завели канал в Телеграме, где будем анонсировать новые статьи, конкурсы, наши новости и инсайды. Подписывайтесь!<br />
            <a href="//telegram.me/codex_team" target="_blank"><i class="icon_telegram"></i><span>CodeX on Telegram</span></a>
        </div>

        <h1>Статьи команды CodeX</h1>
        <div class="description">
            Здесь собраны наши заметки о приобретенном опыте и результатах наших экспериментов. А еще так мы учимся писать интересные и грамотные тексты.
        </div>
    </div>

    <div class="blog">
        <? foreach ($articles as $article): ?>
            <article class="article">
                <div class="fl_r info">
                    <div class="author clearfix">
                        <div class="ava fl_l">
                            <img src="<?= $article->author->photo ?>" alt="" />
                        </div>
                        <div class="constrain">
                            <div class="name"><?= $article->author->name ?></div>
                            <a class="nick" href="/user/<?= $article->author->id ?>">
                                @<?= $article->author->github_uri ?>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="counters">
                    <time class="item"><?= date_format(date_create($article->dt_create), 'd M'); ?></time>
                    <? /*<a class="item" href="/article/<?= $article->id ?>">
                        <?= $article->commentsCount ?>
                        Comment<? if ($article->commentsCount != 1){ echo 's'; } ?>
                    </a >*/?>
                </div>
                <h2 class="title"><a href="<?= $article->uri ?>"><?= $article->title ?></a></h2>
            </article>
        <? endforeach; ?>
    </div>

</div>