<template>
  <div class="analysis-page-container">
    <div class="analysis-container">
        <el-icon class="analysis-icon" style="font-size: 36px;"><SetUp /></el-icon>
        <h1>Data Analysis</h1>
    </div>

    <!-- 包裹内容的框 -->
    <div class="analysis-content-box">
      <div class="analysis-photo-container">
            <img src="@/assets/images/AnalysisPipeline.png" alt="Centered Image">
      </div>
      <p style="font-size: 20px;font-weight: bold;text-align: center;">Choose the tool section you would like to use.</p>
      <!-- 导航栏 -->
      <div class="analysis-navigation-container">
        <router-link to="/analysis/uploadQC" class="analysis-navigation-item">Upload & QC</router-link>
        <router-link to="/analysis/imputation" class="analysis-navigation-item">Imputation</router-link>
        <router-link to="/analysis/gwas" class="analysis-navigation-item">GWAS</router-link>
        <router-link to="/analysis/ancestryInference" class="analysis-navigation-item">Ancestry Inference</router-link>
        <router-link to="/analysis/quickStart" class="analysis-navigation-item">Quick Start</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="analysis-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
.analysis-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}
.analysis-photo-container {
    text-align: center; /* 将图像居中 */
    margin-top: 20px; /* 添加上边距 */
    margin-bottom: 20px; /* 添加下边距 */
}

.analysis-photo-container img {
    width: 70%; /* 设置图像宽度为900px */
    height: 70%; /* 设置图像高度为600px */
    display: block; /* 设置图像为块级元素，以便居中显示 */
    margin: 20px auto; /* 设置上下边距为20px，左右居中 */
}
.analysis-content-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 20px; /* 可以调整框与导航栏之间的间距 */
}

.analysis-container {
  display: flex;
  padding: 20px;
}
.analysis-content-container{
  flex: 1;
  
}
.analysis-navigation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.analysis-navigation-item {
  font-size: 20px;
  font-weight: bold;
  color: #2c3e50; /* 深蓝灰色，未点击时的字体颜色 */
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 5px; 
  cursor: pointer;
  margin-left: 5px;
  background-color: #ecf0f1; /* 浅灰色，未点击时的背景颜色 */
  transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
}

.analysis-navigation-item:hover {
  background-color: #bdc3c7; /* 悬停时变为浅灰蓝 */
}

.analysis-navigation-item:active, 
.analysis-navigation-item.router-link-active {
  background-color: #95a5a6; /* 点击/激活时背景色变为亮蓝色 */
  color: white; /* 点击时字体变为白色 */
}

</style>
