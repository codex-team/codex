<div class="center_side clear">

 <? /*
  <article class="article">
    <h1>Добавить статью</h1>
     <p>
      <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" value="<?
          if (isset($table_values['title']['value'])){
              echo $table_values['title']['value'];
          }
          ?>"/>
 */ ?>

    <article class="article">

        <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">

            <input class="article_form_header" type="text" name="title" id="blankNameInput" value="Greatest article"/>

            <? /*

                <label for="blankNameInput">Описание</label>
                <textarea name="description" id="blankCommentTextarea"  required></textarea>

                <label for="blankNameInput">Обложка</label>
                <input type="file" name="cover" id="blankNameInput" />
            */?>

            <? /** Todo: Editor should be initialized by <script> handler for visible textarea */
                 include "editor.php"
            ?>
            <textarea class="hidden" name="text" id="html_result"></textarea>

            <div class="article_form_buttons">

                <button class="button master" id="save_article">Опубликовать</button>
                <button class="button" id="save_draft">Сохранить черновик</button>

            </div>

        </form>
    </article>
</div>


