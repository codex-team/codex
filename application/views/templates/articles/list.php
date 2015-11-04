<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
        </div>
    </div>
</div>

<div class="center_side clear">
  <article class="article">
      <h1>Список статей</h1>
      <?
            foreach($articles as $current_article):
                #echo "<p><a href='/article/delarticle/".$current_article['id']."'>[удалить]</a> <a href='/article/".$current_article['id']."'><b>".$current_article['title']."</b></a></p>";
                echo "<p><a href='/article/".$current_article['id']."'><b>".$current_article['title']."</b></a></p>";
            endforeach;
      ?>
      <p>
        <a href="/article/newarticle"><button>Добавить статью</button></a>
      </p>
  </article>
</div>