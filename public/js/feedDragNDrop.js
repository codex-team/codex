codex.core.dragndrop({
    dropableClass: 'list-item',

    makeAvatar: function(elem) {
        var avatar = {};

        avatar.elem = elem.cloneNode(true);
        avatar.elem.classList.add('dnd-avatar');

        elem.parentNode.insertBefore(avatar.elem, elem.nextSibling);
        elem.style.display = 'none';

        avatar.rollback = function () {
            avatar.elem.parentNode.removeChild(avatar.elem);
            elem.style = '';
        };

        return avatar;
    },

    targetChanged: function(target, newTarget, avatar){
        if (newTarget) {

            if (newTarget != avatar.elem.nextElementSibling) {
                newTarget.parentNode.insertBefore(avatar.elem, newTarget);
            } else {
                newTarget.parentNode.insertBefore(avatar.elem, newTarget.nextSibling);
            }

        }
    },

    move: function(){},

    targetReached: function(target, avatar, elem) {

        target.parentNode.insertBefore(elem, target.nextSibling);

        avatar.elem.parentNode.removeChild(avatar.elem);
        elem.style = '';

        var item_id = elem.dataset.id,
            item_type = elem.dataset.type,
            next_sibling_item_id = elem.nextElementSibling.dataset.type+':'+elem.nextElementSibling.dataset.id;

        var ajaxData = {
            success: function(){
                document.getElementById('saved').classList.remove('top-menu__saved_hidden');
                setTimeout(function() {document.getElementById('saved').classList.add('top-menu__saved_hidden')}, 1000);
            },
            url: '/admin/feed?item_id='+item_id+'&item_type='+item_type+'&item_below_value='+next_sibling_item_id
        };

        codex.core.ajax(ajaxData);
    }
});