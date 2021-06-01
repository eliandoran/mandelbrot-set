import draw from "./lib/drawing";
import initializeConfigPane from "./lib/config_pane";

const canvasEl = document.getElementById("drawing");
initializeConfigPane({
    canvasEl,
    draw
});