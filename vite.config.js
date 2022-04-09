// import { fileURLToPath, URL } from "url";
//
// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL("./src", import.meta.url)),
//     },
//   },
// });

import vue from "@vitejs/plugin-vue";

export default {
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
    },
  },
  plugins: [vue()],
};
