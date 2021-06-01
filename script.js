function inMandelbrotSet(x, y) {
    let resultReal = x;
    let resultImag = y;
    for (let i=0; i<10; i++) {
        const tempReal = (resultReal * resultReal - resultImag * resultImag + x);
        const tempImag = (2 * resultReal * resultImag + y);
        resultReal = tempReal;
        resultImag = tempImag;        
    }

    if (resultReal * resultImag < 5) {
        return true;
    }

    return false;
}

function draw(canvasEl) {
    const width = 800;
    const height = 600;

    // Adjust canvas size.
    canvasEl.width = width;
    canvasEl.height = height;

    const ctx = canvasEl.getContext("2d");

    const magnificationFactor = 200;
    const panX = 2;
    const panY = 1.5;
    for (let x=0; x < width; x++) {
        for (let y=0; y < height; y++) {
            const absX = (x / magnificationFactor - panX);
            const absY = (y / magnificationFactor - panY);
            if (inMandelbrotSet(absX, absY)) {
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
}

const canvasEl = document.getElementById("drawing");
draw(canvasEl);