<script lang="ts" setup>
import { ref } from 'vue'
import HelpContent from './component/HelpContent.vue'

const tabPosition = ref('left')
</script>


<template>
  <div class="Help-page-container">
    <div class="Help-container">
        <el-icon class="Help-icon"><ChatDotRound /></el-icon>
        <h1>Help</h1>
    </div>

    <div class="Help-content-container">
      <HelpContent></HelpContent>

    </div>
  </div>
</template>

<style>
.Help-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.Help-container {
  display: flex;
  padding: 20px;
}
.Help-content-container{
  background-color: white;
  padding: 20px;
  flex: 1;
  border-radius: 5px;
  border: 2px whitesmoke;
  
}
.Help-icon{
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