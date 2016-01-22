<div class="center_side clear">

    <div class="page_header">
        <h1>Конкурсы команды CodeX</h1>
        <div class="description">
            Здесь собраны проводимые нами конкурсы. Приглашаем к участию, призы и новый опыт ждут вас.
        </div>
    </div>

    <div class="blog">
        <? foreach ($contests as $contest): ?>
            <div class="article">
                <?= $contest->title; ?>
            </div>
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


