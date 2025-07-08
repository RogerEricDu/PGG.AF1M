<template>
  <div>
    <!-- 频率类型切换按钮组 -->
    <div
      style="
        display: flex;
        justify-content: center;
      "
    >
      <div
        style="
          background: #f9f9f9;
          padding: 15px 25px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 15px;
          align-items: center;
        "
      >
        <span style="font-weight: bold; margin-right: 10px;">View Type:</span>
        <el-button
          :type="frequencyType === 'genotype' ? 'primary' : 'default'"
          @click="changeFrequencyType('genotype')"
          style="
            border-radius: 20px;
            padding: 8px 20px;
            font-weight: 500;
            transition: all 0.3s;
          "
        >
          Genotype Frequency
        </el-button>
        <el-button
          :type="frequencyType === 'allele' ? 'primary' : 'default'"
          @click="changeFrequencyType('allele')"
          style="
            border-radius: 20px;
            padding: 8px 20px;
            font-weight: 500;
            transition: all 0.3s;
          "
        >
          Allele Frequency
        </el-button>
      </div>
    </div>
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

const frequencyType = ref<'genotype' | 'allele'>('genotype'); //根据tab选项确定使用allele数据还是genotype数据
const changeFrequencyType = (type: 'genotype' | 'allele') => {
  if (frequencyType.value !== type) {
    frequencyType.value = type;
    fetchMapData(0);  // 重新渲染第一个图表，或根据需求更新所有图表
  }
};

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
    "province": "Beijing",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.281,
        "genotypeFrequency2": 0.271,
        "genotypeFrequency3": 0.447,
        "refAlleleFrequency": 0.17,
        "altAlleleFrequency": 0.83,
        "alleleCount": 1000
      }
    ]
  },
  {
    "province": "Tianjin",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.51,
        "genotypeFrequency2": 0.126,
        "genotypeFrequency3": 0.364,
        "refAlleleFrequency": 0.695,
        "altAlleleFrequency": 0.305,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Shanghai",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.283,
        "genotypeFrequency2": 0.264,
        "genotypeFrequency3": 0.453,
        "refAlleleFrequency": 0.827,
        "altAlleleFrequency": 0.173,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Chongqing",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.453,
        "genotypeFrequency2": 0.133,
        "genotypeFrequency3": 0.414,
        "refAlleleFrequency": 0.362,
        "altAlleleFrequency": 0.638,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Anhui",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.257,
        "genotypeFrequency2": 0.242,
        "genotypeFrequency3": 0.501,
        "refAlleleFrequency": 0.814,
        "altAlleleFrequency": 0.186,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Fujian",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.186,
        "genotypeFrequency2": 0.616,
        "genotypeFrequency3": 0.198,
        "refAlleleFrequency": 0.707,
        "altAlleleFrequency": 0.293,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Gansu",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.371,
        "genotypeFrequency2": 0.521,
        "genotypeFrequency3": 0.108,
        "refAlleleFrequency": 0.63,
        "altAlleleFrequency": 0.37,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Guangdong",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.338,
        "genotypeFrequency2": 0.09,
        "genotypeFrequency3": 0.572,
        "refAlleleFrequency": 0.585,
        "altAlleleFrequency": 0.415,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Guangxi",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.465,
        "genotypeFrequency2": 0.184,
        "genotypeFrequency3": 0.352,
        "refAlleleFrequency": 0.543,
        "altAlleleFrequency": 0.457,
        "alleleCount": 300
      }
    ]
  },
  {
    "province": "Guizhou",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.441,
        "genotypeFrequency2": 0.45,
        "genotypeFrequency3": 0.109,
        "refAlleleFrequency": 0.149,
        "altAlleleFrequency": 0.851,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Hainan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.241,
        "genotypeFrequency2": 0.405,
        "genotypeFrequency3": 0.354,
        "refAlleleFrequency": 0.238,
        "altAlleleFrequency": 0.762,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Hebei",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.305,
        "genotypeFrequency2": 0.218,
        "genotypeFrequency3": 0.477,
        "refAlleleFrequency": 0.601,
        "altAlleleFrequency": 0.399,
        "alleleCount": 300
      }
    ]
  },
  {
    "province": "Heilongjiang",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.202,
        "genotypeFrequency2": 0.422,
        "genotypeFrequency3": 0.375,
        "refAlleleFrequency": 0.354,
        "altAlleleFrequency": 0.646,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Henan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.403,
        "genotypeFrequency2": 0.187,
        "genotypeFrequency3": 0.409,
        "refAlleleFrequency": 0.923,
        "altAlleleFrequency": 0.077,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Hubei",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.389,
        "genotypeFrequency2": 0.27,
        "genotypeFrequency3": 0.341,
        "refAlleleFrequency": 0.327,
        "altAlleleFrequency": 0.673,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Hunan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.443,
        "genotypeFrequency2": 0.196,
        "genotypeFrequency3": 0.361,
        "refAlleleFrequency": 0.11,
        "altAlleleFrequency": 0.89,
        "alleleCount": 300
      }
    ]
  },
  {
    "province": "Jiangsu",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.262,
        "genotypeFrequency2": 0.388,
        "genotypeFrequency3": 0.349,
        "refAlleleFrequency": 0.876,
        "altAlleleFrequency": 0.124,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Jiangxi",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.628,
        "genotypeFrequency2": 0.241,
        "genotypeFrequency3": 0.131,
        "refAlleleFrequency": 0.183,
        "altAlleleFrequency": 0.817,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Jilin",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.41,
        "genotypeFrequency2": 0.416,
        "genotypeFrequency3": 0.174,
        "refAlleleFrequency": 0.288,
        "altAlleleFrequency": 0.712,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Liaoning",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.467,
        "genotypeFrequency2": 0.103,
        "genotypeFrequency3": 0.43,
        "refAlleleFrequency": 0.517,
        "altAlleleFrequency": 0.483,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Ningxia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.455,
        "genotypeFrequency2": 0.09,
        "genotypeFrequency3": 0.455,
        "refAlleleFrequency": 0.312,
        "altAlleleFrequency": 0.688,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Qinghai",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.484,
        "genotypeFrequency2": 0.154,
        "genotypeFrequency3": 0.362,
        "refAlleleFrequency": 0.856,
        "altAlleleFrequency": 0.144,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Shaanxi",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.455,
        "genotypeFrequency2": 0.473,
        "genotypeFrequency3": 0.072,
        "refAlleleFrequency": 0.624,
        "altAlleleFrequency": 0.376,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Shandong",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.356,
        "genotypeFrequency2": 0.474,
        "genotypeFrequency3": 0.171,
        "refAlleleFrequency": 0.89,
        "altAlleleFrequency": 0.11,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Shanxi",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.467,
        "genotypeFrequency2": 0.421,
        "genotypeFrequency3": 0.112,
        "refAlleleFrequency": 0.33,
        "altAlleleFrequency": 0.67,
        "alleleCount": 1000
      }
    ]
  },
  {
    "province": "Sichuan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.295,
        "genotypeFrequency2": 0.622,
        "genotypeFrequency3": 0.084,
        "refAlleleFrequency": 0.656,
        "altAlleleFrequency": 0.344,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "Tibet",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.355,
        "genotypeFrequency2": 0.305,
        "genotypeFrequency3": 0.34,
        "refAlleleFrequency": 0.803,
        "altAlleleFrequency": 0.197,
        "alleleCount": 300
      }
    ]
  },
  {
    "province": "Xinjiang",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.243,
        "genotypeFrequency2": 0.182,
        "genotypeFrequency3": 0.574,
        "refAlleleFrequency": 0.157,
        "altAlleleFrequency": 0.843,
        "alleleCount": 200
      }
    ]
  },
  {
    "province": "Yunnan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.551,
        "genotypeFrequency2": 0.276,
        "genotypeFrequency3": 0.173,
        "refAlleleFrequency": 0.468,
        "altAlleleFrequency": 0.532,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "Zhejiang",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.509,
        "genotypeFrequency2": 0.413,
        "genotypeFrequency3": 0.078,
        "refAlleleFrequency": 0.527,
        "altAlleleFrequency": 0.473,
        "alleleCount": 500
      }
    ]
  },
  {
    "province": "HongKong",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.459,
        "genotypeFrequency2": 0.292,
        "genotypeFrequency3": 0.249,
        "refAlleleFrequency": 0.36,
        "altAlleleFrequency": 0.64,
        "alleleCount": 1000
      }
    ]
  },
  {
    "province": "Macau",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.341,
        "genotypeFrequency2": 0.327,
        "genotypeFrequency3": 0.332,
        "refAlleleFrequency": 0.117,
        "altAlleleFrequency": 0.883,
        "alleleCount": 1000
      }
    ]
  },
  {
    "province": "Taiwan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.607,
        "genotypeFrequency2": 0.202,
        "genotypeFrequency3": 0.191,
        "refAlleleFrequency": 0.941,
        "altAlleleFrequency": 0.059,
        "alleleCount": 100
      }
    ]
  },
  {
    "province": "InnerMongolia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.089,
        "genotypeFrequency2": 0.34,
        "genotypeFrequency3": 0.57,
        "refAlleleFrequency": 0.295,
        "altAlleleFrequency": 0.705,
        "alleleCount": 1000
      }
    ]
  },
  {
    "province": "Singapore",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.317,
        "genotypeFrequency2": 0.209,
        "genotypeFrequency3": 0.475,
        "refAlleleFrequency": 0.056,
        "altAlleleFrequency": 0.944,
        "alleleCount": 1000
      }
    ]
  }
]

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

    const pieData = snp
      ? frequencyType.value === 'genotype'
        ? [
            {
              value: snp.genotypeFrequency3 * 100,
              name: snp.genotype3,
              itemStyle: { color: genotypeColorMap.genotype3 }
            },
            {
              value: snp.genotypeFrequency2 * 100,
              name: snp.genotype2,
              itemStyle: { color: genotypeColorMap.genotype2 }
            },
            {
              value: snp.genotypeFrequency1 * 100,
              name: snp.genotype1,
              itemStyle: { color: genotypeColorMap.genotype1 }
            }
          ]
        : [
            {
              value: snp.refAlleleFrequency * 100,
              name: 'Ref',
              itemStyle: { color: '#5470c6' }
            },
            {
              value: snp.altAlleleFrequency * 100,
              name: 'Alt',
              itemStyle: { color: '#91CC75' }
            }
          ]
      : [];

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

  let legendLabels: string[] = [];
    if (frequencyType.value === 'genotype') {
      legendLabels = [legendGenotype3, legendGenotype2, legendGenotype1];
    } else {
      legendLabels = ['Ref', 'Alt'];
    }

  const option = {
    tooltip: { trigger: 'item' },
    legend: {
      top: 10,
      left: 'center',
      data: legendLabels.map(name => ({ name, icon: 'circle' })),
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
.el-tabs__item {
  font-size: 16px;
  font-weight: bold;
  padding: 12px 20px;
}
.el-tabs__nav-wrap {
  justify-content: center !important;
}
.el-tabs__item.is-active {
  background-color: #1f80ff;
  color: white;
  border-radius: 6px;
}
</style>
