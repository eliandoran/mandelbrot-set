export default {
    hsl_red: {
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(0, 100%, ${percentage * 100}%)`;
            };
        } 
    },
    hsl_blue: {
        getColorScheme: (ctx) => {
            return (percentage) => {
                ctx.fillStyle = `hsl(200, 100%, ${percentage * 100}%)`;
            };
        }
    },
    greyscale: {
        getColorScheme: (ctx) => {
            return (percentage) => {
                let comp = (255 * percentage);
                ctx.fillStyle = `rgb(${comp}, ${comp}, ${comp})`;
            };
        }
    }
}