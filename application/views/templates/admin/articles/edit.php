<div class="center_side clear">
  <article class="article">
    <h1>Редактировать статью</h1>
      <p>
        <form method="POST" action="/admin/article/updatearticle/<?= $article['id'] ?>" enctype="multipart/form-data">
            <input type="hidden" name="user_id" id="blankNameInput" value="0" />
            <label for="blankNameInput">Заголовок статьи</label>
            <input type="text" name="title" id="blankNameInput" value="<?= $article['title'] ?>" />
            <label for="blankNameInput">Описание</label>
            <textarea name="description" id="blankCommentTextarea"  required><?= $article['description'] ?></textarea>
            <label for="blankCommentTextarea">Содержание</label>
            <textarea name="text" id="blankCommentTextarea"  required><?= $article['text'] ?></textarea>
            <label for="blankNameInput">Обложка</label>
            <input type="file" name="cover" id="blankNameInput" />
            <p><button class="master" id="blankSendButton">Сохранить изменения</button></p>
        </form>
      </p>
  </article>
</div>