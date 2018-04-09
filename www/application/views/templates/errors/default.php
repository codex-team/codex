<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>We've got this</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
            font-size: 14px;
            text-align: center;
        }
        .wrapper{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        a {
            color: inherit;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <a href="/">
            <? include(DOCROOT . "public/app/img/codex-logo.svg") ?>
        </a>
        <h1>We've got the error</h1>
        <a href="#" onclick="history.back();">Back</a>
    </div>
</body>
</html>
