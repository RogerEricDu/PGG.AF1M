<template>
  <div class="GeneticAffinity-container">
    <div class="GeneticAffinity-title">
      <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Genetic Affinity</h3>
      <p style="flex: 1; text-align: right;">Click on the map to display genetic affinity of the area.</p>
    </div>

    <!--  第一个板块 -->
    <div class="section-container">
      <div class="section-title">Genetic Affinity of Shanghai</div>
      <div class="section-content">
        <!-- 左侧地图 -->
        <div ref="provinceMap" class="map-container"></div>
        <!-- 右侧南丁格尔玫瑰图 -->
        <div ref="provinceRoseChart" class="chart-container"></div>
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
        <!-- 右侧南丁格尔玫瑰图 -->
        <div ref="regionRoseChart" class="chart-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import chinaMapData from '/public/map/china.json';

export default {
  data() {
    return {
      roseData: [
        { value: 40, name: 'rose 1' },
        { value: 33, name: 'rose 2' },
        { value: 28, name: 'rose 3' },
        { value: 22, name: 'rose 4' },
        { value: 20, name: 'rose 5' },
        { value: 15, name: 'rose 6' },
        { value: 12, name: 'rose 7' },
        { value: 10, name: 'rose 8' },
      ],
    };
  },
  mounted() {
    echarts.registerMap('china', chinaMapData); // Register the map with ECharts
    this.initProvinceMap();
    this.initRegionMap();
    this.initProvinceRoseChart();
    this.initRegionRoseChart();
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
    initProvinceRoseChart() {
      this.updateRoseChart(this.$refs.provinceRoseChart);
    },
    initRegionRoseChart() {
      this.updateRoseChart(this.$refs.regionRoseChart);
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
    getRoseChartOption() {
      return {
        title: {
          text: 'Nightingale Chart',
          subtext: 'Genetic Affinity Data',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: this.roseData.map((item) => item.name),
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: this.roseData,
            itemStyle: {
              borderRadius: 5,
            },
          },
        ],
      };
    },
    updateRoseChart(chartRef) {
      const roseChart = echarts.init(chartRef);
      roseChart.setOption(this.getRoseChartOption());
    },
  },
};
</script>

<style scoped>
.GeneticAffinity-container {
  margin: 35px 20px 0 20px;
}

.GeneticAffinity-title {
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
  width: 45%; /* Adjust for responsive layout */
  height: 500px; /* Set consistent height for charts */
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>