<?php
/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 25.11.2015
 * Time: 1:19
 */

?>

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

        <div class="node hidden example" data-type="img" data-focusable="false">
            <div class="setting_buttons">
                <label>URL адрес картинки:</label>
                <input type="text" class="img_from_url" value="dummyimage.com/500x300/6091C8/575757.png&text=Hello+from+url1">
                <label>Загрузить картинку с компьютера:
                    <span class="actions tcenter">
                        <span class="change_img_btn">Выбрать</span>
                        <span class="delete_img hidden">Удалить</span>
                    </span>
                </label>
                <input class="change_img_input hidden_file" type="file"/>
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

        <?
        if (isset($storedNodes)):
            echo htmlspecialchars_decode($storedNodes);
        else:
            // Start state nodes
        ?>
            <div class="node " data-type="header">
                <div class="content"  contenteditable="true">
                    <h2 class="js_header">Some header will be here...</h2>
                </div>
            </div>

            <div class="node  " data-type="text">
                <div class="content"  contenteditable="true">
                    <p>Some text will be here...</p>
                </div>
            </div>
        <?endif?>
    </div>
</div>
