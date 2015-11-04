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
    <h1>Добавить статью</h1>
     <p>
      <form method="POST" action="/article/addarticle">
          <input type="hidden" name="uid" id="blankNameInput" value="0" />
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" />
          <label for="blankNameInput">Описание</label>
          <input type="text" name="description" id="blankNameInput" />
          <label for="blankCommentTextarea">Содержание</label>
          <textarea name="text" id="blankCommentTextarea"  required></textarea>
          <label for="blankNameInput">Обложка (позже будет файлоприемник)</label>
          <input type="text" name="cover" id="blankNameInput" />
          <p><button class="master" id="blankSendButton">Добавить</button></p>
      </form>
     </p>
  </article>
</div>