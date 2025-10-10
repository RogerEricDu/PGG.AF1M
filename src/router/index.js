//createRouter 创建路由实例对象
//createWebHistory 创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home/index.vue'

import Microarray from '@/views/Microarray/index.vue'

import AlleleFreqHome from '@/views/AlleleFreq/index.vue'
import AllIndividuals from '@/views/AlleleFreq/components/AllIndividuals.vue'
import ByProvince from '@/views/AlleleFreq/components/ByProvince.vue'
import ByRegion from '@/views/AlleleFreq/components/ByRegion.vue'

import TGS from '@/views/TGS/index.vue'
import AllIndividualsTGS from '@/views/TGS/components/AllIndividuals.vue'
import ByProvinceTGS from '@/views/TGS/components/ByProvince.vue'
import ByRegionTGS from '@/views/TGS/components/ByRegion.vue'

import FurtherInfo from '@/views/FurtherInfo/index.vue'
import Tools from '@/views/Tools/index.vue'
import Summary from '@/views/Summary/index.vue'
import About from '@/views/About/index.vue'
import Guide from '@/views/Guide/index.vue'
import DataUpload from '@/views/Tools/component/DataUpload.vue'
import Imputation from '@/views/Tools/component/Imputation.vue'
import GWAS from '@/views/Tools/component/GWAS.vue'
import IBD from '@/views/Tools/component/IBD.vue'
import DeepSeek from '@/views/Tools/component/DeepSeek.vue'
import Help from '@/views/Help/index.vue'
import Data from '@/views/Data/index.vue'
import User from '@/views/User/index.vue'
import Login from '@/views/User/component/login.vue'
import Register from '@/views/User/component/register.vue'
import Profile from '@/views/User/component/profile.vue'
import Admin from '@/views/User/component/admin.vue'
import { useAuthStore } from '@/store/authStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
      {
        path:'/',
        name:'Home',
        component:Home
      }, 
      {
        path:'/data',
        name:'Data',
        component:Data,
      },
      {
        path:'/microarray',
        name:'Microarray',
        component:Microarray,
      },

      {
        path:'/allelefreq',
        name:'AlleleFreq',
        component:AlleleFreqHome, 
        children: [
          { path: 'all_ind', component: AllIndividuals },
          { path: 'by_province', component: ByProvince },
          { path: 'by_region', component: ByRegion },
        ]
      },

      {
        path:'/tgs',
        name:'TGS',
        component:TGS, 
        children: [
          { path: 'all_ind', component: AllIndividualsTGS },
          { path: 'by_province', component: ByProvinceTGS },
          { path: 'by_region', component: ByRegionTGS },
        ]
      },
      {
        path:'/further_info',
        name:'FurtherInfo',
        component:FurtherInfo,
      },
      {
        path:'/tools',
        name:'Tools',
        component:Tools,
        children: [
          { path: 'DeepSeek', component: DeepSeek, meta: { requiresAuth: true } },
          { path: 'DataUpload', component: DataUpload, meta: { requiresAuth: true } },
          { path: 'Imputation', component: Imputation, meta: { requiresAuth: true }  },
/*           { path: 'Results', component: Results, meta: { requiresAuth: true }  }, */
          /* { path: 'BLAST', component: BLAST, meta: { requiresAuth: true }  }, */
          { path: 'IBD', component: IBD, meta: { requiresAuth: true }  },
          { path: 'GWAS',component:GWAS, meta: { requiresAuth: true }  }
        ]
      },
      {
        path:'/summary',
        name:'Summary',
        component:Summary,
      },
      {
        path:'/about',
        name:'About',
        component:About,
      },
      {
        path:'/guide',
        name:'Guide',
        component:Guide,
      },
      {
        path:'/help',
        name:'Help',
        component:Help,
      },
      {
        path:'/user',
        name:'User',
        component:User,
        children: [
          { path: 'login', name: 'Login', component: Login },
          { path: 'register', name: 'Register', component: Register }, 
          { path: 'profile', name: 'Profile', component: Profile, meta: { requiresAuth: true } }, //需要登录
          { path: 'admin', name: 'Admin', component: Admin, meta: { requiresAdmin: true } } //需要管理员
        ]
      },
      ]
    },
)


router.beforeEach((to,from,next) =>{
  const authStore = useAuthStore();
  const userIsAuthenticated = authStore.isLoggedIn;
  const userIsAdmin = authStore.user?.role ===1;
  if(to.matched.some(record => record.meta.requiresAuth) && !userIsAuthenticated){
    next({name:'Login'});
  }else if(to.matched.some(record => record.meta.requiresAdmin) && !userIsAdmin){
    next({name:'Home'})
  }else{
    next();
  }
});

export default router