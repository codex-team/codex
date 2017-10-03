<link rel="stylesheet" href="/public/app/landings/editor/editor.css?v=<?= filemtime("public/app/landings/editor/editor.css") ?>">

<article class="editor-landing">

    <h1 class="editor-landing__title" itemprop="headline">CodeX Editor</h1>
    <div class="editor-landing__disclaimer">under development</div>

    <div contenteditable id="js-editor-title" class="editor-landing__input-title" type="text" data-placeholder="Title"></div>

    <form name="editor-demo" action="/editor/preview" method="POST" enctype="multipart/form-data">

        <div name="html" id="codex_editor" cols="30" rows="10" style="width: 100%;height: 300px;"></div>
        <div class="editor_output__buttons">
            <a href="#output" id="jsonPreviewerButton" class="button">View Output</a>
            <span id="saveButton" class="button button--master">Save and Preview</span>
        </div>

    </form>

</article>

<script>

    /**
    * Hander for article title input
    * Sets focus on ce-redator by ENTER key
    */
    var titleInput = document.getElementById('js-editor-title');

    titleInput.addEventListener('keypress',function(event) {

        var ENTER = 13,
            redactor;

        if (event.keyCode == ENTER){

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            redactor = document.querySelector('.ce-redactor');
            redactor.click();
        }

    });
</script>


<div class="editor-output-preview">

    <div class="editor-output--header">Output</div>
    <div class="editor-output--description">Yeah, it's blocks! Very useful for multiplatform coverage.</div>

    <pre id="output"></pre>
</div>


<div class="advantages clearfix">
    <div class="center_side">
        <div class="advantages__item">
            API based
        </div>
        <div class="advantages__item">
            Native JS
        </div>
        <div class="advantages__item">
            Opened
        </div>
    </div>
</div>

<!-- Developers plugin -->
<?
    $plugins = ['paragraph', 'header', 'code', 'link', 'list', 'image', 'quote', 'twitter', 'instagram', 'embed'];

    //@todo привести в порядок
    $editorPath = Kohana::$environment == 'DEVELOPMENT' ? 'https://rawgit.com/codex-editor' : '';
?>

<?// foreach ($plugins as $plugin) : ?>
<!--    <script src="--><?//=$plugin . DIRECTORY_SEPARATOR . $plugin . '.js'; ?><!--"></script>-->
<!--    <link rel="stylesheet" href="https://cdn.ifmo.su/editor/v2.0/plugins/--><?//=$plugin . DIRECTORY_SEPARATOR . $plugin . '.css'; ?><!--">-->
<?// endforeach; ?>
<script src="https://rawgit.com/codex-editor/paragraph/master/lib/bundle.js" type="text/javascript"></script>
<script src="https://rawgit.com/codex-editor/header/master/lib/bundle.js" type="text/javascript"></script>
<script src="https://rawgit.com/codex-editor/code/master/lib/bundle.js" type="text/javascript"></script>

<link rel="stylesheet" href="https://rawgit.com/codex-editor/paragraph/master/lib/bundle.css">
<link rel="stylesheet" href="https://rawgit.com/codex-editor/header/master/lib/bundle.css">
<link rel="stylesheet" href="https://rawgit.com/codex-editor/code/master/lib/bundle.css">

<!-- Editor scripts and styles -->
<!--<script src="https://cdn.ifmo.su/editor/v2.0/codex-editor.js"></script>-->
<!--<link rel="stylesheet" href="https://cdn.ifmo.su/editor/v2.0/codex-editor.css" />-->

<script>

    /** Document is ready */
    codex.docReady(function() {

        codex.editor.start(
            ['paragraph, header']
        );

//    var editor = new codex.editor({
//        holderId : "codex_editor",
//        initialBlockPlugin : 'paragraph',
//        // placeholder: 'Прошлой ночью мне приснилось...',
//        hideToolbar: false,
//        tools : {
//            paragraph: {
//                type: 'paragraph',
//                iconClassname: 'ce-icon-paragraph',
//                showInlineToolbar: true,
//                allowRenderOnPaste: true,
//                instance: paragraph
//            },
//            header: {
//                type: 'header',
//                iconClassname: 'ce-icon-header',
//                instance: header,
//                displayInToolbox: true
//            },
//            code: {
//                type: 'code',
//                iconClassname: 'ce-icon-code',
//                instance: code,
//                displayInToolbox: true,
//                enableLineBreaks: true
//            }
//        },
//        data : {
//            id: +new Date(),
//            items: [
//                {
//                    type : 'header',
//                    data : {
//                        text : 'Привет от CodeX'
//                    }
//                },
//                {
//                    type : 'paragraph',
//                    data : {
//                        text : 'Пишите нам на team@ifmo.su'
//                    }
//                }
//            ],
//            count: 3
//        }
//    });
        cPreview.show({
            data : INPUT,
            holder : 'output'
        });

        // load.getScript({
        //     async    : true,
        //     url      : '/public/js/simpleCodeStyling.js?v=2',
        //     instance : 'simpleCodeStyling',
        //     loadCallback : function(response){
        //         simpleCode.init('.editor-workout code');
        //     }
        // });

    });


    /**
* Redactor input
*/
var INPUT = {
    items : [],
    count : 0
};

/**
* Old input with content
*/
var _INPUT = {
    items : [],
    count : 23
};

/** Fill with example data */
_INPUT.items = [
    {
        type : 'text',
        data : {
            text : '<p>Ladies and gentlemen, prepare yourself for a pivotal moment in the history of web development…</p>'
        }
    },
    // {
    //     type : 'text',
    //     data : {
    //         text : '<p><i>[Drumroll begins]</i></p><p>Promises have arrived natively in JavaScript!</p><p><i>[Fireworks explode, glittery paper rains from above, the crowd goes wild]</i></p>'
    //     }
    // },
    {
        type : 'text',
        data : {
            text : "The promise constructor takes one argument, a callback with two parameters, resolve and reject. Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.Like 'throw' in plain old JavaScript, it's customary, but not required, to reject with an Error object. The benefit of Error objects is they capture a stack trace, making debugging tools more helpful. Here's how you use that promise:",
        }
    },
    {
        type : 'text',
        data : {
            text : 'At this point you fall into one of these categories:'
        }
    },
    {
        type : 'image',
        data : {
            background : false,
            border : false,
            isStretch : true,
            file : {
                url:  'https://ifmo.su/public/app/img/meta_img.png',
                bigUrl : null,
                width : null,
                height : null,
                additionalData : null,
            },
            caption : 'knew about this already and you scoff',
            cover : null,
        }
    },
    {
        type : 'list',
        data : {
            type : 'unordered',
            items : [
                `People are cheering around you, but you're not sure what all the fuss is about. Maybe you're not even sure what a "promise" is. You'd shrug, but the weight of glittery paper is weighing down on your shoulders. If so, don't worry about it, it took me ages to work out why I should care about this stuff. You probably want to begin here`,
                `You punch the air! About time right? You've used these Promise things before but it bothers you that all implementations have a slightly different API. What's the API for the official JavaScript version? You probably want to begin here`,
                `You knew about this already and you scoff at those who are jumping up and down like it's news to them. Take a moment to bask in your own superiority, then head straight to the API reference`
            ]
        }

    },
    {
        type : 'header',
        data : {
            type : 'H2',
            text : 'What\'s all the fuss about?',
        }
    },
    {
        type : 'text',
        data : {
            text : 'JavaScript is single threaded, meaning that two bits of script cannot run at the same time, they have to run one after another. In browsers, JavaScript shares a thread with a load of other stuff. What that stuff is differs from browser to browser, but typically JavaScript is in the same queue as painting, updating styles, and handling user actions (such as highlighting text and interacting with form controls). Activity in one of these things delays the others.'
        }
    },
    {
        type : 'link',
        data : {
            'linkUrl'       : 'http://yandex.ru',
            'linkText'      : 'yandex.ru',
            'image'         : 'https://yastatic.net/morda-logo/i/apple-touch-icon/ru-76x76.png',
            'title'         : 'Яндекс',
            'description'   : 'Russian largest Search Engine'
        }
    },
    {
        type : 'header',
        data : {
            type : 'H3',
            text : 'Promises arrive in JavaScript!',
        }
    },
    {
        type : 'text',
        data : {
            text : 'Promises have been around for a while in the form of libraries, such as:',
        }
    },
    {
        type : 'list',
        data : {
            type : 'unordered',
            items : [
                'Q',
                'when',
                'WinJS',
                'RSVP.js',
            ]
        }

    },
    {
        type : 'text',
        data : {
            text : "The above and JavaScript promises share a common, standardised behaviour called Promises/A+. If you're a jQuery user, they have something similar called Deferreds. However, Deferreds aren't compliant, which makes them subtly different and less useful, so beware. jQuery also has a Promise type, but this is just a subset of Deferred and has the same issues. Although promise implementations follow a standardised behaviour, their overall APIs differ. JavaScript promises are similar in API to RSVP.js. Here's how you create a promise:",
        }
    },
    {
        type : 'code',
        data : {
            text : `var promise = new Promise(function(resolve, reject) {

    // do a thing, possibly async, then…
    if (/* everything turned out fine */) {

        resolve('Stuff worked!');

    } else {

        reject(Error('It broke'));

    }

});`,
        }
    },
    {
        type : 'quote',
        data : {
            type   : 'withCaption',
            text   : "But what does this mean for promises? Well, you can use this return/resume behaviour to write async code that looks like (and is as easy to follow as) synchronous code. Don't worry too much about understanding it line-for-line, but here's a helper function that lets us use 'yield' to wait for promises to settle:",
            photo  : null,
            author : '— Jake Archibald',
            job    : 'CEO Mozilla Firefox',
        }
    },
    {
        type : 'text',
        data : {
            text : "The promise constructor takes one argument, a callback with two parameters, resolve and reject. Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.Like 'throw' in plain old JavaScript, it's customary, but not required, to reject with an Error object. The benefit of Error objects is they capture a stack trace, making debugging tools more helpful. Here's how you use that promise:",
        }
    },
    {
        type : 'header',
        data : {
            type : 'H2',
            text : 'Browser support & polyfill',
        }
    },
    {
        type : 'text',
        data : {
            text : "There are already implementations of promises in browsers today. As of Chrome 32, Opera 19, Firefox 29, Safari 8 & Microsoft Edge, promises are enabled by default. To bring browsers that lack a complete promises implementation up to spec compliance, or add promises to other browsers and Node.js, check out the polyfill (2k gzipped).",
        }
    },
    {
        type : 'link',
        data : {
            'linkUrl'       : 'http://google.com',
            'linkText'      : 'google.com',
            'image'         : 'https://2.bp.blogspot.com/-7bZ5EziliZQ/VynIS9F7OAI/AAAAAAAASQ0/BJFntXCAntstZe6hQuo5KTrhi5Dyz9yHgCK4B/s1600/googlelogo_color_200x200.png',
            'title'         : 'Google',
            'description'   : 'The largest US Search Engine',
        }
    },
    {
        type : 'header',
        data : {
            type : 'H2',
            text : 'Compatibility with other libraries',
        }
    },
    {
        type : 'text',
        data : {
            text : "The JavaScript promises API will treat anything with a then method as promise-like (or thenable in promise-speak *sigh*), so if you use a library that returns a Q promise, that's fine, it'll play nice with the new JavaScript promises. Although, as I mentioned, jQuery's Deferreds are a bit… unhelpful. Thankfully you can cast them to standard promises, which is worth doing as soon as possible:",
        }
    },
    {
        type : 'code',
        data : {
            text : "var jsPromise = Promise.resolve($.ajax('/whatever.json'));",
        }
    },
    {
        type : 'header',
        data : {
            type : 'H2',
            text : "Complex async code made easier",
        }
    },
    {
        type : 'text',
        data : {
            text : "Right, let's code some things. Say we want to:",
        }
    },
    {
        type : 'list',
        data : {
            type : 'ordered',
            items : [
                'Start a spinner to indicate loading',
                'Fetch some JSON for a story, which gives us the title, and urls for each chapter',
                'Add title to the page',
                'Fetch each chapter',
                'Add the story to the page',
                'Stop the spinner',
            ]
        }
    },
    {
        type : 'text',
        data : {
            text : "…but also tell the user if something went wrong along the way. We'll want to stop the spinner at that point too, else it'll keep on spinning, get dizzy, and crash into some other UI. Of course, you wouldn't use JavaScript to deliver a story, serving as HTML is faster, but this pattern is pretty common when dealing with APIs: Multiple data fetches, then do something when it's all done.",
        }
    },

];

/**
 * Save all blocks and Preview JSON
 */
var jsonPreviewerButton = document.getElementById('jsonPreviewerButton');

jsonPreviewerButton.addEventListener('click', function() {

    /** Empty INPUTS items */
    INPUT.items = [];

    /**
     * Save blocks
     */
    codex.editor.saver.saveBlocks();

    setTimeout(function() {

        /**
         * Fill in INPUT items
         */
        INPUT.items = codex.editor.state.jsonOutput;
        INPUT.count = INPUT.items.length;

        document.getElementById('json_result').innerHTML = JSON.stringify(codex.editor.state.jsonOutput);

        /**
         * View JSON data
         */
        cPreview.show({
            data : INPUT,
            holder : 'output'
        });


    }, 10);

}, false);


/**
 * Preview button handler
 */
var saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', function() {

    var form = document.forms['editor-demo'],
        JSONinput = document.getElementById('json_result');

    /**
     * Save blocks
     */
    codex.editor.saver.saveBlocks();

    setTimeout(function() {

        /**
         * Fill in INPUT items
         */
        INPUT.items = codex.editor.state.jsonOutput;
        INPUT.count = INPUT.items.length;

        JSONinput.innerHTML = JSON.stringify({data:codex.editor.state.jsonOutput});

        /**
         * Send form
         */
         form.submit();


    }, 100);

}, false);

/**
* Empty redactor preview
*/
INPUT.items = [];

</script>

<script>

    /**
    * Module to compose output JSON preview
    */
    var cPreview = (function (cPreview) {

        /**
        * HTML <pre> element that holds preivew code
        */
        cPreview.holder = null;

        /**
        * Shows JSON in pretty preview
        * @param {object} 'data' and 'holder'
        */
        cPreview.show = function(params){


            this.holder = document.getElementById(params.holder);

            /** getting INPUT JSON */
            var output = params.data;

            /** Make JSON pretty */
            output = JSON.stringify( output , null , 4 );

            /** Encode HTML entities */
            output = this.encodeHTMLentities( output );

            /** Stylize! */
            output = this.stylize( output );

            this.holder.innerHTML = output;

        };

        /**
        * Converts '>', '<', '&' symbols to entities
        */
        cPreview.encodeHTMLentities = function (string){

            return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        };

        /**
        * Some styling magic
        */
        cPreview.stylize = function (string ){

            /** Stylize JSON keys */
            string = string.replace( /"(\w+)"\s?\:/g , '"<span class=sc_key>$1</span>" :');

            /** Stylize tool names */
            string = string.replace( /"(text|quote|list|header|link|code|image)"/g , '"<span class=sc_toolname>$1</span>"');

            /** Stylize HTML tags */
            string = string.replace( /(&lt;[\/a-z]+(&gt;)?)/gi , '<span class=sc_tag>$1</span>' );

            /** Stylize strings */
            string = string.replace( /"([^"]+)"/gi , '"<span class=sc_attr>$1</span>"' );


            return string;

        };

        return cPreview;

    })({});

</script>
