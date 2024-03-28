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
          <li class="home">
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li> <RouterLink to="/data">Data</RouterLink> </li>
           <li> <RouterLink to="/gene">Allele Freq</RouterLink> </li>
          <li> <RouterLink to="/snps">Summary</RouterLink> </li>
          <li> <RouterLink to="/about">About</RouterLink> </li>
          <li> <RouterLink to="/guide">Guide</RouterLink> </li>
        </ul>
        <div class="search">
          <input type="text" placeholder="Search">
        </div>
        
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
    height: 80px;
    background: url("@/assets/images/BigDataLogo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

}

.app-header-nav {
    width: 850px;
    display: flex;
    padding-left: 40px;
    justify-content: space-between;
    position: relative;
    z-index: 998;
  
    li {
      width: 100px;
      text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
  .search {
    width: 300px;
    height: 36px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 40px;


    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>