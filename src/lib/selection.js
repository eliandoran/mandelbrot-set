const DRAG_MIN_WIDTH = 20;
const DRAG_MIN_HEIGHT = 20;

export default function initializeSelection(canvasEl, selectionEl, callback) {
    let isHolding = false;
    let originX;
    let originY;

    let selectionVisible = false;
    let selectionX = 0;
    let selectionY = 0;
    let selectionWidth = 0;
    let selectionHeight = 0;

    function updateStyle() {
        if (!isHolding) {
            if (selectionVisible) {
                selectionEl.style.display = "hidden";
            }

            return;
        }

        if (!selectionVisible) {
            selectionEl.style.display = "block";
        }

        selectionEl.style.left = `${selectionX}px`;
        selectionEl.style.top = `${selectionY}px`;
        selectionEl.style.width = `${selectionWidth}px`;
        selectionEl.style.height = `${selectionHeight}px`;
    }

    function getPointerPosition(e) {
        if (e.clientX && e.clientY) {
            return {
                x: e.clientX,
                y: e.clientY
            }
        }

        if (e.targetTouches && e.targetTouches.length > 0) {
            return {
                x: e.targetTouches[0].clientX,
                y: e.targetTouches[0].clientY
            }
        }

        return null;
    }

    function onPointerDown(e) {
        const { x, y } = getPointerPosition(e);
        
        isHolding = true;
        selectionX = x;
        selectionY = y;
        selectionWidth = 0;
        selectionHeight = 0;
        updateStyle();

        originX = x;
        originY = y;
    }
    
    function onPointerMove(e) {
        if (!isHolding) {
            return;
        }

        const { x, y } = getPointerPosition(e);

        if (x >= originX) {
            const deltaX = (x - originX);
            selectionX = originX;
            selectionWidth = deltaX;
        } else {
            const deltaX = (originX - x);
            selectionX = x;
            selectionWidth = deltaX;
        }     

        if (y >= originY) {
            const deltaY = (y - originY);
            selectionY = originY;
            selectionHeight = deltaY;
        } else {
            const deltaY = (originY - y);
            selectionY = y;
            selectionHeight = deltaY;
        }

        updateStyle();
    }

    function onPointerUp(e) {
        selectionEl.style.display = "none";
        isHolding = false;
        updateStyle();

        if (selectionWidth >= DRAG_MIN_WIDTH && selectionHeight >= DRAG_MIN_HEIGHT) {
            callback({
                x: selectionX,
                y: selectionY,
                width: selectionWidth,
                height: selectionHeight
            });
        }
    }

    canvasEl.addEventListener("mousedown", onPointerDown);
    canvasEl.addEventListener("mousemove", onPointerMove);
    canvasEl.addEventListener("mouseup", onPointerUp);

    canvasEl.addEventListener("touchstart", onPointerDown);
    canvasEl.addEventListener("touchmove", onPointerMove);
    canvasEl.addEventListener("touchend", onPointerUp);
}