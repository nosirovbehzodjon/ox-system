const cracoLessPlugin = require("craco-less");
module.exports = {
    plugins: [
        {
            plugin: cracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            "@primary-color": "#567AFB", //#6b9080
                            "@layout-sider-background": "#0F1E54",
                            "@menu-inline-submenu-bg": "#0F1E54", //menu bg color
                            "@menu-item-active-bg": "@primary-color", //active color
                            "@menu-highlight-color": "#495057", //text color
                            "@menu-bg": "#0F1E54",
                            "@menu-dark-bg": "#0F1E54",
                            "@menu-item-vertical-margin": " 0px",
                            "@menu-item-font-size": "18px",
                            "@menu-item-boundary-margin": "0px",
                            "@font-family": "'Maven Pro', sans-serif",
                            "@table-header-bg": "#C6D9EE",
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
