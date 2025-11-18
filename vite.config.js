import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//配置elementUI plus 按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/pggaf1m/', 
  resolve: {
    alias: {
      'stream': 'stream-browserify',
      'process': 'process/browser',
      '@': fileURLToPath(new URL('./src', import.meta.url)) //实际的路径转化
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
/*   resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) //实际的路径转化
    }
  }, */
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
    port:8081,
    host:'0.0.0.0',
    proxy: {
      '/pgghan2': {
        target: 'https://www.biosino.org',
        changeOrigin: true,
        pathRewrite: {
          '^/pgghan2': '/pgghan2', // 确保路径前缀不丢失
        },
      },
      '/dbSNP': {
        target: 'https://www.ncbi.nlm.nih.gov', // 目标是 https://www.ncbi.nlm.nih.gov
        changeOrigin: true,
        pathRewrite: {
          '^/dbSNP': '/snp', // 将 `/dbSNP` 路径重写为 `/snp`
        },
      },
      '/gnomAD': {
        target: 'https://gnomad.broadinstitute.org',
        changeOrigin: true,
        pathRewrite: {
          '^/gnomAD': '', // 不重写，直接将请求转发到目标域
        },
      },
      '/pggsnv': {
        target: 'https://pog.fudan.edu.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/pggsnv': '/pggsnv', // 保持路径前缀
        },
      },
    },
  }
})
