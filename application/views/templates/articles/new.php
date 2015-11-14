<div class="center_side clear">
  <article class="article">
    <h1>Добавить статью</h1>
     <p>
      <form method="POST" action="/article/addarticle" enctype="multipart/form-data">
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" value="<?
          if (isset($table_values['title']['value'])){
              echo $table_values['title']['value'];
          }
          ?>"/>
          <label for="blankNameInput">Описание</label>
          <textarea name="description" id="blankCommentTextarea"  required><?
              if (isset($table_values['description']['value'])){
                  echo $table_values['description']['value'];
          }
              ?></textarea>
          <label for="blankCommentTextarea">Содержание</label>
          <textarea name="text" id="blankCommentTextarea"  required><?
              if (isset($table_values['text']['value'])){
                  echo $table_values['text']['value'];
          }
              ?></textarea>
          <label for="blankNameInput">Обложка</label>
          <input type="file" name="cover" id="blankNameInput" />
          <p><button class="master" id="blankSendButton">Добавить</button></p>
      </form>
     </p>
  </article>
</div>