<template>
  <div class="GeneticAffinity-container">
    <div class="GeneticAffinity-title">
      <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Genetic Affinity</h3>
      <p style="flex: 1; text-align: right;">Click on the map to display genetic affinity of the area.</p>
    </div>

    <!-- 上方板块 -->
    <div class="section-container">
      <div class="section-content">
        <!-- 左侧地图 -->
        <div ref="provinceMap" class="map-container"></div>
        <!-- 右侧南丁格尔玫瑰图 -->
        <div ref="provinceRoseChart" class="chart-container"></div>
      </div>
    </div>

    <!-- 分割线 -->
    <hr class="divider">

    <!-- 下方板块 -->
    <div class="section-container">
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
      provincesData: [
        // 示例数据：族群之间的FST值
        { value: 0.05, name: 'Beijing' },
        { value: 0.06, name: 'Tianjin' },
        { value: 0.04, name: 'Hebei' },
        { value: 0.07, name: 'Shanxi' },
        { value: 0.03, name: 'Inner Mongolia' },
        { value: 0.02, name: 'Liaoning' },
        { value: 0.05, name: 'Jilin' },
        { value: 0.04, name: 'Heilongjiang' },
        { value: 0.08, name: 'Shanghai' },
        { value: 0.07, name: 'Jiangsu' },
        { value: 0.06, name: 'Zhejiang' },
        { value: 0.05, name: 'Anhui' },
        { value: 0.09, name: 'Fujian' },
        { value: 0.07, name: 'Jiangxi' },
        { value: 0.06, name: 'Shandong' },
        { value: 0.08, name: 'Henan' },
        { value: 0.05, name: 'Hubei' },
        { value: 0.07, name: 'Hunan' },
        { value: 0.04, name: 'Guangdong' },
        { value: 0.03, name: 'Guangxi' },
        { value: 0.02, name: 'Hainan' },
        { value: 0.05, name: 'Chongqing' },
        { value: 0.06, name: 'Sichuan' },
        { value: 0.04, name: 'Guizhou' },
        { value: 0.07, name: 'Yunnan' },
        { value: 0.03, name: 'Tibet' },
        { value: 0.06, name: 'Shaanxi' },
        { value: 0.08, name: 'Gansu' },
        { value: 0.05, name: 'Qinghai' },
        { value: 0.07, name: 'Ningxia' },
        { value: 0.04, name: 'Xinjiang' },
        { value: 0.06, name: 'Hong Kong' },
        { value: 0.05, name: 'Macau' },
        { value: 0.04, name: 'Taiwan' }
      ],
      populationData: [
        // 示例数据：族群之间的FST值
        { value: 0.04, name: 'Han' },
        { value: 0.06, name: 'Balti' },
        { value: 0.08, name: 'Deng' },
        { value: 0.05, name: 'Gongbo' },
        { value: 0.07, name: 'Luoba' },
        { value: 0.03, name: 'Monba' },
        { value: 0.09, name: 'Sherpa' },
        { value: 0.06, name: 'Tajik' },
        { value: 0.02, name: 'TIB' },
        { value: 0.04, name: 'Wakhi' },
        { value: 0.03, name: 'Kashmiri' },
      ],
      sampleCounts: {
        // 示例数据：省份样本数量信息
        Beijing: { Han: 2000, Balti: 20, Deng: 15 },
        Shanghai: { Han: 1800, Gongbo: 30, Sherpa: 10 },
        Zhejiang: { Han: 1700, Tajik: 5, Kashmiri: 8 },
      },
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
    // 初始化省份地图
    initProvinceMap() {
      const provinceMap = echarts.init(this.$refs.provinceMap);
      this.provincesData.sort((a, b) => b.value - a.value);
      provinceMap.setOption(this.getMapOption());
      provinceMap.on('click', (params) => {
        this.fetchProvinceData(params.name); // 点击省份时获取该省与其他省的FST数据
      });
      provinceMap.on('mouseover', (params) => {
        this.showTooltip(params);
      });
    },
    // 初始化族群地图并自动排序
    initRegionMap() {
      const regionMap = echarts.init(this.$refs.regionMap);
      this.populationData.sort((a, b) => b.value - a.value); // 按FST值降序排序
      regionMap.setOption(this.getMapOption());
    },
    // 获取地图配置
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
    // 更新省份南丁格尔图
    updateProvinceRoseChart(provincesData) {
      const roseChart = echarts.init(this.$refs.provinceRoseChart);
      roseChart.setOption({
        title: {
          text: 'Genetic Affinity of Province',
          left: 'center',
          top: '10%',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          data: provincesData.map(item => item.name),
          left: 'center',
          top: 'bottom',
        },
        series: [
          {
            name: 'FST values',
            type: 'pie',
            radius: [20, 140],
            roseType: 'radius',
            data: provincesData,
            itemStyle: { borderRadius: 5 },
            center: ['50%', '50%'], // Keep the chart centered
          },
        ],
      });
    },
    // 更新族群南丁格尔图
    updateRegionRoseChart() {
      const roseChart = echarts.init(this.$refs.regionRoseChart);
      roseChart.setOption({
        title: { 
          text: 'Genetic Affinity of Different Population',
          left: 'center',
          top: '10%',
        },
        tooltip: {
          trigger: 'item', 
          formatter: '{a} <br/>{b} : {c} ({d}%)' ,
          show : false,
        },
        legend: { data: this.populationData.map(item => item.name), left: 'center', top: 'bottom' },
        series: [
          {
            name: 'FST values',
            type: 'pie',
            radius: [20, 140],
            roseType: 'radius',
            data: this.populationData,
            itemStyle: { borderRadius: 5 },
          },
        ],
      });
    },
    // 调用后端接口获取省份数据
    fetchProvinceData(provinceName) {
      // 模拟异步请求替换成后端请求：fetch(`/geneAffinity/province?name=${provinceName}`)
      setTimeout(() => {
        // 假设返回的数据格式为 [{ value: 0.02, name: 'Beijing' }, ...]
        const simulatedData = this.provincesData; // 替换为动态获取的数据
        this.updateProvinceRoseChart(simulatedData);
      }, 1000);
    },
    // 显示省份样本数量提示
    showTooltip(params) {
      const samples = this.sampleCounts[params.name];
      if (samples) {
        const sampleText = Object.entries(samples)
          .map(([label, count]) => `${label}: ${count}`)
          .join('<br/>');
        echarts.getInstanceByDom(this.$refs.provinceMap).dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          name: params.name,
          dataIndex: params.dataIndex,
          tooltip: {
            formatter: `${params.name} Sample Counts:<br/>${sampleText}`
          }
        });
      }
    },
    // 初始化上方南丁格尔图
    initProvinceRoseChart() {
      this.updateProvinceRoseChart(this.provincesData);
    },
    // 初始化下方南丁格尔图
    initRegionRoseChart() {
      this.updateRegionRoseChart();
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
  width: 50%; /* Adjust for responsive layout */
  height: 660px; /* Set consistent height for charts */
  margin-bottom: 50px;
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>