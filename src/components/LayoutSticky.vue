<script setup>
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)
</script>

<template>
    <div class="app-header-sticky" :class="{ show: y > 78 }">
      <div class="container">
        <h1 class="logo">
        <RouterLink to="/"></RouterLink>
      </h1>
        <ul class="app-header-nav">
          <li :class="{ active: $route.path === '/' }">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/data' }">
            <RouterLink to="/data">Data</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/population' }">
            <RouterLink to="/population">Population</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/allelefreq' }">
            <RouterLink to="/allelefreq">Variants</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/tools' }">
            <RouterLink to="/tools">Tools</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/summary' }">
            <RouterLink to="/summary">Summary</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/about' }">
            <RouterLink to="/about">About</RouterLink>
          </li>
          <li :class="{ active: $route.path === '/guide' }">
            <RouterLink to="/guide">Guide</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px; /* 使高度与父容器保持一致 */
    background: url("/HomeIcon.png") no-repeat center center;
    background-size: contain; /* 保持图片比例，确保完整显示 */
  }

}

.app-header-nav {
    display: flex;
    padding-left: 40px;
    justify-content: space-between;
    position: relative;
    z-index: 998;

    li {
      list-style: none;
      margin: 0 10px;
      font-weight: bold;

      a {
        display: block;
        padding: 10px 20px;
        border-radius: 40px;
        font-size: 16px;
        line-height: 32px;
        color: #333;
        text-align: center;
        text-decoration: none;
        background-color: transparent;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: grey;
          color: white;
        }
      }

      &.active a {
        background-color: #333;
        color: white;
        border-color: #333;
      }
    }
  }
</style>