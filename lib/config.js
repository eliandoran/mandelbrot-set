import colorSchemes from "./color_schemes";

export function initializeConfigPane() {
    const colorSchemeEl = document.getElementById("color-scheme");

    function setColorSchemes() {
        colorSchemeEl.innerHTML = "";

        for (const colorScheme of Object.keys(colorSchemes)) {
            const optionEl = document.createElement("option");
            optionEl.innerText = colorScheme;
            colorSchemeEl.appendChild(optionEl);
        }
    }    

    setColorSchemes();

    colorSchemeEl.onchange = (e) => {
        console.log("Change", e);
    }
}