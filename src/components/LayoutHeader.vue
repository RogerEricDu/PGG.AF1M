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
<!--         <li :class="{ active: $route.path === '/statistics' }">
          <RouterLink to="/statistics">Stats</RouterLink>
        </li> -->
        <li :class="{ active: $route.path === '/data' }">
          <RouterLink to="/data">Data</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/microarray' }">
          <RouterLink to="/microarray">Microarray</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/allelefreq' }">
          <RouterLink to="/allelefreq">NGS</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/tgs' }">
          <RouterLink to="/tgs">TGS</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/tools' }">
          <RouterLink to="/tools">Tools</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/about' }">
          <RouterLink to="/about">About</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/guide' }">
          <RouterLink to="/guide">Guide</RouterLink>
        </li>
        <li :class="{ active: $route.path === '/user' }">
          <RouterLink to="/user/profile">User</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang='scss'>
.app-header {
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* 让logo和导航分别靠左右 */
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .logo {
    width: 200px;
    margin: 0; /* 移除默认margin */

    a {
      display: block;
      height: 80px;
      width: 100%;
      text-indent: -9999px;
      background: url('/Bar-Logo.png') no-repeat center center / contain;
    }
  }

  .app-header-nav {
    display: flex;
    align-items: center; /* 垂直居中 */
    margin: 0;
    padding: 0;
    list-style: none;
    gap: 5px; /* 使用gap替代margin */

    li {
      font-weight: bold;

      a {
        display: block;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 16px;
        line-height: 24px;
        color: #333;
        text-align: center;
        text-decoration: none;
        background-color: transparent;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        white-space: nowrap; /* 防止文字换行 */

        &:hover {
          background-color: #333;
          color: white;
          border-color: #333;
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

/* 响应式设计 */
@media (max-width: 1024px) {
  .app-header {
    .container {
      padding: 0 15px;
    }

    .app-header-nav {
      gap: 3px;
      
      li a {
        padding: 10px 15px;
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 768px) {
  .app-header {
    .container {
      flex-direction: column;
      padding: 10px 15px;
    }

    .logo {
      width: 150px;
      margin-bottom: 10px;
      
      a {
        height: 60px;
      }
    }

    .app-header-nav {
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px;
      
      li a {
        padding: 8px 12px;
        font-size: 13px;
        border-radius: 20px;
      }
    }
  }
}

@media (max-width: 480px) {
  .app-header {
    .app-header-nav {
      gap: 3px;
      
      li a {
        padding: 6px 10px;
        font-size: 12px;
      }
    }
  }
}
</style>

