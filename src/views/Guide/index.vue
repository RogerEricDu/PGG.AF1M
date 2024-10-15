<script lang="ts" setup>
import { ref } from 'vue'

import Database from './component/Database.vue'
import FAQ from './component/FAQ.vue'
import Analysis from './component/Analysis.vue'


const tabPosition = ref('left')
</script>


<template>
  <div class="guide-page-container">
    <div class="guide-container">
      <el-icon class="guide-icon1" style="font-size: 36px;"><EditPen /></el-icon><h1>Guide</h1>
      
    </div>
    <div class="guide-content-container">
      <el-tabs :tab-position="tabPosition" class="guide-tabs">
        <el-tab-pane label="Database"><Database></Database></el-tab-pane>
        <el-tab-pane label="Analysis"><Analysis></Analysis></el-tab-pane>
        <el-tab-pane label="FAQ"><FAQ></FAQ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.guide-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
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

.guide-tabs {
  margin-top: 20px; /* 调整标签页与上方内容的距离 */
}

.guide-tabs .el-tabs__item {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #6e9197;
  border-radius: 5px; 
  cursor: pointer; /* 可以使导航项鼠标移上去时显示为手型 */
  margin-left: 5px;
  background-color:#f5f5f5;
}

.guide-tabs .el-tabs__item:hover{
  background-color: lightgray; /* 鼠标移上去时的背景颜色 */
}

.guide-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  background-color: white; /* 右侧内容部分背景变为白色 */
}
</style>