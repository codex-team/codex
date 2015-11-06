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

    <img src="/public/img/covers/<?= $article['cover'] ?>" width="100%"/>

    <h1 class="first_header">
        <?= $article['title'] ?>
    </h1>

    <h2 class="first_header">
        <?= $article['description'] ?>
    </h2>

    <p>
        <?= $article['text'] ?>
    </p>
    <!--Обрабатываем строку с тегами-->
    <?php

        $tagsString = $article['tags'];

        $tagsArr = array();

        for ($i=0; $i < strlen($tagsString); $i++) { 
            if ($tagsString{$i}=="#") {
                $tempString = "";
                for ($j=$i+1; $j < strlen($tagsString) ; $j++) { 
                    $tempString .= $tagsString{$j};
                    if ($tagsString{$j}==" " || $tagsString{$j}==",") {
                        break;
                    }
                }
                $tagsArr[] = $tempString;
            }
        }
    ?>
    <!--Прекращаем обработку. Теперь у нас есть массив (tagsArr) с тегами-->
    <h4 style="display:inline; margin-right:5px">Теги:</h4>
    <?php foreach ($tagsArr as $tag): ?>
        <a href="#" style="margin-right:5px; font-style:italic;">#<?= $tag ?></a>
    <?php endforeach;?>
    

    <h5><?= $article['dt_add'] ?></h5>

    <h3>Комментарии</h3>
    <?
    $comment_level = [];
    foreach($comments as $current_commentary):

        foreach($comment_level as $current_comment_level):
            if ($current_comment_level > $current_commentary['parent_id']) {
                array_pop($comment_level);
            }
        endforeach;

        $level = count($comment_level) * 39;
        $comment_level[] = $current_commentary['id'];


        // костыли на время отсутствия регистрации на сайт
        if ($current_commentary['uid'] == 0){$username = 'Гость';}else{$username = $current_commentary['uid'];};
        // конец

        echo "<div style='margin: 0px ".$level."px'>";

        echo "<p>";

        // костыли на время...
//        echo "<a href='/article/delcomment/" . $current_commentary['id'] . "'>[удалить]</a>
//                        <a onclick='document.getElementById(`answer_to_comment`).value=" . $current_commentary['id'] . ";
//                         document.getElementById(`blankCommentTextarea`).innerHTML=`".$current_commentary['uid'].", `;
//                          document.getElementById(`answer_username`).innerHTML=`Ваш ответ на комментарий
//                                  пользователя ". $current_commentary['uid'] .": <i>".$current_commentary['text']."</i>`;'>[ответить]</a> ";
//        echo "<b>" . $current_commentary['uid'] . "</b>: " . $current_commentary['text'];
        // конец
        echo "<a href='/article/delcomment/" . $current_commentary['id'] . "'>[удалить]</a>
                        <a onclick='document.getElementById(`answer_to_comment`).value=" . $current_commentary['id'] . ";
                         document.getElementById(`blankCommentTextarea`).innerHTML=`".$username.", `;
                          document.getElementById(`answer_username`).innerHTML=`Ваш ответ на комментарий
                                  пользователя ". $username .": <i>".$current_commentary['text']."</i>`;'>[ответить]</a> ";
        echo "<b>" . $username . "</b>: " . $current_commentary['text'];

        echo "</p>";

        echo "</div>";
    endforeach;
    ?>

    <p>
        <h3 id="answer_username">Выскажи свое мнение</h3>
        <form method="POST" action="/article/addcomment">
            <input type="hidden" name="article" value="<?= $article['id'] ?>" />
            <input type="hidden" name="parent_id" value="0" id="answer_to_comment"/>
            <label for="blankNameInput">Ваше имя</label>
            <input type="text" name="uid" id="blankNameInput" value="0"/>
            <label for="blankCommentTextarea">Комментарий</label>
            <textarea name="text" id="blankCommentTextarea"  required></textarea>
            <p><button class="master" id="blankSendButton">Добавить комментарий</button></p>
        </form>
    </p>

  </article>
</div>