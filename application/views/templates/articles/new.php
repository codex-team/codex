<div class="center_side clear">

    <article class="article">

        <form method="POST" action="/article/addarticle" enctype="multipart/form-data" id="edit_article_form">
          <label for="blankNameInput">Заголовок статьи</label>
          <input type="text" name="title" id="blankNameInput" value="<?
          if (isset($table_values['title']['value'])){
              echo $table_values['title']['value'];
          }
          ?>"/>

            <input class="article_form_header" type="text" name="title" id="blankNameInput" value="Greatest article"/>

            <? /*

                <label for="blankNameInput">Описание</label>
                <textarea name="description" id="blankCommentTextarea"  required></textarea>
        </div>

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


