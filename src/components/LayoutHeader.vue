<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">HomePage</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li :class="{ active: $route.path === '/' }">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/statistics' }">
          <RouterLink to="/statistics">Stats</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/data' }">
          <RouterLink to="/data">Data</RouterLink>
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
      background: url('/HomeIcon.png') no-repeat center center / contain;
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
}
</style>

