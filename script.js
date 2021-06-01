function getMandelbrotSetPercentage(numIterations, x, y) {
    let resultReal = x;
    let resultImag = y;
    for (let i=0; i<numIterations; i++) {
        const tempReal = (resultReal * resultReal - resultImag * resultImag + x);
        const tempImag = (2 * resultReal * resultImag + y);
        resultReal = tempReal;
        resultImag = tempImag;        

        if (resultReal * resultImag > 5) {
            return (i / numIterations);
        }
    }

    return 0;
}

function draw(canvasEl, numIterations) {
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
            const percentage = getMandelbrotSetPercentage(numIterations, absX, absY);

            ctx.fillStyle = `hsl(0, 100%, ${percentage * 100}%)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

const canvasEl = document.getElementById("drawing");
draw(canvasEl, 100);