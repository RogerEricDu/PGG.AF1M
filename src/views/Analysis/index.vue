<script>

</script>

<template>
  <div class="Analysis-page-container">
    <div class="Analysis-container">
        <el-icon class="Analysis-icon"><DataAnalysis /></el-icon>
        <h1>Data Analysis</h1>
    </div>
    </div>
</template>


<style>
.Analysis-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.Analysis-container {
  display: flex;
  padding: 20px;
}
.Analysis-content-container{
  flex: 1;
  
}
.Analysis-icon{
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