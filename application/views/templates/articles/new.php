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

          <div class="editor_wrapper">
              <div class="editor_content">
                  <div class="add_buttons hidden example">
                      <button class="header" data-type="header"></button>
                      <button class="paragraph" data-type="text"></button>
                      <button class="list" data-type="list"></button>
                      <button class="img" data-type="img"></button>
                  </div>

                  <div class="node hidden example" data-type="header">
                      <div class="setting_buttons">
                          <button class="header_type" data-type="h2">H2</button>
                          <button class="header_type" data-type="h3">H3</button>
                          <button class="header_type" data-type="h4">H4</button>
                      </div>
                      <div class="content"  contenteditable="true">
                          <h2 class="js_header">Some header will be here...</h2>
                      </div>
                      <div class="action_buttons">
                          <button title="Переместить выше" data-action="moveup">↑</button>
                          <button title="Переместить ниже" data-action="movedown">↓</button>
                          <button title="Удалить блок" data-action="remove">X</button>
                      </div>
                  </div>

                  <div class="node hidden example" data-type="text">
                      <div class="content"  contenteditable="true">
                          <p>Some text will be here...</p>
                      </div>
                      <div class="action_buttons">
                          <button title="Переместить выше" data-action="moveup">↑</button>
                          <button title="Переместить ниже" data-action="movedown">↓</button>
                          <button title="Удалить блок" data-action="remove">X</button>
                      </div>
                  </div>

                  <div class="node hidden example" data-type="img">
                      <div class="setting_buttons">
                          <label>URL адрес картинки:</label>
                          <input type="text" class="img_from_url" value="dummyimage.com/500x300/6091C8/575757.png&text=Hello+from+url1">
                          <label>Загрузить картинку с компьютера:
                    <span class="actions tcenter">
                        <span class="change_img_btn">Выбрать</span>
                        <span class="delete_img hidden">Удалить</span>
                    </span>
                          </label>
                          <input class="change_img_input hidden_file" type="file" name="editor_img_"/>
                      </div>
                      <div class="content"  contenteditable="false">
                          <div class="cover">
                              <img class="img" src="/public/img/defEditorImg.png" data-from="src"/>
                          </div>
                      </div>
                      <div class="action_buttons">
                          <button title="Переместить выше" data-action="moveup">↑</button>
                          <button title="Переместить ниже" data-action="movedown">↓</button>
                          <button title="Удалить блок" data-action="remove">X</button>
                      </div>
                  </div>

                  <div class="node hidden example" data-type="list">
                      <div class="content"  contenteditable="false">
                          <ul>
                              <li contenteditable="true">Item 1</li>
                              <li contenteditable="true">Item 2</li>
                              <li contenteditable="true">Item 3</li>
                          </ul>
                      </div>
                      <div class="action_buttons">
                          <button title="Переместить выше" data-action="moveup">↑</button>
                          <button title="Переместить ниже" data-action="movedown">↓</button>
                          <button title="Удалить блок" data-action="remove">X</button>
                      </div>
                  </div>

                  <div class="add_buttons">
                      <button class="header" data-type="header"></button>
                      <button class="paragraph" data-type="text"></button>
                      <button class="list" data-type="list"></button>
                      <button class="img" data-type="img"></button>
                  </div>
              </div>
          </div>

          <textarea class="hidden" name="text" id="html_result"  required>
              <?
              if (isset($table_values['text']['value'])){
                  echo $table_values['text']['value'];
              }
              ?>
          </textarea>

          <p><button class="master" id="blankSendButton">Добавить</button></p>
      </form>
     </p>
  </article>
</div>


