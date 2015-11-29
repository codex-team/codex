<?php
/**
 * Created by PhpStorm.
 * User: Marco
 * Date: 25.11.2015
 * Time: 1:19
 */

?>

<div class="codex_editor editor_wrapper">
    <div class="editor_content">
        <div class="node">

            <div class="add_buttons example">

                <span class="toggler"><i class="ce_icon-plus-circled-1"></i></span>

                <button data-type="header"><i class="ce_icon-header"></i></button>
                <button data-type="img"><i class="ce_icon-picture"></i></button>
                <button data-type="list"><i class="ce_icon-list"></i></button>
                <button data-type="quote"><i class="ce_icon-quote"></i></button>
                <button data-type="code"><i class="ce_icon-code"></i></button>
                <button data-type="twitter"><i class="ce_icon-twitter"></i></button>
                <button data-type="instagram"><i class="ce_icon-instagram"></i></button>
                <button data-type="smile"><i class="ce_icon-smile"></i></button>

            </div>

            <p class="content"  contenteditable="true">
                При этом для идентификации будет использоваться ID пользователя в PushAll, а из данных сайт сможет получить только ссылку на Google+ и другие публичные данные. При этом будет возможность закрыть доступ ко всем этим данным, передавая только лишь ID.
            </p>

        </div>
    </div>
</div>


<script src="/public/js/ce_interface.js?v=<?= filemtime("public/js/ce_interface.js") ?>"></script>

<script>

    function ready(f){/in/.test(document.readyState) ? setTimeout(ready,9,f) : f();}

    /** Document is ready */
    ready(function() {
        window.cEditor = new ce('html_result');
    })

</script>
<? /*
<script src="/public/js/editor.js?v=<?= filemtime("public/js/editor.js") ?>"></script>
*/ ?>