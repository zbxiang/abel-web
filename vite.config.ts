import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import glob from 'glob'
const pageEntry = {}

// 遍历文件夹中含有main.ts的文件夹路径
const allEntry = glob.sync('./src/**/main.ts')
// 创建多页面模板
allEntry.forEach((entry: string) => {
  const pathArr = entry.split('/')
  const name = pathArr[pathArr.length - 2];
  // input中的配置
  pageEntry[name] = resolve(__dirname, `/src/${name}/index.html`);
});

export default defineConfig(({ mode }) => {
  const rootPage = './src'
  const outDirDist = 'dist/'
  return {
    root: rootPage,
    publicDir: `${process.cwd()}/public`,
    base: process.env.NODE_ENV === "production"? "./": "",
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: '@C', replacement: resolve(__dirname, 'src/common') },
        { find: '@web', replacement: resolve(__dirname, 'src/web') },
        { find: '@admin', replacement: resolve(__dirname, 'src/admin') }
      ],
      dedupe: [],
      conditions: [],
      mainFields: ['module', 'jsnext:main', 'jsnext'],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    plugins: [
      vue()
    ],
    clearScreen: false,
    // 服务
    server: {
      host: '0.0.0.0',
      port: 9000,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          // rewrite: (path) => {
          //   return path.replace(/^api/, '')
          // }
        }
      },
      cors: true, // 跨域
      hmr: {},
      watch: {}
    }, 
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: `@import '@/assets/style/base.scss';`
    //     }
    //   }
    build: {
      // 浏览器兼容性 ‘esnext’ | 'modules'
      target: "modules",
      //输出路径
      outDir: outDirDist,
      assetsDir: 'static',
      // 默认情况下 若 outDir 在 root 目录下， 则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      rollupOptions: {
        input: pageEntry,
        output: {
          chunkFileNames: `static/js/[name]-[hash].js`,
          entryFileNames: `static/js/[name]-[hash].js`,
          assetFileNames: `static/[ext]/[name]-[hash].[ext]`,
        },
      }
    }
  }
})
