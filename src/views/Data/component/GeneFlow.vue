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
        { name: '北京市', value: 21540 },
        { name: '天津市', value: 15570 },
        { name: '上海市', value: 24240 },
        { name: '重庆市', value: 31020 },
        { name: '河北省', value: 7500 },
        { name: '河南省', value: 9890 },
        { name: '云南省', value: 6420 },
        { name: '辽宁省', value: 7850 },
        { name: '黑龙江省', value: 5230 },
        { name: '湖南省', value: 8700 },
        { name: '安徽省', value: 5600 },
        { name: '山东省', value: 10300 },
        { name: '新疆维吾尔自治区', value: 3870 },
        { name: '江苏省', value: 9820 },
        { name: '浙江省', value: 8420 },
        { name: '江西省', value: 4640 },
        { name: '湖北省', value: 9350 },
        { name: '广西壮族自治区', value: 5930 },
        { name: '甘肃省', value: 3100 },
        { name: '山西省', value: 5030 },
        { name: '内蒙古自治区', value: 4110 },
        { name: '陕西省', value: 7200 },
        { name: '吉林省', value: 4800 },
        { name: '福建省', value: 6700 },
        { name: '贵州省', value: 3500 },
        { name: '广东省', value: 12600 },
        { name: '青海省', value: 1550 },
        { name: '西藏自治区', value: 1340 },
        { name: '四川省', value: 9200 },
        { name: '宁夏回族自治区', value: 2320 },
        { name: '海南省', value: 1900 },
        { name: '台湾省', value: 8250 },
        { name: '香港特别行政区', value: 7150 },
        { name: '澳门特别行政区', value: 59000 }
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
