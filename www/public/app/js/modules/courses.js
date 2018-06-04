/**
 * Toggle mobile courses at the top of Article page
 */
module.exports = function () {

    var toggleCourse = function (elem) {

        elem.addEventListener('click', function () {

            this.nextElementSibling.classList.toggle('course-menu-list--show');

        });

    };

    return {
        toggleCourse : toggleCourse
    };

}();