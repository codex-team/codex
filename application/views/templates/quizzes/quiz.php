<link rel="stylesheet" href="/public/css/quiz.css?v=<?= filemtime('public/css/quiz.css') ?>">
<script src="/public/js/quiz.js?v=<?= filemtime('public/js/quiz.js') ?>"></script>

<div id="quiz"></div>

<script>
    quiz.init( <?= $quizData; ?>, 'quiz');
</script>
