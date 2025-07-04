<template>
  <div>
    <!-- 控制区：每个图对应一组 population 下拉和搜索按钮 -->
    <div v-for="(chart, index) in charts" :key="chart.id" style="display: flex; align-items: center; margin-bottom: 10px;">
      Chart{{ index + 1 }}: 
      <el-select
        v-model="chart.population"
        placeholder="Select population"
        style="width: 180px; margin-right: 10px;margin-left: 10px;"
        clearable
      >
        <el-option v-for="item in populationOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-button type="primary" @click="fetchMapData(index)">Search</el-button>
      <!-- 只有第一组显示 Add Comparison 和 Download -->
      <template v-if="index === 0">
        <el-button style="margin-left: auto;" @click="addComparisonMap">Add New Map</el-button>
        <el-button type="danger" style="margin-left: 10px;" @click="deleteComparisonMap">Delete Comparison</el-button>
        <el-button type="success" style="margin-left: 10px;" @click="downloadImages">Download PDF</el-button>
      </template>
    </div>

    <!-- 图表区域 -->
    <div
      id="export-area-province-pie"
      style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; background: #fff; padding: 10px;"
    >
      <div
        v-for="(chart, index) in charts"
        :key="chart.id"
        class="chart-block"
      >
        <div class="chart-title">Chart {{ index + 1 }} ( Population: {{ chart.population }} )</div>
        <div
          :ref="el => { if (el) chartRefs[index] = el as HTMLElement }"
          class="chart-container"
        ></div>
      </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import * as echarts from 'echarts';
import { getProvincialPopulation } from '@/api/furtherInfo.js';
/* import html2pdf from 'html2pdf.js'; */
import 'element-plus/es/components/select/style/css';
import 'element-plus/es/components/button/style/css';
import { ElSelect, ElOption, ElButton,ElMessageBox } from 'element-plus';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const props = defineProps<{
  chromosome: string;
  position: string;
}>();


const populationOptions = ['Han', 'Balti', 'Deng'];
const charts = ref([{ id: 'main', population: 'Han' }]);
const chartRefs = ref<(HTMLElement | null)[]>([])

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
  Xizang: 'Xizang',
  Xinjiang: 'Xinjiang',
  Yunnan: 'Yunnan',
  Zhejiang: 'Zhejiang',
  HongKong: 'HongKong',
  Macau: 'Macau',
  Taiwan: 'Taiwan',
  InnerMongolia: 'InnerMongolia',
  Singapore: 'Singapore'
};

const provinceGeoCoordMap: Record<string, [number, number]> = {
  Beijing: [116.5, 40.2],
  Tianjin: [117.2, 39.1],
  Shanghai: [121.47, 31.23],
  Chongqing: [107.5, 29.5],
  Hebei: [115.0, 39.0],
  Henan: [113.7, 34.2],
  Yunnan: [101.5, 25.0],
  Liaoning: [123.0, 41.6],
  Heilongjiang: [127.5, 47.0],
  Hunan: [112.0, 28.0],
  Anhui: [117.28, 31.86],
  Shandong: [118.0, 36.5],
  Xinjiang: [86.5, 42.0],
  Jiangsu: [119.5, 33.0],
  Zhejiang: [120.0, 29.3],
  Jiangxi: [115.7, 27.6],
  Hubei: [112.0, 31.1],
  Guangxi: [108.5, 23.8],
  Gansu: [103.8, 36.05],
  Shanxi: [112.4, 37.8],
  InnerMongolia: [111.6, 41.8],
  Shaanxi: [108.9, 34.2],
  Jilin: [125.9, 43.8],
  Fujian: [118.3, 26.0],
  Guizhou: [106.7, 26.5],
  Guangdong: [113.4, 23.9],
  Qinghai: [95.7, 35.6],
  Xizang: [90.0, 30.6],
  Ningxia: [106.2, 37.5],
  Hainan: [110.0, 19.0],
  Taiwan: [121.2, 23.5],
  HongKong: [114.2, 22.3],
  Macau: [113.6, 22.2],
  Sichuan: [102.5, 30.1],
  Singapore: [103.8198, 1.3521]
};

//测试用数据
const mockData = [
  {
    province: 'Beijing',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Sichuan',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Macau',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'HongKong',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Taiwan',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Ningxia',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Hainan',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.43, genotypeFrequency2: 0.4, genotypeFrequency3: 0.17, alleleCount: 300 },

    ]
  },
  {
    province: 'Xizang',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.42, genotypeFrequency2: 0.46, genotypeFrequency3: 0.12, alleleCount: 300 },

    ]
  },
  {
    province: 'Qinghai',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.35, genotypeFrequency2: 0.35, genotypeFrequency3: 0.3, alleleCount: 300 },

    ]
  },
  {
    province: 'Guangdong',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.24, genotypeFrequency2: 0.6, genotypeFrequency3: 0.16, alleleCount: 300 },

    ]
  },
  {
    province: 'Guizhou',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.31, genotypeFrequency2: 0.41, genotypeFrequency3: 0.28, alleleCount: 300 },

    ]
  },
  {
    province: 'Fujian',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.47, genotypeFrequency2: 0.33, genotypeFrequency3: 0.2, alleleCount: 300 },

    ]
  },
  {
    province: 'Jilin',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.29, genotypeFrequency2: 0.47, genotypeFrequency3: 0.24, alleleCount: 300 },

    ]
  },
  {
    province: 'Shaanxi',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.22, genotypeFrequency2: 0.54, genotypeFrequency3: 0.24, alleleCount: 300 },

    ]
  },
  {
    province: 'InnerMongolia',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.2, genotypeFrequency2: 0.6, genotypeFrequency3: 0.2, alleleCount: 300 },

    ]
  },
  {
    province: 'Shanxi',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.39, genotypeFrequency2: 0.38, genotypeFrequency3: 0.23, alleleCount: 300 },

    ]
  },
  {
    province: 'Gansu',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.26, genotypeFrequency2: 0.58, genotypeFrequency3: 0.16, alleleCount: 300 },

    ]
  },
  {
    province: 'Guangxi',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.33, genotypeFrequency2: 0.44, genotypeFrequency3: 0.23, alleleCount: 300 },

    ]
  },
  {
    province: 'Hubei',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.3, genotypeFrequency2: 0.6, genotypeFrequency3: 0.1, alleleCount: 300 },

    ]
  },
  {
    province: 'Jiangxi',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.36, genotypeFrequency2: 0.38, genotypeFrequency3: 0.26, alleleCount: 300 },

    ]
  },
  {
    province: 'Zhejiang',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Jiangsu',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.26, genotypeFrequency2: 0.58, genotypeFrequency3: 0.16, alleleCount: 300 },

    ]
  },
  {
    province: 'Xinjiang',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.29, genotypeFrequency2: 0.47, genotypeFrequency3: 0.24, alleleCount: 300 },

    ]
  },
  {
    province: 'Shandong',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Anhui',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.35, genotypeFrequency2: 0.45, genotypeFrequency3: 0.2, alleleCount: 300 },

    ]
  },
  {
    province: 'Hunan',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Heilongjiang',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.4, genotypeFrequency2: 0.5, genotypeFrequency3: 0.1, alleleCount: 300 },

    ]
  },
  {
    province: 'Liaoning',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.5,
        genotypeFrequency2: 0.3,
        genotypeFrequency3: 0.2,
        alleleCount: 200
      }
    ]
  },
  {
    province: 'Yunnan',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.6,
        genotypeFrequency2: 0.25,
        genotypeFrequency3: 0.15,
        alleleCount: 150
      }
    ]
  },
  {
    province: 'Tianjin',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.6,
        genotypeFrequency2: 0.25,
        genotypeFrequency3: 0.15,
        alleleCount: 150
      }
    ]
  },
  {
    province: 'Shanghai',
    data: [
      {
        genotype1: 'AA',
        genotype2: 'AG',
        genotype3: 'GG',
        genotypeFrequency1: 0.4,
        genotypeFrequency2: 0.4,
        genotypeFrequency3: 0.2,
        alleleCount: 300
      }
    ]
  },
    {
    province: 'Chongqing',
    data: [
    { genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.2, genotypeFrequency2: 0.5, genotypeFrequency3: 0.3, alleleCount: 300 },

    ]
  },
    {
    province: 'Hebei',
    data: [
    { genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.36, genotypeFrequency2: 0.4, genotypeFrequency3: 0.24, alleleCount: 300 },
    ]
  },
    {
    province: 'Henan',
    data: [
{ genotype1: 'AA', genotype2: 'AG', genotype3: 'GG', genotypeFrequency1: 0.3, genotypeFrequency2: 0.4, genotypeFrequency3: 0.3, alleleCount: 300 },

    ]
  },
];


onMounted(async () => {
  // 注册中国地图
  const chinaJson = await fetch('/map/china.json').then(res => res.json());
  echarts.registerMap('China', chinaJson);

  // 初始化渲染第一个地图（可选）
  fetchMapData(0);
});

const fetchMapData = async (index: number) => {
  if (!charts.value[index].population) {
    alert('Please select a population first.');
    return;
  }

  // 提取 legend 名称（默认空，后面填充）
  let legendGenotype1 = '';
  let legendGenotype2 = '';
  let legendGenotype3 = '';

  const params = {
    chromosome: props.chromosome,
    position: props.position,
    population: charts.value[index].population,
    page: 1,
    size: 10
  };

/*   const response = await getProvincialPopulation(params);
  const rawData = response.data || []; */
  //测试用数据
  const rawData = mockData;

  //定义颜色
  const genotypeColorMap: Record<string, string> = {
    genotype3: '#5470C6', // 蓝色
    genotype2: '#91CC75', // 绿色
    genotype1: '#C6C6C5'  // 红色
  };

  const data = rawData.map(item => {
    const provinceName = provinceNameMap[item.province] || item.province;
    const coord = provinceGeoCoordMap[provinceName];

    const snp = item.data?.[0];
      // 如果还没填 legend 值，就从第一条 snp 提取
    if (snp && !legendGenotype1 && !legendGenotype2 && !legendGenotype3) {
      legendGenotype1 = snp.genotype1;
      legendGenotype2 = snp.genotype2;
      legendGenotype3 = snp.genotype3;
    }

    const pieData = snp ? [
      { value: snp.genotypeFrequency3 * 100, name: snp.genotype3,itemStyle: { color: genotypeColorMap.genotype3 } },
      { value: snp.genotypeFrequency2 * 100, name: snp.genotype2,itemStyle: { color: genotypeColorMap.genotype2 } },
      { value: snp.genotypeFrequency1 * 100, name: snp.genotype1,itemStyle: { color: genotypeColorMap.genotype1 } }
    ] : [];

    return {
      name: provinceName,
      value: item.data.reduce((sum, d) => sum + d.alleleCount, 0),
      coord,
      pieData
    };
  });

  await nextTick();
  const chartEl = chartRefs.value[index];
  if (!chartEl) return;
  let myChart = echarts.getInstanceByDom(chartEl);
  if (!myChart) {
    myChart = echarts.init(chartEl);
  } else {
    myChart.dispose();  // 先销毁旧实例
    myChart = echarts.init(chartEl); // 重新初始化
  }

  const pieSeries = data
    .filter(d => d.coord && d.pieData.length > 0)
    .map(d => ({
      type: 'pie',
      coordinateSystem: 'geo',
      center: d.coord,
      radius: 15,
      data: d.pieData,
      tooltip: { formatter: '{b}: {c} ({d}%)' },
      label: { show: false },
      labelLine: { show: false },
      animationDuration: 0
    }));

  const option = {
    tooltip: { trigger: 'item' },
    legend: {
      top: 10,
      left: 'center',
      data: [
        { name: legendGenotype3, icon: 'circle' },
        { name: legendGenotype2, icon: 'circle' },
        { name: legendGenotype1, icon: 'circle' }
      ],
      textStyle: {
        fontSize: 14
      }
    },
    geo: {
      map: 'China',
      roam: true,
      itemStyle: {
        areaColor: '#e7e8ea',
        borderColor: '#999'
      }
    },
    series: [...pieSeries]
  };

  myChart.setOption(option);
};

// 新增一个对比地图（默认 population Han）
const addComparisonMap = () => {
  if (charts.value.length >= 2) {
    ElMessageBox.alert('You can add up to 2 comparison maps only.', 'Notice', {
      confirmButtonText: 'OK',
      type: 'warning',
    });
    return;
  }
  charts.value.push({ id: 'chart_' + Date.now(), population: 'Han' });
  // 延迟渲染新地图容器
  nextTick(() => {
    fetchMapData(charts.value.length - 1);
  });
};

//删除最近生成的一个地图
const deleteComparisonMap = () =>{
  if(charts.value.length > 1){
    charts.value.pop();
    chartRefs.value.pop();
  } else {
    alert('Cannot delete the base chart.');
  }
}

//下载地图
const downloadImages = async () => {
  const zip = new JSZip();
  const container = document.getElementById('export-area-province-pie');
  if (!container) return;

  const chartBlocks = container.querySelectorAll('.chart-block');

  for (let i = 0; i < chartBlocks.length; i++) {
    const el = chartBlocks[i] as HTMLElement;
    const canvas = await html2canvas(el, {
      backgroundColor: '#fff',
      scale: 2,
      useCORS: true
    });
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    const base64Data = dataURL.split(',')[1];
    zip.file(`chart-${i + 1}.jpg`, base64Data, { base64: true });
  }

  zip.generateAsync({ type: 'blob' }).then(content => {
    saveAs(content, 'charts.zip');
  });
};
</script>

<style scoped>
.chart-container {
  width: 1000px;
  height: 800px;
  border: 1px solid #ccc;
}
.chart-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}
</style>
