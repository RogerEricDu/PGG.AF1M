<script lang="ts" setup>
import { ref } from 'vue'
import mainContent from './components/mainContent.vue'
import TeamContent from './components/TeamContent.vue'
import Collaborator from './components/Collaborator.vue'
import ContactUs from './components/ContactUs.vue'


const tabPosition = ref('left')
</script>


<template>
  <div class="page-container">
    <div class="about-container">
      <el-icon class="memo-icon"><Memo /></el-icon>
      <h1>About</h1>
    </div>
    <div class="content-container">
      <el-tabs :tab-position="tabPosition" class="demo-tabs">
        <el-tab-pane label="01 Aim and Scope"><mainContent></mainContent></el-tab-pane>
        <el-tab-pane label="02 Team"><TeamContent></TeamContent></el-tab-pane>
        <el-tab-pane label="03 Collaborator"><Collaborator></Collaborator></el-tab-pane>
        <el-tab-pane label="04 Contact Us"><ContactUs></ContactUs></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.about-container {
  display: flex;
  padding: 20px;
}
.content-container{
  flex: 1;
}
.memo-icon{
  border:black;
  font-size: 36px;
}

.demo-tabs {
  margin-top: 20px; /* 调整标签页与上方内容的距离 */
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  background-color: white; /* 右侧内容部分背景变为白色 */
}
</style>