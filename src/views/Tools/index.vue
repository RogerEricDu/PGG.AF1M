<template>
  <div class="tools-page-container">
    <div class="tools-container">
        <el-icon class="tools-icon" style="font-size: 36px;"><SetUp /></el-icon>
        <h1>Data Analysis</h1>
    </div>

    <!-- 包裹内容的框 -->
    <div class="tools-content-box">
      <div class="tools-photo-container">
            <img src="@/assets/images/AnalysisPipeline.png" alt="Centered Image">
      </div>
      <p style="font-size: 20px;font-weight: bold;text-align: center;">Choose the tool section you would like to use.</p>
      <!-- 导航栏 -->
      <div class="tools-navigation-container">
        <router-link to="/tools/DataUpload" class="tools-navigation-item">DataUpload</router-link>
        <router-link to="/tools/imputation" class="tools-navigation-item">Imputation</router-link>
        <router-link to="/tools/gwas" class="tools-navigation-item">GWAS</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="tools-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
.tools-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}
.tools-photo-container {
    text-align: center; /* 将图像居中 */
    margin-top: 20px; /* 添加上边距 */
    margin-bottom: 20px; /* 添加下边距 */
}

.tools-photo-container img {
    width: 70%; /* 设置图像宽度为900px */
    height: 70%; /* 设置图像高度为600px */
    display: block; /* 设置图像为块级元素，以便居中显示 */
    margin: 20px auto; /* 设置上下边距为20px，左右居中 */
}
.tools-content-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 20px; /* 可以调整框与导航栏之间的间距 */
}

.tools-container {
  display: flex;
  padding: 20px;
}
.tools-content-container{
  flex: 1;
  
}
.tools-navigation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.tools-navigation-item {
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

.tools-navigation-item:hover {
  background-color: #bdc3c7; /* 悬停时变为浅灰蓝 */
}

.tools-navigation-item:active, 
.tools-navigation-item.router-link-active {
  background-color: #95a5a6; /* 点击/激活时背景色变为亮蓝色 */
  color: white; /* 点击时字体变为白色 */
}

</style>
