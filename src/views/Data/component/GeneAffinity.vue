<template>
    <div class="GeneticAffinity-container">
        <div class="GeneticAffinity-title">
            <h3 style="font-size: 24px; margin-bottom: 20px; color: #6e9197; flex: 1;">| Genetic Affinity</h3>
            <p style="flex: 1; text-align: right;">Click on the map to display genetic affinity of the area.</p>
        </div>
            <!-- 第一个板块 -->
            <div class="section-container">
            <div class="section-title">Genetic Affinity of Shanghai</div>
            <div class="section-content">
                <!-- 左边地图 -->
                <img :src="shanghaiMapUrl" alt="Shanghai Map" class="map-image">
                <!-- 右边柱状图 -->
                <img :src="shanghaiBarChartUrl" alt="Shanghai Bar Chart" class="bar-chart">
            </div>
            </div>

            <!-- 分割线 -->
            <hr class="divider">

            <!-- 第二个板块 -->
            <div class="section-container">
            <div class="section-title">Genetic Affinity of SouthEast Han</div>
            <div class="section-content">
                <!-- 左边地图 -->
                <img :src="beijingMapUrl" alt="SouthEast Han Map" class="map-image">
                <!-- 右边柱状图 -->
                <img :src="beijingBarChartUrl" alt="SouthEast Han Bar Chart" class="bar-chart">
            </div>
            </div>
    </div>
</template>


<style>
.GeneticAffinity-container {
  display: block;
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

.map-image {
  width: 200px; /* 根据需要调整地图图片的大小 */
}

.bar-chart {
  width: 200px; /* 根据需要调整柱状图的大小 */
}

.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
}
</style>