<script>
import AllIndividuals from './components/AllIndividuals.vue'
import ByProvince from './components/ByProvince.vue'
import ByRegion from './components/ByRegion.vue'
import SearchingBar from './components/SearchingBar.vue'
export default {
  // 导入上传接口
  name: 'import',
    data() {
        return {
        };
    },
    methods: {
    },
  components: {
    AllIndividuals, // 注册GeneTable组件
    ByProvince,
    ByRegion,
    SearchingBar
  }
} 

</script>

<template>
<div class="AlleleFreq-page-container">
    <div class="AlleleFreq-container" style="height:100%">
      <el-icon class="AlleleFreq-icon1" style="font-size: 36px;"><Document /></el-icon><h1>Variants</h1>  
    </div>
    <div class="AlleleFreq-search-container" style="height:100%">
      <SearchingBar></SearchingBar>
    <div class="AlleleFreq-content-box">
      <p style="font-size: 20px;font-weight: bold;text-align: center;">Choose the section you would like to use.</p>
      <!-- 导航栏 -->
      <div class="AlleleFreq-navigation-container">
        <router-link to="/allelefreq/all_ind" class="AlleleFreq-navigation-item">All Individuals</router-link>
        <router-link to="/allelefreq/by_province" class="AlleleFreq-navigation-item">By Province</router-link>
        <router-link to="/allelefreq/by_region" class="AlleleFreq-navigation-item">By Region</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="AlleleFreq-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <router-view/>
      </div>
    </div>
    </div>
  </div>
</template>

<style>
.AlleleFreq-page-container {
  user-select: text; /* 允许文本被选择 */
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}
.AlleleFreq-icon1{
  border:black;
  font-size: 36px;
}

.AlleleFreq-content-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 20px; /* 可以调整框与导航栏之间的间距 */
}

.AlleleFreq-container {
  display: flex;
  padding: 20px;
}
.AlleleFreq-content-container{
  flex: 1;
  
}

.AlleleFreq-navigation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.AlleleFreq-navigation-item {
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

.AlleleFreq-navigation-item:hover {
  background-color: #bdc3c7; /* 悬停时变为浅灰蓝 */
}
.AlleleFreq-navigation-item:active, 
.AlleleFreq-navigation-item.router-link-active {
  background-color: #95a5a6; /* 点击/激活时比 #b0c4c5 深的灰蓝色 */
  color: white; /* 点击时字体变为白色 */
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>