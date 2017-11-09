<section class="site-section">
    <h2 class="site-section__title">Our articles</h2>
    <div class="site-section__desc">We are writing about our experience and researches.</div>

    <? echo Debug::vars($recentArticles); ?>

    <?
        $articles = array();
        $articles[] = array(
            'title' => 'How to get free SSL cert with Let’s Encrypt',
            'cover' => '/public/app/img/articles/covers/lets-encrypt.png',
            'url' =>  '/aritlce/123',
            'author' => array(
                'url'  => '',
                'name' => 'Alexandr Menshikov',
                'photo' => 'https://ifmo.su/upload/users/qNgjN82zGBE_quad_1451238345.jpg'
            ),
            'readTime' => 2
        );

        $articles[] = array(
            'title' => 'GitHub Code Owners: повышаем эффективность код‑ревью',
            'cover' => '/public/app/img/articles/covers/github-codeowners.png',
            'url' =>  '/aritlce/123',
            'author' => array(
                'url'  => '',
                'name' => 'Taly Guryn',
                'photo' => 'https://avatars.githubusercontent.com/u/15259299?v=3'
            ),
            'readTime' => 2
        );

        $articles[] = array(
            'title' => 'Webpack: сборка JavaScript модулей',
            'cover' => '/public/app/img/articles/covers/webpack.png',
            'url' =>  '/aritlce/123',
            'author' => array(
                'url'  => '',
                'name' => 'Khaydarov Murod',
                'photo' => 'https://ifmo.su/upload/users/illusion_drawings_11_1456230265.jpg'
            ),
            'readTime' => 2
        );
    ?>

    <div class="articles-grid">
        <? foreach ($articles as $article): ?>
            <section class="articles-grid__item">
                <div class="article-card">
                    <a class="article-card__cover" href="<?= $article['url']?>" style="background-image: url(<?= $article['cover'] ?>)">
                    </a>
                    <a class="article-card__title" href="<?= $article['url']?>">
                        <?= $article['title'] ?>
                    </a>

                    <footer class="article-card__footer">
                        <a class="article-card__photo" href="<?= $article['author']['url'] ?>">
                            <img src="<?= $article['author']['photo'] ?>" alt="<?= $article['author']['name'] ?>">
                        </a>
                        <a href="article-card__user-name" href="<?= $article['author']['url'] ?>">
                            <?= $article['author']['name'] ?>
                        </a>
                        <div class="article-card__read-time">
                            <?= $article['readTime'] ?> min read
                        </div>
                    </footer>
                </div>
            </section>
        <? endforeach; ?>
    </div>
    <a class="site-section__go-more-link" href="/articles">View other articles »</a>
</section>
