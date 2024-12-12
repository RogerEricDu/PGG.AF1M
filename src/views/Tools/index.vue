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
        <router-link to="/tools/Imputation" class="tools-navigation-item">Imputation</router-link>
        <router-link to="/tools/Results" class="tools-navigation-item">Results</router-link>
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
  justify-content: space-around;
  margin-top: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  border-radius: 10px; /* 边框圆角 */
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.tools-navigation-item {
  font-size: 18px;
  font-weight: bold;
  color: #ecf0f1; /* 默认字体颜色 */
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 8px; /* 边框圆角 */
  cursor: pointer;
  margin: 0 10px; /* 间距 */
  background-color: transparent; /* 透明背景 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.tools-navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 悬浮透明白色背景 */
  transform: scale(1.05); /* 缩放效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 放大阴影 */
}

.tools-navigation-item.router-link-active {
  background-color: #1abc9c; /* 激活状态的背景色 */
  color: #ffffff; /* 激活状态的字体颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 深色阴影 */
  transform: scale(1.1); /* 激活状态稍微放大 */
}

</style>
