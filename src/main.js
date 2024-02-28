/* import './assets/main.css' */

import { createApp } from 'vue'
//导入createPinia
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


//引入初始化样式文件
import '@/styles/common.scss'

//引入element plus图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'  

//测试接口函数
import { getCategory } from "@/apis/testAPI"
getCategory().then(res=>{
    console.log(res)
})
//执行方法得到实例
const app = createApp(App)

//注册element plus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//pinia加入到app应用中
app.use(createPinia())
app.use(router)


app.mount('#app')