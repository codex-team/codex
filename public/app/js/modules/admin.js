/**
 * Admin page methods
 */
module.exports = function (admin) {

	/**
	 * Initializes dragndrop module
	 * @uses  codex.dragndrop
	 */
	function initDragNDrop() {

		codex.dragndrop({
		    droppableClass: 'list-item',

		    findDraggable: function (e) {

		        var target = e.target.closest('.draggable');

		        if (target) return target.closest('.list-item');

		        return null;

		    },

		    makeAvatar: function (elem) {

		        var avatar = {};

		        avatar.elem = elem.cloneNode(true);
		        avatar.elem.classList.add('dnd-avatar');

		        elem.parentNode.insertBefore(avatar.elem, elem.nextSibling);
		        elem.classList.add('no-display');

		        avatar.rollback = function () {

		            avatar.elem.parentNode.removeChild(avatar.elem);
		            elem.classList.remove('no-display');

		        };

		        return avatar;

		    },

		    targetChanged: function (target, newTarget, avatar) {

		        if (!newTarget) return;

		        var targetPosition = newTarget.compareDocumentPosition(avatar.elem);

		        if (targetPosition&4) {

		            newTarget.parentNode.insertBefore(avatar.elem, newTarget);

		        } else if (targetPosition&2) {

		            newTarget.parentNode.insertBefore(avatar.elem, newTarget.nextSibling);

		        }

		    },

		    move: function () {},

		    targetReached: function (target, avatar, elem) {

		        target.parentNode.insertBefore(elem, target.nextSibling);

		        avatar.elem.parentNode.removeChild(avatar.elem);
		        elem.classList.remove('no-display');

		        var item_id = elem.dataset.id,
		            item_type = elem.dataset.type,
		            item_below_value = null,
		            nextSibling;

		        if (nextSibling = elem.nextElementSibling)
		            item_below_value = nextSibling.dataset.type+':'+nextSibling.dataset.id;

		        var ajaxData = {
		            success: function () {

		                document.getElementById('saved').classList.remove('top-menu__saved_hidden');
		                setTimeout(function () {

		                    document.getElementById('saved').classList.add('top-menu__saved_hidden');

		                }, 1000);

		            },
		            type: 'POST',
		            url: '/admin/feed',
		            data: JSON.stringify({
		                item_id: item_id,
		                item_type: item_type,
		                item_below_value: item_below_value
		            })
		        };


		        codex.core.ajax(ajaxData);

		    }
		});
		// body...
	}

	/**
	 * Module initialization
	 * @param  {Object} 	 params 			- init params
	 * @param  {String|null} params.listType 	- feed list type ("cars"|"list")
	 */
	admin.init = function( params ){

		codex.core.log('Initialized.', 'Module admin');

		if ( params.listType == 'cards' ){

			 var items = document.querySelectorAll('.feed-item');

	        for (var i = items.length-1; i > -1; i--) {
	            items[i].classList.add('draggable');
	            items[i].classList.add('feed-item--dnd');
	            items[i].classList.add('list-item');
	        }

		}

		initDragNDrop();

	}

	return admin;

}({})