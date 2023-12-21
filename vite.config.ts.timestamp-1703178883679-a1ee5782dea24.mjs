// vite.config.ts
import path from "node:path";
import { defineConfig } from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/vite@4.4.9_@types+node@20.7.1_sass@1.69.5/node_modules/vite/dist/node/index.js";
import Vue from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/@vitejs+plugin-vue@4.3.4_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/vite-plugin-pages@0.31.0_vite@4.4.9/node_modules/vite-plugin-pages/dist/index.mjs";
import Components from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/unplugin-vue-components@0.25.2_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.1/node_modules/unplugin-auto-import/dist/vite.js";
import UnoCSS from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/unocss@0.56.4_postcss@8.4.29_vite@4.4.9/node_modules/unocss/dist/vite.mjs";
import VueMacros from "file:///D:/800Projects/PanicApp/PanicSheep/node_modules/.pnpm/unplugin-vue-macros@2.6.0_@vueuse+core@10.4.1_vite@4.4.9_vue@3.3.4/node_modules/unplugin-vue-macros/dist/vite.mjs";
var __vite_injected_original_dirname = "D:\\800Projects\\PanicApp\\PanicSheep";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  plugins: [
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true
          }
        })
      }
    }),
    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core"
      ],
      dts: true,
      dirs: [
        "./src/composables"
      ],
      vueTemplate: true
    }),
    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true
    }),
    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS()
  ]
  // https://github.com/vitest-dev/vitest
  // test: {
  //   environment: 'jsdom',
  // },
  // server:{
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8887',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/, '')
  //     }
  //   }
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFw4MDBQcm9qZWN0c1xcXFxQYW5pY0FwcFxcXFxQYW5pY1NoZWVwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFw4MDBQcm9qZWN0c1xcXFxQYW5pY0FwcFxcXFxQYW5pY1NoZWVwXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi84MDBQcm9qZWN0cy9QYW5pY0FwcC9QYW5pY1NoZWVwL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgVnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IFBhZ2VzIGZyb20gJ3ZpdGUtcGx1Z2luLXBhZ2VzJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgVW5vQ1NTIGZyb20gJ3Vub2Nzcy92aXRlJ1xyXG5pbXBvcnQgVnVlTWFjcm9zIGZyb20gJ3VucGx1Z2luLXZ1ZS1tYWNyb3Mvdml0ZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpfS9gLFxyXG4gICAgfSxcclxuICB9LFxyXG4gIHBsdWdpbnM6IFtcclxuICAgIFZ1ZU1hY3Jvcyh7XHJcbiAgICAgIGRlZmluZU9wdGlvbnM6IGZhbHNlLFxyXG4gICAgICBkZWZpbmVNb2RlbHM6IGZhbHNlLFxyXG4gICAgICBwbHVnaW5zOiB7XHJcbiAgICAgICAgdnVlOiBWdWUoe1xyXG4gICAgICAgICAgc2NyaXB0OiB7XHJcbiAgICAgICAgICAgIHByb3BzRGVzdHJ1Y3R1cmU6IHRydWUsXHJcbiAgICAgICAgICAgIGRlZmluZU1vZGVsOiB0cnVlLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9oYW5ub2VydS92aXRlLXBsdWdpbi1wYWdlc1xyXG4gICAgUGFnZXMoKSxcclxuXHJcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW50ZnUvdW5wbHVnaW4tYXV0by1pbXBvcnRcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgICdAdnVldXNlL2NvcmUnLFxyXG4gICAgICBdLFxyXG4gICAgICBkdHM6IHRydWUsXHJcbiAgICAgIGRpcnM6IFtcclxuICAgICAgICAnLi9zcmMvY29tcG9zYWJsZXMnLFxyXG4gICAgICBdLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgIH0pLFxyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS92aXRlLXBsdWdpbi1jb21wb25lbnRzXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZHRzOiB0cnVlLFxyXG4gICAgfSksXHJcblxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FudGZ1L3Vub2Nzc1xyXG4gICAgLy8gc2VlIHVuby5jb25maWcudHMgZm9yIGNvbmZpZ1xyXG4gICAgVW5vQ1NTKCksXHJcbiAgXSxcclxuXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVzdC1kZXYvdml0ZXN0XHJcbiAgLy8gdGVzdDoge1xyXG4gIC8vICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXHJcbiAgLy8gfSxcclxuICAvLyBzZXJ2ZXI6e1xyXG4gIC8vICAgcHJveHk6IHtcclxuICAvLyAgICAgJy9hcGknOiB7XHJcbiAgLy8gICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4ODg3JyxcclxuICAvLyAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgLy8gICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcLywgJycpXHJcbiAgLy8gICAgIH1cclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxPQUFPLFVBQVU7QUFDakIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sV0FBVztBQUNsQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxlQUFlO0FBVHRCLElBQU0sbUNBQW1DO0FBV3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sR0FBRyxLQUFLLFFBQVEsa0NBQVcsS0FBSyxDQUFDO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUCxLQUFLLElBQUk7QUFBQSxVQUNQLFFBQVE7QUFBQSxZQUNOLGtCQUFrQjtBQUFBLFlBQ2xCLGFBQWE7QUFBQSxVQUNmO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBO0FBQUEsSUFHRCxNQUFNO0FBQUE7QUFBQSxJQUdOLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsUUFDSjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxJQUNmLENBQUM7QUFBQTtBQUFBLElBR0QsV0FBVztBQUFBLE1BQ1QsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBO0FBQUE7QUFBQSxJQUlELE9BQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFlRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
