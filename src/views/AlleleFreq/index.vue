<script>
import GeneTable from './components/GeneTable.vue'
import SearchingBar from './components/SearchingBar.vue'
export default {
  components: {
    GeneTable, // 注册GeneTable组件
    SearchingBar
  }
}

</script>

<template>
<div class="allelefreq-page-container">
    <div class="allelefreq-container">
      <el-icon class="allelefreq-icon1"><Document /></el-icon><h1>Allele Frequency</h1>  
    </div>
    <div style="height: 31000px;">
      <SearchingBar></SearchingBar>
    <GeneTable />
    </div>
  </div>
</template>

<style>
.allelefreq-page-container {
  display: flex;
  flex-direction: column;
  height: 31000px;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}
.allelefreq-container {
  display: flex;
  padding: 20px;
}
.allelefreq-icon1{
  border:black;
  font-size: 36px;
}

</style>