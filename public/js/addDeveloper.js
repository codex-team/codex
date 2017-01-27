var developer = function() {

    var bind = function() {

        var chBoxes = document.querySelectorAll('.developer-checkbox');

        for (var i = chBoxes.length-1; i > -1; i--) {
            chBoxes[i].addEventListener('change', toggle);
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
