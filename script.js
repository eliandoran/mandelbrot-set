function draw(canvasEl) {
    canvasEl.width=800;
    canvasEl.height=600;
    const ctx = canvasEl.getContext("2d");
}

const canvasEl = document.getElementById("drawing");
draw(canvasEl);