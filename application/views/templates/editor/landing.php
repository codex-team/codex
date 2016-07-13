<style>
    .editor_workout{
        margin: 30px;
        padding-bottom: 120px;
        border: 1px solid #eceff6;
        border-radius: 3px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
        /*letter-spacing: .1px;*/
        font-size: 17px;
    }
    .editor_workout .big_header{
        margin-bottom: 0;
        padding-bottom: 20px;
    }
    .disclaimer{
        margin-bottom: 40px;
        letter-spacing: 2px;
        font-variant: small-caps;
        font-size: .9em;
        text-align: center;
    }

    .editor_workout .ce_block{
        max-width: 700px;
        margin: 20px auto;
        padding: 0 !important;
    }
        .editor_workout .ce_block[data-type="paragraph"]{
            line-height: 1.7em;
        }
        .editor_workout [contenteditable]{
            outline: none !important;
        }
    .editor_workout h2,
    .editor_workout h3,
    .editor_workout h4{
        line-height: 1.4em;
    }
    .editor_workout h3{
        margin: 1.3em 0 .5em;
        font-size: 1.3em;
    }
    .editor_workout h2{
        margin: 1.7em 0 1.3em;
        font-size: 1.7em;
    }
    .editor_workout h4{
        margin: 1.7em 0 1.3em;
        font-size: 1.1em;
    }
    .editor_workout ul,
    .editor_workout ol{
        margin: 3em 0;
    }
        .editor_workout li{
            margin: 10px 0 !important;
            list-style: outside;
            line-height: 1.7em;
        }
    .editor_workout code{
        padding: 5px 10px;
        font-size: .8em;
    }
    .editor_workout .ce_toolbar{
        margin-left: 104px;
    }

</style>
<div class="center_side">
    <article class="editor_workout" style="text-align: left !important;">


        <h1 class="big_header" itemprop="headline">CodeX Editor</h1>
        <div class="disclaimer">under development</div>

        <form action="">

            <textarea hidden name="" id="codex_editor" cols="30" rows="10" style="width: 100%;height: 300px;"></textarea>

        </form>
    </article>
</div>

<link rel="stylesheet" href="/public/extensions/codex.editor/editor.css" />
<script src="/public/extensions/codex.editor/codex-editor.js"></script>
<script>

    /**
     * Input JSON style
     */
    var INPUT = {
        items : [],
        count : 10,
    };

    /** Fill with example data */
    INPUT.items = [
        {
            paragraph : {
                text : '<p>Ladies and gentlemen, prepare yourself for a pivotal moment in the history of web development…</p>'
            }
        },
        {
            paragraph : {
                text : '<p><i>[Drumroll begins]</i></p><p>Promises have arrived natively in JavaScript!</p><p><i>[Fireworks explode, glittery paper rains from above, the crowd goes wild]</i></p>'
            }
        },
        {
            paragraph : {
                text : 'At this point you fall into one of these categories:'
            }
        },
        {
            list : {
                type : 'unordered',
                items : [
                    `People are cheering around you, but you're not sure what all the fuss is about. Maybe you're not even sure what a "promise" is. You'd shrug, but the weight of glittery paper is weighing down on your shoulders. If so, don't worry about it, it took me ages to work out why I should care about this stuff. You probably want to begin here`,
                    `You punch the air! About time right? You've used these Promise things before but it bothers you that all implementations have a slightly different API. What's the API for the official JavaScript version? You probably want to begin here`,
                    `You knew about this already and you scoff at those who are jumping up and down like it's news to them. Take a moment to bask in your own superiority, then head straight to the API reference`
                ]
            }

        },
        {
            header : {
                type : 'H2',
                text : 'What\'s all the fuss about?',
            }
        },
        {
            paragraph : {
                text : 'JavaScript is single threaded, meaning that two bits of script cannot run at the same time, they have to run one after another. In browsers, JavaScript shares a thread with a load of other stuff. What that stuff is differs from browser to browser, but typically JavaScript is in the same queue as painting, updating styles, and handling user actions (such as highlighting text and interacting with form controls). Activity in one of these things delays the others.'
            }
        },
        {
            link : {
                'linkUrl'       : 'http://yandex.ru',
                'linkText'      : 'yandex.ru',
                'image'         : 'https://yastatic.net/morda-logo/i/apple-touch-icon/ru-76x76.png',
                'title'         : 'Яндекс',
                'description'   : 'Сайт, поисковик, проч.'
            }
        },
        {
            list : {
                type : 'unordered',
                items : [
                    'одновременная работа нескольких человек над проектом',
                    'возможность быстро обнаружить и откатить, все не зафиксированные изменения',
                    'возможность быстро откатить ошибочные, уже зафиксированные, изменения',
                    'история всех изменений в проекте, с указанием даты и авторов',
                    'возможность изучить процесс развития проекта',
                ]
            }

        },
        {
            header : {
                type : 'H2',
                text : 'Что такое git',
            }
        },
        {
            quote : {
                type   : 'withPhoto',
                text   : '«Распределенная» значит, что каждый репозиторий содержит всю историю изменений, и из него можно развернуть полноценную рабочую копию проекта. Супервизор позволяет следить за состоянием приложений, останавливать, запускать и перезапускать их. Для начала нам нужно создать конфигурационный файл для вашей программы',
                photo  : '',
                author : 'Олег Тиньков',
                job    : 'Председатель совета директоров банка «Тинькофф»',
            }
        },
        {
            header : {
                type : 'H2',
                text : 'Основные термины и понятия при работе с системой Git',
            }
        },
        {
            paragraph : {
                text : '<strong>Репозиторий </strong>— дерево изменений проекта.',
            }
        },
        {
            link : {
                'linkUrl'       : 'http://google.com',
                'linkText'      : 'google.com',
                'image'         : 'https://2.bp.blogspot.com/-7bZ5EziliZQ/VynIS9F7OAI/AAAAAAAASQ0/BJFntXCAntstZe6hQuo5KTrhi5Dyz9yHgCK4B/s1600/googlelogo_color_200x200.png',
                'title'         : 'Google',
                'description'   : 'Поисковик, поисковик, проч.'
            }
        },
        {
            paragraph : {
                text : '<strong>Ветка </strong>— указатель на коммит. <p> На один коммит может указывать несколько веток. Как правило это случается при создании новой ветки из текущей. Например для реализации в ней новой задачи. По мере добавления коммитов — ветки будут расходится в разные стороны.</p>'
            }
        },
        {
            paragraph : {
                text : '<strong>Коммит</strong> (от слова commit - фиксировать) — логическая единица изменений.<p>Каждый из них имеет историю уникальный ID и цепочку предшествующих коммитов. Можно «откатить» (отменить) изменения любого из коммитов. Для любого коммита из истории можно создать указатель, то есть ветку.</p>'
            }
        },
        {
            paragraph : {
                text : '<strong>Индекс</strong> — изменения, которые будут зафиксированы при следующем коммите. <p> При этом, во время коммита, могут быть изменения, не добавленные в индекс — они не будут закоммичены. Их надо будет отдельно добавить в индекс и зафиксировать. Таким образом, можно вносить разом, все необходимые по мере работы, правки и фиксировать их логическими группами.</p>'
            }
        },
        {
            paragraph : {
                text : '<p>В первое время вам понадобятся только основные команды. Давайте рассмотрим их:</p>'
            }
        },
        {
            list : {
                type : 'unordered',
                items : [
                    'init — создает новый репозиторий',
                    'status — отображает список измененных, добавленных и удаленных файлов',
                    'branch — отображает список веток и активную среди них',
                    'add — добавляет указанные файлы в индекс',
                    'reset — удаляет указанные файлы из индекса',
                    'commit — фиксирует добавленнные в индекс изменения',
                    'checkout — переключает активную ветку; отменяет не добавленные в индекс изменения',
                    'merge — объединяет указанную ветку с активной',
                    'log — выводит список последних коммитов (можно указать количество и формат)'
                ]
            }
        },
        {
            header : {
                type : 'H2',
                text : 'Примеры команд для работы с Git'
            }
        },
        {
            paragraph : {
                text : '<p>Создайте новую папку для тестового проекта.</p><p>Чтобы начать работу с гитом, надо его инициализировать — открыть консоль, перейти в корневую папку проекта и выполнить команду:'
            }
        },
        {
            code : {
                text : '$git init'
            }
        },
        {
            paragraph : {
                text : '<p>Эта команда создаст новый пустой репозиторий. Проще говоря, появится папка .git с какими-то непонятными файлами.&nbsp;Причем такой репозиторий, который находится в папке проекта, файлы которого вы можете менять — называется «рабочей копией». Существуют еще «внешние копии» или bare-репозитории.</p>'
            }
        },
        {
            paragraph : {
                text : 'Все остальные команды можно вызывать в корневой папке или в одной из вложенных. Теперь можно вносить изменения. Список изменений можно увидеть выполнив команду:'
            }
        },
        {
            code : {
                text : '$git status'
            }
        },
        {
            paragraph : {
                text : 'После создания нового репозитория дерево содержит только одну ветку — master. Ветка состоит из коммитов, расположенных в хронологическом порядке.&nbsp;Как правило, в ветке master находятся проверенные и протестированные изменения.'
            }
        },

    ];

    /**
     * @todo uncomment and append all text to items
     * .....
     *
     * <p><code>$ <span class="sc_keyword">git</span> status</code></p>              <p>В консоли появится список измененных файлов.</p>              <p>Добавьте файлы, изменения в которых вы хотите зафиксировать:</p>              <p><code>$ <span class="sc_keyword">git</span> add file_name_a.php</code></p>              <p>Файлы можно указывать через пробел. Все файлы в данной папке и ее подпаках можно добавить командой:</p>              <p><code>$ <span class="sc_keyword">git</span> add .</code></p>              <p>Будьте внимательны, эта команда не добавит новые файлы в индекс. Добавятся только модифицированные старые файлы и удаленные. Новые файлы можно добавить явно указав имя.&nbsp;</p>              <p>Добавить все новые и измененные файлы можно командой:</p>              <p><code>$ <span class="sc_keyword">git</span> add -A</code></p>              <p>Изменения стоит фиксировать логическими блоками, то есть в одном коммите должны быть файлы связанные с решением одной конкретной ошибки или одной конкретной новой задачи.</p>              <p>Если вы добавили файл из другого логического блока, удалите его из индекса командой:</p>              <p><code>$ <span class="sc_keyword">git</span> reset file_name_b.php</code></p>              <p>Зафиксируйте эти изменения в другом коммите. Так будет удобнее при просмотре истории изменений и отмене изменений.</p>              <p>Если вы случайно изменили не тот файл - верните его к последнему зафиксированному состоянию командой:</p>              <p><code>$ <span class="sc_keyword">git</span> checkout file_name_c.php</code></p>              <p>Отменить изменения всех, ранее существующих, файлах в данной и вложенных папках можно командой:</p>              <p><code>$ <span class="sc_keyword">git</span> checkout -- .</code></p>              <p>Ненужные новые файлы достаточно просто удалить. Или это можно сделать командой:</p>              <p><code>$ <span class="sc_keyword">git</span> reset --hard HEAD</code></p>              <p>Проект будет полностью приведен к последнему зафиксированному состоянию.</p>              <p>Теперь зафиксируйте изменения добавленные в индекс:</p>              <p><code>$ <span class="sc_keyword">git</span> commit</code></p>              <p>Откроется текстовый редактор по-умолчанию для того, чтобы добавить комментарий к коммиту. Распишите, что и зачем вы меняли. Но не перечисляйте список измененных файлов — гит сделает это за вас. Комментарий должен коротким и понятным, например:</p>              <p><code>fix| order price</code></p>              <p><code>now price includes vat</code></p>              <p>Комментарии лучше писать на английском языке, в первую очередь потому, консоль может не поддерживать кириллицу и вместо описания будут кракозяблики.</p>              <p>Первая строка самая важная и должна включать суть коммита в нескольких словах. Дальше можете не жалеть строк и расписать подробно что, зачем и почему было изменено (речь про логику, а не про файлы).</p>              <p>Теперь можно посмотреть историю изменений, ваш коммит должен в ней отобразиться:</p>              <p><code>$ <span class="sc_keyword">git</span> log</code></p>              <h2>Заключение</h2>              <p>Как видите, ничего сложного.</p>              <p>Конечно это далеко не все, что может гит, но именно этого мне не хватало в свое время для того, чтобы начать пользоваться системой контроля версий.</p>        </div>
     */


    function ready(f){
        /in/.test(document.readyState) ? setTimeout(ready,9,f) : f();
    }

    /** Document is ready */
    ready(function() {

        cEditor.start({
            textareaId: 'codex_editor',
            // tools      : ['header', 'list', 'quote', 'code'],
            data : INPUT
        });

    })

</script>

<script src="/public/extensions/codex.editor/plugins/paragraph/paragraph.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/paragraph/paragraph.css" />

<script src="/public/extensions/codex.editor/plugins/header/header.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/header/header.css" />

<script src="/public/extensions/codex.editor/plugins/link/link.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/link/link.css" />

<script src="/public/extensions/codex.editor/plugins/code/code.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/code/code.css" />

<script src="/public/extensions/codex.editor/plugins/quote/quote.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/quote/quote.css" />

<script src="/public/extensions/codex.editor/plugins/list/list.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/list/list.css" />

<script src="/public/extensions/codex.editor/plugins/images/images.js"></script>
<link rel="stylesheet" href="/public/extensions/codex.editor/plugins/images/images.css" />