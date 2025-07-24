<template>

  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />
  <!-- 一级路由出口组件 -->
  <RouterView />
  <LayoutFooter />
  <el-backtop :right="100" :bottom="100" />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

import LayoutNav from '@/components/LayoutNav.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutSticky from '@/components/LayoutSticky.vue'

const authStore = useAuthStore()
const router = useRouter()

let inactivityTimer = null
const CHECK_INTERVAL = 60 * 1000 // 每分钟检查一次
const TIMEOUT = 20 * 60 * 1000 // 20 分钟

// 刷新活动时间
const resetLastActive = () => {
  authStore.lastActiveTime = Date.now()
}

// 定期检查是否超时
const checkInactivity = () => {
  if (authStore.isLoggedIn) {
    const now = Date.now()
    const last = authStore.lastActiveTime || 0
    if (now - last > TIMEOUT) {
      authStore.logout()
      router.push('/user/login')
    }
  }
}

onMounted(() => {
  checkInactivity()
  window.addEventListener('click', resetLastActive)
  window.addEventListener('keydown', resetLastActive)
  window.addEventListener('scroll', resetLastActive)
  inactivityTimer = setInterval(checkInactivity, CHECK_INTERVAL)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', resetLastActive)
  window.removeEventListener('keydown', resetLastActive)
  window.removeEventListener('scroll', resetLastActive)
  clearInterval(inactivityTimer)
})
</script>


<style scoped lang="scss">

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
  }
}
</style>
