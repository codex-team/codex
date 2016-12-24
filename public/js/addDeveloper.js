var developer = function() {

    var bind = function() {

        var chBoxes = document.querySelectorAll('.developer-checkbox');

        for (key in chBoxes) {
            if (!chBoxes.hasOwnProperty(key)) continue;

            chBoxes[key].addEventListener('change', toggle);

        }

    };

    var toggle = function(event) {

        var data = {
            data: 'id='+event.target.id+'&value='+(event.target.checked?1:0),
            url: '/admin/developer'
        };

        codex.core.ajax(data)

    };

    return {
        bind: bind
    }

}();
