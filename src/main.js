/* import './assets/main.css' */

import { createApp } from 'vue'
//导入createPinia
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'

//测试接口函数
import { getCategory } from "@/apis/testAPI"
getCategory().then(res=>{
    console.log(res)
})
//执行方法得到实例
const app = createApp(App)

//pinia加入到app应用中
app.use(createPinia())
app.use(router)

app.mount('#app')