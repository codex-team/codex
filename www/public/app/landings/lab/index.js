'use strict';

require('./lab.pcss');


(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const polygons = Array.from(document.querySelectorAll('.lab-page__cycle-list-items-polygon'));
            const polygonTitles = Array.from(document.querySelectorAll('.lab-page__cycle-list li'));

            polygons.forEach(polygon => {

                const polygonIndex = polygons.indexOf(polygon);

                setTimeout(() => {

                    polygon.classList.add('lab-page--animated-visible');
                    polygonTitles[polygonIndex].classList.add('lab-page--animated-visible');

                }, polygonIndex * 50);

            });

        }

    });

})).observe(document.querySelector('.lab-page__cycle-list'));


(new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const stars = Array.from(document.querySelectorAll('.lab-page__roles-list-items-star'));
            const starTitles = Array.from(document.querySelectorAll('.lab-page__roles-list li'));

            stars.forEach(star => {

                const starIndex = stars.indexOf(star);

                setTimeout(() => {

                    star.classList.add('lab-page--animated-visible');
                    starTitles[starIndex].classList.add('lab-page--animated-visible');

                }, starIndex * 50);

            });

        }

    });

})).observe(document.querySelector('.lab-page__roles-list'));
