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

function draw(canvasEl, config) {
    const width = 800;
    const height = 600;

    // Adjust canvas size.
    canvasEl.width = width;
    canvasEl.height = height;

    const scheme = config.scheme;
    const numIterations = config.numIterations;

    const ctx = canvasEl.getContext("2d");
    const styleFn = getColorScheme(ctx, scheme);

    const magnificationFactor = 200;
    const panX = 2;
    const panY = 1.5;
    for (let x=0; x < width; x++) {
        for (let y=0; y < height; y++) {
            const absX = (x / magnificationFactor - panX);
            const absY = (y / magnificationFactor - panY);
            const percentage = getMandelbrotSetPercentage(numIterations, absX, absY);
            styleFn(percentage);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function getColorScheme(ctx, scheme) {
    switch (scheme) {
        case "hsl_red":
            return (percentage) => {
                ctx.fillStyle = `hsl(0, 100%, ${percentage * 100}%)`;
            }
        case "hsl_blue":
            return (percentage) => {
                ctx.fillStyle = `hsl(200, 100%, ${percentage * 100}%)`;
            }
        case "greyscale": {
            return (percentage) => {
                let comp = (255 * percentage);
                ctx.fillStyle = `rgb(${comp}, ${comp}, ${comp})`;
            }
        }
    }
}

const canvasEl = document.getElementById("drawing");
draw(canvasEl, {
    numIterations: 100,
    scheme: "hsl_blue"
});