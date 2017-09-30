<div class="center_side">
    <article class="article">

        <h1 class="article__title">
            Backend
        </h1>

        <div class="article_content task-page">
            <p>
                Делаем фотосервис для загрузки и отдачи изображений. Основные задачи:
            </p>
            <p>
                <ul>
                    <li>Загрузка изображений</li>
                    <li>Сохранение файлов в облако</li>
                    <li>Разадача изображений с учетом фильтров</li>
                </ul>
            </p>
            <h2>Загрузка изображений</h2>
            <p>
                Изображения будут прилетать от клиентов двумя способами: в виде внешней ссылки на картинку или в виде файла. В первом случае дополнительно осуществляется скачивание исходного файла. После скачивания файлу присваивается уникальный идентификатор и оригинал изображения загружается в облако.
            </p>
            <p>
                В качестве облака используем Amazon S3. <a href="http://docs.aws.amazon.com/aws-sdk-php/v3/guide/">Документацию</a> и гайды по загрузке можно найти в интернете. Например <a href="http://docs.aws.amazon.com/aws-sdk-php/v2/guide/service-s3.html">вот</a> (v2) или <a href="http://docs.aws.amazon.com/aws-sdk-php/v3/guide/examples/s3-examples-creating-buckets.html">вот</a>.
            </p>

            <img src="/public/app/img/task/capella/uploading.png">

            <h2>Разадача изображений</h2>
            <p>
                При обращении на наш сервис за изображением по адресу вида <span class="technic">https://images.ifmo.su/9c6f59c3-abe9-4ff5-962d-f0580aca77ce/</span> получаем идентификатор изображения, скачиваем файл из облака, применяем фильтры, кешируем и отдаем.
            </p>

            <img src="/public/app/img/task/capella/delivery.png">

            <h2>Фильтры</h2>
            <p>
                Запрашивать картинки можно с фильтрами <span class="technic">crop</span> и <span class="technic">resize</span>, которые дописываются к адресу изображения (или в виде GET параметров). Формат фильтров можно придумать свой, например такой:
            </p>
            <p>
                <span class="technic">https://images.ifmo.su/9c6f59c3-abe9-4ff5-962d-f0580aca77ce/crop300x300/</span>
            </p>
            <p>
                <span class="technic">https://images.ifmo.su/9c6f59c3-abe9-4ff5-962d-f0580aca77ce/resize1200x700/</span>
            </p>
            <p>
                Все операции над изображениями делаем на нашей стороне. Amazon S3 в данном сервисе должен выступать исключительно в роли облака, которое в теории может быть безболезненно заменено на любое другое.
            </p>
            <p>
                Кропаем и ресайзим по самым простым схемам: если указана одна сторона, то подгоняем по ней, сохраняем пропорции, и тд.
            </p>
            <h2>Стек технологий</h2>
            <p>
                Пишем на <span class="technic">PHP</span>, можно использовать <span class="technic">Amazon SDK</span>. ПО для кеширования или базы данных (если потребуется) — на ваше усмотрение.
            </p>
        </div>
    </article>
</div>

