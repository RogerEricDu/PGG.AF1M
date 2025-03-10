<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue';
import * as echarts from 'echarts';
import { getGeneticSubgroups } from '@/api/furtherInfo.js'; // 导入API

// 接收父组件传递的参数
const props = defineProps({
  chromosome: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  }
});

const chartContainer = ref(null);

onMounted(async () => {
  const myChart = echarts.init(chartContainer.value);

  // 获取新的大区地图数据
  const regionJson = await fetch('/map/regionMap.geojson').then(res => res.json());
  echarts.registerMap('Regions', regionJson);

  // 使用父组件传递的参数，发起后端请求
  const requestData = {
    chromosome: props.chromosome,
    position: props.position,
    page: 1,
    size: 10
  };

  const response = await getGeneticSubgroups(requestData);
  const rawData = response.data;

  // 打印地图数据和接口返回的数据进行调试
  console.log("Region GeoJSON:", regionJson);
  console.log("Raw Data:", rawData);

  // 转换成小写，以便与regionMap.geojson文件中的区域名称匹配
  const regionNameMap = {
    central: 'Central',
    northeast: 'Northeast',
    northwest: 'Northwest',
    southcoast: 'Southcoast',
    southwest: 'Southwest',
    southeast: 'Southeast'
  };

  // 转换数据格式
  const data = rawData.map(item => {
    const regionName = regionNameMap[item.region.toLowerCase()] || item.region;
    const alleleCountSum = item.data.reduce((sum, d) => sum + d.alleleCount, 0);
    return {
      name: regionName,  // 与 geojson 中的区域名称对应
      value: alleleCountSum || 0, // 如果没有数据则设为0
      snpData: item.data // 存储该区域的SNP详情
    };
  });

  // 打印转换后的数据，确保格式正确
  console.log("Converted Data:", data);

  // 配置 ECharts
  const mapOption = {
    tooltip: {
      trigger: 'item',
      enterable: true,
      formatter: function (params) {
        const regionData = data.find(d => d.name === params.name);
        if (!regionData || regionData.snpData.length === 0) {
          return `<div style="padding: 5px;">${params.name}: NULL</div>`;
        }

        // 获取 SNP 频率数据
        const snp = regionData.snpData[0]; // 取第一个 SNP 数据
        const pieData = [
          { value: snp.genotypeFrequency1 * 100, name: snp.genotype1 },
          { value: snp.genotypeFrequency2 * 100, name: snp.genotype2 },
          { value: snp.genotypeFrequency3 * 100, name: snp.genotype3 }
        ];

        setTimeout(() => {
          const pieChart = echarts.init(document.getElementById('pieChart'));
          const pieOption = {
            series: [
              {
                type: 'pie',
                radius: '70%',
                data: pieData,
                label: { formatter: '{b}: {c}%', fontSize: 12 }
              }
            ]
          };
          pieChart.setOption(pieOption);
        }, 0);

        return `
          <div style="width: 300px;">
            <div style="background-color: #f0f0f0; padding: 5px; font-size: 14px;">
              ${params.name} - Allele Count: ${params.value}
            </div>
            <div id="pieChart" style="width: 300px; height: 180px; margin-top: 10px;"></div>
          </div>
        `;
      }
    },
    visualMap: {
      left: 'right',
      min: 0,
      max: Math.max(...data.map(d => d.value)) || 8000,
      inRange: {
        color: [
          '#e0f3f8', // 淡蓝色（低值）
          '#abd9e9', // 浅蓝色
          '#74add1', // 中等蓝色
          '#4575b4', // 深蓝色（中间值）
          '#ffffbf', // 浅黄色（过渡）
          '#fee090', // 浅橙色
          '#fdae61', // 橙色
          '#f46d43', // 橙红色
          '#d73027', // 红色（高值）
          '#a50026'  // 深红色（最高值）
        ]
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        type: 'map',
        roam: false,
        map: 'Regions',
        data,
        //特效
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }},
      },
      
    ]
  };

  myChart.setOption(mapOption);
});
</script>



<style scoped>
.chart-container {
  flex: 1;
  width: 1100px;
  height: 800px;
}
</style>