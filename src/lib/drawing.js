import colorSchemes from "./color_schemes";

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

export default function draw(canvasEl, config) {
    const infoPaneEl = document.getElementById("info-pane");

    canvasEl.className = "loading";

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Adjust canvas size.
    canvasEl.width = width;
    canvasEl.height = height;

    const scheme = config.scheme;
    const numIterations = config.numIterations;

    const ctx = canvasEl.getContext("2d", {
        alpha: false
    });
    const styleFn = colorSchemes[scheme].getColorScheme(ctx);

    const renderStart = Date.now();

    // Fill with blank color.
    ctx.fillStyle = "#00000";
    ctx.fillRect(0, 0, width, height);

    const magnificationFactor = config.magnificationFactor;
    const panX = config.panX;
    const panY = config.panY;    
    
    const stepSize = 10;

    function setInfoPanel(rows) {
        infoPaneEl.innerHTML = rows.join("<br/>");
    }

    function displayLoadingInfo(progress) {
        setInfoPanel([
            `Rendering Mandelbrot Set...`,
            `${Math.round(progress * 100)}%`
        ]);
    }
    
    function displayLoadedInfo() {
        const firstX = (0 / magnificationFactor - panX);
        const firstY = (0 / magnificationFactor - panY);
        const lastX = (width / magnificationFactor - panX);
        const lastY = (height / magnificationFactor - panX);
        const timeSpent = Date.now() - renderStart;
    
        setInfoPanel([
            `Viewport size: ${width}x${height}`,
            `Magnification factor: ${magnificationFactor.toFixed(2)}`,
            `Pan: (${panX.toFixed(4)}, ${panY.toFixed(4)})`,
            `Abs. coords: (${firstX.toFixed(4)} ${firstY.toFixed(4)}) (${lastX.toFixed(4)} ${lastY.toFixed(4)})`,
            `Render time: ${timeSpent} ms`
        ]);
    }

    for (let baseY = 0; baseY < height; baseY += stepSize) {
        setTimeout(() => {
            for (let y = baseY; y < baseY + stepSize; y++) {
                for (let x=0; x < width; x++) {
                    const absX = (x / magnificationFactor - panX);
                    const absY = (y / magnificationFactor - panY);
                    const percentage = getMandelbrotSetPercentage(numIterations, absX, absY);
                    styleFn(percentage);
                    ctx.fillRect(x, y, 1, 1);
                }

                // Check if drawing finished.
                if (y >= height) {
                    canvasEl.className = "";
                    displayLoadedInfo();
                } else {
                    const progress = (baseY / height);
                    displayLoadingInfo(progress);
                }
            }
        }, 0);
    }
    
    displayLoadingInfo(0);
}