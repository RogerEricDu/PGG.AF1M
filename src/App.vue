<script setup>
import LayoutNav from '@/components/LayoutNav.vue'
import LayoutHeader from '@/components/LayoutHeader.vue'
import LayoutFooter from '@/components/LayoutFooter.vue'
import LayoutSticky from '@/components/LayoutSticky.vue'
</script>

<template>

  <LayoutSticky />
  <LayoutNav />
  <LayoutHeader />
  <!-- 一级路由出口组件 -->
  <RouterView />
  <LayoutFooter />
  <el-backtop :right="100" :bottom="100" />
</template>

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
