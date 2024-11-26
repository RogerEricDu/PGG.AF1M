<template>
  <div class="GeneFlow-container">
    <div class="GeneFlow-title">
      <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Data Set</h3>
      <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p>
    </div>

    <!-- 图表容器 -->
    <div ref="chartContainer" class="chart-container" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);

onMounted(() => {
  const myChart = echarts.init(chartContainer.value);

  // 加载本地的 China.json 地图数据
  fetch('/map/china.json')
    .then(response => response.json())
    .then(chinaJson => {
      if (!chinaJson || !chinaJson.features) {
      console.error('Invalid China JSON format');
      return;
    }
      echarts.registerMap('China', chinaJson);

      const data = [
        { name: 'Beijing', value: 21540 },
        { name: 'Tianjin', value: 15570 },
        { name: 'Shanghai', value: 24240 },
        { name: 'Chongqing', value: 31020 },
        { name: 'Hebei', value: 7500 },
        { name: 'Henan', value: 9890 },
        { name: 'Yunnan', value: 6420 },
        { name: 'Liaoning', value: 7850 },
        { name: 'Heilongjiang', value: 5230 },
        { name: 'Hunan', value: 8700 },
        { name: 'Anhui', value: 5600 },
        { name: 'Shandong', value: 10300 },
        { name: 'Xinjiang', value: 3870 },
        { name: 'Jiangsu', value: 9820 },
        { name: 'Zhejiang', value: 8420 },
        { name: 'Jiangxi', value: 4640 },
        { name: 'Hubei', value: 9350 },
        { name: 'Guangxi', value: 5930 },
        { name: 'Gansu', value: 3100 },
        { name: 'Shanxi', value: 5030 },
        { name: 'Inner Mongolia', value: 4110 },
        { name: 'Shaanxi', value: 7200 },
        { name: 'Jilin', value: 4800 },
        { name: 'Fujian', value: 6700 },
        { name: 'Guizhou', value: 3500 },
        { name: 'Guangdong', value: 12600 },
        { name: 'Qinghai', value: 1550 },
        { name: 'Xizang', value: 1340 },
        { name: 'Sichuan', value: 9200 },
        { name: 'Ningxia', value: 2320 },
        { name: 'Hainan', value: 1900 },
        { name: 'Taiwan', value: 8250 },
        { name: 'Hongkong', value: 7150 },
        { name: 'Macau', value: 59000 }
      ];
      data.sort((a, b) => a.value - b.value);

      const mapOption = {
        visualMap: {
          left: 'right',
          min: 500,
          max: 30000,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          },
          text: ['High', 'Low'],
          calculable: true
        },
        series: [
          {
            type: 'map',
            roam: true,
            map: 'China',
            data: data
          }
        ]
      };

      const barOption = {
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          axisLabel: { rotate: 30 },
          data: data.map(item => item.name)
        },
        series: {
          type: 'bar',
          data: data.map(item => item.value),
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          }
        }
      };

      let currentOption = mapOption;
      myChart.setOption(mapOption);

      setInterval(() => {
        currentOption = currentOption === mapOption ? barOption : mapOption;
        myChart.setOption(currentOption, true);
      }, 5000);
    });
});
</script>

<style>
.GeneFlow-container {
  display: block;
  margin: 35px 20px 0 20px;
}
.GeneFlow-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.chart-container {
  width: 100%;
  height: 500px;
}
</style>
