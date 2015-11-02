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
              if ($current_commentary['answer'] == 0) {
                  echo "<a href='/article/delcomment/" . $current_commentary['id'] . "'>[удалить]</a>
                      <a onclick='document.getElementById(`answer_to_comment`).value=" . $current_commentary['id'] . ";
                                  document.getElementById(`answer_username`).innerHTML=`Ваш ответ на комментарий
                                  пользователя ". $current_commentary['name'] .": <i>".$current_commentary['comment']."</i>`;'>[Ответить]</a>
                      <b>" . $current_commentary['name'] . "</b>: " . $current_commentary['comment'];

                  foreach($subcomments as $subcomment):
                      if ($current_commentary['id'] == $subcomment['answer']){
                          echo "<div style='margin: 0px 77px'>";
                          echo "<a href='/article/delcomment/" . $subcomment['id'] . "'>[удалить]</a>
                                <b>" . $subcomment['name'] . "</b>: " . $subcomment['comment'];
                          echo "</div>";
                      }
                  endforeach;

                  echo "</p>";
              }
            endforeach;
        }
    ?>

    <p>
        <h3 id="answer_username">Выскажи свое мнение</h3>
        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="id" value="<?= $article['id'] ?>" />
            <input type="hidden" name="answer" value="NULL" id="answer_to_comment"/>
            <label for="blankNameInput">Ваше имя</label>
            <input type="text" name="name" id="blankNameInput" />
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="comment" id="blankCommentTextarea"  required></textarea>
            <p><button class="master" id="blankSendButton">Добавить комментарий</button></p>
        </form>
    </p>

  </article>
</div>