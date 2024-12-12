<template>
  <div class="data-page-container">
    <div class="data-container">
        <el-icon class="data-icon" style="font-size: 36px;"><SetUp /></el-icon>
        <h1>Data Statistics</h1>
    </div>

    <!-- 包裹内容的框 -->
    <div class="content-box">
      <!-- 导航栏 -->
      <div class="navigation-container">
        <router-link to="/data/geneFlow" class="navigation-item">Data Set</router-link>
        <router-link to="/data/geneAffinity" class="navigation-item">Gene Affinity</router-link>
        <router-link to="/data/populationStructure" class="navigation-item">Population Structure</router-link>
        <router-link to="/data/ancestry" class="navigation-item">Ancestry</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="data-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <RouterView></RouterView>
      </div>
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
.content-box {
  background-color: white;
  padding: 10px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 20px; /* 可以调整框与导航栏之间的间距 */
}

.data-container {
  display: flex;
  padding: 20px;
}
.data-content-container{
  flex: 1;
  
}
.navigation-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  border-radius: 10px; /* 边框圆角 */
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.navigation-item {
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

.navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 悬浮透明白色背景 */
  transform: scale(1.05); /* 缩放效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 放大阴影 */
}

.navigation-item.router-link-active {
  background-color: #1abc9c; /* 激活状态的背景色 */
  color: #ffffff; /* 激活状态的字体颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 深色阴影 */
  transform: scale(1.1); /* 激活状态稍微放大 */
}

</style>
