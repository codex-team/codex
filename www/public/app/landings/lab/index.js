'use strict';

require('./lab.pcss');

module.exports = (() => {

    console.log('hello');

    const observer = new IntersectionObserver(entries => {


        entries.forEach(entry => {

            console.log('WOOW', entry);

            // const square = entry.target.querySelector('.square');
            //
            // if (entry.isIntersecting) {
            //
            //     square.classList.add('square-animation');
            //     return; // if we added the class, exit the function
            //
            // }
            //
            // // We're not intersecting, so remove the class!
            // square.classList.remove('square-animation');

        });

    });

    observer.observe(document.querySelector('.lab-page__cycle-list'));

})();
