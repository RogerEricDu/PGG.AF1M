<script setup>

</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">HomePage</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home"><RouterLink to="/">Home</RouterLink></li>
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
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 100px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/BigDataLogo.png') no-repeat center 18px / contain;
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