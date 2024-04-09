<script lang="ts" setup>
import { ref } from 'vue'

const tabPosition = ref('left')
</script>


<template>
  <div class="data-page-container">
    <div class="data-container">
        <el-icon class="data-icon"><SetUp /></el-icon>
        <h1>Data Statistics</h1>
    </div>

    <div class="data-content-container">
      <el-tabs :tab-position="tabPosition" type="card" class="demo-tabs">
        <el-tab-pane label="01 Database"></el-tab-pane>
        <el-tab-pane label="02 Analysis"></el-tab-pane>
        <el-tab-pane label="03 FAQ"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style>
.data-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.data-container {
  display: flex;
  padding: 20px;
}
.data-content-container{
  flex: 1;
  
}
.data-icon{
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