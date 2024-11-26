<template>
  <div>
    <div class="method-selection">
      <strong style="font-size: 15px; margin-right: 20px;">Method:</strong>
      <el-select v-model="methods" placeholder="Select a method" style="width: 180px;" @change="handleMethodChange">
        <el-option label="heterozy" value="heterozy" />
        <el-option label="pairDiff" value="pairDiff" />
        <el-option label="haplo" value="haplo" />
        <el-option label="nucloeo" value="nucloeo" />
      </el-select>
    </div>

    <div class="selection-row">
      <strong style="font-size: 15px; margin-right: 20px;">Region:</strong>
      <el-input v-model="region" readonly style="width: 180px; margin-right: 20px;" disabled />

      <strong style="font-size: 15px; margin-right: 20px;">Window:</strong>
      <el-select v-model="windowSize" placeholder="Select size" style="width: 180px;">
        <el-option label="20k" value="20k" />
        <el-option label="50k" value="50k" />
        <el-option label="100k" value="100k" />
      </el-select>

      <strong v-if="showLengthSelect" style="font-size: 15px; margin-left: 20px; margin-right: 20px;">Length:</strong>
      <el-select v-if="showLengthSelect" v-model="lengthSize" placeholder="Select a Length" style="width: 180px;">
        <el-option label="10k" value="10k" />
        <el-option label="20k" value="20k" />
        <el-option label="50k" value="50k" />
      </el-select>
    </div>

    <!-- heterozy chart -->
    <div class="chart-container" v-if="methods === 'heterozy'" style="width: 100%; height: 100%;">
      <div id="heterozyChart" style="width: 1100px; height: 400px;"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';

export default {
  setup() {
    const route = useRoute();
    const chr = ref('');
    const position = ref(0);
    const region = computed(() => {
      const start = Math.max(0, position.value - 20000);
      const end = position.value + 20000;
      return `${chr.value}:${start}-${end}`;
    });

    const windowSize = ref('20k');
    const lengthSize = ref('10k');
    const methods = ref('heterozy');
    const showLengthSelect = ref(false);
    const chartInstanceHeterozy = ref(null);

    onMounted(() => {
      chr.value = route.query.chr || '';
      position.value = parseInt(route.query.position) || 0;
      initHeterozyChart();
    });

    const handleMethodChange = (value) => {
      showLengthSelect.value = value !== 'heterozy';
    };

    const initHeterozyChart = () => {
      nextTick(() => {
        const chartDom = document.getElementById('heterozyChart');
        console.log(chartDom); // Add this to check if chartDom is null
        if (chartDom) {
          chartInstanceHeterozy.value = echarts.init(chartDom);
          updateHeterozyChart();
        } else {
          console.error("Chart DOM element not found.");
        }
      });
    };

    const updateHeterozyChart = () => {
      if (!chartInstanceHeterozy.value) {
        console.error("Chart instance not initialized");
        return;
      }

      const chartPosition = [10000, 21223, 33222, 2300, 12342];
      const heterozyValue = [0.07, 0.28, 0.23, 0.43, 0.10];

      if (chartPosition.length === heterozyValue.length && chartPosition.length > 0) {
        console.log("Updating chart with data:", chartPosition, heterozyValue); // Debugging line
        const data = chartPosition.map((pos, index) => [pos, heterozyValue[index]]);
      
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
            name: 'Heterozy Value',
          },
          series: [
            {
              symbolSize: 10,
              data: data,
              type: 'scatter',
            },
          ],
        };

        chartInstanceHeterozy.value.setOption(option);
      } else {
        console.error("Data length mismatch or empty data", chartPosition, heterozyValue);
      }
    };

    watch(() => methods.value, (newMethod) => {
      if (newMethod === 'heterozy') {
        initHeterozyChart();
      }
    });

    return {
      region,
      windowSize,
      lengthSize,
      methods,
      showLengthSelect,
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
</style>
      