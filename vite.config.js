import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//配置elementUI plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'



// https://vitejs.dev/config/
export default defineConfig({

  resolve: {
    alias: {
      'stream': 'stream-browserify',
      'process': 'process/browser',
    }
  },
  define: {
    global: 'window'
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        //配置elementPlus采用sass样式配色系统
        ElementPlusResolver({importStyle:"sass"})
    ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) //实际的路径转化
    }
  },
  css:{
    preprocessorOptions:{
      scss:{
        //自动导入定制化样式文件进行样式覆盖
        additionalData:`
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;
      `,
      }
    }
  },
  server:{ //修改端口
    port:8080,
    host:'0.0.0.0'
  }
})
