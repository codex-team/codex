<div class="site_header" xmlns="http://www.w3.org/1999/html">
    <div class="center_side">
        <div class="site_menu">
            <a href="/">Главная</a>
            <a href="/article"
                <? if ($active == 'allArticles') {
                    echo 'class="current"';
                }; ?>>
                Статьи
            </a>
            <a href="/article/newarticle"
                <? if ($active == 'newArticle') {
                    echo 'class="current"';
                }; ?>>
                Добавить статью
            </a>
        </div>
    </div>
</div>
        <?
               if (isset($search) && isset($query)){
                  if ($search == 'found') {
                    echo '<span class="searching_tab">Результаты поиска по тэгу <div class="query">'.$query.'</div></span>';
                  }
                    elseif ($search == 'not_found') {
                    echo '<span class="searching_tab not_found">Ничего не нашлось по тэгу <div class="query">'.$query.'</div></span>';
                    }
                    elseif ($search == 'library') {
                    echo '<span class="searching_tab">Облако тэгов</span>';
                    }
                }
        ?>

<?= $content ?>