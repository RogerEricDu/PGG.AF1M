<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
  {
    value: '5',
    label: '5',
  },
  {
    value: '6',
    label: '6',
  },
  {
    value: '7',
    label: '7',
  },
]
</script>
<template>
    <div class="PopulationStructure-container">
        <div class="PopulationStructure-title">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Ancestry</h3>
              </div>
            <!-- 第一个板块 -->
            <div class="section-container">
            <div class="section-title">ADMIXTURE analysis of Han Chinese in the context of worldwide populations</div>
            <div class="section-selector">
                K=
                <el-select v-model="value" placeholder="Select" style="width: 240px">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                />
                </el-select>
            </div>
            <div class="section-content">
                <img :src="shanghaiMapUrl" alt="Ancestry Map" class="map-image">
            </div>
            </div>

    </div>
</template>


<style>
.PopulationStructure-container {
  display: block;
  margin: 35px 20px 0 20px;
}

.section-container {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
.section-selector{
    margin-bottom: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.map-image {
  width: 200px; /* 根据需要调整地图图片的大小 */
}
.section-content{
    display: flex;
     justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
}
</style>