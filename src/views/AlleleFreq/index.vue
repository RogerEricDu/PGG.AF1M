<script>
import AllIndividuals from './components/AllIndividuals.vue'
import ByProvince from './components/ByProvince.vue'
import ByRegion from './components/ByRegion.vue'
import SearchingBar from './components/SearchingBar.vue'
export default {
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
    <div class="AlleleFreq-container">
      <el-icon class="AlleleFreq-icon1"><Document /></el-icon><h1>Allele Frequency</h1>  
    </div>
    <div style="height:100%">
      <SearchingBar></SearchingBar>
          <!-- 包裹内容的框 -->
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
<!--     <GeneTable /> -->
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
.AlleleFreq-container {
  display: flex;
  padding: 20px;
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
.AlleleFreq-icon{
  border:black;
  font-size: 36px;
}
.AlleleFreq-navigation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.AlleleFreq-navigation-item {
  font-size: 20px;
  font-weight: bold;
  color: #6e9197;
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 5px; 
  cursor: pointer; /* 可以使导航项鼠标移上去时显示为手型 */
  margin-left: 5px;
  background-color:#f5f5f5;
}

.AlleleFreq-navigation-item:hover {
  background-color: lightgray; /* 鼠标移上去时的背景颜色 */
}
</style>