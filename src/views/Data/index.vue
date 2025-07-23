<template>
  <div class="population-dataset-page">
    <div class="header-container">
      <el-icon class="population-icon1" style="font-size: 36px;"><Document /></el-icon>
      <h1>Data Set</h1>
    </div>

    <!-- 动态标签 -->
    <div class="dynamic-stats">
      <div class="stat">
        <span class="number">{{ populationCount }}</span>
        <span class="label">Populations</span>
      </div>
      <div class="stat">
        <span class="number">{{ datasetCount }}</span>
        <span class="label">Datasets</span>
      </div>
      <div class="stat">
        <span class="number">{{ sampleCount.toLocaleString() }}+</span>
        <span class="label">Samples</span>
      </div>
    </div>

    <!-- 顶部导航选项框 -->
    <div class="navigation-container">
      <button
        class="navigation-item"
        :class="{ active: currentTab === 'Dataset' }"
        @click="currentTab = 'Dataset'"
      >
        Dataset
      </button>
      <button
        class="navigation-item"
        :class="{ active: currentTab === 'Population' }"
        @click="currentTab = 'Population'"
      >
        Population
      </button>
      <button
        class="navigation-item"
        :class="{ active: currentTab === 'GeographicDistribution' }"
        @click="currentTab = 'GeographicDistribution'"
      >
        Geographic Distribution
      </button>

    </div>

    <!-- 内容展示 -->
    <div class="content-container">
      <div v-show="currentTab === 'GeographicDistribution'" class="tab-content">
        <!-- 一个echarts地图 -->
        <div ref="chartContainer" class="chart-container" style="width: 1100px; height: 600px;"></div>
      </div>

      <!-- Population 数据展示 -->
      <div v-show="currentTab === 'Population'" class="tab-content">
        <div v-for="(item, index) in populationData" :key="index" class="card">
          <div class="card-left">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="links">
              <a :href="item.articleLink" target="_blank">Source →</a>
            </div>
          </div>
          <div class="card-right">
              <div class="image-wrapper">
                <img :src="item.image" alt="Image" />
              </div>
          </div>
        </div>
      </div>

      <!-- Dataset 数据展示 -->
      <div v-show="currentTab === 'Dataset'" class="tab-content">
        <div v-for="(item, index) in datasetData" :key="index" class="card">
          <div class="card-left">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="links">
              <a :href="item.articleLink" target="_blank">Article</a>
              <a :href="item.databaseLink" target="_blank">Go to database →</a>
            </div>
          </div>
          <div class="card-right">
            <img :src="item.image" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref,onMounted,onUnmounted } from 'vue';
import * as echarts from 'echarts';

const currentTab = ref('Dataset'); // 当前选中的标签

// 动态数字标签的数据
const populationCount = ref(0);
const datasetCount = ref(0);
const sampleCount = ref(0);

const targetPopulation = 11; // 最终显示的Population数量
const targetDataset = 3; // 最终显示的Dataset数量
const targetSample = 150000; // 最终显示的Sample数量
// 初始化 ECharts 地图
const chartContainer = ref(null);

let intervalId;



onMounted(() => {
  // 动态数字标签动画
  intervalId = setInterval(() => {
    if (populationCount.value < targetPopulation) populationCount.value++;
    if (datasetCount.value < targetDataset) datasetCount.value++;
    if (sampleCount.value < targetSample) {
      sampleCount.value += Math.ceil((targetSample - sampleCount.value) / 10);
    }
    // 停止计时器
    if (
      populationCount.value === targetPopulation &&
      datasetCount.value === targetDataset &&
      sampleCount.value >= targetSample
    ) {
      clearInterval(intervalId);
    }
  }, 50); // 每隔50ms更新一次


  if (!chartContainer.value) {
    console.error('chartContainer is null or undefined');
    return;
  }
  const myChart = echarts.init(chartContainer.value);

  // 加载本地的 China.json 地图数据
  fetch('/map/china.json')
    .then(response => response.json())
    .then(chinaJson => {
      if (!chinaJson || !chinaJson.features) {
      console.error('Invalid China JSON format');
      return;
    }
      echarts.registerMap('China', chinaJson);

      const data = [
        { name: 'Beijing', value: 21540 },
        { name: 'Tianjin', value: 15570 },
        { name: 'Shanghai', value: 24240 },
        { name: 'Chongqing', value: 31020 },
        { name: 'Hebei', value: 7500 },
        { name: 'Henan', value: 9890 },
        { name: 'Yunnan', value: 6420 },
        { name: 'Liaoning', value: 7850 },
        { name: 'Heilongjiang', value: 5230 },
        { name: 'Hunan', value: 8700 },
        { name: 'Anhui', value: 5600 },
        { name: 'Shandong', value: 10300 },
        { name: 'Xinjiang', value: 3870 },
        { name: 'Jiangsu', value: 9820 },
        { name: 'Zhejiang', value: 8420 },
        { name: 'Jiangxi', value: 4640 },
        { name: 'Hubei', value: 9350 },
        { name: 'Guangxi', value: 5930 },
        { name: 'Gansu', value: 3100 },
        { name: 'Shanxi', value: 5030 },
        { name: 'Inner Mongolia', value: 4110 },
        { name: 'Shaanxi', value: 7200 },
        { name: 'Jilin', value: 4800 },
        { name: 'Fujian', value: 6700 },
        { name: 'Guizhou', value: 3500 },
        { name: 'Guangdong', value: 12600 },
        { name: 'Qinghai', value: 1550 },
        { name: 'Xizang', value: 1340 },
        { name: 'Sichuan', value: 9200 },
        { name: 'Ningxia', value: 2320 },
        { name: 'Hainan', value: 1900 },
        { name: 'Taiwan', value: 8250 },
        { name: 'Hongkong', value: 7150 },
        { name: 'Macau', value: 59000 }
      ];
      data.sort((a, b) => a.value - b.value);

      const mapOption = {
        visualMap: {
          left: 'right',
          min: 500,
          max: 30000,
          inRange: {
            color: [
              '#e0f3f8', // 淡蓝色（低值）
              '#abd9e9', // 浅蓝色
              '#74add1', // 中等蓝色
              '#4575b4', // 深蓝色（中间值）
              '#ffffbf', // 浅黄色（过渡）
              '#fee090', // 浅橙色
              '#fdae61', // 橙色
              '#f46d43', // 橙红色
              '#d73027', // 红色（高值）
              '#a50026'  // 深红色（最高值）
            ]
          },
          text: ['High', 'Low'],
          calculable: true
        },
        series: [
          {
            type: 'map',
            roam: true,
            map: 'China',
            data: data,
            emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
          }},
          }
        ]
      };

/*       const barOption = {
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          axisLabel: { rotate: 30 },
          data: data.map(item => item.name)
        },
        series: {
          type: 'bar',
          data: data.map(item => item.value),
          label: {
            show: true,
            position: 'right',
            formatter: '{c}'
          }
        }
      }; */

      let currentOption = mapOption;
      myChart.setOption(mapOption);

      setInterval(() => {
        currentOption = currentOption === mapOption ? barOption : mapOption;
        myChart.setOption(currentOption, true);
      }, 5000);
    });
});

onUnmounted(() => {
  // 清除计时器
  clearInterval(intervalId);
});


// Population 数据
const populationData = ref([
  {
    title: "Han",
    description: "The Han ethnic group is the largest in China, representing over 90% of the population. Han culture has a rich history, with roots in ancient Chinese civilization, including contributions to architecture, philosophy, and language. Han people are traditionally associated with agricultural and urban lifestyles. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/han.jpg', import.meta.url).href, // 动态导入
  },
  {
    title: "Tibetan",
    description: "Tibetans primarily inhabit the Tibetan Plateau. They are known for their Buddhist culture, unique nomadic traditions, and vibrant festivals. Their traditional attire often includes brightly colored clothing and accessories. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/tibetan.jpg', import.meta.url).href,
  },
  {
    title: "Balti",
    description: "The Balti people are an ethnic group in the mountainous regions of the western Himalayas, known for their unique language and culture blending Tibetan and Central Asian influences.",
    articleLink: "#",
    image: new URL('@/assets/images/population/balti.jpg', import.meta.url).href,
  },
  {
    title: "Deng",
    description: "The Deng people are a lesser-known ethnic group residing in the highlands of Tibet and neighboring regions. They maintain a subsistence lifestyle and follow animist traditions.",
    articleLink: "#",
    image: new URL('@/assets/images/population/deng.jpg', import.meta.url).href,
  },
  {
    title: "Gongbo",
    description: "The Gongbo people are a sub-group of Tibetans in the southeastern region of Tibet, known for their vibrant festivals like Gongbo New Year. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/gongbo.jpg', import.meta.url).href,
  },
  {
    title: "Lhoba",
    description: "The Lhoba people live in the southeastern Himalayas. They are known for their animistic beliefs, unique woven textiles, and isolated lifestyle. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/lhoba.jpg', import.meta.url).href,
  },
  {
    title: "Wakhi",
    description: "The Wakhi people live in the high-altitude Pamir and Karakoram ranges. They are pastoralists known for their hospitality and vibrant folk traditions.",
    articleLink: "#",
    image: new URL('@/assets/images/population/wakhi.png', import.meta.url).href,
  },
  {
    title: "Sherpa",
    description: "Famous for their mountaineering skills, the Sherpa people reside in the Himalayas of Nepal and Tibet. They are deeply connected to Buddhism and have a unique mountain lifestyle.",
    articleLink: "#",
    image: new URL('@/assets/images/population/sherpa.jpg', import.meta.url).href,
  },
  {
    title: "Tajik",
    description: "The Tajik people in China are part of the larger Tajik ethnic group across Central Asia. They inhabit the Pamir Mountains and are known for their Persian cultural roots and vibrant textiles. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/tajik.png', import.meta.url).href,
  },
  {
    title: "Kashmiri",
    description: "The Kashmiri people, primarily residing in the Kashmir Valley, are known for their rich artistic traditions, including handicrafts, music, and cuisine. ",
    articleLink: "#",
    image: new URL('@/assets/images/population/kashmiri.png', import.meta.url).href,
  },
  
]);

// Dataset 数据
const datasetData = ref([
  {
    title: "PGG.Han 1.0 (Microarray Data)",
    description: "The Han Chinese Genomes Database (PGG.Han) serves as the central repository of the genomic data of the Han Chinese Genomes Project (Phase I). As is its current version, PGG.Han archives genomic data of 114,783 Han Chinese individuals (a.k.a. Han100K), including high coverage WGS data (n = 319), low coverage WGS data (n = 11878), and high-density SNV data with 8,056,973 variants genotyped or partially imputed (n = 102,586)(more). PGG.Han aims to facilitate: 1) population structure analysis; 2) ancestry inference; 3) imputation; 4) GWAS. Computational tools are implemented into the PGG.Han, and an online user interface is provided for data analysis and results visualization (more).",
    articleLink: "https://doi.org/10.1093/nar/gkz829",
    databaseLink: "https://www.biosino.org/pgghan/index",
    image: new URL('@/assets/images/pgghan1.png', import.meta.url).href,
  },
  {
    title: "PGG.Han 2.0 (NGS Data)",
    description: "The Han Chinese Genomes Database (PGG.Han 2.0) serves as the central repository of the genomic data of the Han Chinese Genomes Project (Phase II). As is its current version, PGG.Han 2.0 archives genomic data of 137,012 Han Chinese individuals (a.k.a. Han100K), including high coverage WGS data (n = 17,546), low coverage WGS data (n = 11,878), high coverage WES data (n = 5,002) and genotyping or partially imputed data (n = 102,586)(more). Totally 324,214,115 variants are deposited, which are more than ~40-folds of that in the old version PGG.Han 1.0. PGG.Han 2.0 includes the largest available high coverage sequencing data of the Han Chinese to meaningfully facilitate: 1) variant query; 2) imputation; 3) GWAS. Computational tools are improved in PGG.Han 2.0, and an online user interface is provided for variant query , data analysis and results visualization (more).",
    articleLink: "https://doi.org/10.1093/nar/gkz829",
    databaseLink: "https://www.biosino.org/pgghan2/index",
    image: new URL('@/assets/images/pgghan2.png', import.meta.url).href,
  },
]);
</script>

<style scoped>

.population-dataset-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 90%; /* 调整为自适应宽度 */
  max-width: 1200px;
  margin: 0px auto; /* 页面居中显示，增加呼吸感 */
  background: linear-gradient(to bottom, #f8f9fb, #ffffff); /* 高级感渐变背景 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* 页面整体阴影 */
}

.dynamic-stats {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px; /* 增加间隔 */
  align-items: center; /* 垂直居中 */
}

.stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  padding: 10px;
  border-radius: 12px;
  background: linear-gradient(145deg, #ffffff, #f0f0f3); /* 轻微的凹凸感 */
  box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7); /* Neumorphism风格 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat:hover {
  transform: translateY(-5px); /* 悬浮效果 */
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.15), -10px -10px 20px rgba(255, 255, 255, 0.8); /* 加强悬浮阴影 */
}

.number {
  font-size: 32px;
  font-weight: 700;
  color: #16a085; /* 深色文字对比 */
  margin-bottom: 5px;
}

.label {
  font-size: 16px;
  font-weight: 500;
  color: #7f8c8d; /* 次要信息颜色 */
  text-transform: uppercase; /* 全部大写，增加识别性 */
  letter-spacing: 1px; /* 增加字母间距 */
}

.header-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 深色背景 */
  color: white;
  border-radius: 15px;
  margin-bottom: 20px; /* 标题与内容框的重叠效果 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
.population-icon1{
  border:black;
  font-size: 36px;
}

.navigation-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background: linear-gradient(to right, #3a6073, #16222a);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* 强化层次感 */
}

.navigation-item {
  font-size: 18px;
  font-weight: bold;
  color: #ecf0f1; /* 默认字体颜色 */
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 8px; /* 边框圆角 */
  cursor: pointer;
  margin: 0 30px; /* 间距 */
  background-color: transparent; /* 透明背景 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2);  /* 渐变高亮效果 */
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.navigation-item.active {
  background: linear-gradient(to right, #1abc9c, #16a085); /* 激活状态 */
  color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transform: scale(1.1);
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  display: flex;
  flex-wrap: wrap; /* 适配移动端 */
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px); /* 卡片悬浮效果 */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); /* 阴影加强 */
}

.card-left {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-left h2 {
  font-size: 22px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}

.card-left p {
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 20px;
}

.links a {
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
  color: #1abc9c;
  margin-right: 15px;
  transition: color 0.3s ease;
}

.links a:hover {
  color: #16a085;
}

.card-right {
  padding: 10px;
  flex-shrink: 0;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, #f8f9fb, #ffffff); /* 卡片图片背景 */
}

.card-right img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}
.image-wrapper {
  width: 100%;
  aspect-ratio: 14 / 16; /* 或用 1 / 1 设置为正方形 */
  overflow: hidden;
  border-radius: 8px; /* 可选：圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 可选：美观阴影 */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键！实现裁剪效果 */
  display: block;
}
</style>

