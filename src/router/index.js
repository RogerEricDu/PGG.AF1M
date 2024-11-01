//createRouter 创建路由实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Data from '@/views/Data/index.vue'
import AlleleFreq from '@/views/AlleleFreq/index.vue'
import AllIndividuals from '@/views/AlleleFreq/components/AllIndividuals.vue'
import ByProvince from '@/views/AlleleFreq/components/ByProvince.vue'
import ByRegion from '@/views/AlleleFreq/components/ByRegion.vue'
import FurtherInfo from '@/views/FurtherInfo/index.vue'
import Analysis from '@/views/Analysis/index.vue'
import Summary from '@/views/Summary/index.vue'
import About from '@/views/About/index.vue'
import Guide from '@/views/Guide/index.vue'
import GeneAffinity from '@/views/Data/component/GeneAffinity.vue'
import PopulationStructure from '@/views/Data/component/PopulationStructure.vue'
import Ancestry from '@/views/Data/component/Ancestry.vue'
import GeneFlow from '@/views/Data/component/GeneFlow.vue'
import UploadQC from '@/views/Analysis/component/UploadQC.vue'
import Imputation from '@/views/Analysis/component/Imputation.vue'
import GWAS from '@/views/Analysis/component/GWAS.vue'
import AncestryInference from '@/views/Analysis/component/AncestryInference.vue'
import QuickStart from '@/views/Analysis/component/QuickStart.vue'
import Help from '@/views/Help/index.vue'
import Population from '@/views/Population/index.vue'

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
        path:'population',
        component:Population,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
/*       {
        path:'Intro',
        component:Intro
      }, */
      {
        path:'data',
        component:Data,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        redirect: '/data/gene-flow', 
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
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        children: [
          { path: 'all_ind', component: AllIndividuals },
          { path: 'by_province', component: ByProvince },
          { path: 'by_region', component: ByRegion },
        ]
      },
      {
        path:'further_info',
        component:FurtherInfo,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
      },
      {
        path:'analysis',
        component:Analysis,
        meta: { requiresAuth: true }, // 需要登录才能访问的页面
        children: [
          { path: 'uploadQC', component: UploadQC },
          { path: 'imputation', component: Imputation },
          { path: 'gwas', component: GWAS },
          { path: 'ancestryInference', component: AncestryInference },
          { path: 'quickStart', component: QuickStart }
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