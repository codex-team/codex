/**
 * Toggle mobile courses at the top of Article page
 */
module.exports = function () {

    var toggleCourse = function () {

        var courseTitle = document.querySelector('.js-course__title--toggle');

        courseTitle.addEventListener('click', toggle);

    };

    var toggle = function () {

        var courses = document.querySelector('.js-courses-list');

        courses.classList.toggle('courses-list--show');

    };

    return {
        toggleCourse : toggleCourse
    };

}();