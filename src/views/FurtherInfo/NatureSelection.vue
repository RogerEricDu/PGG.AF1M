<template>
  <div>
    <div class="method-selection">
      <strong style="font-size: 15px; margin-right: 20px;">Method:</strong>
      <el-select v-model="methods" placeholder="Select a method" style="width: 180px;" @change="handleMethodChange">
        <el-option label="FST" value="fst" />
        <el-option label="iHS" value="ihs" />
        <el-option label="Tajima's D" value="tajimasD" />
      </el-select>
    </div>

    <div class="selection-row">
      <strong style="font-size: 15px; margin-right: 20px;">Region:</strong>
      <el-input v-model="region" readonly style="width: 120px; margin-right: 20px;" disabled />
      
      <strong v-if="showPopulationSelect" style="font-size: 15px; margin-right: 20px;">Population:</strong>
      <el-select v-if="showPopulationSelect" v-model="selectedPopulation" placeholder="Select a population" style="width: 180px;">
        <el-option label="Population 1" value="pop1" />
        <el-option label="Population 2" value="pop2" />
        <el-option label="Population 3" value="pop3" />
      </el-select>
    </div>

    <div class="variant-effect-container">
      <div class="table-wrapper">
        <el-table v-if="showTable" :data="tableData" class="styled-table" border style="width: 1150px;">
          <el-table-column prop="chr" label="Chr" width="55"></el-table-column>
          <el-table-column prop="start" label="start" width="100"></el-table-column>
          <el-table-column prop="end" label="end" width="100"></el-table-column>
          <el-table-column prop="#sequence" label="#sequence" width="120"></el-table-column>
          <el-table-column prop="#marker" label="#marker" width="120"></el-table-column>
          <el-table-column prop="#singleton" label="#singleton" width="120"></el-table-column>
          <el-table-column prop="ThetaPI" label="ThetaPI" width="120"></el-table-column>
          <el-table-column prop="ThetaK" label="ThetaK" width="120"></el-table-column>
          <el-table-column prop="#segregating" label="#segregating" width="150"></el-table-column>
          <el-table-column prop="Ffuli" label="Ffuli" width="120"></el-table-column>
          <el-table-column prop="Dfuli" label="Dfuli" width="120"></el-table-column>
          <el-table-column prop="Dtajima" label="Dtajima" width="120"></el-table-column>
          <el-table-column prop="Dtajima_P" label="Dtajima_P" width="120"></el-table-column>
          <el-table-column prop="Dtajima_adj.P" label="Dtajima_adj.P" width="150"></el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const region = ref('');
    const selectedPopulation = ref('Population 1');
    const methods = ref('fst');
    const showPopulationSelect = ref(true);
    const showRegionInput = ref(true);
    const showTable = ref(false);
    const tableData = ref([]);

    // Extract URL parameters on component mount
    onMounted(() => {
      const chr = route.query.chr;
      const position = route.query.position;
      region.value = `${chr}:${position}`;
    });

    const handleMethodChange = (value) => {
      showPopulationSelect.value = value !== 'ihs';
      showRegionInput.value = value !== 'tajimasD';
      showTable.value = value === 'tajimasD';
      
      // Reset selected population when switching methods
      if (value !== 'ihs') {
        selectedPopulation.value = '';
      }
    };

    return {
      region,
      selectedPopulation,
      methods,
      showPopulationSelect,
      showRegionInput,
      showTable,
      tableData,
      handleMethodChange
    };
  },
};
</script>

  
<style scoped>
.method-selection {
  margin-left: 20px;
  margin-bottom: 10px;
}

.method-options label {
  margin-right: 15px; /* Space between radio buttons */
}

.selection-row {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
}

.selection-row label {
  margin-right: 10px;
}

.variant-effect-container {
padding: 20px;
}

.table-wrapper {
  border: 1px solid #ccc; /* 外边框 */
  border-radius: 8px;
  overflow: hidden;
}

.styled-table ::v-deep .el-table__cell {
  border-right: 1px solid #ddd; /* 列分隔线 */
  border-bottom: 1px solid #ddd; /* 行分隔线 */
  text-align: center; /* 表格内容居中 */
  font-size: 14px;
}

/* 去掉最后一行和最后一列的多余边框 */
.styled-table ::v-deep .el-table__row:last-child .el-table__cell {
  border-bottom: none;
}
.styled-table ::v-deep .el-table__cell:last-child {
  border-right: none;
}

/* 表头样式 */
.styled-table ::v-deep .el-table__header-wrapper th {
  background-color: #f8f4f4; /* 背景淡灰色 */
  color: black; /* 字体黑色 */
  text-align: center;
  font-weight: bold;
}

</style>

  