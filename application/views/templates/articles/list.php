<div class="center_side clear">

    <div class="page_header">
        <h1>Статьи команды CodeX</h1>
        <div class="description">
            Здесь собраны наши заметки о приобретенном опыте и результатах наших экспериментов. А еще так мы учимся писать интересные и грамотные тексты.
        </div>
    </div>

    <div class="blog">
        <? for ( $i=1; $i<5; $i++ ): ?>
            <article class="article">
                <div class="fl_r info">
                    <div class="author clearfix">
                        <div class="ava fl_l">
                            <img src="" alt="" />
                        </div>
                        <div class="constrain">
                            <div class="name">User Name</div>
                            <a class="nick" href="">@nickname</a>
                        </div>
                    </div>
                </div>
                <h2 class="title"><a href="">12 понятий и команд, которые вам необходимо усвоить для работы с Git</a></h2>
                <div class="counters">
                    <time class="item">12 dec</time>
                    <a class="item" href="">Comment</a>
                </div>
            </article>
        <? endfor; ?>
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


