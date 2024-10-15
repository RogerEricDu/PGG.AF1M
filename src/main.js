//全局注册

import { createApp } from 'vue'
import { createStore } from 'vuex';

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入axios
import axios from 'axios'

//引入初始化样式文件
import '@/styles/common.scss'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//引入element plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  

/* //测试接口函数
import { getCategory } from "@/api/testAPI"
getCategory().then(res=>{
    console.log(res)
}) */

// 创建 Vuex 实例
const store = createStore({
  state() {
      return {
          // 定义你的状态
          count: 0
      };
  },
  mutations: {
      increment(state) {
          state.count++;
      }
  }
});


//执行方法得到实例
const app = createApp(App)

//注册element plus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//pinia加入到app应用中
app.use(createPinia())

app.use(router)
app.use(ElementPlus)

//axios加入app实例
axios.defaults.baseURL = "http://localhost:8081" // baseURL,后需要修改

//axios作为全局的自定义属性，每个组件可以内部直接访问this.$axios
app.config.globalProperties.$axios = axios

app.use(store);

app.mount('#app')