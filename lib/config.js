import colorSchemes from "./color_schemes";

const MAGNIFICATION_DEFAULT = 200;
const MAGNIFICATION_STEP = 50;

export function initializeConfigPane(config) {    
    const canvasEl = config.canvasEl;
    const colorSchemeEl = document.getElementById("color-scheme");
    const zoomInEl = document.getElementById("zoom-in");
    const zoomOutEl = document.getElementById("zoom-out");
    const zoomResetEl = document.getElementById("zoom-reset");

    const drawConfig = {
        numIterations: 100,
        magnificationFactor: MAGNIFICATION_DEFAULT,
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

    // Listen for event changes.
    colorSchemeEl.onchange = onColorSchemeChange;
    
    zoomInEl.onclick = () => {
        drawConfig.magnificationFactor += MAGNIFICATION_STEP;
        redraw();
    }

    zoomOutEl.onclick = () => {
        drawConfig.magnificationFactor -= MAGNIFICATION_STEP;
        redraw();
    }

    zoomResetEl.onclick = () => {
        drawConfig.magnificationFactor = MAGNIFICATION_DEFAULT;
        redraw();
    }

    // Do a first draw.
    redraw();
}