'use strict';

require('./lab.pcss');

const DELAY_BETWEEN_ITEMS = 300;
const animatedClassName = 'animated';

const landing = document.querySelector('.lab-page');
const fullCycleList = landing.querySelector('.lab-page__section-list--cycle');

(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const polygonTitles = Array.from(landing.querySelectorAll('.lab-page__section-list--cycle li'));
            const polygonsSlide = Array.from(landing.querySelectorAll('.lab-page__cycle-list-items--slide path'));
            const polygonsStack = Array.from(landing.querySelectorAll('.lab-page__cycle-list-items--stack path'));

            polygonTitles.forEach(polygonTitle => {

                const polygonIndex = polygonTitles.indexOf(polygonTitle);

                setTimeout(() => {

                    polygonTitle.classList.add(animatedClassName);
                    polygonsStack[polygonsStack.length - polygonIndex -1 ].classList.add(animatedClassName);
                    polygonsSlide[polygonIndex].classList.add(animatedClassName);

                }, polygonIndex * DELAY_BETWEEN_ITEMS);

            });

        }

    });

}, {threshold: 0.5})).observe(fullCycleList);

const rolesList = landing.querySelector('.lab-page__section-list--roles');

(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const starTitles = Array.from(landing.querySelectorAll('.lab-page__section-list--roles li'));
            const stars = Array.from(landing.querySelectorAll('.lab-page__roles-list-items path'));

            starTitles.forEach(starTitle => {

                const starIndex = starTitles.indexOf(starTitle);

                setTimeout(() => {

                    starTitle.classList.add(animatedClassName);
                    stars[starIndex].classList.add('lab-page--animated-visible');

                }, starIndex * DELAY_BETWEEN_ITEMS);

            });

        }

    });

}, {threshold: 0.5})).observe(rolesList);
