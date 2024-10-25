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
      // 这里后面写提交搜索功能的接口，把search的内容post到对应的表单
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
    <h2 style="text-align: center;">Quick Start</h2>
    <div class="searching-container">
        <!-- 选择 Individuals, Region 或 Province -->
        <el-select v-model="searchType" placeholder="Select Search Type" style="width: 200px;">
        <el-option label="All Individuals" value="individuals"></el-option>
        <el-option label="By Region" value="region"></el-option>
        <el-option label="By Province" value="province"></el-option>
        </el-select>

        <!-- 选择染色体 -->
        <el-select v-model="selectedChr" placeholder="Select Chromosome" style="width: 200px; margin-left: 10px;">
        <el-option v-for="chr in chromosomes" :key="chr" :label="chr" :value="chr"></el-option>
        </el-select>

        <!-- 输入 Variant 或 rsID -->
        <el-input v-model="input" style="width: 400px; margin-left: 10px;" placeholder="Variant or rsID">
        </el-input>

        <!-- 如果选择了 Region，显示 Region 输入框 -->
        <el-input v-if="searchType === 'region'" v-model="region" style="width: 200px; margin-left: 10px;" placeholder="Region">
        </el-input>

        <!-- 如果选择了 Province，显示 Province 输入框 -->
        <el-input v-if="searchType === 'province'" v-model="province" style="width: 300px; margin-left: 10px;" placeholder="Province">
        </el-input>

        <!-- 提交按钮 -->
        <el-button type="primary" class="submit-button" @click="handleSubmit" style="margin-left: 10px;">
        <strong style="font-size: 18px;">Search</strong>
        </el-button>
    </div>

    <div class="data-context">
    <p style="font-size: 14px;color:yellowgreen;">e.g. &nbsp;&nbsp;Variants:1:11847591;rsID:rs5063;</p>
    <p>
        The BiG Database for Han Population (BiG.Data) is a resource developed by Human Population Omics Group, with the goal of using computational approaches and developing new methods to dissect genetic architecture of human populations, quantitatively characterize genetic & phenotypic diversity, and reveal their demographic history and adaptive divergence.
    </p>
    <p>
        The data set provided on this website spans 257,519,942 SNPs and 20,000+ whole-genome sequences from 11 different modern Han population datasets, sequenced as part of various disease-specific and population genetic studies. The BiG.Data Principal Investigators and team can be found <a href="/about">here</a>, and the groups that have contributed data to the current release are listed <a href="/about">here</a>.
    </p>
    <p>
        All data here are released for the benefit of the wider biomedical community, without restriction on use - see the terms of use. Sign up for our mailing list for future release announcements.
    </p>
</div>
</template>

<style scoped>
    .data-context{
        margin-top: 20px;
        text-indent: 50px;
        line-height: 1.5;
        font-size: 18px;
    }
    .searching-container{
        display: flex;
        justify-content: center;
    }
    a {
    color: #6e9197; /* 保持链接的默认颜色 */
    font-weight: bold;
    text-decoration: underline; /* 添加下划线 */
    }

    a:hover {
    color:seagreen; /* 鼠标悬停时的颜色 */
    }
    a::after {
    font-weight: bold; /* 加粗显示 */
    text-decoration: underline; /* 添加下划线 */
    }

    .input-container{
        display: flex;
        justify-content: center;
    }

</style>