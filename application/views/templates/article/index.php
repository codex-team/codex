<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
        </div>
    </div>
</div>

<div class="center_side clear">
  <article class="article">


    <h1 class="first_header">
        Статья #<?= $id ?>
        <?
            # заголовок статьи
        ?>
    </h1>

    <p>
        Содержимое статьи
        <?
            # тут все ясно
        ?>
    </p>

    <h3>Комментарии</h3>
    <?
        if (!$comments) {
            echo "<p>пусто</p>";
        } else {
            while (list($id_comment, $article, $name, $comment) = mysql_fetch_row($comments)) {
                echo "<p><b>".$name."</b>: ".$comment."</p>";
            }
        }
    ?>

    <p>
        <h3>Выскажи свое мнение</h3>
        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="id" value="<?= $id ?>" />
            <label for="blankNameInput">Ваше имя</label>
            <input type="text" name="name" id="blankNameInput" />
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="comment" id="blankCommentTextarea"  required></textarea>
            <p><button class="master" id="blankSendButton">Добавить комментарий</button></p>
        </form>
    </p>

  </article>
</div>