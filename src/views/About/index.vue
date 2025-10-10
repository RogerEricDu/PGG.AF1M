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
      <el-icon class="memo-icon" style="font-size: 36px;"><Memo /></el-icon>
      <h1>About</h1>
    </div>
    <div class="content-container">
      <el-tabs :tab-position="tabPosition" class="about-tabs">
        <el-tab-pane label="Aim and Scope"><mainContent></mainContent></el-tab-pane>
        <el-tab-pane label="Team"><TeamContent></TeamContent></el-tab-pane>
        <el-tab-pane label="Collaborator"><Collaborator></Collaborator></el-tab-pane>
        <el-tab-pane label="Contact Us"><ContactUs></ContactUs></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.about-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 深色背景 */
  color: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.content-container{
  flex: 1;
}

.about-tabs {
  margin-top: 20px; /* 调整标签页与上方内容的距离 */
}

.about-tabs .el-tabs__item {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: bold;
  color: #4a7073;
  border-radius: 5px; 
  cursor: pointer; /* 可以使导航项鼠标移上去时显示为手型 */
  margin-left: 5px;

}

.about-tabs .el-tabs__item:hover, 
.about-tabs .el-tabs__item.is-active {
  background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  color: white; /* 点击后字体变白 */
}

.about-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  background-color: white;
}


</style>