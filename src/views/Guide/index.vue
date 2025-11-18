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
        <el-tab-pane label="Tools"><Analysis></Analysis></el-tab-pane>
        <el-tab-pane label="FAQ"><FAQ></FAQ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.guide-page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.guide-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #3a6073, #16222a);
  color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}
.guide-container::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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
  color: #4a7073;
  border-radius: 5px; 
  cursor: pointer; /* 可以使导航项鼠标移上去时显示为手型 */
  margin-left: 5px;
}

.guide-tabs .el-tabs__item:hover, 
.guide-tabs .el-tabs__item.is-active {
    background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  color: white; /* 点击后字体变白 */
}

.guide-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  background-color: white;
}
</style>