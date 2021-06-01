import colorSchemes from "./color_schemes";

const MAGNIFICATION_DEFAULT = 250;
const MAGNIFICATION_STEP = 50;
const MAGNIFICATION_PAN_STEP = 0.2;
const PAN_DEFAULT_X = 2;
const PAN_DEFAULT_Y = 1.5;

export function initializeConfigPane(config) {    
    const canvasEl = config.canvasEl;
    const colorSchemeEl = document.getElementById("color-scheme");
    const zoomInEl = document.getElementById("zoom-in");
    const zoomOutEl = document.getElementById("zoom-out");
    const zoomResetEl = document.getElementById("zoom-reset");
    const selectionEl = document.getElementById("selection");

    const drawConfig = {
        numIterations: 100,
        magnificationFactor: MAGNIFICATION_DEFAULT,
        panX: PAN_DEFAULT_X,
        panY: PAN_DEFAULT_Y,
        scheme: "hsl_blue"
    }

    function redraw() {
        setTimeout(() => {
            config.draw(canvasEl, drawConfig);
        }, 0);
    }

    function setColorSchemes() {
        const currentScheme = drawConfig.scheme;
        colorSchemeEl.innerHTML = "";

        for (const colorScheme of Object.keys(colorSchemes)) {            
            const optionEl = document.createElement("option");
            optionEl.innerText = colorScheme;
            optionEl.selected = (colorScheme === currentScheme);

            colorSchemeEl.appendChild(optionEl);
        }
    }    

    function onColorSchemeChange(e) {
        const scheme = e.target.value;
        drawConfig.scheme = scheme;
        redraw();
    }

    // Populate with data.
    setColorSchemes();

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

    // Listen for event changes.
    colorSchemeEl.onchange = onColorSchemeChange;
    
    zoomInEl.onclick = () => {
        drawConfig.magnificationFactor += MAGNIFICATION_STEP;
        drawConfig.panX += 0;
        drawConfig.panY += 0;
        redraw();
    }

    zoomOutEl.onclick = () => {
        drawConfig.magnificationFactor -= MAGNIFICATION_STEP;
        drawConfig.panX -= MAGNIFICATION_PAN_STEP;
        drawConfig.panY -= MAGNIFICATION_PAN_STEP;
        redraw();
    }

    zoomResetEl.onclick = () => {
        drawConfig.magnificationFactor = MAGNIFICATION_DEFAULT;
        drawConfig.panX = PAN_DEFAULT_X;
        drawConfig.panY = PAN_DEFAULT_Y;
        redraw();
    }

    // Do a first draw.
    redraw();
}