<link rel="stylesheet" href="/public/build/landingLab.bundle.css?v=<?= filemtime("public/build/landingLab.bundle.css") ?>">

<div class="lab-page">
    <div class="lab-page__intro">
        <img class="lab-page__intro-logo" src="/public/app/img/codex-logo.svg" />

        <!-- <h1 class="lab-page__intro-header">
            CodeX
        </h1> -->
        <!-- <div class="lab-page__intro-description">
            Клуб open-source разработки
        </div> -->
        <div class="lab-page__intro-anthem">
            Для тех, кто любит писать код
        </div>
    </div>

    <div class="lab-page__banner-pic">
        <img src="https://static.codex.so/upload/redactor_images/o_9fe12a632b1dbe4e13d4561865dfb7fe.jpg" />
    </div>

    <div class="lab-page__description">
        <div class="lab-page__description-text">
            CodeX — клуб веб-разработки. Это место для студентов, которые горят технологиями. Все наши проекты имеют открытый исходный код.

            <a
                class="lab-page__description-github"
                href="https://github.com/codex-team"
                target="_blank"
            >
                <img src="/public/app/landings/lab/assets/icons/github.svg"/>
                github.com/codex-team
            </a>

            <a
                class="lab-page__description-npm"
                href="https://www.npmjs.com/~codex-team"
                target="_blank"
            >
                <img src="/public/app/landings/lab/assets/icons/npm.svg"/>
                npmjs.com/~codex-team
            </a>
        </div>
        <div class="lab-page__projects">
            <?php
                $projects = [
                    [
                        'name' => 'Editor.js',
                        'url' => 'https://github.com/codex-team/editor.js',
                        'icon' => '/public/app/landings/lab/assets/icons/editorjs.svg',
                        'subline' => '⭐️ 31,000+',
                    ],
                    [
                        'name' => 'Codex Docs',
                        'url' => 'https://github.com/codex-team/codex.docs',
                        'icon' => '/public/app/landings/lab/assets/icons/docs.svg',
                        'subline' => '⭐️ 800+',
                    ],
                    [
                        'name' => 'Hawk',
                        'url' => 'https://github.com/codex-team/hawk.mono',
                        'icon' => '/public/app/landings/lab/assets/icons/hawk.png',
                        'subline' => '1500+ companies',
                    ],
                ];
            ?>

            <? foreach ($projects as $project): ?>
                <a class="lab-page__projects-item" href="<?= $project['url'] ?>" target="_blank">
                    <img src="<?= $project['icon'] ?>"/>
                    <div class="lab-page__projects-item-content">
                        <span class="lab-page__projects-item-title">
                            <?= $project['name'] ?>
                        </span>

                        <span class="lab-page__projects-item-subline">
                            <?= $project['subline'] ?>
                        </span>
                    </div>
                </a>
            <? endforeach; ?>
        </div>
        <!-- <img class="lab-page__description-pic" src="/public/app/img/codex-logo.svg" /> -->
    </div>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Не только кодинг
        </h2>

        <div class="lab-page__section-description">
            У нас можно попробовать себя в разных направлениях продуктовой работы: от разработки и дизайна до аналитики и менеджмента.
        </div>

        <ul class="lab-page__section-content lab-page__directions">
            <?php

            $directions = [
                [
                    'name' => 'Веб-дизайн',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" fill-rule="evenodd" d="M145.713 752c1.994 0 3.988-.2 5.982-.498l168.19-29.508c1.994-.399 3.888-1.296 5.284-2.792l423.915-423.875a9.927 9.927 0 0 0 0-14.056l-166.196-166.38c-1.894-1.894-4.388-2.891-7.079-2.891s-5.184.997-7.078 2.891L144.816 538.766c-1.495 1.496-2.393 3.29-2.791 5.284l-29.511 168.174c-1.894 11.066 1.495 21.932 9.372 29.807c6.58 6.48 14.954 9.969 23.827 9.969m51.743-85.433l15.653-88.922l362.7-362.667l73.278 73.271l-362.7 362.667zm401.37-98.639c27.691-14.812 57.293-20.852 85.545-15.519c32.365 6.11 59.72 26.534 78.96 59.406c29.974 51.211 21.642 102.332-18.484 144.254c-17.577 18.364-41.07 35.013-69.996 50.297l-.293.152l.848.26c13.153 3.956 27.085 6.1 41.54 6.21l1.174.005c61.068 0 100.981-22.104 125.285-67.876c9.325-17.56 31.119-24.237 48.679-14.913c17.56 9.325 24.237 31.119 14.912 48.68c-37.285 70.218-102.092 106.109-188.876 106.109c-47.687 0-91.94-15.03-128.188-41.368l-1.056-.774l-1.36.473c-46.18 15.996-98.732 29.945-155.37 41.932l-2.239.472c-48.571 10.217-97.257 18.377-139.154 23.957c-19.709 2.625-37.813-11.224-40.438-30.932c-2.625-19.709 11.224-37.813 30.932-40.438c40.196-5.353 87.126-13.22 133.84-23.045c42.799-9.002 83.011-19.134 119.357-30.342l.234-.074l-.436-.693c-16.464-26.452-25.857-55.432-26.142-83.24l-.007-1.303c0-49.907 39.555-104.315 90.733-131.69m72.188 55.231c-10.74-2.027-24.099.699-38.228 8.257c-29.546 15.804-52.693 47.643-52.693 68.202c0 18.206 8.889 40.146 24.71 59.736l.238.293l1.223-.514c39.17-16.581 68.483-34.271 85.929-52.186l.64-.663c18.735-19.573 21.386-35.842 8.36-58.1c-9.059-15.475-19.03-22.92-30.18-25.025"/></svg>',
                ],
                [
                    'name' => 'Frontend',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M834.1 469.2A347.5 347.5 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8c-1.4 1.5-3 1.9-4.1 2s-2.8-.1-4.3-1.5c-1.4-1.2-2.1-3-2-4.8c3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9c-11 29.5-26.8 56.9-47 81.5a295.6 295.6 0 0 1-47.5 46.1a352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9M713 808.5c-53.7 53.2-125 82.4-201 82.4s-147.3-29.2-201-82.4c-53.5-53.1-83-123.5-83-198.4c0-43.5 9.8-85.2 29.1-124c18.8-37.9 46.8-71.8 80.8-97.9a349.6 349.6 0 0 0 58.6-56.8c25-30.5 44.6-64.5 58.2-101a240 240 0 0 0 12.1-46.5c24.1 22.2 44.3 49 61.2 80.4c33.4 62.6 48.8 118.3 45.8 165.7a74.01 74.01 0 0 0 24.4 59.8a73.36 73.36 0 0 0 53.4 18.8c19.7-1 37.8-9.7 51-24.4c13.3-14.9 24.8-30.1 34.4-45.6c14 17.9 25.7 37.4 35 58.4c15.9 35.8 24 73.9 24 113.1c0 74.9-29.5 145.4-83 198.4"/></svg>',
                ],
                [
                    'name' => 'Backend',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M888.3 693.2c-42.5-24.6-94.3-18-129.2 12.8l-53-30.7V523.6c0-15.7-8.4-30.3-22-38.1l-136-78.3v-67.1c44.2-15 76-56.8 76-106.1c0-61.9-50.1-112-112-112s-112 50.1-112 112c0 49.3 31.8 91.1 76 106.1v67.1l-136 78.3c-13.6 7.8-22 22.4-22 38.1v151.6l-53 30.7c-34.9-30.8-86.8-37.4-129.2-12.8c-53.5 31-71.7 99.4-41 152.9c30.8 53.5 98.9 71.9 152.2 41c42.5-24.6 62.7-73 53.6-118.8l48.7-28.3l140.6 81c6.8 3.9 14.4 5.9 22 5.9s15.2-2 22-5.9L674.5 740l48.7 28.3c-9.1 45.7 11.2 94.2 53.6 118.8c53.3 30.9 121.5 12.6 152.2-41c30.8-53.6 12.6-122-40.7-152.9m-673 138.4a47.6 47.6 0 0 1-65.2-17.6c-13.2-22.9-5.4-52.3 17.5-65.5a47.6 47.6 0 0 1 65.2 17.6c13.2 22.9 5.4 52.3-17.5 65.5M464 234a48.01 48.01 0 0 1 96 0a48.01 48.01 0 0 1-96 0m170 446.2l-122 70.3l-122-70.3V539.8l122-70.3l122 70.3zm239.9 133.9c-13.2 22.9-42.4 30.8-65.2 17.6s-30.7-42.6-17.5-65.5s42.4-30.8 65.2-17.6c22.9 13.2 30.7 42.5 17.5 65.5"/></svg>',
                ],
                [
                    'name' => 'DevOps & SRE',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M518.3 459a8 8 0 0 0-12.6 0l-112 141.7a7.98 7.98 0 0 0 6.3 12.9h73.9V856c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V613.7H624c6.7 0 10.4-7.7 6.3-12.9z"/><path fill="currentColor" d="M811.4 366.7C765.6 245.9 648.9 160 512.2 160S258.8 245.8 213 366.6C127.3 389.1 64 467.2 64 560c0 110.5 89.5 200 199.9 200H304c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8h-40.1c-33.7 0-65.4-13.4-89-37.7c-23.5-24.2-36-56.8-34.9-90.6c.9-26.4 9.9-51.2 26.2-72.1c16.7-21.3 40.1-36.8 66.1-43.7l37.9-9.9l13.9-36.6c8.6-22.8 20.6-44.1 35.7-63.4a245.6 245.6 0 0 1 52.4-49.9c41.1-28.9 89.5-44.2 140-44.2s98.9 15.3 140 44.2c19.9 14 37.5 30.8 52.4 49.9c15.1 19.3 27.1 40.7 35.7 63.4l13.8 36.5l37.8 10C846.1 454.5 884 503.8 884 560c0 33.1-12.9 64.3-36.3 87.7a123.07 123.07 0 0 1-87.6 36.3H720c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h40.1C870.5 760 960 670.5 960 560c0-92.7-63.1-170.7-148.6-193.3"/></svg>',
                ],
                [
                    'name' => 'QA',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M304 280h56c4.4 0 8-3.6 8-8c0-28.3 5.9-53.2 17.1-73.5c10.6-19.4 26-34.8 45.4-45.4C450.9 142 475.7 136 504 136h16c28.3 0 53.2 5.9 73.5 17.1c19.4 10.6 34.8 26 45.4 45.4C650 218.9 656 243.7 656 272c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8c0-40-8.8-76.7-25.9-108.1c-17.2-31.5-42.5-56.8-74-74C596.7 72.8 560 64 520 64h-16c-40 0-76.7 8.8-108.1 25.9c-31.5 17.2-56.8 42.5-74 74C304.8 195.3 296 232 296 272c0 4.4 3.6 8 8 8"/><path fill="currentColor" d="M940 512H792V412c76.8 0 139-62.2 139-139c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8c0 34.8-28.2 63-63 63H232c-34.8 0-63-28.2-63-63c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8c0 76.8 62.2 139 139 139v100H84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h148v96c0 6.5.2 13 .7 19.3C164.1 728.6 116 796.7 116 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8c0-44.2 23.9-82.9 59.6-103.7c6 17.2 13.6 33.6 22.7 49c24.3 41.5 59 76.2 100.5 100.5S460.5 960 512 960s99.8-13.9 141.3-38.2s76.2-59 100.5-100.5c9.1-15.5 16.7-31.9 22.7-49C812.1 793.1 836 831.8 836 876c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8c0-79.3-48.1-147.4-116.7-176.7c.4-6.4.7-12.8.7-19.3v-96h148c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8M716 680c0 36.8-9.7 72-27.8 102.9c-17.7 30.3-43 55.6-73.3 73.3C584 874.3 548.8 884 512 884s-72-9.7-102.9-27.8c-30.3-17.7-55.6-43-73.3-73.3C317.7 752 308 716.8 308 680V412h408z"/></svg>',
                ],
                [
                    'name' => 'PR',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M960 509.2c0-2.2 0-4.7-.1-7.6c-.1-8.1-.3-17.2-.5-26.9c-.8-27.9-2.2-55.7-4.4-81.9c-3-36.1-7.4-66.2-13.4-88.8a139.52 139.52 0 0 0-98.3-98.5c-28.3-7.6-83.7-12.3-161.7-15.2c-37.1-1.4-76.8-2.3-116.5-2.8c-13.9-.2-26.8-.3-38.4-.4h-29.4c-11.6.1-24.5.2-38.4.4c-39.7.5-79.4 1.4-116.5 2.8c-78 3-133.5 7.7-161.7 15.2A139.35 139.35 0 0 0 82.4 304C76.3 326.6 72 356.7 69 392.8c-2.2 26.2-3.6 54-4.4 81.9c-.3 9.7-.4 18.8-.5 26.9c0 2.9-.1 5.4-.1 7.6v5.6c0 2.2 0 4.7.1 7.6c.1 8.1.3 17.2.5 26.9c.8 27.9 2.2 55.7 4.4 81.9c3 36.1 7.4 66.2 13.4 88.8c12.8 47.9 50.4 85.7 98.3 98.5c28.2 7.6 83.7 12.3 161.7 15.2c37.1 1.4 76.8 2.3 116.5 2.8c13.9.2 26.8.3 38.4.4h29.4c11.6-.1 24.5-.2 38.4-.4c39.7-.5 79.4-1.4 116.5-2.8c78-3 133.5-7.7 161.7-15.2c47.9-12.8 85.5-50.5 98.3-98.5c6.1-22.6 10.4-52.7 13.4-88.8c2.2-26.2 3.6-54 4.4-81.9c.3-9.7.4-18.8.5-26.9c0-2.9.1-5.4.1-7.6zm-72 5.2c0 2.1 0 4.4-.1 7.1c-.1 7.8-.3 16.4-.5 25.7c-.7 26.6-2.1 53.2-4.2 77.9c-2.7 32.2-6.5 58.6-11.2 76.3c-6.2 23.1-24.4 41.4-47.4 47.5c-21 5.6-73.9 10.1-145.8 12.8c-36.4 1.4-75.6 2.3-114.7 2.8c-13.7.2-26.4.3-37.8.3h-28.6l-37.8-.3c-39.1-.5-78.2-1.4-114.7-2.8c-71.9-2.8-124.9-7.2-145.8-12.8c-23-6.2-41.2-24.4-47.4-47.5c-4.7-17.7-8.5-44.1-11.2-76.3c-2.1-24.7-3.4-51.3-4.2-77.9c-.3-9.3-.4-18-.5-25.7c0-2.7-.1-5.1-.1-7.1v-4.8c0-2.1 0-4.4.1-7.1c.1-7.8.3-16.4.5-25.7c.7-26.6 2.1-53.2 4.2-77.9c2.7-32.2 6.5-58.6 11.2-76.3c6.2-23.1 24.4-41.4 47.4-47.5c21-5.6 73.9-10.1 145.8-12.8c36.4-1.4 75.6-2.3 114.7-2.8c13.7-.2 26.4-.3 37.8-.3h28.6l37.8.3c39.1.5 78.2 1.4 114.7 2.8c71.9 2.8 124.9 7.2 145.8 12.8c23 6.2 41.2 24.4 47.4 47.5c4.7 17.7 8.5 44.1 11.2 76.3c2.1 24.7 3.4 51.3 4.2 77.9c.3 9.3.4 18 .5 25.7c0 2.7.1 5.1.1 7.1zM423 646l232-135l-232-133z"/></svg>',
                ],
                [
                    'name' => 'Проектный менеджмент',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7"/><path fill="currentColor" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372"/></svg>',
                ],
                [
                    'name' => 'Аналитика',
                    'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path fill="currentColor" fill-rule="evenodd" d="M482.878 128c-84.345 0-156.575 52.808-185.68 126.983c-60.887 8.128-115.29 43.622-146.595 97.837c-42.163 72.994-32.556 161.882 17.137 224.158c-23.38 56.748-19.853 121.597 11.424 175.782c42.18 73.024 124.095 109.152 202.937 97.235C419.585 898.621 477.51 928 540.121 928c84.346 0 156.576-52.808 185.68-126.983c60.888-8.128 115.291-43.622 146.596-97.837c42.163-72.994 32.556-161.882-17.137-224.158c23.38-56.748 19.853-121.597-11.424-175.782c-42.18-73.024-124.095-109.152-202.937-97.235C603.415 157.379 545.49 128 482.879 128m0 61.538c35.593 0 68.972 13.99 94.223 37.74c-1.928 1.031-3.925 1.845-5.832 2.946L434.594 309.13c-14.223 8.184-23.028 23.353-23.09 39.783l-.841 183.594l-65.722-38.341V327.399c0-76 61.895-137.86 137.937-137.86m197.706 75.902c44.186 3.142 86.154 27.435 109.917 68.57c17.794 30.797 22.38 66.692 14.43 100.42c-1.879-1.169-3.6-2.491-5.531-3.605l-136.734-78.907a46.23 46.23 0 0 0-46-.06l-159.463 91.106l.36-76.022l144.492-83.413c24.694-14.25 52.017-19.974 78.53-18.09M283.67 320.849c-.071 2.19-.3 4.343-.3 6.55v157.752a46.19 46.19 0 0 0 22.91 39.904l158.68 92.488l-66.021 37.68l-144.552-83.353c-65.852-38-88.47-122.526-50.448-188.341c17.783-30.78 46.556-52.689 79.731-62.68m340.393 79.927l144.552 83.354c65.852 38 88.47 122.526 50.448 188.341c-17.783 30.78-46.556 52.689-79.731 62.68c.071-2.19.3-4.343.3-6.55V570.849a46.19 46.19 0 0 0-22.91-39.904l-158.68-92.488zM511.801 464.84l54.537 31.79l-.3 63.222l-54.839 31.31l-54.537-31.85l.3-63.162zm100.536 58.654l65.722 38.341v166.767c0 76-61.895 137.86-137.937 137.86c-35.593 0-68.972-13.988-94.223-37.74c1.928-1.03 3.925-1.844 5.832-2.945l136.675-78.906c14.223-8.184 23.028-23.353 23.09-39.783zm-46.54 89.543l-.36 76.022l-144.492 83.413c-65.852 38-150.425 15.335-188.446-50.48c-17.794-30.798-22.38-66.693-14.43-100.421c1.879 1.169 3.6 2.491 5.531 3.605l136.735 78.907a46.23 46.23 0 0 0 45.999.06z"/></svg>',
                ],
            ];

            foreach ($directions as $direction): ?>
                <li>
                    <?= $direction['icon'] ?>
                    <?= $direction['name'] ?>
                </li>
            <? endforeach; ?>
            </ul>
    </section>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Продуктовая разработка
        </h2>

        <div class="lab-page__section-description">
            Получите уникальный опыт создания и запуска продуктов.<br>
            Такому не учат на парах.
        </div>

        <div class="lab-page__section-content lab-page__cycle-list">
            <div class="lab-page__cycle-list-items lab-page__cycle-list-items--slide">
                <? include(DOCROOT . 'public/app/landings/lab/assets/rectangles.svg'); ?>
            </div>

            <ul class="lab-page__section-list lab-page__section-list--cycle">
                <li>Идея</li>
                <li>Исследования</li>
                <li>Прототипирование</li>
                <li>Дизайн</li>
                <li>Архитектура</li>
                <li>Разработка</li>
                <li>Документация</li>
                <li>DevOps</li>
                <li>QA</li>
                <li>Юридические вопросы</li>
                <li>Релиз 🎉</li>
                <li>PR</li>
                <li>Поддержка</li>
                <li>Дорожная карта</li>
                <li>Аналитика</li>
            </ul>

            <div class="lab-page__cycle-list-items lab-page__cycle-list-items--stack">
                <? include(DOCROOT . 'public/app/landings/lab/assets/stack.svg'); ?>
            </div>
        </div>
    </section>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Роли в команде
        </h2>

        <div class="lab-page__section-description">
            Попробуйте себя в разных ролях. Вы научитесь выстраивать бизнес-процессы,
            решать сложные командные задачи и доводить дела до конца.
        </div>

        <div class="lab-page__section-list lab-page__roles-list">
            <div class="lab-page__roles-list-items">
                <? include(DOCROOT . 'public/app/landings/lab/assets/stars.svg'); ?>
            </div>

            <ul class="lab-page__section-list lab-page__section-list--roles">
                <li>Engineering</li>
                <li>Tech Leading</li>
                <li>Design</li>
                <li>Task Management</li>
                <li>System Design</li>
                <li>SRE & DevOps</li>
                <li>Scaling</li>
                <li>Public Relations</li>
                <li>Community Management</li>
                <li>Events Management</li>
                <li>Human Resources</li>
                <li>Legal Relations</li>
                <li>Business Analytics</li>
                <li>Quality Assurance</li>
                <li>Teammates Motivation</li>
                <li>Incident Management</li>
                <li>Content Creation</li>
            </ul>
        </div>
    </section>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Все онлайн
        </h2>

        <div class="lab-page__section-description">
            CodeX — международная команда. Рабочая коммуникация происходит на английском и русском языках.

            <p>
                Вся работа происходит удаленно.
                Также у нас есть лаборатория в Санкт-Петербурге.
            </p>
        </div>



    </section>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Требования
        </h2>

        <div class="lab-page__section-description">
            Мы не занимаемся изучением основ, а прокачиваем скилы в реальных задачах.
            Мы много работаем, стремимся соблюдать самые высокие стандарты качества.
            Это непросто и подойдет не каждому.

            <p>
                Без этих параметров вам будет сложно работать в Кодексе:
            </p>
        </div>

        <div class="lab-page__section-content lab-page__requirements">
            <ul>
                <li>У вас уже есть навыки</li>
                <li>У вас достаточно мотивации и времени</li>
                <li>Умеете самостоятельно осваивать новые технологии</li>
                <li>Готовы учиться и слушать критику</li>
                <li>Готовы работать как в команде, так и самостоятельно</li>
            </ul>
        </div>

        <div class="lab-page__section-description">
             Взамен вы получите гигантское количество опыта и новых навыков, интересные и сложные задачи,
            возможность поучаствовать в создании и запуске проектов на мировом рынке. А еще вы найдете новых друзей и единомышленников.
        </div>

    </section>

    <section class="lab-page__section lab-page__form-wrapper" data-loading="false" id="join-form-wrapper">
        <div class="lab-page__form-wrapper-inner">
            <h2 class="lab-page__section-title">
                Заявка на вступление
            </h2>

            <? if ( empty($request) ): ?>
                <div class="lab-page__section-description">
                    Если вы хотите вступить в CodeX, заполните небольшую анкету, и мы с вами свяжемся.
                </div>
            <? endif; ?>

            <div class="lab-page__section-content">
            <? if ( !$request ): ?>
                <form class="lab-page__form" id="joinForm" method="post" action="/process-join-form" data-loading="false">
                            <input type="hidden" name="csrf" value="<?= Security::token() ?>">

                            <? /*if ($user->id): ?>
                                <div class="lab-page__user">
                                    <img class="lab-page__user-photo" src="<?= $user->photo ?>" alt="<?= $user->name ?>"/>
                                    <span class="lab-page__user-name"><?= $user->name ?></span>
                                </div>
                            <? else:*/?>


                                <div>
                                    <label for="name">Имя</label><br>
                                    <input name="name" type="text" required />
                                </div>

                                <div>
                                    <label for="email">Telegram для связи</label><br>
                                    <input name="email" type="text" required />
                                </div>
                            <?// endif ?>

                            <div>
                                <label for="skills">Расскажите о ваших навыках</label><br>
                                <textarea name="skills" id="skills-textarea" cols="30" rows="3" required></textarea>
                            </div>


                            <div>
                                <label for="wishes">Чем вы хотите заниматься в CodeX</label><br>
                                <textarea name="wishes" id="wishes-textarea" cols="30" rows="3" required></textarea>
                            </div>

                            <div>
                                <button type="submit" id="submit-button">
                                    <span class="button-text">Отправить заявку</span>
                                    <span class="button-loader">
                                        <span class="spinner"></span>
                                        Отправляем...
                                    </span>
                                </button>
                            </div>
                    </form>
                <? endif ; ?>

                <div class="lab-page__form-success" id="success-message-banner" <?= !$request ? 'hidden' : '' ?>>

                    <p>
                        ✅ Ваша заявка отправлена.
                    </p>
                    <p>
                        Подписывайтесь на <a href="https://t.me/+4MAinEkJkS5lZDRi" target="_blank">
                            <svg width="139" height="116" viewBox="0 0 139 116" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.55425 49.5936C46.8742 33.3376 71.7543 22.6196 84.1943 17.4416C119.754 2.65561 127.134 0.0876171 131.954 0.000771265C133.014 -0.0163829 135.374 0.245616 136.914 1.49162C138.194 2.54162 138.554 3.96161 138.734 4.95761C138.894 5.95361 139.114 8.22361 138.934 9.99561C137.014 30.2356 128.674 79.3516 124.434 102.022C122.654 111.614 119.114 114.83 115.694 115.144C108.254 115.828 102.614 110.232 95.4143 105.514C84.1543 98.1276 77.7942 93.5316 66.8542 86.3256C54.2142 77.9976 62.4143 73.4196 69.6143 65.9396C71.4943 63.9816 104.254 34.1916 104.874 31.4896C104.954 31.1516 105.034 29.8916 104.274 29.2276C103.534 28.5616 102.434 28.7896 101.634 28.9696C100.494 29.2256 82.5142 41.1216 47.6342 64.6556C42.5342 68.1636 37.9142 69.8736 33.7542 69.7836C29.1942 69.6856 20.3943 67.1996 13.8543 65.0756C5.85425 62.4696 -0.525752 61.0916 0.0342482 56.6656C0.314248 54.3616 3.49425 52.0036 9.55425 49.5936Z"/>
                            </svg>

                            CodeX Intake 2025
                        </a> — канал для вступающих в CodeX. Там будет вся информация.
                    </p>

                </div>
            </div>
        </div>
    </section>

    <section class="lab-page__section">
        <h2 class="lab-page__section-title">
            Подписывайтесь
        </h2>

        <div class="lab-page__section-description">
            За новостями набора, продуктов и событий в CodeX можно следить в наших социальных сетях.
        </div>

        <div class="lab-page__section-content lab-page__about-icons">
            <a href="https://t.me/codex_team"           target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--telegram">
                <img src="/public/app/landings/lab/assets/icons/telegram.svg"/>
            </a>
            <a href="https://vk.com/codex_team"         target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--vk">
                <img src="/public/app/landings/lab/assets/icons/vk.svg"/>
            </a>
            <!-- <a href="https://twitter.com/codex_team"    target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--twitter">
                <img src="/public/app/landings/lab/assets/icons/twitter.svg"/>
            </a> -->
            <!-- <a href="https://github.com/codex-team"     target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--github">
                <img src="/public/app/landings/lab/assets/icons/github.svg"/>
            </a> -->
            <!-- <a href="https://www.npmjs.com/~codex-team" target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--npm">
                <img src="/public/app/landings/lab/assets/icons/npm.svg"/>
            </a> -->
            <a href="https://instagram.com/codex_team"  target="_blank" class="lab-page__about-icons-item lab-page__about-icons-item--instagram">
                <img src="/public/app/landings/lab/assets/icons/instagram.svg"/>
            </a>
        </div>
    </section>


    <section class="lab-page__section" style="margin-bottom: 200px;">
        <h2 class="lab-page__section-title">
            Партнёры
        </h2>

        <div class="lab-page__section-content">
            <div class="lab-page__partners-list-row">
                <img class="lab-page__partners-item lab-page__partners-item--mnoc" src="/public/app/landings/lab/assets/faculty-of-secure-information-technologies.svg"/>
                <img class="lab-page__partners-item lab-page__partners-item--itmo" src="/public/app/landings/lab/assets/itmo-logo.svg"/>
            </div>
            <div class="lab-page__partners-list-row">
                <a class="lab-page__partners-item lab-page__partners-item--isac" href="https://cit.itmo.ru/ru/" target="_blank">
                    <div class="lab-page__partners-item--isac-title">
                        Международный научно-образовательный центр
                    </div>
                    <div class="lab-page__partners-item--isac-name">
                        «Безопасность и защита критических цифровых технологий»
                    </div>
                </a>
            </div>
        </div>
    </section>

    <div data-module="join">
        <textarea name="module-settings" hidden>
            {}
        </textarea>
    </div>
</div>

<script src="/public/build/landingLab.bundle.js?v=<?= filemtime("public/build/landingLab.bundle.js") ?>"></script>

<style>
/**
 * Spinner animation for loading state
 */
.spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solidrgb(255, 255, 255);
    border-top: 2px solid rgb(255, 255, 255, .5);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/**
 * Form wrapper loading state styles
 */
.lab-page__form-wrapper[data-loading="true"] {
    pointer-events: none;
    opacity: 0.7;
}

.lab-page__form-wrapper[data-submitted="true"] .lab-page__section-description {
    display: none;
}


/**
 * Button text and loader toggle
 */
.button-text {
    display: inline;
}

.button-loader {
    display: none;
    align-items: center;
    justify-content: center;
}

.lab-page__form-wrapper[data-loading="true"] .button-text {
    display: none;
}

.lab-page__form-wrapper[data-loading="true"] .button-loader {
    display: flex;
}
</style>

<script>
/**
 * Auto-resize textareas functionality
 */
function autoResizeTextarea(textarea) {
    /**
     * Reset height to auto to get the correct scrollHeight
     */
    textarea.style.height = 'auto';

    /**
     * Set height to scrollHeight to fit content
     */
    textarea.style.height = textarea.scrollHeight + 'px';
}


/**
 * Initialize auto-resize for textareas
 */
document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('#skills-textarea, #wishes-textarea');

    textareas.forEach(function(textarea) {
        /**
         * Set initial height
         */
        autoResizeTextarea(textarea);

        /**
         * Add event listener for input changes
         */
        textarea.addEventListener('input', function() {
            autoResizeTextarea(this);
        });

        /**
         * Add event listener for paste events
         */
        textarea.addEventListener('paste', function() {
            /**
             * Use setTimeout to allow paste content to be processed
             */
            setTimeout(function() {
                autoResizeTextarea(textarea);
            }, 0);
        });
    });

});
</script>
