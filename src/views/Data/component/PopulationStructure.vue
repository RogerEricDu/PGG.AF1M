<template>
  <div class="PopulationStructure-container">
    <div class="PopulationStructure-title">
      <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Population Structure</h3>
      <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p>
    </div>

    <!--  第一个板块 -->
    <div class="section-container">
      <div class="section-title">Population Structure of Shanghai</div>
      <div class="section-content">
        <!-- 左侧地图 -->
        <div ref="provinceMap" class="map-container"></div>
        <!-- 右侧PCA聚类图 -->
        <div ref="provinceClusterChart" class="chart-container"></div>
      </div>
    </div>

    <!-- 分割线 -->
    <hr class="divider">

    <!-- 第二个板块 -->
    <div class="section-container">
      <div class="section-title">Population Structure of SouthEast Han</div>
      <div class="section-content">
        <!-- 左侧地图 -->
        <div ref="regionMap" class="map-container"></div>
        <!-- 右侧PCA聚类图 -->
        <div ref="regionClusterChart" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import chinaMapData from '/public/map/china.json';
import * as echarts from 'echarts';
import ecStat from 'echarts-stat';

export default {
  name: 'Population Structure',
  data() {
    return {
      // 模拟数据
      populationData: [
        { label: 'Han', x: 3.275154, y: 2.957587 },
        { label: 'Han', x: 3.878788, y: 2.666757 },
        { label: 'Balti', x: 3.625746, y: 2.119041 },
        { label: 'Deng', x: -3.912363, y: 1.325108 },
        { label: 'Gongbo', x: -0.551694, y: -2.814223 },
        { label: 'Luoba', x: 2.855808, y: 3.483301 },
        { label: 'Monba', x: -3.594448, y: 2.856651 },
        { label: 'Sherpa', x: 0.421993, y: -2.372646 },
        { label: 'Tajik', x: 1.650821, y: 3.407572 },
        { label: 'TIB', x: -2.082902, y: 3.384412 },
        { label: 'Wakhi', x: 0.639276, y: -3.41284 },
        { label: 'Kashmiri', x: 2.300274, y: -3.552432 }
      ],
      COLOR_ALL: ['#ff6666', '#66b3ff', '#99ff99', '#ffcc99', '#ff99ff', '#c2c2f0', '#ffb3e6', '#c2f0c2', '#ffad33', '#b3b3ff', '#f0b3b3'],
      POPULATION_LABELS: ['Han', 'Balti', 'Deng', 'Gongbo', 'Luoba', 'Monba', 'Sherpa', 'Tajik', 'TIB', 'Wakhi', 'Kashmiri'],
    };
  },
  mounted() {
    echarts.registerMap('china', chinaMapData); // Register the map with ECharts
    this.initProvinceMap();
    this.initRegionMap();
    // 使用模拟数据初始化图表
    this.initializeChart(this.$refs.provinceClusterChart);
    this.initializeChart(this.$refs.regionClusterChart);
  },
  methods: {
    initProvinceMap() {
      const provinceMap = echarts.init(this.$refs.provinceMap);
      provinceMap.setOption(this.getMapOption());
      provinceMap.on('click', (params) => {
        this.updateRoseChart(this.$refs.provinceClusterChart);
      });
    },
    initRegionMap() {
      const regionMap = echarts.init(this.$refs.regionMap);
      regionMap.setOption(this.getMapOption());
      regionMap.on('click', (params) => {
        this.updateRoseChart(this.$refs.regionClusterChart);
      });
    },
    getMapOption() {
      return {
        series: [
          {
            type: 'map',
            map: 'china',
            label: { show: false },
            itemStyle: { emphasis: { areaColor: '#a0d911' } },
          },
        ],
      };
    },
    initializeChart(chartContainer) {
      if (!chartContainer || this.populationData.length === 0) return;

      const myChart = echarts.init(chartContainer);
      echarts.registerTransform(ecStat.transform.clustering);

      
      const pieces = this.POPULATION_LABELS.map((label, index) => ({
        value: index,
        label: label,
        color: this.COLOR_ALL[index],
      }));

      // Process data for clustering
      const data = this.populationData.map((item) => [
        item.x,
        item.y,
        this.POPULATION_LABELS.indexOf(item.label)
      ]);

      const option = {
        dataset: [
          { source: data },
          {
            transform: {
              type: 'ecStat:clustering',
              config: {
                clusterCount: this.POPULATION_LABELS.length,
                outputType: 'single',
                outputClusterIndexDimension: 2
              }
            }
          }
        ],
        tooltip: {
          position: 'top',
          formatter: (params) => {
            const index = params.data[2]; // 获取族群索引
            const label = this.POPULATION_LABELS[index]; // 获取族群名称
            const x = params.data[0].toFixed(6); // 获取并格式化X坐标
            const y = params.data[1].toFixed(6); // 获取并格式化Y坐标
            return `${label}: ${x}, ${y}`; // 返回格式化的tooltip文本
          }
        },
        visualMap: {
          type: 'piecewise',
          top: 'middle',
          min: 0,
          max: this.POPULATION_LABELS.length - 1,
          left: 10,
          splitNumber: this.POPULATION_LABELS.length,
          dimension: 2,
          pieces: pieces
        },
        grid: { left: 120 },
        xAxis: {},
        yAxis: {},
        series: {
          type: 'scatter',
          encode: { tooltip: [0, 1] },
          symbolSize: 8,
          itemStyle: { borderColor: '#555' },
          datasetIndex: 1
        }
      };

      myChart.setOption(option);
    }
  }
};
</script>




<style scoped>
.PopulationStructure-container {
  margin: 35px 20px 0 20px;
}

.PopulationStructure-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.section-container {
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
}

.section-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.map-container, .chart-container {
  width: 45%;
  height: 500px;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>