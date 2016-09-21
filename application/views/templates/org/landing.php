<style type="text/css">

    /**
    * Site styles overlay
    */
    body {
        background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(/public/img/landings/org/landscape-mountains-nature-lake.jpeg);
        background-size: cover;
        background-position: 100% 50%;
        background-repeat: no-repeat;
    }
    .site_header {
        border-bottom: 1px solid #556c8b;
    }
    .site_header a,
    .site_footer a{
        color: #d0e6ff;
    }
        .site_header a:hover,
        .site_footer a:hover,
        .site_header .icon_link{
            color: #fff;
        }
    .site_footer{
        color: #bad1ff;
        border-top: 1px solid #556c8b;
    }
        .site_footer h5{
            color: #fff;
        }
        .site_footer .desclimer {
            color: #96b5ff;
        }
    .scroll_button{
        background: rgba(149, 192, 255, 0.22);
        color: #fff;
    }


    /**
    * Landing page styles
    */
    .landing {
        padding-bottom: 60px;
        text-align: center;
        color: #fff;
    }
    .landing__header {
        margin: 150px 0 15px;
        font-size: 73px;
        line-height: 1.3em;
    }
    .landing__description {
        font-size: 25px;
        line-height: 1.4em
    }
    .landing__cta {
        cursor: pointer;
        font-size: 18px;
    }

    .landing__cta a:hover {
        color: #fff;
    }

    .landing__cta_button {
        background-color: #01cd52;
        color: #fff;
        padding: 17px 48px;
        margin: 30px auto;
        border-radius: 32px;
        display: inline-block;        
    }

    .landing__cta_button:hover {
        text-decoration: none;
    }

    .landing__cta_link {
        text-decoration: underline;
        color: #fff;
        display: block;
    }
    

    

    @media all and (max-width: 800px) {
        body {
            background-size: auto 100%;
        }
        .landing {
            padding: 20px
        }
        .landing__header{
            margin-top: 50px;
            font-size: 35px;
        }
        .landing__description{
            font-size: 16px;
        }

        .landing__cta {
            font-size: 16px;
        }

        .landing__cta_button {
            margin: 15px auto;
            padding: 10px 25px;
        }

    }
    </style>
<div class="center_side">
    <div class="landing">
        <h1 class="landing__header">CodeX Org</h1>
        <p class="landing__description">Simple and fast engine for organizations</p>
        <div class="landing__cta">
            <a class="landing__cta_button">View sample</a>
            <a class="landing__cta_link">Get it for free</a>
        </div>
    </div>
</div>