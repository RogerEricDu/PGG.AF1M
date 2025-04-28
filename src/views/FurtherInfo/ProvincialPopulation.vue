<template>
  <div ref="chartContainer" class="chart-container"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from 'vue';
import * as echarts from 'echarts';
import { getProvincialPopulation } from '@/api/furtherInfo.js'; // 导入API

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

  // 获取地图数据
  const chinaJson = await fetch('/map/china.json').then(res => res.json());
  echarts.registerMap('China', chinaJson);

  // 使用父组件传递的参数，发起后端请求
  const requestData = {
    chromosome: props.chromosome,
    position: props.position,
    page: 1,
    size: 10
  };

  const response = await getProvincialPopulation(requestData);
  const rawData = response.data;
/* const rawData = [
  { province: 'Beijing', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.5, genotypeFrequency2: 0.3, genotypeFrequency3: 0.2, alleleCount: 1200 }] },
  { province: 'Tianjin', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC',genotypeFrequency1: 0.4, genotypeFrequency2: 0.4, genotypeFrequency3: 0.2, alleleCount: 900 }] },
  { province: 'Shanghai', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC',genotypeFrequency1: 0.45, genotypeFrequency2: 0.35, genotypeFrequency3: 0.2, alleleCount: 1100 }] },
  { province: 'Chongqing', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC',genotypeFrequency1: 0.6, genotypeFrequency2: 0.25, genotypeFrequency3: 0.15, alleleCount: 950 }] },
  { province: 'Anhui', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.839395, genotypeFrequency2: 0.15358, genotypeFrequency3: 0.00702495, alleleCount: 1745 }] },
  { province: 'Fujian', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.52, genotypeFrequency2: 0.3, genotypeFrequency3: 0.18, alleleCount: 1600 }] },
  { province: 'Gansu', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.48, genotypeFrequency2: 0.35, genotypeFrequency3: 0.17, alleleCount: 1300 }] },
  { province: 'Guangdong', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.6, genotypeFrequency2: 0.25, genotypeFrequency3: 0.15, alleleCount: 3200 }] },
  { province: 'Guangxi', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.42, genotypeFrequency2: 0.38, genotypeFrequency3: 0.2, alleleCount: 1700 }] },
  { province: 'Guizhou', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.53, genotypeFrequency2: 0.3, genotypeFrequency3: 0.17, alleleCount: 1400 }] },
  { province: 'Hainan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.5, genotypeFrequency2: 0.3, genotypeFrequency3: 0.2, alleleCount: 1000 }] },
  { province: 'Hebei', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.51, genotypeFrequency2: 0.33, genotypeFrequency3: 0.16, alleleCount: 2300 }] },
  { province: 'Heilongjiang', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.45, genotypeFrequency2: 0.4, genotypeFrequency3: 0.15, alleleCount: 1500 }] },
  { province: 'Henan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.55, genotypeFrequency2: 0.3, genotypeFrequency3: 0.15, alleleCount: 2600 }] },
  { province: 'Hubei', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.49, genotypeFrequency2: 0.33, genotypeFrequency3: 0.18, alleleCount: 2200 }] },
  { province: 'Hunan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.52, genotypeFrequency2: 0.31, genotypeFrequency3: 0.17, alleleCount: 2100 }] },
  { province: 'Jiangsu', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.6, genotypeFrequency2: 0.28, genotypeFrequency3: 0.12, alleleCount: 2500 }] },
  { province: 'Jiangxi', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.5, genotypeFrequency2: 0.35, genotypeFrequency3: 0.15, alleleCount: 1800 }] },
  { province: 'Jilin', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.46, genotypeFrequency2: 0.36, genotypeFrequency3: 0.18, alleleCount: 1500 }] },
  { province: 'Liaoning', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.47, genotypeFrequency2: 0.35, genotypeFrequency3: 0.18, alleleCount: 1900 }] },
  { province: 'Ningxia', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.48, genotypeFrequency2: 0.32, genotypeFrequency3: 0.2, alleleCount: 900 }] },
  { province: 'Qinghai', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.42, genotypeFrequency2: 0.4, genotypeFrequency3: 0.18, alleleCount: 850 }] },
  { province: 'Shaanxi', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.56, genotypeFrequency2: 0.29, genotypeFrequency3: 0.15, alleleCount: 2000 }] },
  { province: 'Shandong', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.58, genotypeFrequency2: 0.3, genotypeFrequency3: 0.12, alleleCount: 2800 }] },
  { province: 'Shanxi', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.54, genotypeFrequency2: 0.3, genotypeFrequency3: 0.16, alleleCount: 1800 }] },
  { province: 'Sichuan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.45, genotypeFrequency2: 0.35, genotypeFrequency3: 0.2, alleleCount: 2800 }] },
  { province: 'Tibet', data: [] }, // 模拟无数据
  { province: 'Xinjiang', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.44, genotypeFrequency2: 0.4, genotypeFrequency3: 0.16, alleleCount: 1300 }] },
  { province: 'Yunnan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.46, genotypeFrequency2: 0.34, genotypeFrequency3: 0.2, alleleCount: 1600 }] },
  { province: 'Zhejiang', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.55, genotypeFrequency2: 0.32, genotypeFrequency3: 0.13, alleleCount: 2700 }] },
  { province: 'HongKong', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.5, genotypeFrequency2: 0.3, genotypeFrequency3: 0.2, alleleCount: 600 }] },
  { province: 'Macau', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.51, genotypeFrequency2: 0.3, genotypeFrequency3: 0.19, alleleCount: 550 }] },
  { province: 'Taiwan', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.49, genotypeFrequency2: 0.31, genotypeFrequency3: 0.2, alleleCount: 950 }] },
  { province: 'InnerMongolia', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.43, genotypeFrequency2: 0.37, genotypeFrequency3: 0.2, alleleCount: 1250 }] },
  { province: 'Singapore', data: [{ genotype1: 'GG', genotype2: 'GC', genotype3: 'CC', genotypeFrequency1: 0.54, genotypeFrequency2: 0.33, genotypeFrequency3: 0.13, alleleCount: 700 }] }
]; */

  // 省份名称映射，确保和ECharts地图匹配
  const provinceNameMap = {
    Beijing: 'Beijing',
    Tianjin: 'Tianjin',
    Shanghai: 'Shanghai',
    Chongqing: 'Chongqing',
    Anhui: 'Anhui',
    Fujian: 'Fujian',
    Gansu: 'Gansu',
    Guangdong: 'Guangdong',
    Guangxi: 'Guangxi',
    Guizhou: 'Guizhou',
    Hainan: 'Hainan',
    Hebei: 'Hebei',
    Heilongjiang: 'Heilongjiang',
    Henan: 'Henan',
    Hubei: 'Hubei',
    Hunan: 'Hunan',
    Jiangsu: 'Jiangsu',
    Jiangxi: 'Jiangxi',
    Jilin: 'Jilin',
    Liaoning: 'Liaoning',
    Ningxia: 'Ningxia',
    Qinghai: 'Qinghai',
    Shaanxi: 'Shaanxi',
    Shandong: 'Shandong',
    Shanxi: 'Shanxi',
    Sichuan: 'Sichuan',
    Tibet: 'Xizang', // 西藏
    Xinjiang: 'Xinjiang',
    Yunnan: 'Yunnan',
    Zhejiang: 'Zhejiang',
    HongKong: 'Hong Kong', // 香港
    Macau: 'Macau', // 澳门
    Taiwan: 'Taiwan', // 台湾
    InnerMongolia: 'Inner Mongolia', // 内蒙古
    Singapore: 'Singapore' // 新加坡（如果 ECharts 地图不包含，可能需要额外处理）
  };

  // 转换数据格式
  const data = rawData.map(item => {
    const provinceName = provinceNameMap[item.province] || item.province;
    const alleleCountSum = item.data.reduce((sum, d) => sum + d.alleleCount, 0);
    return {
      name: provinceName,
      value: alleleCountSum || 0, // 如果没有数据则设为0
      snpData: item.data // 存储该省份的SNP详情
    };
  });

  // 配置 ECharts
  const mapOption = {
    tooltip: {
      trigger: 'item',
      enterable: true,
      formatter: function (params) {
        const provinceData = data.find(d => d.name === params.name);
        if (!provinceData || provinceData.snpData.length === 0) {
          return `<div style="padding: 5px;">${params.name}: NULL</div>`;
        }

        // 获取 SNP 频率数据
        const snp = provinceData.snpData[0]; // 取第一个 SNP 数据
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
        map: 'China',
        data,
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }},
      }
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

