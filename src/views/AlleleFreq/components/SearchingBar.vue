<script>
export default {
  data() {
    return {
      searchType: '',
      selectedChr: '',
      input: '',
      region: '',
      province: '',
      chromosomes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', 'X', 'Y'], // Chromosomes list
    };
  },
  methods: {
    handleSubmit() {
      // 提交搜索内容
      console.log({
        searchType: this.searchType,
        selectedChr: this.selectedChr,
        input: this.input,
        region: this.region,
        province: this.province,
      });
    },
  },
};
</script>

<template>
  <div class="page-container">
    <el-card class="search-card">
      <div class="searching-container">
        <!-- 选择搜索类型 -->
        <el-form inline>
          <el-form-item label="Section">
            <el-select v-model="searchType" placeholder="Select Section" style="width: 220px;">
              <el-option label="All Individuals" value="individuals"></el-option>
              <el-option label="By Region" value="region"></el-option>
              <el-option label="By Province" value="province"></el-option>
            </el-select>
          </el-form-item>

          <!-- 选择染色体 -->
          <el-form-item label="Chromosome">
            <el-select v-model="selectedChr" placeholder="Select Chromosome" style="width: 220px;">
              <el-option v-for="chr in chromosomes" :key="chr" :label="chr" :value="chr"></el-option>
            </el-select>
          </el-form-item>

          <!-- 输入 Variant 或 rsID -->
          <el-form-item label="Variant / rsID">
            <el-input v-model="input" style="width: 400px;" placeholder="Enter Variant or rsID"></el-input>
          </el-form-item>

          <!-- 如果选择了 Region，显示 Region 输入框 -->
          <el-form-item v-if="searchType === 'region'" label="Region">
            <el-input v-model="region" style="width: 220px;" placeholder="Enter Region"></el-input>
          </el-form-item>

          <!-- 如果选择了 Province，显示 Province 输入框 -->
          <el-form-item v-if="searchType === 'province'" label="Province">
            <el-input v-model="province" style="width: 300px;" placeholder="Enter Province"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 提交按钮 -->
      <div class="button-container">
        <el-button type="primary" class="submit-button" @click="handleSubmit">
          <strong>Search</strong>
        </el-button>
      </div>
    </el-card>

    <!-- 信息卡片 -->
    <el-card class="info-card">
      <p class="info-title">e.g. Variants: 1:11847591; rsID: rs5063;</p>
      <p>
        The BiG Database for Han Population (BiG.Data) is a resource developed by the Human Population Omics Group. It aims to use computational approaches to dissect genetic architecture, quantitatively characterize diversity, and reveal demographic history.
      </p>
      <p>
        The dataset spans 257,519,942 SNPs and 20,000+ whole-genome sequences from 11 modern Han population datasets. Data contributors and project details can be found <a href="/about">here</a>.
      </p>
      <p>
        Both chromosome numbers with physical location and rsIDs are supported for variant search. Detailed SNV information is accessible and visualizable through this platform.
      </p>
    </el-card>
  </div>
</template>

<style scoped>
.page-container {
  padding: 20px;
}
.page-title {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #2c3e50;
}
.search-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  background: white;
}
.info-card {
  max-width: 900px;
  margin: 10px auto;
  padding: 10px;
  border-radius: 12px;
  background: white;
  color: #34495e;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.info-title {
  font-size: 16px;
  font-weight: bold;
  color: #27ae60;
  margin-bottom: 15px;
}
.searching-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}
.button-container {
  text-align: center;
  margin-top: 10px;
}
.submit-button {
  padding: 10px 40px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  background: linear-gradient(135deg, #5795ef, #3a6dd5);
  color: white;
  transition: all 0.3s ease;
}
.submit-button:hover {
  background: linear-gradient(135deg, #3a6dd5, #5795ef);
  transform: translateY(-3px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
}
a {
  color: #3498db;
  font-weight: bold;
  text-decoration: none;
}
a:hover {
  color: #2ecc71;
}
</style>
