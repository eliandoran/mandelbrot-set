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

        if (x >= originX) {
            const deltaX = (x - originX);
            selectionEl.style.left = `${originX}px`;
            selectionEl.style.width = `${deltaX}px`;
        } else {
            const deltaX = (originX - x);
            selectionEl.style.left = `${x}px`;            
            selectionEl.style.width = `${deltaX}px`;
        }     

        if (y >= originY) {
            const deltaY = (y - originY);
            selectionEl.style.top = `${originY}px`;
            selectionEl.style.height = `${deltaY}px`;
        } else {
            const deltaY = (originY - y);
            selectionEl.style.top = `${y}px`;
            selectionEl.style.height = `${deltaY}px`;
        }
    });
}