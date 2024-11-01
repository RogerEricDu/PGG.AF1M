<template>
  <div class="PopulationStructure-container">
    <div class="PopulationStructure-title">
      <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Genetic Affinity</h3>
      <p style="flex: 1; text-align: right;">Click on the map to display genetic affinity of the area.</p>
    </div>

    <!--  第一个板块 -->
    <div class="section-container">
      <div class="section-title">Genetic Affinity of Shanghai</div>
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
      <div class="section-title">Genetic Affinity of SouthEast Han</div>
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
  mounted() {
    echarts.registerMap('china', chinaMapData); // Register the map with ECharts
    this.initProvinceMap();
    this.initRegionMap();
    this.initializeChart(this.$refs.provinceClusterChart);
    this.initializeChart(this.$refs.regionClusterChart);
  },
  methods: {
    initProvinceMap() {
      const provinceMap = echarts.init(this.$refs.provinceMap);
      provinceMap.setOption(this.getMapOption());
      provinceMap.on('click', (params) => {
        this.updateRoseChart(this.$refs.provinceRoseChart);
      });
    },
    initRegionMap() {
      const regionMap = echarts.init(this.$refs.regionMap);
      regionMap.setOption(this.getMapOption());
      regionMap.on('click', (params) => {
        this.updateRoseChart(this.$refs.regionRoseChart);
      });
    },
    getMapOption() {
      return {
        series: [
          {
            type: 'map',
            map: 'china',
            label: {
              show: false,
            },
            itemStyle: {
              emphasis: { areaColor: '#a0d911' },
            },
          },
        ],
      };
    },
    initializeChart(chartContainer) {
      if (!chartContainer) return;

      const myChart = echarts.init(chartContainer);
      echarts.registerTransform(ecStat.transform.clustering);

      const data = [
        [3.275154, 2.957587],
        [3.625746, 2.119041],
        [-3.912363, 1.325108],
        [-0.551694, -2.814223],
        [2.855808, 3.483301],
        [-3.594448, 2.856651],
        [0.421993, -2.372646],
        [1.650821, 3.407572],
        [-2.082902, 3.384412],
        [0.639276, -3.41284]
      ];

      const CLUSTER_COUNT = 6;
      const DIENSIION_CLUSTER_INDEX = 2;
      const COLOR_ALL = ['#37A2DA', '#e06343', '#37a354', '#b55dba', '#b5bd48', '#8378EA', '#96BFFF'];
      const pieces = [];
      for (let i = 0; i < CLUSTER_COUNT; i++) {
        pieces.push({ value: i, label: 'cluster ' + i, color: COLOR_ALL[i] });
      }

      const option = {
        dataset: [
          { source: data },
          {
            transform: {
              type: 'ecStat:clustering',
              config: {
                clusterCount: CLUSTER_COUNT,
                outputType: 'single',
                outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
              }
            }
          }
        ],
        tooltip: { position: 'top' },
        visualMap: {
          type: 'piecewise',
          top: 'middle',
          min: 0,
          max: CLUSTER_COUNT,
          left: 10,
          splitNumber: CLUSTER_COUNT,
          dimension: DIENSIION_CLUSTER_INDEX,
          pieces: pieces
        },
        grid: { left: 120 },
        xAxis: {},
        yAxis: {},
        series: {
          type: 'scatter',
          encode: { tooltip: [0, 1] },
          symbolSize: 15,
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