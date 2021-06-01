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

    canvasEl.addEventListener("mousedown", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        isHolding = true;
        selectionX = x;
        selectionY = y;
        selectionWidth = 0;
        selectionHeight = 0;
        updateStyle();

        originX = x;
        originY = y;
    });

    canvasEl.addEventListener("mousemove", (e) => {
        if (!isHolding) {
            return;
        }

        const x = e.clientX;
        const y = e.clientY;

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
    });

    canvasEl.addEventListener("mouseup", (e) => {        
        selectionEl.style.display = "none";
        isHolding = false;
        updateStyle();

        callback({
            x: selectionX,
            y: selectionY,
            width: selectionWidth,
            height: selectionHeight
        });
    });
}