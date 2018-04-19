<? if (!empty($bestDevelopers)): ?>
    <div class="best-developers">
        <h3 class="best-developers__heading">Лучшие разработчики</h3>
        <? foreach ($bestDevelopers as $thatGuy): ?>
            <a class="best-developers__item" href="/user/<?= $thatGuy->id ?>" title="<?= $thatGuy->name ?>">
                <img class="best-developers__photo" src="<?= $thatGuy->photo ?>" alt="<?= $thatGuy->name ?>">
                <?= $thatGuy->name ?>
            </a>
        <? endforeach ?>
    </div>
<? endif ?>
