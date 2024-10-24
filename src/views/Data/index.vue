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
        <router-link to="/data/gene-affinity" class="navigation-item">Gene Affinity</router-link>
        <router-link to="/data/population-structure" class="navigation-item">Population Structure</router-link>
        <router-link to="/data/ancestry" class="navigation-item">Ancestry</router-link>
        <router-link to="/data/gene-flow" class="navigation-item">Gene Flow</router-link>
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
  padding: 20px;
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
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.navigation-item {
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

.navigation-item:hover {
  background-color: #bdc3c7; /* 悬停时变为浅灰蓝 */
}
.navigation-item:active, 
.navigation-item.router-link-active {
  background-color: #95a5a6; /* 点击/激活时比 #b0c4c5 深的灰蓝色 */
  color: white; /* 点击时字体变为白色 */
}

</style>
