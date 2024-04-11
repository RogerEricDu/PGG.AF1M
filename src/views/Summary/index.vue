<script lang="ts" setup>
import { ref } from 'vue'
import summaryContent from './component/summarycontent.vue'


const tabPosition = ref('left')
</script>


<template>
  <div class="summary-page-container">
    <div class="summary-container">
        <el-icon class="summary-icon"><DocumentCopy /></el-icon>
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
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.summary-container {
  display: flex;
  padding: 20px;
}
.summary-content-container{
  background-color: white;
  margin: 0 30px 30px 30px;
  flex: 1;
  border-radius: 5px;
  border: 2px whitesmoke;
  
}
.summary-icon{
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