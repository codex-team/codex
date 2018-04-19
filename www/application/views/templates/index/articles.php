<? if (!empty($recentArticles)): ?>
    <section class="site-section">
        <h2 class="site-section__title">Our articles</h2>
        <div class="site-section__desc">We write about our experience and researches.</div>
        <div class="articles-grid">
            <? foreach ($recentArticles as $article): ?>
                <section class="articles-grid__item">
                    <?= View::factory('templates/articles/card', array('article'=> $article))->render(); ?>
                </section>
            <? endforeach; ?>
        </div>
        <a class="site-section__go-more-link" href="/articles">View other articles »</a>
    </section>
<? endif ?>
