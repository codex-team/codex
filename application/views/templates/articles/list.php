<div class="center_side clear">

    <div class="page_header">
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
                <h2 class="title"><a href="/articles/show/<?= $article->id ?>"><?= $article->title ?></a></h2>
                <div class="counters">
                    <time class="item"><?= date_format(date_create($article->dt_create), 'd M'); ?></time>
                    <a class="item" href="/articles/show/<?= $article->id ?>">
                        <?= $article->commentsCount ?>
                        Comment<? if ($article->commentsCount != 1){ echo 's'; } ?>
                    </a>
                </div>
            </article>
        <? endforeach; ?>
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


