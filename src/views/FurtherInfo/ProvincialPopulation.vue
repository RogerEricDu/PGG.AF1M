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
      id="export-area-province"
      style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center; background: #fff; padding: 10px;"
    >
      <div
        v-for="(chart, index) in charts"
        :key="chart.id"
        class="chart-block"
        style="page-break-after: always; display: flex; gap: 20px; justify-content: center; align-items: flex-start;"
      >
        <div>
          <div class="chart-title">Chart {{ index + 1 }} ( Population: {{ chart.population }} )</div>
          <div
            :ref="el => { if (el) chartRefs[index] = el as HTMLElement }"
            class="chart-container"
            style="width: 420px; height: 450px;"
          ></div>
        </div>
        <div>
          <div class="chart-title">Allele Count in Province</div>
          <div
            :ref="el => { if (el) barRefs[index] = el as HTMLElement }"
            class="bar-chart-container"
            style="width: 600px; height: 500px;"
          ></div>
        </div>
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

const chartRefs = ref<(HTMLElement | null)[]>([]);
const barRefs = ref<(HTMLElement | null)[]>([]);


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
  Tibet: 'Xizang',
  Xinjiang: 'Xinjiang',
  Yunnan: 'Yunnan',
  Zhejiang: 'Zhejiang',
  HongKong: 'Hong Kong',
  Macau: 'Macau',
  Taiwan: 'Taiwan',
  InnerMongolia: 'Inner Mongolia',
  Singapore: 'Singapore'
};

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

  const params = {
    chromosome: props.chromosome,
    position: props.position,
    population: charts.value[index].population,
    page: 1,
    size: 10
  };

  const response = await getProvincialPopulation(params);
  const rawData = response.data || [];

  const data = rawData.map(item => {
    const provinceName = provinceNameMap[item.province] || item.province;
    const alleleCountSum = item.data.reduce((sum, d) => sum + d.alleleCount, 0);
    return {
      name: provinceName,
      value: alleleCountSum || 0,
      snpData: item.data
    };
  });

  await nextTick();

  const chartEl = chartRefs.value[index];
  if (!chartEl) return;

  const myChart = echarts.init(chartEl);
  const maxVal = Math.max(...data.map(d => d.value)) || 10000;

    // 渲染柱状图
  const barEl = barRefs.value[index];
  if (barEl) {
    const barChart = echarts.init(barEl);

    // 把数据拆成两列
    const column1 = data.filter((_, i) => i % 2 === 0);
    const column2 = data.filter((_, i) => i % 2 !== 0);
    //设置横坐标最大值
    const maxVal = Math.max(...data.map(d => d.value)) || 10000;


    const barOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Column 1', 'Column 2']
      },
      grid: [
        { left: '3%', right: '55%', containLabel: true },
        { left: '55%', right: '5%', containLabel: true }
      ],
      xAxis: [
        { gridIndex: 0, type: 'value',max: maxVal },
        { gridIndex: 1, type: 'value',max: maxVal }
      ],
      yAxis: [
        { gridIndex: 0, type: 'category', data: column1.map(d => d.name) },
        { gridIndex: 1, type: 'category', data: column2.map(d => d.name) }
      ],
      series: [
        {
          type: 'bar',
          name: 'Column 1',
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: column1.map(d => d.value)
        },
        {
          type: 'bar',
          name: 'Column 2',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: column2.map(d => d.value)
        }
      ]
    };

    barChart.setOption(barOption);
  };

  const option = {
    tooltip: {
      trigger: 'item',
      enterable: true,
      formatter: (params: any) => {
        const provinceData = data.find(d => d.name === params.name);
        if (!provinceData || !provinceData.snpData || provinceData.snpData.length === 0) {
          return `<div style="padding:5px;">${params.name}: NULL</div>`;
        }
        const snp = provinceData.snpData[0];
        const pieData = [
          { value: snp.genotypeFrequency1 * 100, name: snp.genotype1 },
          { value: snp.genotypeFrequency2 * 100, name: snp.genotype2 },
          { value: snp.genotypeFrequency3 * 100, name: snp.genotype3 }
        ];

        // 使用唯一id区分饼图
        const pieId = 'pieChart_' + index;
        setTimeout(() => {
          const pieChartDom = document.getElementById(pieId);
          if (pieChartDom) {
            const pieChart = echarts.init(pieChartDom);
            pieChart.setOption({
              series: [
                {
                  type: 'pie',
                  radius: '70%',
                  data: pieData,
                  label: { formatter: '{b}: {c}%', fontSize: 12 }
                }
              ]
            });
          }
        }, 0);

        return `
          <div style="width: 300px;">
            <div style="background-color: #f0f0f0; padding: 5px; font-size: 14px;">
              ${params.name} - Allele Count: ${params.value}
            </div>
            <div id="${pieId}" style="width: 300px; height: 180px; margin-top: 10px;"></div>
          </div>
        `;
      }
    },
    visualMap: {
      left: 'right',
      min: 0,
      max: maxVal,
      inRange: {
        color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    series: [
      {
        type: 'map',
        map: 'China',
        roam: true,
        data,
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          }
        }
      }
    ]
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
  const container = document.getElementById('export-area-province');
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
  width: 700px;
  height: 500px;
  border: 1px solid #ccc;
}
.chart-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

</style>
