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
    .editor-landing--disclaimer{
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
    .editor_workout [data-type="link"]{
        margin: 45px auto;
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
        margin-left: 119px;
    }
    .editor-output-preview{
        margin: 0 -1px -30px;
        background: #242835;
        padding: 50px 0;
        color: #6c7d98;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    }
        .editor-output-preview pre{
            max-width: 700px;
            margin: 0 auto;
            font-size: .86em;
        }
    .editor-output--header{
        margin: 40px 0 30px;
        text-align: center;
        font-size: 33px;
        color: #fff;
        letter-spacing: .4px
    }
    .editor-output--description{
        font-size: 18px;
        text-align: center;
        margin-bottom: 50px;
    }

    .site_footer{
        border-top: 0;
        background: #1a1c29;
        color: #50586d;
    }
        .site_footer h5{
            color: #9da9cc;
        }
        .site_footer a{
            color: #6581c5;
        }
        .site_footer .desclimer{
            color: #535f7b;
        }

    /**
    * Code highlighting
    */
    .sc_attr{
        color: #728cbd;
    }
    .sc_toolname{
        color: #83decb;
    }
    .sc_tag{
        color: #a9b6de;
    }
    .sc_key{
        color: #42cca1;
    }



</style>
<div class="center_side">
    <article class="editor_workout" style="text-align: left !important;">

        <h1 class="big_header" itemprop="headline">CodeX Editor</h1>
        <div class="editor-landing--disclaimer">under development</div>

        <form action="">

            <textarea hidden name="" id="codex_editor" cols="30" rows="10" style="width: 100%;height: 300px;"></textarea>

        </form>

    </article>
</div>

<div class="editor-output-preview">

    <div class="editor-output--header">Output</div>
    <div class="editor-output--description">Yeah, it's blocks! Very useful for multiplatform coverage.</div>

    <pre id="output"></pre>
</div>


<link rel="stylesheet" href="/public/extensions/codex.editor/editor.css" />
<script src="/public/extensions/codex.editor/codex-editor.js"></script>
<script>

var INPUT = {
    items : [],
    count : 43,
};

/** Fill with example data */
INPUT.items = [
    {
        type : 'paragraph',
        data : {
            text : '<p>Ladies and gentlemen, prepare yourself for a pivotal moment in the history of web development…</p>'
        }
    },
    {
        type : 'paragraph',
        data : {
            text : '<p><i>[Drumroll begins]</i></p><p>Promises have arrived natively in JavaScript!</p><p><i>[Fireworks explode, glittery paper rains from above, the crowd goes wild]</i></p>'
        }
    },
    {
        type : 'paragraph',
        data : {
            text : 'At this point you fall into one of these categories:'
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
        type : 'paragraph',
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
        type : 'paragraph',
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
        type : 'paragraph',
        data : {
            text : "The above and JavaScript promises share a common, standardised behaviour called Promises/A+. If you're a jQuery user, they have something similar called Deferreds. However, Deferreds aren't compliant, which makes them subtly different and less useful, so beware. jQuery also has a Promise type, but this is just a subset of Deferred and has the same issues. Although promise implementations follow a standardised behaviour, their overall APIs differ. JavaScript promises are similar in API to RSVP.js. Here's how you create a promise:",
        }
    },
    {
        type : 'code',
        data : {
            text : `<pre>var promise = new Promise(function(resolve, reject) {

    // do a thing, possibly async, then…
    if (/* everything turned out fine */) {

        resolve('Stuff worked!');

    } else {

        reject(Error('It broke'));

    }

});</pre>`,
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
        type : 'paragraph',
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
        type : 'paragraph',
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
        type : 'paragraph',
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
        type : 'paragraph',
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
        type : 'paragraph',
        data : {
            text : "…but also tell the user if something went wrong along the way. We'll want to stop the spinner at that point too, else it'll keep on spinning, get dizzy, and crash into some other UI. Of course, you wouldn't use JavaScript to deliver a story, serving as HTML is faster, but this pattern is pretty common when dealing with APIs: Multiple data fetches, then do something when it's all done.",
        }
    },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H2',
    //         text : "Queuing asynchronous actions",
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "You can also chain 'thens' to run async actions in sequence.When you return something from a 'then' callback, it's a bit magic. If you return a value, the next 'then' is called with that value. However, if you return something promise-like, the next 'then' waits on it, and is only called when that promise settles (succeeds/fails). For example:",
    //     }
    // },
    // {
    //     type : 'quote',
    //     data : {
    //         type : 'simple',
    //         text  : "This is the first time we've seen Promise.resolve, which creates a promise that resolves to whatever value you give it. If you pass it an instance of Promise it'll simply return it (note: this is a change to the spec that some implementations don't yet follow). If you pass it something promise-like (has a 'then' method), it creates a genuine Promise that fulfills/rejects in the same way. If you pass in any other value, eg Promise.resolve('Hello'), it creates a promise that fulfills with that value. If you call it with no value, as above, it fulfills with 'ndefined'",
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "There's also Promise.reject(val), which creates a promise that rejects with the value you give it (or undefined). We can tidy up the above code using array.reduce:",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H2',
    //         text : "Promise API Reference",
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "All methods work in Chrome, Opera, Firefox, Microsoft Edge, and Safari unless otherwise noted. The polyfill provides the below for all browers.",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H2',
    //         text : "Static Methods",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H3',
    //         text : 'Promise.resolve(promise);',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "Returns promise (only if promise.constructor == Promise)",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H3',
    //         text : 'Promise.resolve(thenable);',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "Make a new promise from the thenable. A thenable is promise-like in as far as it has a 'then' method.",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H3',
    //         text : 'Promise.resolve(obj);',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "Make a promise that fulfills to obj. in this situation.",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H3',
    //         text : 'Promise.all(array);',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "Make a promise that rejects to obj. For consistency and debugging (e.g. stack traces), obj should be an instanceof Error.",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H3',
    //         text : 'Promise.race(array);',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "Make a Promise that fulfills as soon as any item fulfills, or rejects as soon as any item rejects, whichever happens first.",
    //     }
    // },
    // {
    //     type : 'header',
    //     data : {
    //         type : 'H2',
    //         text : 'Conclution',
    //     }
    // },
    // {
    //     type : 'paragraph',
    //     data : {
    //         text : "promise.then(onFulfilled, onRejected)'onFulfilled is called when/if 'promise' resolves. onRejected is called when/if 'promise' rejects. Both are optional, if either/both are omitted the next <b>onFulfilled/onRejected</b> in the chain is called. Both callbacks have a single parameter, the fulfillment value or rejection reason. 'then' returns a new promise equivalent to the value you return from <b>onFulfilled/onRejected</b> after being passed through Promise.resolve. If an error is thrown in the callback, the returned promise rejects with that <b>error.promise.catch(onRejected)</b> Sugar for promise.then(undefined, onRejected). Many thanks to Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans, and Yutaka Hirano who proofread this and made <b>corrections/recommendations</b>. Also, thanks to Mathias Bynens for updating various parts of the article.",
    //     }
    // }

];


    function ready(f){
        /in/.test(document.readyState) ? setTimeout(ready,9,f) : f();
    }

    /** Document is ready */
    ready(function() {

        cEditor.start({
            textareaId: 'codex_editor',
            data : INPUT
        });

        cPreview.show({
            data : INPUT,
            holder : 'output'
        });

        load.getScript({
            async    : true,
            url      : '/public/js/simpleCodeStyling.js?v=2',
            instance : 'simpleCodeStyling',
            loadCallback : function(response){
                simpleCode.init('.editor_workout code');
            }
        });

    });

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
            string = string.replace( /"(paragraph|quote|list|header|link|code|image)"/g , '"<span class=sc_toolname>$1</span>"');

            /** Stylize HTML tags */
            string = string.replace( /(&lt;[\/a-z]+(&gt;)?)/gi , '<span class=sc_tag>$1</span>' );

            /** Stylize strings */
            string = string.replace( /"([^"]+)"/gi , '"<span class=sc_attr>$1</span>"' );


            return string;

        };

        return cPreview;

    })({});

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
