<div class="center_side clear">
  <article class="article">
    <h1>Добавить статью</h1>
     <p>
         <? if (isset($table_values)){ ?>
             <span style="color:red">Пожалуйста, заполните все поля формы</span>
         <? } ?>
      <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" value="<?
          if (isset($table_values['title']['value'])){
              echo $table_values['title']['value'];
          }
          ?>"/>

          <br>
          <br>
        <div>
            <label for="blankNameInput">Описание</label>
          <textarea name="description" id="blankCommentTextarea"  required><?
              if (isset($table_values['description']['value'])){
                  echo $table_values['description']['value'];
              }
              ?></textarea>
        </div>

          <br>
        <div>
            <label for="blankNameInput">
                Обложка
            </label>
            <input type="file" name="cover" id="blankNameInput" />
            <? if (isset($table_values['cover']) && $table_values['cover'] == true){ ?>
                <span style="color:red">Допускается PNG или JPEG файл объемом до 10MB</span>
            <? } ?>
        </div>
          <br>

          <label for="blankCommentTextarea">Содержание</label>

          <?=$editor;?>


          <textarea class="hidden" name="text" id="html_result"></textarea>

          <p><button class="master" id="save_article">Добавить</button></p>
      </form>
     </p>
  </article>
</div>


