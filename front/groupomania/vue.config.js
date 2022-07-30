const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions:{
      scss:{
        additionalData: `
        @import "@/assets/_colors.scss";
        @import "@/assets/_breakpoints.scss";
        @import "@/assets/_functions.scss";
      `,
      },
    },
  },

  configureWebpack:{
    plugins:[
      new NodePolyfillPlugin(),
    ],
    resolve: {
      fallback: {
          "fs": false
      },
  }
  },


});
