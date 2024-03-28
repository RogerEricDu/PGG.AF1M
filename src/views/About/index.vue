<script>
import asideNav from "@/views/About/components/asideNav.vue"
import mainContent from "@/views/About/components/mainContent.vue"
export default {
  components: {
    asideNav,
    mainContent
  }
}
</script>

<template>
    <div class="aboutPage">
      <el-aside class="sidebar">
        <asideNav></asideNav>
      </el-aside>
      <el-main class="content">
        <mainContent></mainContent>
      </el-main>
    </div>
  </template>
  
  <style>
  .aboutPage {
    display: flex; /* 使用 Flexbox 布局 */
    height: 1200px;
    margin: 20px 80px;
  }
  
  .sidebar {
    flex: 0 0 200px; /* 侧边栏宽度为 400px */
  }
  
  .content {
    flex: 1; /* 内容区域占据剩余空间 */
  }
  </style>