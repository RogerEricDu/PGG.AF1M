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
  width: 90%; /* 调整为自适应宽度 */
  max-width: 1200px;
  margin: 20px auto; /* 页面居中显示，增加呼吸感 */
  background: linear-gradient(to bottom, #f8f9fb, #ffffff); /* 高级感渐变背景 */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1); /* 页面整体阴影 */
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
  color: #ecf0f1;
  text-align: center;
  padding: 15px 30px;
  margin: 0 50px; /* 增加标签间距 */
  border-radius: 15px;
  cursor: pointer;
  background-color: transparent;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navigation-item:hover {
  background: linear-gradient(to right, #1abc9c, #16a085); /* 渐变高亮效果 */
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

</style>

