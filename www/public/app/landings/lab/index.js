'use strict';

require('./lab.pcss');

const DELAY_BETWEEN_ITEMS = 300;


(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const polygonTitles = Array.from(document.querySelectorAll('.lab-page__cycle-list-items-titles li'));
            const polygonsSlide = Array.from(document.querySelectorAll('.lab-page__cycle-list-items--slide path'));
            const polygonsStack = Array.from(document.querySelectorAll('.lab-page__cycle-list-items--stack path'));

            polygonTitles.forEach(polygonTitle => {

                const polygonIndex = polygonTitles.indexOf(polygonTitle);

                setTimeout(() => {

                    polygonTitle.classList.add('lab-page--animated-visible');
                    polygonsStack[polygonIndex].classList.add('lab-page--animated-visible');
                    polygonsSlide[polygonIndex].classList.add('lab-page--animated-visible');

                }, polygonIndex * DELAY_BETWEEN_ITEMS);

            });

        }

    });

}, {threshold: 0.5})).observe(document.querySelector('.lab-page__cycle-list-items-titles'));


(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const starTitles = Array.from(document.querySelectorAll('.lab-page__roles-list-items-titles li'));
            const stars = Array.from(document.querySelectorAll('.lab-page__roles-list-items path'));

            starTitles.forEach(starTitle => {

                const starIndex = starTitles.indexOf(starTitle);

                setTimeout(() => {

                    starTitle.classList.add('lab-page--animated-visible');
                    stars[starIndex].classList.add('lab-page--animated-visible');

                }, starIndex * DELAY_BETWEEN_ITEMS);

            });

        }

    });

}, {threshold: 0.5})).observe(document.querySelector('.lab-page__roles-list-items-titles'));
