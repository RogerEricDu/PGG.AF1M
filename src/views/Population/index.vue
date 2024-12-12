<template>
  <div class="population-dataset-page">
    <!-- 顶部导航选项框 -->
    <div class="navigation-container">
      <button 
        class="navigation-item" 
        :class="{ active: currentTab === 'Population' }" 
        @click="currentTab = 'Population'"
      >
        Population
      </button>
      <button 
        class="navigation-item" 
        :class="{ active: currentTab === 'Dataset' }" 
        @click="currentTab = 'Dataset'"
      >
        Dataset
      </button>
    </div>

    <!-- 内容展示 -->
    <div class="content-container">
      <div v-if="currentTab === 'Population'" class="tab-content">
        <div v-for="(item, index) in populationData" :key="index" class="card">
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

      <div v-if="currentTab === 'Dataset'" class="tab-content">
        <div v-for="(item, index) in datasetData" :key="index" class="card">
          <div class="card-left">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <div class="links">
              <a :href="item.articleLink" target="_blank">Article</a>
              <a :href="item.databaseLink" target="_blank">Go to dataset →</a>
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
import { ref } from 'vue';

const currentTab = ref('Population'); // 当前选中的标签

// Population 数据
const populationData = ref([
  {
    title: "PGG.MHC",
    description: "Toward understanding the diversity of major histocompatibility complexes in human populations.",
    articleLink: "#",
    databaseLink: "#",
    image: "/path/to/pgg-mhc-image.png",
  },
  {
    title: "PGG.SV",
    description: "A structural variation (SV) database containing 520,525 SVs from 6,263 genomes worldwide.",
    articleLink: "#",
    databaseLink: "#",
    image: "/path/to/pgg-sv-image.png",
  },
]);

// Dataset 数据
const datasetData = ref([
  {
    title: "Dataset 1",
    description: "Description for dataset 1.",
    articleLink: "#",
    databaseLink: "#",
    image: "/path/to/dataset-1-image.png",
  },
  {
    title: "Dataset 2",
    description: "Description for dataset 2.",
    articleLink: "#",
    databaseLink: "#",
    image: "/path/to/dataset-2-image.png",
  },
]);
</script>

<style scoped>
.population-dataset-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}

.navigation-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background: linear-gradient(to right, #3a6073, #16222a); /* 渐变背景色 */
  border-radius: 10px; /* 边框圆角 */
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.navigation-item {
  font-size: 18px;
  font-weight: bold;
  color: #ecf0f1; /* 默认字体颜色 */
  text-align: center;
  padding: 15px 20px;
  margin: 0 20px; /* 标签之间的间距 */
  border-radius: 8px; /* 边框圆角 */
  cursor: pointer;
  background-color: transparent; /* 初始透明背景 */
  transition: all 0.3s ease; /* 添加过渡效果 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 初始阴影效果 */
}

.navigation-item:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 悬浮透明白色背景 */
  transform: scale(1.05); /* 缩放效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 放大阴影 */
}

.navigation-item.active {
  background-color: #1abc9c; /* 激活状态的背景色 */
  color: #ffffff; /* 激活状态的字体颜色 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* 激活状态深色阴影 */
  transform: scale(1.1); /* 激活状态放大 */
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.card-left {
  flex: 1;
  padding: 20px;
}

.card-right {
  flex-shrink: 0;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-right img {
  max-width: 100%;
  height: auto;
}
</style>

