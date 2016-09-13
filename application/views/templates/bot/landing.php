<style type="text/css">

    body {
        background-color: #107AEA;
    }

    .site_header {
        border-bottom: 1px solid #3590f1;
        background-color: #107AEA;
    }

    .site_header a, .site_footer a, .site_footer, .site_footer .desclimer {
        color: #fff;
    }

    .site_footer {
        border-top: 1px solid #3590f1;
        background-color: #107AEA;
    }
    
    .bot_wrapper {
        background-color: #107aea;
        padding-bottom: 60px;
    }
    .bot_wrapper h1 {
        color: #fff;
        font-size: 54px;
        line-height: 1.2em;
        text-align: center;
        padding: 100px 140px 0px;
        margin-bottom: 15px;
    } 
    .bot_wrapper .description {
        color: #fff;
        font-size: 20px;
        text-align: center;
    }

    .bot_wrapper .integration {
        height: 90px;
        margin-top: 90px;
        margin-bottom: 65px;
    }

    .bot_wrapper .integration .title {
        color: #a4c9ff;
        font-size: 19px;
        text-align: center;
    }

    .bot_wrapper .integration img {
        margin: 10px 15px;
    }

    .bot_wrapper .yandex {
        height: 43px;
    }

    .bot_wrapper .yandex > img {
        height: 43px;
    }

    .bot_wrapper .github {
        height: 43px;
    }

    .bot_wrapper .github > img {
        margin-top: 27px;
    }

    .bot_wrapper .demo {
        background-color: #fff;
        width: 400px;
        height: 350px;
        display: block;
        margin: 0 auto;
        position: relative;
    }

    .bot_wrapper .demo .photo {
        border-radius: 50%;
        background-color: #eee;
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-right: 20px;
        margin-left: 20px;
    }

    .bot_wrapper .demo .msg {
       display: inline-block;
    }

    .bot_wrapper .demo_content {
        display: flex;
        align-items: center;
        height: 99px;
        width: 100%;
        margin-top: 200px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e9f1;
    }
    .bot_wrapper .write {
        position: absolute;
        bottom: 0;
        padding: 15px 18px;
        left: 0;
        cursor: pointer;
    }

    .bot_wrapper .send {
        position: absolute;
        bottom: 0;
        padding: 15px 18px;
        right: 0;
        cursor: pointer;
    }

    @media screen and (min-width: 320px) and (max-width: 425px) {
        
        .bot_wrapper {
            padding-bottom: 40px;
        }

        .bot_wrapper h1 {
            font-size: 44px;
            padding: 30px 0 10px 0;
            margin-bottom: 0; 
        }

        .bot_wrapper .description {
            text-align: center;
            font-size: 18px;
            padding-right: 10px;
            padding-left: 10px;
        }

        .bot_wrapper .demo {
            max-width: 90%;
            margin-right: auto;
            margin-left: auto;
            height: 280px;
        }

        .bot_wrapper .integration {
            margin-top: 45px;
            margin-bottom: 15px;
        }

        .bot_wrapper .integration .title {
            font-size: 18px;
        }

        .bot_wrapper .yandex {
            height: 35px;
        }

        .bot_wrapper .yandex > img {
            height: 35px;
        }

        .bot_wrapper .github {
            height: 35px;
        }

        .bot_wrapper .github > img {
            margin-top: 20px;
            height: 24px;
        }

        .bot_wrapper .demo_content {
            margin-top: 133px;
            padding-bottom: 0;
        }

        .bot_wrapper .msg {
            font-size: 14px;
            white-space: nowrap;
        }

        .bot_wrapper .msg > div {
            font-size: 14px;
        }

        .bot_wrapper .demo .photo {
            margin-right: 15px;
        }

        .bot_wrapper .write, .bot_wrapper .send {
            font-size: 13px;
            padding: 13px 18px;
        }
    }
    </style>
<div class="center_side ">
<div class="bot_wrapper">
    <h1 itemprop="headline">CodeX Bot</h1>
    <p class="description">Telegram bot-platform for developers and managers</p>
    <div class="integration">
        <div class="title" style="width: 100%;">Easy integration with</div>
        <div class="github" style="width: 50%; float: right;">
            <img src="/public/img/bot-landing__github.svg">
        </div>
        <div class="yandex" style="width: 50%; float: left;">
            <img src="/public/img/Yandex.svg" style="float: right;">
        </div>         
    </div>
    <div class="demo clearfix">
        <div class="demo_content">
            <div class="photo"></div>        
             <div class="msg">
                 <div style="color: #ba619a; font-weight: bold;">CodeX Bot</div>
                 Press <span style="color: #2b74c9;">/help</span> to view menu
             </div>
        </div>
        <div class="controls_wrapper">
            <div class="write">
                 <div style="color: #838aa5;">Write a message...</div>
            </div>
            <div class="send">
                 <div style="color: #2e8de6;">Send</div>
            </div>
        </div> 
    </div>
     
</div>
</div>