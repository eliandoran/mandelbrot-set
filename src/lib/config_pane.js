import colorSchemes from "./color_schemes";
import initializeSelection from "./selection";

const MAGNIFICATION_DEFAULT = 250;
const MAGNIFICATION_STEP = 50;
const MAGNIFICATION_PAN_STEP = 0.2;
const PAN_DEFAULT_X = 2;
const PAN_DEFAULT_Y = 1.5;

export default function initializeConfigPane(config) {    
    const canvasEl = config.canvasEl;
    const colorSchemeEl = document.getElementById("color-scheme");
    const zoomInEl = document.getElementById("zoom-in");
    const zoomOutEl = document.getElementById("zoom-out");
    const zoomResetEl = document.getElementById("zoom-reset");
    const selectionEl = document.getElementById("selection");
    const numIterationsValueEl = document.getElementById("num-iterations-value");
    const numIterationsButtonEl = document.getElementById("num-iterations-button");

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
            optionEl.innerText = colorSchemes[colorScheme].title;
            optionEl.value = colorScheme;
            optionEl.selected = (colorScheme === currentScheme);

            colorSchemeEl.appendChild(optionEl);
        }
    }    

    function onColorSchemeChange(e) {
        const scheme = e.target.value;
        drawConfig.scheme = scheme;
        redraw();
    }

    initializeSelection(canvasEl, selectionEl, (data) => {
        const magnificationFactor = drawConfig.magnificationFactor;
        const width = window.innerWidth;
        const height = window.innerHeight;
        const panY = drawConfig.panY;

        const actX = (data.x * magnificationFactor - drawConfig.panX);
        const actY = (data.y * magnificationFactor - drawConfig.panY);

        const actWidth = (data.width * magnificationFactor);        
        const fact = (actX + actWidth) / actX;

        drawConfig.panX -= (data.x / magnificationFactor);
        drawConfig.panY -= (data.y / magnificationFactor);
        drawConfig.magnificationFactor += magnificationFactor * fact;
        redraw();
    });

    // Populate with data.
    setColorSchemes();    
    numIterationsValueEl.value = drawConfig.numIterations;

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

    numIterationsButtonEl.onclick = (e) => {
        const numIterations = parseInt(numIterationsValueEl.value, 10);
        if (numIterations > 0) {
            drawConfig.numIterations = numIterations;
            redraw();
        }
    };

    // Do a first draw.
    redraw();
}