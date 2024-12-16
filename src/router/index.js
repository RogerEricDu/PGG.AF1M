//createRouter 创建路由实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Statistics from '@/views/Statistics/index.vue'
import AlleleFreq from '@/views/AlleleFreq/index.vue'
import AllIndividuals from '@/views/AlleleFreq/components/AllIndividuals.vue'
import ByProvince from '@/views/AlleleFreq/components/ByProvince.vue'
import ByRegion from '@/views/AlleleFreq/components/ByRegion.vue'
import FurtherInfo from '@/views/FurtherInfo/index.vue'
import Tools from '@/views/Tools/index.vue'
import Summary from '@/views/Summary/index.vue'
import About from '@/views/About/index.vue'
import Guide from '@/views/Guide/index.vue'
import GeneAffinity from '@/views/Statistics/component/GeneAffinity.vue'
import PopulationStructure from '@/views/Statistics/component/PopulationStructure.vue'
import Ancestry from '@/views/Statistics/component/Ancestry.vue'
import GeneFlow from '@/views/Statistics/component/GeneFlow.vue'
import DataUpload from '@/views/Tools/component/DataUpload.vue'
import Imputation from '@/views/Tools/component/Imputation.vue'
import Results from '@/views/Tools/component/Results.vue'
import Help from '@/views/Help/index.vue'
import Data from '@/views/Data/index.vue'
import Microarray from '@/views/AlleleFreq/components/Microarray.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path:'/',
      component:Layout,
      meta: { requiresAuth: true }, // 需要登录才能访问的页面
      children:[ //二级路由
      {
        path:'',
        component:Home
      }, 
      {
        path:'data',
        component:Data,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
/*       {
        path:'Intro',
        component:Intro
      }, */
      {
        path:'statistics',
        component:Statistics,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        redirect: '/statistics/geneFlow', 
        children: [
          { path: 'geneAffinity', component: GeneAffinity },
          { path: 'populationStructure', component: PopulationStructure },
          { path: 'ancestry', component: Ancestry },
          { path: 'geneFlow', component: GeneFlow }
        ]
      },
      {
        path:'allelefreq',
        component:AlleleFreq, 
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        children: [
          { path: 'all_ind', component: AllIndividuals },
          { path: 'by_province', component: ByProvince },
          { path: 'by_region', component: ByRegion },
          { path: 'microarray', component: Microarray},
        ]
      },
      {
        path:'further_info',
        component:FurtherInfo,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      {
        path:'tools',
        component:Tools,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        children: [
          { path: 'DataUpload', component: DataUpload },
          { path: 'Imputation', component: Imputation },
          { path: 'Results', component: Results },
        ]
      },
      {
        path:'summary',
        component:Summary,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      {
        path:'about',
        component:About,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      {
        path:'guide',
        component:Guide,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      {
        path:'help',
        component:Help,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      ]
    },
    {
      path:'/login',
      component:Login
    },
  ]
})


export default router