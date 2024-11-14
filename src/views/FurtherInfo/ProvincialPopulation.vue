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
        { name: '北京市', value: 21540 },
        { name: '天津市', value: 15570 },
        { name: '上海市', value: 24240 },
        // 省略其他省份数据...
        { name: '澳门特别行政区', value: 59000 }
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
                      { value: 0, name: 'A/A' },
                      { value: 10, name: 'A/G' },
                      { value: 200, name: 'G/G' }
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
          min: 500,
          max: 30000,
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
  