module.exports = function (settings) {

    var defaultHandlers = {
        findDraggable: function (e) {

            return e.target.closest('.'+draggableClass);

        },

        findDroppable: function (e) {

            return document.elementFromPoint(e.clientX, e.clientY).closest('.'+droppableClass);

        },

        /**
         * The simplest makeAvatar method.
         *
         * Just set elem to avatar.elem. And remembers element position in document.
         * If drop isn`t success, returns elem to start position.
         */
        makeAvatar: function (elem) {

            var avatar = {};

            var avatarRollback = function () {

                avatar.elem.classList.remove('dnd-default-avatar');

                if (avatar.nextSibling)
                    avatar.parentNode.insertBefore(avatar.elem, avatar.nextSibling);
                else
                    avatar.parentNode.appendChild(avatar.elem);

                delete(dragObj.avatar);

            };

            avatar = {
                elem: elem,
                parentNode: elem.parentNode,
                nextSibling: elem.nextElementSibling,
                rollback: avatarRollback
            };

            // Set avatar position: absolute; for drag'n'drop
            avatar.elem.classList.add('dnd-default-avatar');

            return avatar;

        },

        /**
         * Highlights droppable elements under cursor with border
         */
        targetChanged: function (target, newTarget) {

            if (target) target.classList('dnd-default-target-highlight');

            if (newTarget) newTarget.classList.add('dnd-default-target-highlight');

        },

        move: function (e, avatar, shift) {

            avatar.elem.style.left = e.pageX - shift.x + 'px';
            avatar.elem.style.top = e.pageY - shift.y + 'px';

        },

        /**
         * Inserts elem into document if drop is success
         */
        targetReached: function (target, avatar, elem) {

            target.classList.remove('dnd-default-target-highlight');
            target.parentNode.insertBefore(elem, target.nextElementSibling);
            avatar.elem.classList.remove('dnd-default-avatar');

        }
    };

    var draggableClass  = settings.draggableClass   || 'draggable',
        droppableClass   = settings.droppableClass    || 'droppable',
        findDraggable   = settings.findDraggable    || defaultHandlers.findDraggable,
        findDroppable    = settings.findDroppable     || defaultHandlers.findDroppable,
        makeAvatar      = settings.makeAvatar       || defaultHandlers.makeAvatar,
        targetChanged   = settings.targetChanged    || defaultHandlers.targetChanged,
        move            = settings.move             || defaultHandlers.move,
        targetReached   = settings.targetReached    || defaultHandlers.targetReached;

    var dragObj = {};

    var onMouseDown = function (e) {

        /**
         * Check mouse (which=1 - right mouse button) or touch (which=0 - touch) event.
         */
        if (e.which > 1) return;

        e = touchSupported(e);

        dragObj.clickedAt = {
            x: e.pageX,
            y: e.pageY
        };

        dragObj.elem = findDraggable(e);

        if (!dragObj.elem) return;

        toggleSelection();

        var coords = getCoords(dragObj.elem);

        dragObj.shift = {
            x: e.pageX - coords.x,
            y: e.pageY - coords.y
        };

    };

    var onMouseMove = function (e) {

        if (!dragObj.elem) return;

        // Prevent touchmove scroll
        e.preventDefault();

        e = touchSupported(e);

        // Check mouse offset. If x or y offset <5, assume that it`s accidental move
        if (Math.abs(e.pageX - dragObj.clickedAt.x) < 5 && Math.abs(e.pageY - dragObj.clickedAt.y) < 5) return;

        if (!dragObj.avatar) {

            dragObj.avatar = makeAvatar(dragObj.elem);

        }

        var newTarget = findDroppable(e);

        if (newTarget != dragObj.target) {

            targetChanged(dragObj.target, newTarget, dragObj.avatar);

            dragObj.target = newTarget;

        }


        move(e, dragObj.avatar, dragObj.shift);

    };

    var onMouseUp = function (e) {

        if (e.which > 1) return;

        if (!dragObj.avatar) {

            dragObj = {};
            return;

        }

        e = touchSupported(e);

        var target = findDroppable(e);

        if (target)
            targetReached(target, dragObj.avatar, dragObj.elem, e);
        else
            dragObj.avatar.rollback();

        dragObj = {};

        toggleSelection();

    };

    var getCoords = function (elem) {

        var rect = elem.getBoundingClientRect();

        return {
            x: rect.left + pageXOffset,
            y: rect.top + pageYOffset
        };

    };

    var touchSupported = function (e) {

        if (e.changedTouches)
            var touch = e.changedTouches[0];

        else
            return e;

        e.pageX = touch.pageX;
        e.pageY = touch.pageY;

        e.clientX = touch.clientX;
        e.clientY = touch.clientY;

        e.screenX = touch.screenX;
        e.screenY = touch.screenY;

        e.target = touch.target;

        return e;

    };

    var toggleSelection = function () {

        document.body.classList.toggle('no-selection');

    };


    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('touchstart', onMouseDown);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);

    document.ondragstart = function () {

        return false;

    };

};
