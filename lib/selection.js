export default function initializeSelection(canvasEl, selectionEl) {
    let isHolding = false;
    let originX;
    let originY;

    canvasEl.addEventListener("mousedown", (e) => {
        const x = e.clientX;
        const y = e.clientY;
        selectionEl.style.left = `${x}px`;
        selectionEl.style.top = `${y}px`;
        isHolding = true;
        originX = x;
        originY = y;
    });

    canvasEl.addEventListener("mouseup", (e) => {
        isHolding = false;
    });

    canvasEl.addEventListener("mousemove", (e) => {
        if (!isHolding) {
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const deltaX = (x - originX);
        const deltaY = (y - originY);
        selectionEl.style.width = `${deltaX}px`;
        selectionEl.style.height = `${deltaY}px`;
    });
}