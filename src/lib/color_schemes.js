export default {
    hsl_red: {
        title: "Red (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(0, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_green: {
        title: "Green (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(150, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_cyan: {
        title: "Cyan (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(190, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_blue: {
        title: "Blue (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(210, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_purple: {
        title: "Purple (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(270, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_magenta: {
        title: "Magenta (HSL)",
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(310, 90%, ${percentage * 100}%)`;
            };
        } 
    },
    greyscale: {
        title: "Greyscale",
        getColorScheme: (ctx) => {
            return (percentage) => {
                let comp = (255 * percentage);
                ctx.fillStyle = `rgb(${comp}, ${comp}, ${comp})`;
            };
        }
    }
}