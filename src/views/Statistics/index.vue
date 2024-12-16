<template>
  <div class="data-page-container">
    <div class="data-container">
        <el-icon class="data-icon" style="font-size: 36px;"><SetUp /></el-icon>
        <h1>Data Statistics</h1>
    </div>

    <!-- 包裹内容的框 -->
    <div class="content-box">
      <!-- 导航栏 -->
      <!-- <h1>Data Statistics</h1> -->
    </div>
    <div class="navigation-container">
        <router-link to="/statistics/geneFlow" class="navigation-item">Data Set</router-link>
        <router-link to="/statistics/geneAffinity" class="navigation-item">Gene Affinity</router-link>
        <router-link to="/statistics/populationStructure" class="navigation-item">Population Structure</router-link>
        <router-link to="/statistics/ancestry" class="navigation-item">Ancestry</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="data-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <RouterView></RouterView>
      </div>
  </div>
</template>

<style>
.data-page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px;
  margin: 0 auto; /* 居中显示 */
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 页面背景渐变 */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); /* 页面边缘阴影 */
}

.data-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 深色背景 */
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: -10px; /* 将标题部分稍微覆盖到内容框上 */
  position: relative;
  z-index: 10;
}

.data-container h1 {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1.2px;
  margin-left: 10px;
  color: #f1f1f1;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
}

.content-box {
  background-color: white;
  padding: 30px;
  border-radius: 15px; /* 圆角加大 */
  margin-top: -20px; /* 让内容框更贴近标题 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* 柔和阴影效果 */
  border: 1px solid #e0e0e0; /* 增加细边框 */
  animation: fadeInUp 0.5s ease; /* 内容区域的入场动画 */
}

/* 渐变分割线 */
.el-divider {
  height: 3px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 和标题一致的渐变色 */
  border-radius: 5px;
  margin: 20px 0;
}

.navigation-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  background: linear-gradient(to right, #3a6073, #16222a);
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.navigation-item {
  font-size: 18px;
  font-weight: bold;
  color: #ecf0f1;
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  margin: 0 10px;
  background-color: transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.navigation-item.router-link-active {
  background-color: #1abc9c;
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

/* 动画效果 */
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


</style>
