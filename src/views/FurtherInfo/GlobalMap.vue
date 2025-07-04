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
import { getGeneticSubgroups } from '@/api/furtherInfo.js'; // 导入API
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
        "genotypeFrequency1": 0.373,
        "genotypeFrequency2": 0.329,
        "genotypeFrequency3": 0.299,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.15,
        "genotypeFrequency2": 0.265,
        "genotypeFrequency3": 0.585,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.314,
        "genotypeFrequency2": 0.088,
        "genotypeFrequency3": 0.598,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.31,
        "genotypeFrequency2": 0.34,
        "genotypeFrequency3": 0.35,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.454,
        "genotypeFrequency2": 0.31,
        "genotypeFrequency3": 0.236,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.265,
        "genotypeFrequency2": 0.107,
        "genotypeFrequency3": 0.628,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.179,
        "genotypeFrequency2": 0.428,
        "genotypeFrequency3": 0.393,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.675,
        "genotypeFrequency2": 0.128,
        "genotypeFrequency3": 0.197,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.096,
        "genotypeFrequency2": 0.635,
        "genotypeFrequency3": 0.269,
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
        "genotypeFrequency1": 0.309,
        "genotypeFrequency2": 0.288,
        "genotypeFrequency3": 0.403,
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
        "genotypeFrequency1": 0.357,
        "genotypeFrequency2": 0.219,
        "genotypeFrequency3": 0.424,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.446,
        "genotypeFrequency2": 0.137,
        "genotypeFrequency3": 0.417,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.342,
        "genotypeFrequency2": 0.365,
        "genotypeFrequency3": 0.293,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.284,
        "genotypeFrequency2": 0.494,
        "genotypeFrequency3": 0.222,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.616,
        "genotypeFrequency2": 0.092,
        "genotypeFrequency3": 0.292,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.394,
        "genotypeFrequency2": 0.318,
        "genotypeFrequency3": 0.287,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.172,
        "genotypeFrequency2": 0.547,
        "genotypeFrequency3": 0.281,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.129,
        "genotypeFrequency2": 0.168,
        "genotypeFrequency3": 0.703,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.439,
        "genotypeFrequency2": 0.343,
        "genotypeFrequency3": 0.218,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.205,
        "genotypeFrequency2": 0.605,
        "genotypeFrequency3": 0.189,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.357,
        "genotypeFrequency2": 0.212,
        "genotypeFrequency3": 0.43,
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
        "genotypeFrequency1": 0.432,
        "genotypeFrequency2": 0.282,
        "genotypeFrequency3": 0.286,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.22,
        "genotypeFrequency2": 0.481,
        "genotypeFrequency3": 0.298,
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
        "genotypeFrequency1": 0.542,
        "genotypeFrequency2": 0.34,
        "genotypeFrequency3": 0.118,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.288,
        "genotypeFrequency2": 0.246,
        "genotypeFrequency3": 0.467,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.144,
        "genotypeFrequency2": 0.21,
        "genotypeFrequency3": 0.646,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.462,
        "genotypeFrequency2": 0.298,
        "genotypeFrequency3": 0.24,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.55,
        "genotypeFrequency2": 0.159,
        "genotypeFrequency3": 0.291,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.559,
        "genotypeFrequency2": 0.26,
        "genotypeFrequency3": 0.181,
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
        "genotypeFrequency1": 0.289,
        "genotypeFrequency2": 0.464,
        "genotypeFrequency3": 0.247,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.187,
        "genotypeFrequency2": 0.237,
        "genotypeFrequency3": 0.576,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.352,
        "genotypeFrequency2": 0.3,
        "genotypeFrequency3": 0.348,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.2,
        "genotypeFrequency2": 0.137,
        "genotypeFrequency3": 0.664,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.232,
        "genotypeFrequency2": 0.376,
        "genotypeFrequency3": 0.392,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.358,
        "genotypeFrequency2": 0.324,
        "genotypeFrequency3": 0.318,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.201,
        "genotypeFrequency2": 0.561,
        "genotypeFrequency3": 0.238,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.372,
        "genotypeFrequency2": 0.168,
        "genotypeFrequency3": 0.46,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.376,
        "genotypeFrequency2": 0.335,
        "genotypeFrequency3": 0.288,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.394,
        "genotypeFrequency2": 0.385,
        "genotypeFrequency3": 0.221,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.312,
        "genotypeFrequency2": 0.596,
        "genotypeFrequency3": 0.093,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.391,
        "genotypeFrequency2": 0.113,
        "genotypeFrequency3": 0.497,
        "alleleCount": 100
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
        "genotypeFrequency1": 0.213,
        "genotypeFrequency2": 0.498,
        "genotypeFrequency3": 0.289,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.248,
        "genotypeFrequency2": 0.157,
        "genotypeFrequency3": 0.595,
        "alleleCount": 300
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
        "genotypeFrequency1": 0.194,
        "genotypeFrequency2": 0.56,
        "genotypeFrequency3": 0.246,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.38,
        "genotypeFrequency2": 0.133,
        "genotypeFrequency3": 0.487,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.395,
        "genotypeFrequency2": 0.267,
        "genotypeFrequency3": 0.337,
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
        "genotypeFrequency1": 0.218,
        "genotypeFrequency2": 0.608,
        "genotypeFrequency3": 0.174,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.511,
        "genotypeFrequency2": 0.41,
        "genotypeFrequency3": 0.079,
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
        "genotypeFrequency1": 0.081,
        "genotypeFrequency2": 0.579,
        "genotypeFrequency3": 0.34,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.553,
        "genotypeFrequency2": 0.238,
        "genotypeFrequency3": 0.209,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.47,
        "genotypeFrequency2": 0.373,
        "genotypeFrequency3": 0.158,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.331,
        "genotypeFrequency2": 0.231,
        "genotypeFrequency3": 0.437,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.404,
        "genotypeFrequency2": 0.257,
        "genotypeFrequency3": 0.34,
        "alleleCount": 500
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
        "genotypeFrequency1": 0.16,
        "genotypeFrequency2": 0.414,
        "genotypeFrequency3": 0.426,
        "alleleCount": 1000
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
        "genotypeFrequency1": 0.15,
        "genotypeFrequency2": 0.443,
        "genotypeFrequency3": 0.407,
        "alleleCount": 200
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
        "genotypeFrequency1": 0.304,
        "genotypeFrequency2": 0.548,
        "genotypeFrequency3": 0.148,
        "alleleCount": 200
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

    const pieData = snp ? [
      { value: snp.genotypeFrequency3 * 100, name: snp.genotype3, itemStyle: { color: genotypeColorMap.genotype3 } },
      { value: snp.genotypeFrequency2 * 100, name: snp.genotype2, itemStyle: { color: genotypeColorMap.genotype2 } },
      { value: snp.genotypeFrequency1 * 100, name: snp.genotype1, itemStyle: { color: genotypeColorMap.genotype1 } }
    ] : [];

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

  const option = {
    tooltip: { trigger: 'item' },
    legend: {
      top: 10,
      left: 'center',
      data: [
        { name: legendGenotype3, icon: 'circle' },
        { name: legendGenotype2, icon: 'circle' },
        { name: legendGenotype1, icon: 'circle' }
      ]
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