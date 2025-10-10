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
              <a v-if="item.articleLink" :href="item.articleLink" target="_blank">Wikipedia.</a>
              <a v-if="item.databaseLink" :href="item.databaseLink" target="_blank">Search in PGG.population.</a>
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
  fetch('/pggaf1m/map/china.json')
    .then(response => response.json())
    .then(chinaJson => {
      if (!chinaJson || !chinaJson.features) {
      console.error('Invalid China JSON format');
      return;
    }
      echarts.registerMap('China', chinaJson);

      const data = [
        { name: 'Beijing', value: 3 },
        { name: 'Tianjin', value: 1 },
        { name: 'Shanghai', value: 49 },
        { name: 'Chongqing', value: 0 },
        { name: 'Hebei', value: 0 },
        { name: 'Henan', value: 1 },
        { name: 'Yunnan', value: 2 },
        { name: 'Liaoning', value: 1 },
        { name: 'Heilongjiang', value: 0 },
        { name: 'Hunan', value: 0 },
        { name: 'Anhui', value: 0 },
        { name: 'Shandong', value: 0 },
        { name: 'Xinjiang', value: 1 },
        { name: 'Jiangsu', value: 1 },
        { name: 'Zhejiang', value: 3 },
        { name: 'Jiangxi', value: 0 },
        { name: 'Hubei', value: 3 },
        { name: 'Guangxi', value: 0 },
        { name: 'Gansu', value: 0 },
        { name: 'Shanxi', value: 0 },
        { name: 'Inner Mongolia', value: 0 },
        { name: 'Shaanxi', value: 0 },
        { name: 'Jilin', value: 1 },
        { name: 'Fujian', value: 6 },
        { name: 'Guizhou', value: 0 },
        { name: 'Guangdong', value: 0 },
        { name: 'Qinghai', value: 0 },
        { name: 'Xizang', value: 0 },
        { name: 'Sichuan', value: 0 },
        { name: 'Ningxia', value: 0 },
        { name: 'Hainan', value: 0 },
        { name: 'Taiwan', value: 0 },
        { name: 'Hongkong', value: 0 },
        { name: 'Macau', value: 0 }
      ];
      data.sort((a, b) => a.value - b.value);

      const mapOption = {
        visualMap: {
          left: 'right',
          min: 0,
          max: 50,
          inRange: {
            color: [
              '#FFFFFF', // 淡蓝色（低值）
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
    description: "The Han Chinese, the world's largest ethnic group with over 1.4 billion people, are native to Greater China and constitute the majority population in both China (91.11%) and Taiwan (97%), as well as significant communities in Southeast Asia. Originating from the Huaxia people in the Yellow River region, the Han Chinese are the foundational contributors to Chinese civilization. Over centuries, they expanded southward through migrations during dynasties like the Qin and Han, assimilating other ethnic groups and establishing dominance in southern China's fertile regions by the Tang and Song periods. Today, their cultural and demographic influence remains central to China's identity.",
    articleLink: "https://en.wikipedia.org/wiki/Han_Chinese",
    databaseLink: "https://pog.fudan.edu.cn/population/population/Han?id=POP00076",
    image: new URL('@/assets/images/population/han.jpg', import.meta.url).href, // 动态导入
  },
  {
    title: "Tibetan",
    description: "Tibetans (Tibetan: བོད་པ་) are the indigenous people of the Qinghai-Tibet Plateau. In China, they are mainly distributed in the Tibet Autonomous Region, Qinghai Province, western Sichuan Province, Diqing, Yunnan, Gannan, Gansu and other regions. In addition, Tibetans are also distributed in India, Bhutan, the United States, Canada, Europe, Australia and other regions. Lhasa is a holy place in the hearts of Tibetans. Tibetans are one of the oldest ethnic groups in China and South Asia. Tibetans have their own language and writing. Tibetan language belongs to the Tibetan branch of the Tibeto-Burman language family of the Sino-Tibetan language family, and is divided into three dialects: Weizang, Kham and Amdo. Tibetans generally believe in Tibetan Buddhism. Buddhism was introduced to Tubo from Tianzhu in the seventh century AD and has a history of more than 1,400 years. The Tibetan people have created a splendid national culture and left extremely rich cultural heritage in literature, music, dance, painting, sculpture, architectural art and other aspects. Tibetan carving skills are superb. In addition, Tibetan opera is unique and Tibetan medicine is also an important heritage of mankind.",
    articleLink: "https://en.wikipedia.org/wiki/Tibetans",
    databaseLink: "https://pog.fudan.edu.cn/population/population/Tibetan?id=POP00001",
    image: new URL('@/assets/images/population/tibetan.jpg', import.meta.url).href,
  },
  {
    title: "Balti",
    description: "The Baltis are a Tibetic ethnic group who are native to the Pakistani-administered territory of Gilgit−Baltistan and the Indian-administered territory of Ladakh, predominantly in the Kargil district with smaller concentrations present in the Leh district. Outside of the Kashmir region, Baltis are scattered throughout Pakistan, with the majority of the diaspora inhabiting prominent urban centres such as Lahore, Karachi, Islamabad and Rawalpindi.",
    articleLink: "https://en.wikipedia.org/wiki/Balti_people",
    image: new URL('@/assets/images/population/balti.jpg', import.meta.url).href,
  },
  {
    title: "Deng",
    description: "The Mishmi people are an ethnic group of Tibet and Arunachal Pradesh, India. The area is known as the Mishmi Hills. Only one group, called the Deng, occupy Zayu County in southern Tibet. The Mishmi consist of four tribes: Idu Mishmi (Idu Lhoba); Digaro tribe (Taraon, Darang Deng), Miju Mishmi (Kaman Deng), and the Deng Mishmi. The four sub-divisions of the tribe emerged due to the geographical distribution, but racially all the four groups are of the same stock. The Idu are also known as Yidu Lhoba in Tibet and often referred as Chulikatas in Assam. The Idus are primarily concentrated in the Upper Dibang Valley and Lower Dibang Valley district and parts of the northern part of Lohit district of Arunachal Pradesh in India. Taraon, also called Digaru Mishmis, are distributed in the hill and the foothills between the Dibang, Digaru and the Lohit rivers. Kamans are also known as the Miju Mishmis; they live between the Lohit and the Kambang rivers in the foothills and in the Mishmi Hills on both sides of the Lohit river right up to the frontiers to Rima river. There are around 30,000 of them in Arunachal Pradesh.",
    articleLink: "https://zh.wikipedia.org/wiki/%E5%83%9C%E4%BA%BA",
    image: new URL('@/assets/images/population/deng.jpg', import.meta.url).href,
  },
  {
    title: "Gongbo",
    description: "QI Ting is a Research Associate Professor at the School of Life Sciences, Westlake University, China. She received her PhD in 2016 from Zhejiang University, China, before undertaking postdoctoral research at the Institute for Molecular Bioscience, The University of Queensland, Australia. Trained in statistical genetics, her research focuses on understanding the genetic basis of molecular phenotypes and their link to complex diseases, leveraging multi-omics data to discover gene targets for human diseases, and developing novel statistical methods and tools to disentangle the regulatory mechanisms underlying the diseases. To date, she has published 25 papers with 2497 citations, including six first-author papers in high-impact journals such as Nature Genetics and Nature Communications, as well as collaborative research papers in top journals such as Nature and Cancer Research. ",
    image: new URL('@/assets/images/population/gongbo.jpg', import.meta.url).href,
  },
  {
    title: "Lhoba",
    description: "The Lhoba people are an ethnic minority in China. The Lhoba people are mainly distributed in the Luoyu area between Chayu in the east and Menyu in the west. They are mainly engaged in agriculture and hunting. The Lhoba people have their own language, which basically uses Tibetan. The Lhoba language belongs to the Tibeto-Burman language family of the Sino-Tibetan language family. Most of the Lhoba people live in the mountains and valleys west of the great bend of the Yarlung Zangbo River. Until the mid-20th century, the Lhoba society was still in the late stage of primitive society, and it is still followed today. The Lhoba people continue their cultural traditions by relying on oral traditions passed down from generation to generation.",
    articleLink: "https://en.wikipedia.org/wiki/Lhoba_people",
    image: new URL('@/assets/images/population/lhoba.jpg', import.meta.url).href,
  },
  {
    title: "Wakhi",
    description: "The Wakhi people, also locally referred to as the Wokhik (وخیک), are an Iranian ethnic group native to Central and South Asia. They are found in Afghanistan, Tajikistan, Pakistan and China—primarily situated in and around Afghanistan's Wakhan Corridor, the northernmost part of Pakistan's Gilgit−Baltistan and Chitral, Tajikistan's Gorno−Badakhshan Autonomous Region and the southwestern areas of China's Xinjiang Uyghur Autonomous Region. The Wakhi people are native speakers of the Wakhi language, an Eastern Iranian language.Northern Pakistan, eastern Tajikistan, eastern Afghanistan, and western Xinjiang in China.",
    articleLink: "https://en.wikipedia.org/wiki/Wakhi_people",
    image: new URL('@/assets/images/population/wakhi.png', import.meta.url).href,
  },
  {
    title: "Sherpa",
    description: "The Sherpa people (Standard Tibetan: ཤར་པ།, romanized: shar pa) are one of the Tibetan ethnic groups native to the most mountainous regions of Nepal, India, and the Tibetan Autonomous Region of China. The majority of Sherpas live in the eastern regions of Nepal, namely the Solukhumbu (Khumbu and Pharak), Khatra, Kama, Rolwaling and Barun Valley. Although, some live north of Kathmandu, Nepal in the Bigu and Helambu regions. They can also be found in Tingri County, Bhutan, the Indian states of Sikkim, and northern portions of West Bengal, specifically the Darjeeling and Kalimpong districts. In these regions, Sherpas establish monasteries called gompas where they practice their local traditions. Tengboche was the first celibate monastery in Solu-Khumbu. The Sherpa language belongs to the southern branch of the Tibeto-Burman languages, mixed with Eastern Tibetan (Khams Tibetan) and central Tibetan dialects. However, this language is separate from Lhasa Tibetan and is unintelligible to Lhasa speakers. Sherpa migration has significantly increased in recent years, especially in the United States. New York City has the largest Sherpa community with a population of approximately 16,000 people. Contrastingly, the 2011 Nepal census recorded 512,946 Sherpas within its borders. Members of the Sherpa nation are known for their skills in mountaineering as a livelihood.",
    articleLink: "https://en.wikipedia.org/wiki/Sherpa_people",
    databaseLink: "https://pog.fudan.edu.cn/population/population/Sherpa?id=POP00002",
    image: new URL('@/assets/images/population/sherpa.jpg', import.meta.url).href,
  },
  {
    title: "Monba",
    description: "Leo Speidel is a Sir Henry Wellcome fellow at University College London, he develops statistical methods for reconstructing this history, scalable to the largest genomic datasets, which now comprise more than 100,000 individuals and record genetic diversity on an unprecedented scale. He is interested in uncovering how different evolutionary forces have shaped today’s observed genetic variation, from which we can learn about our shared evolutionary history and the impact of genetic variation on our health.",
    articleLink: "https://en.wikipedia.org/wiki/Monpa_people",
    image: new URL('@/assets/images/population/monba.jpg', import.meta.url).href,
  },
  {
    title: "Tajik",
    description: "The Tajik people (Persian: تاجیک‎, Tājīk; Tajik: Тоҷик), abbreviated as Tajiks, are divided into two groups: the lowland Tajiks and the highland Tajiks. The lowland Tajiks, who live in Tajikistan, Uzbekistan, and Afghanistan, number about 20 million. They belong to the Indo-European Ferghana brachycephalic type with some Turkic admixture and speak Tajik, a dialect of the Western Iranian branch of the Persian language (with many Turkic loanwords and mutual intelligibility with Persian). They are Sunni Muslims and have traditionally engaged in settled agriculture. The highland Tajiks, found in Afghanistan, Pakistani-administered Kashmir, eastern Tajikistan, and western Xinjiang in China (i.e., the Tajik ethnic group in China), belong to the Mediterranean type of the Caucasoid race. They mainly speak Pamir languages, a branch of Eastern Iranian, and most are Sunni Muslims, with some following Shia Islam, including the Twelver Shia or Ismaili sects. Historically, they have been engaged in highland nomadism and were often referred to as Sartas or Pamiris before the 20th century. Pamir languages and Tajik are not mutually intelligible.The majority of the Tajik ethnic group is located in Central Asia, primarily in Tajikistan, Uzbekistan, and other countries and regions. In China, the Tajik ethnic group mainly resides in the Tashkurgan Tajik Autonomous County in Xinjiang.",
    articleLink: "https://en.wikipedia.org/wiki/Tajiks",
    databaseLink: "https://pog.fudan.edu.cn/population/population/Chinese%20Tajiks?id=POP00179",
    image: new URL('@/assets/images/population/tajik.png', import.meta.url).href,
  },
  {
    title: "Kashmiri",
    description: "In Kashmir, rice and meat are staple foods, with Noon Chai (Sheer Chai) and Kahweh being popular beverages. Wazwan is a multi-course meal prepared by skilled chefs. Kashmir is also known for its baked goods, including Sheermal, Bagerkhayn (puff pastry), and Tsochwor (hard bread).India-controlled Kashmir, Pakistan-controlled Kashmir and the People's Republic of China administered areas of Aksai Chin, Kashgar Kunlun Mountains. ",
    articleLink: "https://en.wikipedia.org/wiki/Kashmir",
    databaseLink: "https://pog.fudan.edu.cn/population/population/Kashmiri%20Pandit?id=POP00310",
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
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
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

