//createRouter 创建路由实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Data from '@/views/Data/index.vue'
import AlleleFreq from '@/views/AlleleFreq/index.vue'
import Analysis from '@/views/Analysis/index.vue'
import Summary from '@/views/Summary/index.vue'
import About from '@/views/About/index.vue'
import Guide from '@/views/Guide/index.vue'
import GeneAffinity from '@/views/Data/component/GeneAffinity.vue'
import PopulationStructure from '@/views/Data/component/PopulationStructure.vue'
import Ancestry from '@/views/Data/component/Ancestry.vue'
import GeneFlow from '@/views/Data/component/GeneFlow.vue'

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
        component:Data,
        children: [
          { path: 'gene-affinity', component: GeneAffinity },
          { path: 'population-structure', component: PopulationStructure },
          { path: 'ancestry', component: Ancestry },
          { path: 'gene-flow', component: GeneFlow }
        ]
      },
      {
        path:'allelefreq',
        component:AlleleFreq,
      },
      {
        path:'analysis',
        component:Analysis,
      },
      {
        path:'summary',
        component:Summary,
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
