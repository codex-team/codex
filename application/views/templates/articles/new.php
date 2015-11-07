<div class="center_side clear">
  <article class="article">
    <h1>Добавить статью</h1>
     <p>
      <form method="POST" action="/article/addarticle" enctype="multipart/form-data">
          <input type="hidden" name="user_id" id="blankNameInput" value="0" />
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" />
          <label for="blankNameInput">Описание</label>
          <textarea name="description" id="blankCommentTextarea"  required></textarea>
          <label for="blankCommentTextarea">Содержание</label>
          <textarea name="text" id="blankCommentTextarea"  required></textarea>
          <label for="blankNameInput">Обложка</label>
          <input type="file" name="cover" id="blankNameInput" />
          <p><button class="master" id="blankSendButton">Добавить</button></p>
      </form>
     </p>
  </article>
</div>