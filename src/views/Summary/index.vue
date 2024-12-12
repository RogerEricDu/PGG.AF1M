<script lang="ts" setup>
import { ref } from 'vue'
import summaryContent from './component/summarycontent.vue'


const tabPosition = ref('left')
</script>


<template>
  <div class="summary-page-container">
    <div class="summary-container">
        <el-icon class="summary-icon" style="font-size: 36px;"><DocumentCopy /></el-icon>
        <h1>Summary</h1>
    </div>

    <div class="summary-content-container">
      <summaryContent></summaryContent>

    </div>
  </div>
</template>

<style>
.summary-page-container {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.summary-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 深色背景 */
  color: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.summary-content-container{
  background-color: white;
  padding: 20px;
  flex: 1;
  border-radius: 5px;
  border: 2px whitesmoke;
  
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