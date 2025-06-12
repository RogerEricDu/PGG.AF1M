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
      id="export-area-region-pie"
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


// 转换成小写，以便与regionMap.geojson文件中的区域名称匹配
const regionNameMap = {
  central: 'central',
  northeast: 'northeast',
  northwest: 'northwest',
  southcoast: 'southcoast',
  southwest: 'southwest',
  southeast: 'southeast'
};

const regionGeoCoordMap: Record<string, [number, number]> = {
  central: [114.5, 38.0],
  northeast: [128.0, 45.0],
  northwest: [95.5, 38.0],
  southcoast: [113.5, 23.5],
  southwest: [100.5, 30.0],
  southeast: [118.5, 30.5]
};

onMounted(async () => {
  const regionJson = await fetch('/map/regionMap.geojson').then(res => res.json());
  echarts.registerMap('Regions', regionJson);
    // 初始化渲染第一个地图（可选）
  fetchMapData(0);
});

//测试用数据
const mockData = [
  {
    region: 'central',
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
    region: 'northeast',
    data: [
      {
        genotype1: 'CC',
        genotype2: 'CT',
        genotype3: 'TT',
        genotypeFrequency1: 0.6,
        genotypeFrequency2: 0.25,
        genotypeFrequency3: 0.15,
        alleleCount: 150
      }
    ]
  },
  {
    region: 'northwest',
    data: [
      {
        genotype1: 'GG',
        genotype2: 'GA',
        genotype3: 'AA',
        genotypeFrequency1: 0.4,
        genotypeFrequency2: 0.4,
        genotypeFrequency3: 0.2,
        alleleCount: 300
      }
    ]
  },
    {
    region: 'southcoast',
    data: [
      {
        genotype1: 'GG',
        genotype2: 'GA',
        genotype3: 'AA',
        genotypeFrequency1: 0.4,
        genotypeFrequency2: 0.4,
        genotypeFrequency3: 0.2,
        alleleCount: 300
      }
    ]
  },
    {
    region: 'southwest',
    data: [
      {
        genotype1: 'GG',
        genotype2: 'GA',
        genotype3: 'AA',
        genotypeFrequency1: 0.4,
        genotypeFrequency2: 0.4,
        genotypeFrequency3: 0.2,
        alleleCount: 300
      }
    ]
  },
    {
    region: 'southeast',
    data: [
      {
        genotype1: 'GG',
        genotype2: 'GA',
        genotype3: 'AA',
        genotypeFrequency1: 0.4,
        genotypeFrequency2: 0.4,
        genotypeFrequency3: 0.2,
        alleleCount: 300
      }
    ]
  },
];

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

/*   const response = await getGeneticSubgroups(params);
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
    const regionName = regionNameMap[item.region] || item.region;
    const coord = regionGeoCoordMap[regionName];

    const snp = item.data?.[0];
    // 如果还没填 legend 值，就从第一条 snp 提取
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
      name: regionName,
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
      radius: 20,
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
      map: 'Regions',
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
  const container = document.getElementById('export-area-region-pie');
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