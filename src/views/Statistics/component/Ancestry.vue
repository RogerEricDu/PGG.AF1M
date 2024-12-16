<template>
  <div class="PopulationStructure-container">
      <div class="PopulationStructure-title">
          <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Ancestry</h3>
      </div>
      <div class="section-title">ADMIXTURE analysis of Han Chinese in the context of worldwide populations</div>
      <div class="section-selector" style="justify-content: center;">
          <span style="margin: 10px">K=</span>
          <el-select v-model="value" placeholder="Select" style="width: 120px">
              <el-option
                  v-for="item in select"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
          </el-select>
      </div>
      <div class="Admixture-container">
          <h3>人群混合图</h3>
          <div ref="pieChart" class="chart-container" style="width: 100%; height: 500px;"></div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // 导入 onMounted
import * as echarts from 'echarts';

const value = ref('');
const pieChart = ref(null);

const select = [
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
];

onMounted(() => {
  const myChart = echarts.init(pieChart.value);

  const data = [
      { name: 'C1', value: 3.63 },
      { name: 'C2', value: 64.55 },
      { name: 'C3', value: 16.43 },
      { name: 'C4', value: 2.30 },
      { name: 'C5', value: 11.68 },
      { name: 'C6', value: 1.40 },
      { name: 'C7', value: 0.00 },
  ];

  const option = {
      title: {
          text: '人群混合比例',
          left: 'center',
      },
      tooltip: {
          trigger: 'item',
      },
      series: [
          {
              name: 'Admixture',
              type: 'pie',
              radius: '50%',
              data: data,
              emphasis: {
                  itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                  },
              },
              label: {
                  formatter: '{b}: {c} ({d}%)', // 显示名称和百分比
              },
          },
      ],
  };

  myChart.setOption(option);
});
</script>

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

.section-selector {
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.map-image {
  width: 200px; /* 根据需要调整地图图片的大小 */
}

.section-content {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.Admixture-container {
  margin: 20px;
  text-align: center;
}
</style>
