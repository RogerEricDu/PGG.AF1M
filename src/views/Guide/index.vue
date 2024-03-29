<script lang="ts" setup>
import { ref } from 'vue'
import FAQ from './component/FAQ.vue'


const tabPosition = ref('left')
</script>


<template>
  <div class="guide-page-container">
    <div class="guide-container">
      <el-icon><Connection /></el-icon><h1>Guide</h1>
      
    </div>
    <div class="guide-content-container">
      <el-tabs :tab-position="tabPosition" class="demo-tabs">
        <el-tab-pane label="01 Aim and Scope"><FAQ></FAQ></el-tab-pane>
        <el-tab-pane label="02 Team"></el-tab-pane>
        <el-tab-pane label="03 Collaborator"></el-tab-pane>
        <el-tab-pane label="04 Contact Us"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.guide-page-container {
  display: flex;
  flex-direction: column;
  height: 1200px;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.guide-container {
  display: flex;
  padding: 20px;
}
.guide-content-container{
  flex: 1;
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