import colorSchemes from "./color_schemes";

export function initializeConfigPane(config) {    
    const canvasEl = config.canvasEl;
    const colorSchemeEl = document.getElementById("color-scheme");
    const zoomInEl = document.getElementById("zoom-in");

    const drawConfig = {
        numIterations: 100,
        magnificationFactor: 200,
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
        drawConfig.magnificationFactor += 50;
        redraw();
    }

    // Do a first draw.
    redraw();
}