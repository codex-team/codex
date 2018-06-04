/**
 * Toggle mobile courses at the top of Article page
 */
module.exports = function () {

    var toggleCourse = function () {

        var courseTitle = document.querySelector('.js-course-menu__title--toggle');

        courseTitle.addEventListener('click', toggle);

    };

    var toggle = function () {

        var courses = document.querySelector('.js-course-menu-list');

        courses.classList.toggle('course-menu-list--show');

    };

    return {
        toggleCourse : toggleCourse
    };

}();