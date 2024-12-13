<script>
import AllIndividuals from './components/AllIndividuals.vue'
import ByProvince from './components/ByProvince.vue'
import ByRegion from './components/ByRegion.vue'
import Microarray from './components/Microarray.vue';
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
    Microarray,
    SearchingBar
  }
} 

</script>

<template>
<div class="AlleleFreq-page-container">
    <div class="header-container" style="height:100%">
      <el-icon class="AlleleFreq-icon1" style="font-size: 36px;"><Document /></el-icon><h1>Variants</h1>  
    </div>
    <div class="AlleleFreq-search-container" style="height:100%">
      <SearchingBar></SearchingBar>
    <div class="AlleleFreq-content-box">
      <p style="font-size: 20px;font-weight: bold;text-align: center;">Choose the section you would like to use.</p>
      <!-- 导航栏 -->
      <div class="AlleleFreq-navigation-container">
        <router-link to="/allelefreq/all_ind" class="AlleleFreq-navigation-item">Individuals</router-link>
        <router-link to="/allelefreq/by_province" class="AlleleFreq-navigation-item">Province</router-link>
        <router-link to="/allelefreq/by_region" class="AlleleFreq-navigation-item">Region</router-link>
        <router-link to="/allelefreq/microarray" class="AlleleFreq-navigation-item">Microarray Data</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="AlleleFreq-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <router-view/>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
.AlleleFreq-page-container {
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}
/* 标题部分 */
.header-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 深色背景 */
  color: white;
  border-radius: 15px;
  margin-bottom: 20px; /* 标题与内容框的重叠效果 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.AlleleFreq-icon1{
  border:black;
  font-size: 36px;
}

.AlleleFreq-content-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 0px; /* 可以调整框与导航栏之间的间距 */
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
  justify-content: space-around;
  margin-top: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  border-radius: 10px; /* 边框圆角 */
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.AlleleFreq-navigation-item {
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

.AlleleFreq-navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 悬浮透明白色背景 */
  transform: scale(1.05); /* 缩放效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 放大阴影 */
}

.AlleleFreq-navigation-item.router-link-active {
  background-color: #1abc9c; /* 激活状态的背景色 */
  color: #ffffff; /* 激活状态的字体颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 深色阴影 */
  transform: scale(1.1); /* 激活状态稍微放大 */
}


</style>