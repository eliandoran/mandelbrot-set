const colorSchemeEl = document.getElementById("color-scheme");
colorSchemeEl.onchange = (e) => {
    console.log("Change", e);
}

function initializeConfigPane(config) {
    console.log(config.colorScheme);
}