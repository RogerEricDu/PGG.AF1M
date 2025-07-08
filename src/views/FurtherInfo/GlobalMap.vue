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
      id="export-area-global-pie"
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
/* import { getGeneticSubgroups } from '@/api/furtherInfo.js';  */
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

onMounted(async () => {
  const worldMap  = await fetch('/map/world.json').then(res => res.json());
  echarts.registerMap('world', worldMap );
    // 初始化渲染第一个地图（可选）
  fetchMapData(0);
});

const countryCenters: Record<string, [number, number]> = {
  China: [104.1954, 35.8617],
  India: [78.9629, 20.5937],
  USA: [-95.7129, 37.0902],
  Russia: [105.3188, 61.5240],
  Brazil: [-51.9253, -14.2350],
  Australia: [133.7751, -25.2744],
  Canada: [-106.3468, 56.1304],
  Germany: [10.4515, 51.1657],
  France: [2.2137, 46.2276],
  "United Kingdom": [-3.435973, 55.378051],
  Japan: [138.2529, 36.2048],
  "South Korea": [127.7669, 35.9078],
  "North Korea": [127.5101, 40.3399],
  Mexico: [-102.5528, 23.6345],
  Argentina: [-63.6167, -38.4161],
  "South Africa": [22.9375, -30.5595],
  Egypt: [30.8025, 26.8206],
  Italy: [12.5674, 41.8719],
  Spain: [-3.7492, 40.4637],
  Turkey: [35.2433, 38.9637],
  "Saudi Arabia": [45.0792, 23.8859],
  Iran: [53.6880, 32.4279],
  Indonesia: [113.9213, -0.7893],
  Pakistan: [69.3451, 30.3753],
  Thailand: [100.9925, 15.8700],
  Vietnam: [108.2772, 14.0583],
  Philippines: [121.7740, 12.8797],
  Malaysia: [101.9758, 4.2105],
  Singapore: [103.8198, 1.3521],
  Nigeria: [8.6753, 9.0820],
  Kenya: [37.9062, -0.0236],
  Ethiopia: [40.4897, 9.1450],
  Ukraine: [31.1656, 48.3794],
  Poland: [19.1451, 51.9194],
  Netherlands: [5.2913, 52.1326],
  Sweden: [18.6435, 60.1282],
  Norway: [8.4689, 60.4720],
  Finland: [25.7482, 61.9241],
  Greece: [21.8243, 39.0742],
  Israel: [34.8516, 31.0461],
  Iraq: [43.6793, 33.2232],
  Afghanistan: [67.7099, 33.9391],
  Bangladesh: [90.3563, 23.6850],
  Myanmar: [95.9560, 21.9162],
  Kazakhstan: [66.9237, 48.0196],
  Uzbekistan: [64.5853, 41.3775],
  "New Zealand": [174.8850, -40.9006],
  Colombia: [-74.2973, 4.5709],
  Peru: [-75.0152, -9.1900],
  Chile: [-71.5429, -35.6751],
  Venezuela: [-66.5897, 6.4238],
  Cuba: [-77.7812, 21.5218],
  Morocco: [-7.0926, 31.7917],
  Algeria: [1.6596, 28.0339],
  Tunisia: [9.5375, 33.8869],
  Sudan: [30.2176, 12.8628]
};

//测试用数据
const mockData = [
  {
    "country": "China",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.139,
        "genotypeFrequency2": 0.405,
        "genotypeFrequency3": 0.456,
        "refAlleleFrequency": 0.412,
        "altAlleleFrequency": 0.588,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "India",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.166,
        "genotypeFrequency2": 0.462,
        "genotypeFrequency3": 0.372,
        "refAlleleFrequency": 0.792,
        "altAlleleFrequency": 0.208,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "USA",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.279,
        "genotypeFrequency2": 0.435,
        "genotypeFrequency3": 0.286,
        "refAlleleFrequency": 0.738,
        "altAlleleFrequency": 0.262,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Russia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.366,
        "genotypeFrequency2": 0.266,
        "genotypeFrequency3": 0.368,
        "refAlleleFrequency": 0.904,
        "altAlleleFrequency": 0.096,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Brazil",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.277,
        "genotypeFrequency2": 0.212,
        "genotypeFrequency3": 0.51,
        "refAlleleFrequency": 0.477,
        "altAlleleFrequency": 0.523,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Australia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.152,
        "genotypeFrequency2": 0.334,
        "genotypeFrequency3": 0.513,
        "refAlleleFrequency": 0.168,
        "altAlleleFrequency": 0.832,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Canada",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.388,
        "genotypeFrequency2": 0.509,
        "genotypeFrequency3": 0.103,
        "refAlleleFrequency": 0.907,
        "altAlleleFrequency": 0.093,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Germany",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.448,
        "genotypeFrequency2": 0.261,
        "genotypeFrequency3": 0.291,
        "refAlleleFrequency": 0.432,
        "altAlleleFrequency": 0.568,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "France",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.394,
        "genotypeFrequency2": 0.191,
        "genotypeFrequency3": 0.415,
        "refAlleleFrequency": 0.646,
        "altAlleleFrequency": 0.354,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "United Kingdom",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.353,
        "genotypeFrequency2": 0.415,
        "genotypeFrequency3": 0.231,
        "refAlleleFrequency": 0.8,
        "altAlleleFrequency": 0.2,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Japan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.307,
        "genotypeFrequency2": 0.525,
        "genotypeFrequency3": 0.168,
        "refAlleleFrequency": 0.314,
        "altAlleleFrequency": 0.686,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "South Korea",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.251,
        "genotypeFrequency2": 0.329,
        "genotypeFrequency3": 0.42,
        "refAlleleFrequency": 0.854,
        "altAlleleFrequency": 0.146,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "North Korea",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.333,
        "genotypeFrequency2": 0.229,
        "genotypeFrequency3": 0.438,
        "refAlleleFrequency": 0.699,
        "altAlleleFrequency": 0.301,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Mexico",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.424,
        "genotypeFrequency2": 0.305,
        "genotypeFrequency3": 0.271,
        "refAlleleFrequency": 0.624,
        "altAlleleFrequency": 0.376,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Argentina",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.115,
        "genotypeFrequency2": 0.476,
        "genotypeFrequency3": 0.41,
        "refAlleleFrequency": 0.494,
        "altAlleleFrequency": 0.506,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "South Africa",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.266,
        "genotypeFrequency2": 0.371,
        "genotypeFrequency3": 0.363,
        "refAlleleFrequency": 0.951,
        "altAlleleFrequency": 0.049,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Egypt",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.258,
        "genotypeFrequency2": 0.399,
        "genotypeFrequency3": 0.343,
        "refAlleleFrequency": 0.448,
        "altAlleleFrequency": 0.552,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Italy",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.352,
        "genotypeFrequency2": 0.533,
        "genotypeFrequency3": 0.115,
        "refAlleleFrequency": 0.287,
        "altAlleleFrequency": 0.713,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Spain",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.368,
        "genotypeFrequency2": 0.37,
        "genotypeFrequency3": 0.262,
        "refAlleleFrequency": 0.621,
        "altAlleleFrequency": 0.379,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Turkey",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.095,
        "genotypeFrequency2": 0.748,
        "genotypeFrequency3": 0.157,
        "refAlleleFrequency": 0.205,
        "altAlleleFrequency": 0.795,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Saudi Arabia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.303,
        "genotypeFrequency2": 0.333,
        "genotypeFrequency3": 0.364,
        "refAlleleFrequency": 0.721,
        "altAlleleFrequency": 0.279,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Iran",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.073,
        "genotypeFrequency2": 0.405,
        "genotypeFrequency3": 0.522,
        "refAlleleFrequency": 0.499,
        "altAlleleFrequency": 0.501,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Indonesia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.125,
        "genotypeFrequency2": 0.656,
        "genotypeFrequency3": 0.219,
        "refAlleleFrequency": 0.888,
        "altAlleleFrequency": 0.112,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Pakistan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.236,
        "genotypeFrequency2": 0.417,
        "genotypeFrequency3": 0.347,
        "refAlleleFrequency": 0.142,
        "altAlleleFrequency": 0.858,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Thailand",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.266,
        "genotypeFrequency2": 0.222,
        "genotypeFrequency3": 0.512,
        "refAlleleFrequency": 0.394,
        "altAlleleFrequency": 0.606,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Vietnam",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.183,
        "genotypeFrequency2": 0.442,
        "genotypeFrequency3": 0.375,
        "refAlleleFrequency": 0.31,
        "altAlleleFrequency": 0.69,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Philippines",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.404,
        "genotypeFrequency2": 0.272,
        "genotypeFrequency3": 0.324,
        "refAlleleFrequency": 0.211,
        "altAlleleFrequency": 0.789,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Malaysia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.201,
        "genotypeFrequency2": 0.54,
        "genotypeFrequency3": 0.259,
        "refAlleleFrequency": 0.852,
        "altAlleleFrequency": 0.148,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Singapore",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.479,
        "genotypeFrequency2": 0.158,
        "genotypeFrequency3": 0.363,
        "refAlleleFrequency": 0.413,
        "altAlleleFrequency": 0.587,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Nigeria",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.349,
        "genotypeFrequency2": 0.227,
        "genotypeFrequency3": 0.424,
        "refAlleleFrequency": 0.796,
        "altAlleleFrequency": 0.204,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Kenya",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.083,
        "genotypeFrequency2": 0.321,
        "genotypeFrequency3": 0.596,
        "refAlleleFrequency": 0.058,
        "altAlleleFrequency": 0.942,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Ethiopia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.222,
        "genotypeFrequency2": 0.397,
        "genotypeFrequency3": 0.381,
        "refAlleleFrequency": 0.763,
        "altAlleleFrequency": 0.237,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Ukraine",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.461,
        "genotypeFrequency2": 0.333,
        "genotypeFrequency3": 0.206,
        "refAlleleFrequency": 0.172,
        "altAlleleFrequency": 0.828,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Poland",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.316,
        "genotypeFrequency2": 0.371,
        "genotypeFrequency3": 0.312,
        "refAlleleFrequency": 0.301,
        "altAlleleFrequency": 0.699,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Netherlands",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.484,
        "genotypeFrequency2": 0.187,
        "genotypeFrequency3": 0.329,
        "refAlleleFrequency": 0.211,
        "altAlleleFrequency": 0.789,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Sweden",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.249,
        "genotypeFrequency2": 0.588,
        "genotypeFrequency3": 0.162,
        "refAlleleFrequency": 0.349,
        "altAlleleFrequency": 0.651,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Norway",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.252,
        "genotypeFrequency2": 0.311,
        "genotypeFrequency3": 0.437,
        "refAlleleFrequency": 0.583,
        "altAlleleFrequency": 0.417,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Finland",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.459,
        "genotypeFrequency2": 0.417,
        "genotypeFrequency3": 0.124,
        "refAlleleFrequency": 0.399,
        "altAlleleFrequency": 0.601,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Greece",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.346,
        "genotypeFrequency2": 0.271,
        "genotypeFrequency3": 0.382,
        "refAlleleFrequency": 0.014,
        "altAlleleFrequency": 0.986,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Israel",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.084,
        "genotypeFrequency2": 0.505,
        "genotypeFrequency3": 0.411,
        "refAlleleFrequency": 0.387,
        "altAlleleFrequency": 0.613,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Iraq",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.408,
        "genotypeFrequency2": 0.361,
        "genotypeFrequency3": 0.232,
        "refAlleleFrequency": 0.168,
        "altAlleleFrequency": 0.832,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Afghanistan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.524,
        "genotypeFrequency2": 0.314,
        "genotypeFrequency3": 0.162,
        "refAlleleFrequency": 0.126,
        "altAlleleFrequency": 0.874,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Bangladesh",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.326,
        "genotypeFrequency2": 0.352,
        "genotypeFrequency3": 0.323,
        "refAlleleFrequency": 0.138,
        "altAlleleFrequency": 0.862,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Myanmar",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.274,
        "genotypeFrequency2": 0.511,
        "genotypeFrequency3": 0.215,
        "refAlleleFrequency": 0.031,
        "altAlleleFrequency": 0.969,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "Kazakhstan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.539,
        "genotypeFrequency2": 0.343,
        "genotypeFrequency3": 0.118,
        "refAlleleFrequency": 0.231,
        "altAlleleFrequency": 0.769,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Uzbekistan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.329,
        "genotypeFrequency2": 0.23,
        "genotypeFrequency3": 0.442,
        "refAlleleFrequency": 0.086,
        "altAlleleFrequency": 0.914,
        "alleleCount": 300
      }
    ]
  },
  {
    "country": "New Zealand",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.371,
        "genotypeFrequency2": 0.089,
        "genotypeFrequency3": 0.54,
        "refAlleleFrequency": 0.492,
        "altAlleleFrequency": 0.508,
        "alleleCount": 200
      }
    ]
  },
  {
    "country": "Colombia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.546,
        "genotypeFrequency2": 0.35,
        "genotypeFrequency3": 0.104,
        "refAlleleFrequency": 0.336,
        "altAlleleFrequency": 0.664,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Peru",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.4,
        "genotypeFrequency2": 0.459,
        "genotypeFrequency3": 0.141,
        "refAlleleFrequency": 0.812,
        "altAlleleFrequency": 0.188,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Chile",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.08,
        "genotypeFrequency2": 0.636,
        "genotypeFrequency3": 0.284,
        "refAlleleFrequency": 0.18,
        "altAlleleFrequency": 0.82,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Venezuela",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.447,
        "genotypeFrequency2": 0.172,
        "genotypeFrequency3": 0.381,
        "refAlleleFrequency": 0.868,
        "altAlleleFrequency": 0.132,
        "alleleCount": 1000
      }
    ]
  },
  {
    "country": "Cuba",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.407,
        "genotypeFrequency2": 0.481,
        "genotypeFrequency3": 0.112,
        "refAlleleFrequency": 0.927,
        "altAlleleFrequency": 0.073,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Morocco",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.211,
        "genotypeFrequency2": 0.349,
        "genotypeFrequency3": 0.439,
        "refAlleleFrequency": 0.484,
        "altAlleleFrequency": 0.516,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Algeria",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.64,
        "genotypeFrequency2": 0.133,
        "genotypeFrequency3": 0.227,
        "refAlleleFrequency": 0.594,
        "altAlleleFrequency": 0.406,
        "alleleCount": 100
      }
    ]
  },
  {
    "country": "Tunisia",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.453,
        "genotypeFrequency2": 0.374,
        "genotypeFrequency3": 0.173,
        "refAlleleFrequency": 0.073,
        "altAlleleFrequency": 0.927,
        "alleleCount": 500
      }
    ]
  },
  {
    "country": "Sudan",
    "data": [
      {
        "genotype1": "AA",
        "genotype2": "AG",
        "genotype3": "GG",
        "genotypeFrequency1": 0.393,
        "genotypeFrequency2": 0.52,
        "genotypeFrequency3": 0.086,
        "refAlleleFrequency": 0.912,
        "altAlleleFrequency": 0.088,
        "alleleCount": 100
      }
    ]
  }
]

const fetchMapData = async (index: number) => {
  if (!charts.value[index].population) {
    alert('Please select a population first.');
    return;
  }

  let legendGenotype1 = '', legendGenotype2 = '', legendGenotype3 = '';

  const params = {
    chromosome: props.chromosome,
    position: props.position,
    population: charts.value[index].population,
    page: 1,
    size: 100
  };

/*   const response = await getGeneticSubgroups(params);
  const rawData = response.data || []; */
  const rawData = mockData;

  const genotypeColorMap = {
    genotype3: '#5470C6',
    genotype2: '#91CC75',
    genotype1: '#C6C6C5'
  };

  const data = rawData.map(item => {
    const countryName = item.country;
    const snp = item.data?.[0];
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
      name: countryName,
      pieData
    };
  });

  await nextTick();
  const chartEl = chartRefs.value[index];
  if (!chartEl) return;

  let myChart = echarts.getInstanceByDom(chartEl);
  if (myChart) myChart.dispose();
  myChart = echarts.init(chartEl);

  // 配置 geo 先渲染一次图表（用于 convertToPixel）
    myChart.setOption({
    geo: {
        map: 'world'
    }
    });

  const pieSeries = data 
  .filter(d => d.pieData && d.pieData.length > 0)
  .map(d => ({
    type: 'pie',
    coordinateSystem: 'geo',
    name: d.name,
    center: countryCenters[d.name] || [0, 0], // center 不指定，使用 geo 中的 name 定位
    geoIndex: 0,
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
      map: 'world',
      roam: false,
      label: {
        show: false
      },
      itemStyle: {
        areaColor: '#f3f3f3',
        borderColor: '#999'
      },
      emphasis: {
        itemStyle: {
          areaColor: '#e7e8ea'
        }
      }
    },
    series: pieSeries
  };

  myChart.setOption(option);
};



// 新增一个对比地图（默认 population Han）
const addComparisonMap = () => {
  if (charts.value.length >= 4) {
    ElMessageBox.alert('You can add up to 4 comparison maps only.', 'Notice', {
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
  const container = document.getElementById('export-area-global-pie');
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
  width: 1400px;
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