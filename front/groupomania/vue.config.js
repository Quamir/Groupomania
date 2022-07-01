const { defineConfig } = require('@vue/cli-service');

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
});
