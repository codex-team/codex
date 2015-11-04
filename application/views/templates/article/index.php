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
    $comment_level = [];
    foreach($comments as $current_commentary):

        foreach($comment_level as $current_comment_level):
            if ($current_comment_level > $current_commentary['answer']) {
                array_pop($comment_level);
            }
        endforeach;

        $level = count($comment_level) * 39;
        $comment_level[] = $current_commentary['id'];

        echo "<div style='margin: 0px ".$level."px'>";

        echo "<p>";

        // delete button
        #echo "<a href='/article/delcomment/" . $current_commentary['id'] . "'>[удалить]</a>
        #                <a onclick='document.getElementById(`answer_to_comment`).value=" . $current_commentary['id'] . ";
        #                 document.getElementById(`blankCommentTextarea`).innerHTML=`".$current_commentary['name'].", `;
        #                  document.getElementById(`answer_username`).innerHTML=`Ваш ответ на комментарий
        #                          пользователя ". $current_commentary['name'] .": <i>".$current_commentary['comment']."</i>`;'>[ответить]</a>
        #      <b>" . $current_commentary['name'] . "</b>: " . $current_commentary['comment'];

        echo "<a onclick='document.getElementById(`answer_to_comment`).value=" . $current_commentary['id'] . ";
                         document.getElementById(`blankCommentTextarea`).innerHTML=`".$current_commentary['name'].", `;
                          document.getElementById(`answer_username`).innerHTML=`Ваш ответ на комментарий
                                  пользователя ". $current_commentary['name'] .": <i>".$current_commentary['comment']."</i>`;'>[ответить]</a>
              <b>" . $current_commentary['name'] . "</b>: " . $current_commentary['comment'];

        // debug info
        #echo "(".$current_commentary['id'].", ".$current_commentary['answer'].")";

        echo "</p>";

        echo "</div>";
    endforeach;
    ?>

    <p>
        <h3 id="answer_username">Выскажи свое мнение</h3>
        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="id" value="<?= $article['id'] ?>" />
            <input type="hidden" name="answer" value="0" id="answer_to_comment"/>
            <label for="blankNameInput">Ваше имя</label>
            <input type="text" name="name" id="blankNameInput" />
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="comment" id="blankCommentTextarea"  required></textarea>
            <p><button class="master" id="blankSendButton">Добавить комментарий</button></p>
        </form>
    </p>

  </article>
</div>