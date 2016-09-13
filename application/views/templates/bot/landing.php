<style type="text/css">

    body {
        background-color: #107AEA;
    }

    .site_header {
        border-bottom: 1px solid #3590f1;
        background-color: #107AEA;
    }

    .site_header a, 
    .site_footer a, 
    .site_footer, 
    .site_footer .desclimer {
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
        padding: 100px 140px 0px;
        margin-bottom: 15px;
        color: #fff;
        font-size: 54px;
        line-height: 1.2em;
        text-align: center;
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
        width: 100%;
        text-align: center;
        color: #a4c9ff;
        font-size: 19px;        
    }

    .bot_wrapper .integration img {
        margin: 10px 15px;
    }

    .bot_wrapper .yandex {
        height: 43px;
        width: 50%; 
        float: left;
    }

    .bot_wrapper .yandex > img {
        height: 43px;
        float: right;
    }

    .bot_wrapper .github {
        height: 43px;
        width: 50%; 
        float: right;
    }

    .bot_wrapper .github > img {
        margin-top: 27px;
    }

    .bot_wrapper .demo {       
        width: 400px;
        height: 350px;
        display: block;
        position: relative;
        margin: 0 auto;
        background-color: #fff;
    }

    .bot_wrapper .demo .photo {        
        width: 50px;
        height: 50px;
        display: inline-block;
        margin-right: 20px;
        margin-left: 20px;
        border-radius: 50%;
        background-color: #eee;
    }

    .bot_wrapper .demo .msg {
       display: inline-block;
    }

    .bot_wrapper .demo .name {
        color: #ba619a; 
        font-weight: bold;
    }

    .bot_wrapper .demo .msg .command {
        color: #2b74c9;
    }

    .bot_wrapper .demo_content {
        height: 99px;
        width: 100%;
        display: flex;
        align-items: center;        
        margin-top: 200px;
        padding-bottom: 10px;
        border-bottom: 1px solid #e5e9f1;
    }

    .bot_wrapper .write {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 15px 18px;        
        cursor: pointer;
        color: #838aa5;
    }

    .bot_wrapper .send {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 15px 18px;        
        cursor: pointer;
        color: #2e8de6;
    }

    @media all and (max-width: 800px) {
        
        .bot_wrapper {
            padding-bottom: 40px;
        }

        .bot_wrapper h1 {            
            padding: 30px 0 10px 0;
            margin-bottom: 0;
            font-size: 44px; 
        }

        .bot_wrapper .description {            
            padding-right: 10px;
            padding-left: 10px;
            text-align: center;
            font-size: 18px;
        }

        .bot_wrapper .demo {
            height: 280px;
            max-width: 90%;
            margin-right: auto;
            margin-left: auto;            
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
            height: 24px;
            margin-top: 20px;
        }

        .bot_wrapper .demo_content {
            margin-top: 133px;
            padding-bottom: 0;
        }

        .bot_wrapper .demo .msg {
            font-size: 14px;
            white-space: nowrap;
        }

        .bot_wrapper .demo .name {
            font-size: 15px;
        }
        
        .bot_wrapper .demo .photo {
            margin-right: 15px;
        }

        .bot_wrapper .write, .bot_wrapper .send {            
            padding: 13px 18px;
            font-size: 14px;
        }
    }
    </style>
<div class="center_side ">
<div class="bot_wrapper">
    <h1 itemprop="headline">CodeX Bot</h1>
    <p class="description">Telegram bot-platform for developers and managers</p>
    <div class="integration">
        <div class="title">Easy integration with</div>
        <div class="github">
            <img src="/public/img/bot-landing__github.svg">
        </div>
        <div class="yandex">
            <img src="/public/img/Yandex.svg">
        </div>         
    </div>
    <div class="demo clearfix">
        <div class="demo_content">
            <div class="photo"></div>        
             <div class="msg">
                 <div class="name">CodeX Bot</div>
                 Press <span class="command">/help</span> to view menu
             </div>
        </div>        
        <div class="write">
            Write a message...
        </div>
        <div class="send">Send
        </div>        
    </div>
     
</div>
</div>