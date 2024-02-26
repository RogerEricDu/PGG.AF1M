//createRouter 创建路由实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Data from '@/views/Data/index.vue'
import Gene from '@/views/Gene/index.vue'
import SNPs from '@/views/SNPs/index.vue'
import About from '@/views/About/index.vue'
import Guide from '@/views/Guide/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path:'/',
      component:Layout,
      children:[ //二级路由
      {
        path:'',
        component:Home
      },
      {
        path:'data',
        component:Data
      },
      {
        path:'gene',
        component:Gene,
      },
      {
        path:'snps',
        component:SNPs,
      },
      {
        path:'about',
        component:About,
      },
      {
        path:'guide',
        component:Guide,
      },
      ]
    },
    {
      path:'/login',
      component:Login
    }
  ]
})

export default router
