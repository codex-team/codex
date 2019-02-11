/**
 * Toggle mobile courses at the top of Article page
 */
module.exports = function () {

    var toggleCourse = function (elem) {

        elem.nextElementSibling.classList.toggle('course-menu-list--show');

    };

    return {
        toggleCourse : toggleCourse
    };

}();