
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

        <div class="node " data-type="header">
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

        <div class="add_buttons">
            <button class="header" data-type="header"></button>
            <button class="paragraph" data-type="text"></button>
            <button class="list" data-type="list"></button>
            <button class="img" data-type="img"></button>
        </div>

        <div class="node" data-type="text">
            <div class="content"  contenteditable="true">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend</p>
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

        <div class="node" data-type="list">
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

        <div class="node " data-type="img">
            <div class="setting_buttons">
                <label>URL адрес картинки:</label>
                <input type="text" class="img_from_url" value="dummyimage.com/500x300/6091C8/575757.png&text=Hello+from+url1">
                <label>Загрузить картинку с компьютера:
                    <span class="actions tcenter">
                        <span class="change_img_btn">Выбрать</span>
                        <span class="delete_img hidden">Удалить</span>
                    </span>
                </label>
                <input class="change_img_input hidden_file" type="file" name="editor_img_1"/>
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

        <div class="add_buttons">
            <button class="header" data-type="header"></button>
            <button class="paragraph" data-type="text"></button>
            <button class="list" data-type="list"></button>
            <button class="img" data-type="img"></button>
        </div>
    </div>
    <div>
        <br>
        <button id="btn_save">Добавить / Изменить</button>
        <div class="clear"></div>
    </div>

    <p>Result html:</p>
    <textarea name="" id="html_result" ></textarea>

</div>