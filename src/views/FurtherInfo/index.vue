<template>
  <div class="further-info-container">
    <!-- 基本信息的展示 -->
    <div class="info-box">
      <div class="info-header">
        <h3 style="font-size: 24px; margin-bottom: 20px;">| Variant: {{ variant }}</h3>
        <el-button type="success" @click="goBack" class="go-back-button">⬅ Go Back</el-button>
      </div>
      <div class="info-content">
        <div class="info-row">
          <p><strong>rsID:</strong> {{ rsID }}</p>
          <p><strong>Chr:</strong> {{ chr }}</p>
          <p><strong>Position:</strong> {{ position }}</p>
        </div>
        <div class="info-row">
          <p><strong>Ref:</strong> {{ refAllele }}</p>
          <p><strong>Alt:</strong> {{ alt }}</p>
          <p><strong>Allele Frequency:</strong> {{ alleleFrequency }}</p>
        </div>
        <div class="info-row">
          <p><strong>Variation Class:</strong> {{ variationClass }}</p>
          <p><strong>Ref. Allele Frequency:</strong> {{ refAlleleFrequency }}</p>
          <p><strong>Alt. Allele Frequency:</strong> {{ altAlleleFrequency }}</p>
        </div>
        <div class="info-row">
          <p><strong>dbSNP:</strong> {{ dbSNP }}</p>
          <p><strong>PGG.SNV:</strong> {{ pggSNV }}</p>
          <p><strong>gnomAD:</strong> {{ gnomAD }}</p>
        </div>
      </div>
    </div>

    <!-- 标签页展示功能 -->
    <div class="chart-tabs">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="custom-tabs">
        <el-tab-pane name="tab1">
          <template #label>
            <span>Provincial<br/>Population</span> <!-- 使用 <br/> 标签换行 -->
          </template>
          <div class="provincial-population-title">
            <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Provincial Population -</h3>
            <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p>
          </div>
          <ProvincialPopulation />
        </el-tab-pane>

        <el-tab-pane name="tab2">
          <template #label>
            <span>Genetic<br/>Subgroups</span> 
          </template>
          <div class="genetic-subgroups-title">
            <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Genetic Subgroups -</h3>
            <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p>
          </div>
          <GeneticSubgroups />
        </el-tab-pane>

        <el-tab-pane name="tab3">
          <template #label>
            <span>Variant<br/>Browser</span> 
          </template>
          <div class="Variant-Browser-title">
            <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Variant Browser -</h3>
            <!-- <p style="flex: 1; text-align: right;">Click on the map to display population structure of the area.</p> -->
          </div>
          <VariantBrowser />
        </el-tab-pane>

        <el-tab-pane name="tab4">
          <template #label>
            <span>Variant<br/>Effect</span> 
          </template>
          <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Variant Effect -</h3>
          <VariantEffect />
        </el-tab-pane>

        <el-tab-pane name="tab5">
          <template #label>
            <span>Nature<br/>Selection</span> 
          </template>
          <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Nature Selection -</h3>
          <NatureSelection />
        </el-tab-pane>

        <el-tab-pane name="tab6">
          <template #label>
            <span>Genome<br/>Diversity</span> 
          </template>
          <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Genome Diversity -</h3>
          <GenomeDiversity />
        </el-tab-pane>

        <el-tab-pane name="tab7">
          <template #label>
            <span>Linkage<br/>Disequilibrium</span> 
          </template>
          <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Linkage Disequilibrium -</h3>
          <LinkageDisequilibrium />
        </el-tab-pane>
        
        <el-tab-pane name="tab8">
          <template #label>
            <span>Haplotype<br/>Structure</span> 
          </template>
          <h3 style="font-size: 18px; margin-bottom: 20px; color: #6e9197; flex: 1;">- Haplotype Structure -</h3>
          <HaplotypeStructure />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProvincialPopulation from './ProvincialPopulation.vue';
import GeneticSubgroups from './GeneticSubgroups.vue';
import VariantBrowser from './VariantBrowser.vue';
import VariantEffect from './VariantEffect.vue';
import NatureSelection from './NatureSelection.vue';
import GenomeDiversity from './GenomeDiversity.vue';
import LinkageDisequilibrium from './LinkageDisequilibrium.vue';
import HaplotypeStructure from './HaplotypeStructure.vue';

const route = useRoute();
const router = useRouter(); // 获取路由实例

// 定义接收的参数变量
const variant = ref('');
const chr = ref('');
const position = ref('');
const refAllele = ref('');
const alt = ref('');
const alleleFrequency = ref('');
const region = ref('');
const province = ref('');

//这些变量后面要post到后端在读取
const rsID = ref('')
const variationClass = ref('');
const refAlleleFrequency = ref('');
const altAlleleFrequency = ref('');
const dbSNP = ref('');
const pggSNV = ref('');
const gnomAD = ref('');


const activeTab = ref('tab1'); // 默认激活的标签页

// 提取 URL 中的查询参数
onMounted(() => {
  variant.value = route.query.variant as string;
  chr.value = route.query.chr as string;
  position.value = route.query.position as string;
  refAllele.value = route.query.ref as string;
  alt.value = route.query.alt as string;
  alleleFrequency.value = route.query.alleleFrequency as string;
  region.value = route.query.region as string;
  province.value = route.query.province as string;
});

// 切换标签页的回调函数
const handleTabClick = (tab) => {
  activeTab.value = tab.name;
  console.log('当前标签页:', tab.name);
};

// 点击返回按钮的处理函数
const goBack = () => {
  if (region.value) {
    router.push('/allelefreq/by_region');
  } else if (province.value) {
    router.push('/allelefreq/by_province');
  } else {
    router.push('/allelefreq/all_ind');
  }
};
</script>

<style scoped>
.further-info-container {
  width: 1200px;
  margin: 0 auto;
  user-select: text;
}

.info-box {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.chart-tabs {
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.info-header {
  display: flex;
  justify-content: space-between; /* 使内容两端对齐 */
  align-items: center; /* 垂直居中 */
}
.go-back-button {
  margin-left: auto; /* 将按钮推到右侧 */
}
/* el-tabs等组件库的结构复杂，
内部组件无法直接被scoped样式作用到。
::v-deep深度选择器的作用是打破这种限制，
让开发者可以在scoped模式下仍然为嵌套的子组件
或第三方组件内部的元素添加样式。 */
.custom-tabs ::v-deep .el-tabs__item {
  width: 125px;
  height: 50px;
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  padding: 15px 0; /* 减少左右 padding 保持一致 */
  margin: 0 10px; /* 设置左右间距，以实现20px的总间距 */
  border-radius: 5px;
  cursor: pointer;
  flex: 1; /* 确保每个标签项均分宽度 */
  background-color: #ecf0f1;
  transition: background-color 0.3s, color 0.3s;
}

.custom-tabs ::v-deep .el-tabs__item:hover {
  background-color: #bdc3c7;
}

.custom-tabs ::v-deep .el-tabs__item.is-active {
  background-color: #95a5a6;
  color: white;
}

/* 调整活动下划线宽度，使其在标签中心 */
.custom-tabs ::v-deep .el-tabs__active-bar {
  margin: 0 auto; /* 中心对齐 */
  width: calc(100% / 3); /* 让下划线与标签宽度对齐 */
  background-color: #95a5a6;
}

.info-box {
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.info-row p {
  flex: 1;
  margin: 0;
  padding: 0;
}

.provincial-population-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.genetic-subgroups-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

</style>
