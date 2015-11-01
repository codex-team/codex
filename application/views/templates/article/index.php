<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/article">Статьи</a>
        </div>
    </div>
</div>

<div class="center_side clear">
  <article class="article">


    <h1 class="first_header">
        <?= $article['title'] ?>
    </h1>

    <p>
        <?= $article['text'] ?>
    </p>

    <h3>Комментарии</h3>
    <?
        if (!$comments) {
            echo "<p>пусто</p>";
        } else {
            foreach($comments as $current_commentary):
                echo "<a><a href='/article/delcomment/".$current_commentary['id']."'>[удалить]</a> <b>".$current_commentary['name']."</b>: ".$current_commentary['comment']."</p>";
            endforeach;
        }
    ?>

    <p>
        <h3>Выскажи свое мнение</h3>
        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="id" value="<?= $article['id'] ?>" />
            <label for="blankNameInput">Ваше имя</label>
            <input type="text" name="name" id="blankNameInput" />
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="comment" id="blankCommentTextarea"  required></textarea>
            <p><button class="master" id="blankSendButton">Добавить комментарий</button></p>
        </form>
    </p>

  </article>
</div>