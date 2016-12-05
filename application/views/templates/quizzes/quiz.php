<link rel="stylesheet" href="/public/css/quiz.css">
<script src="/public/js/quiz.js"></script>

<div id="quiz"></div>

<script>
    quiz.init( <?= json_encode($quizData); ?>, 'quiz');
</script>
