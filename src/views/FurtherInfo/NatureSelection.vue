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
        <el-option label="HAN vs TIB" value="pop1" />
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
    <!-- FST chart -->
    <div class="chart-container" v-if="methods === 'fst'" style="width: 100%; height: 100%;">
      <div id="fstChart" style="width: 1100px; height: 400px;"></div>
    </div>
    <!-- ihs chart -->
    <div class="chart-container" v-if="methods === 'ihs'" style="width: 100%; height: 100%;">
      <div id="ihsChart" style="width: 1100px; height: 400px;"></div>
    </div>

  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';
import { defineProps } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const chr = ref('');
    const position = ref();

    // 明确声明props
    const props = defineProps({
      chromosome: {
        type: String,
        default: ''
      },
      position: {
        type: Number,
        default: 0
      }
    });
    
    const region = computed(() => {
      const start = Math.max(0, position.value - 20000);
      const end = position.value + 20000;
      return `${chr.value}:${start}-${end}`;
    });
    
    const selectedPopulation = ref('');
    const methods = ref('fst');
    const showPopulationSelect = ref(true);
    const showTable = ref(false);
    const tableData = ref([]);
    const chartInstanceFst = ref(null); // ECharts instance for FST
    const chartInstanceIhs = ref(null); // ECharts instance for iHS

    const handleMethodChange = (value) => {
      showPopulationSelect.value = value !== 'ihs' && value !== 'tajimasD';
      showTable.value = value === 'tajimasD';

      if (value !== 'ihs') {
        selectedPopulation.value = '';
      }

      // Initialize the appropriate chart when the method changes
      if (value === 'fst') {
        initFstChart(); // Initialize the FST chart
      } else if (value === 'ihs') {
        initIhsChart(); // Initialize the iHS chart
      }
    };

    const initFstChart = () => {
      nextTick(() => {
        const chartDom = document.getElementById('fstChart');
        chartInstanceFst.value = echarts.init(chartDom);
        updateFstChart(); // Initialize the chart with data
      });
    };

    const updateFstChart = () => {
      if (!chartInstanceFst.value) return;

      const chartPosition = [10000, 21223, 33222, 2300, 12342]; // Example positions
      const fstValue = [0.07, 0.28, 0.23, 0.43, 0.10];// Example FST values

      if (chartPosition.length === fstValue.length && chartPosition.length > 0) {
        const data = chartPosition.map((pos, index) => [pos, fstValue[index]]);

        const [start, end] = region.value.split(/[:-]/).slice(1).map(Number);
      
        const option = {
          xAxis: {
            type: 'value',
            name: 'Position',
            min: start, // 动态起点
            max: end,   // 动态终点
          },
          yAxis: {
            type: 'value',
            name: 'FST Value',
          },
          series: [
            {
              symbolSize: 10,
              data: data,
              type: 'scatter',
            },
          ],
        };

        chartInstanceFst.value.setOption(option);
      } else {
        console.error('Data length mismatch or empty data', chartPosition, fstValue);
      }
    };

    const initIhsChart = () => {
      nextTick(() => {
        const chartDom = document.getElementById('ihsChart');
        chartInstanceIhs.value = echarts.init(chartDom);
        updateIhsChart(); // Initialize the chart with data
      });
    };

    const updateIhsChart = () => {
      if (!chartInstanceIhs.value) return;

      const chartPosition = [10000, 11000, 12000, 13000, 14000]; // Example positions for iHS
      const ihsValue = [-0.2, -0.1, 0, 0.1, 0.2]; // Example iHS values

      if (chartPosition.length === ihsValue.length && chartPosition.length > 0) {
        const data = chartPosition.map((pos, index) => [pos, ihsValue[index]]);
      
        const [start, end] = region.value.split(/[:-]/).slice(1).map(Number);

        const option = {
          xAxis: {
            type: 'value',
            name: 'Position',
            min: start, // 动态起点
            max: end,   // 动态终点
          },
          yAxis: {
            type: 'value',
            name: 'iHS Value',
          },
          series: [
            {
              symbolSize: 10,
              data: data,
              type: 'scatter',
            },
          ],
        };

        chartInstanceIhs.value.setOption(option);
      } else {
        console.error('Data length mismatch or empty data', chartPosition, ihsValue);
      }
    };

    return {
      region,
      selectedPopulation,
      methods,
      showPopulationSelect,
      showTable,
      tableData,
      handleMethodChange,
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

  