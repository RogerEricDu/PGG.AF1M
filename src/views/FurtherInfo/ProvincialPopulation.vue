<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);

onMounted(() => {
  const myChart = echarts.init(chartContainer.value);

  fetch('/map/china.json')
    .then(response => response.json())
    .then(chinaJson => {
      if (!chinaJson || !chinaJson.features) {
        console.error('Invalid China JSON format');
        return;
      }
      
      echarts.registerMap('China', chinaJson);

      const data = [
          { name: 'Beijing', value: 5828 },
          { name: 'Tianjin', value: 5228 },
          { name: 'Shanghai', value: 355 },
          { name: 'Chongqing', value: 5947 },
          { name: 'Hebei', value: 5778 },
          { name: 'Shanxi', value: 4479 },
          { name: 'Liaoning', value: 1792 },
          { name: 'Jilin', value: 1823 },
          { name: 'Heilongjiang', value: 2320 },
          { name: 'Jiangsu', value: 4067 },
          { name: 'Zhejiang', value: 150 },
          { name: 'Anhui', value: 5415 },
          { name: 'Fujian', value: 1403 },
          { name: 'Jiangxi', value: 3962 },
          { name: 'Shandong', value: 2894 },
          { name: 'Henan', value: 3309 },
          { name: 'Hubei', value: 481 },
          { name: 'Hunan', value: 3952 },
          { name: 'Guangdong', value: 4261 },
          { name: 'Guangxi', value: 6030 },
          { name: 'Hainan', value: 3243 },
          { name: 'Sichuan', value: 5406 },
          { name: 'Guizhou', value: 4145 },
          { name: 'Yunnan', value: 1171 },
          { name: 'Shaanxi', value: 974 },
          { name: 'Gansu', value: 1145 },
          { name: 'Qinghai', value: 5901 },
          { name: 'Taiwan', value: 5729 },
          { name: 'Xizang', value: 7443 },
          { name: 'Inner Mongolia', value: 722 },
          { name: 'Ningxia', value: 4132 },
          { name: 'Xinjiang', value: 923 },
          { name: 'Hong Kong', value: 940 },
          { name: 'Macau', value: 5770 }
        ];

      data.sort((a, b) => a.value - b.value);

      const mapOption = {
        tooltip: {
          trigger: 'item',
          enterable: true,
          formatter: function(params) {
            const provinceInfo = `
            <div style="padding: 0px; width: 240px;">
              <div style="background-color: #f0f0f0; padding: 5px; font-size: 14px;">
                  ${params.name} : ${params.value || 'NULL'}
              </div>
              <div style="background-color: #ffffff; padding: 5px; font-size: 14px;">
                <div id="pieChart" style="width: 240px; height: 180px; margin-top: 10px;"></div>
              </div>
            </div>
            `;

            setTimeout(() => {
              const pieChart = echarts.init(document.getElementById('pieChart'));
              const pieOption = {
                series: [
                  {
                    type: 'pie',
                    radius: '70%',
                    data: [
                      { value: 1, name: 'A/A' },
                      { value: 22, name: 'A/G' },
                      { value: 321, name: 'G/G' }
                    ],
                    label: {
                      formatter: '{b}: {c}',
                      fontSize: 12
                    }
                  }
                ]
              };
              pieChart.setOption(pieOption);
            }, 0);

            return provinceInfo;
          }
        },
        visualMap: {
          left: 'right',
          min: 0,
          max: 8000,
          inRange: {
            color: [
              '#313695', '#4575b4', '#74add1', '#abd9e9',
              '#e0f3f8', '#ffffbf', '#fee090', '#fdae61',
              '#f46d43', '#d73027', '#a50026'
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        series: [
          {
            type: 'map',
            roam: false,
            map: 'China',
            data: data
          }
        ]
      };

      myChart.setOption(mapOption);
    })
    .catch(error => console.error('Error loading China map data:', error));
});
</script>

  <style scoped>
  .chart-container {
    flex: 1;
    width: 1100px;
    height: 800px;
  }
  </style>
  