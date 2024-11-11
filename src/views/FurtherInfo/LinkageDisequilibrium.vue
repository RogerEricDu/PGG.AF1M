<template>
<div>
    <div class="method-selection">
    <strong style="font-size: 15px; margin-right: 20px;">Method:</strong>
    <el-select v-model="methods" placeholder="Select a method" style="width: 180px;">
        <el-option label="D" value="D" />
        <el-option label="R2" value="R2" />
        <el-option label="Dprime" value="Dprime" />
    </el-select>
    </div>

    <div class="selection-row">
    <strong style="font-size: 15px; margin-right: 20px;">Region:</strong>
    <el-input v-model="region" readonly style="width: 180px;margin-right: 20px;" disabled />
    
    <strong style="font-size: 15px; margin-right: 20px;">Window:</strong>
    <el-select v-model="window" placeholder="Select size" style="width: 180px;">
        <el-option label="20k" value="20k" />
        <el-option label="50k" value="50k" />
        <el-option label="100k" value="100k" />
    </el-select>
    </div>

    <!-- Heatmap chart container -->
    <div id="ldHeatmap" class="heatmap-container"></div>
</div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue';
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
    const window = ref('20k');
    const methods = ref('D');
    const chartInstance = ref(null);

    // 模拟数据
    const heatmapData = ref([
    [0, 0, 0.8], [1, 1, 0.7], [2, 2, 0.6], [3, 3, 0.5],
    [0, 1, 0.6], [1, 2, 0.5], [2, 3, 0.4]
    ]);
    const xAxisLabels = ['11844019', '11844035', '11846093', '11850620'];
    const yAxisLabels = ['11850620', '11846093', '11844035', '11844019'];

    // Initialize the chart
    const initHeatmap = () => {
    nextTick(() => {
        const chartDom = document.getElementById('ldHeatmap');
        if (chartDom) {
        chartInstance.value = echarts.init(chartDom);
        updateHeatmap();
        } else {
        console.error("Chart DOM element not found.");
        }
    });
    };

    // Update the heatmap with data
    const updateHeatmap = () => {
    const option = {
        tooltip: {
        position: 'top',
        formatter: (params) => {
            return `Position: ${xAxisLabels[params.data[0]]}, ${yAxisLabels[params.data[1]]} <br/> Value: ${params.data[2]}`;
        }
        },
        xAxis: {
            type: 'category',
            data: xAxisLabels,
            nameLocation: 'middle',
            nameGap: 30,
            nameTextStyle: {
            fontSize: 12,
            fontStyle: 'normal',
            align: 'center',
            },
        },
        yAxis: {
            type: 'category',
            data: yAxisLabels,
            nameLocation: 'start',
            nameRotate: 0,
            nameTextStyle: {
            fontSize: 12,
            fontStyle: 'normal',
            verticalAlign: 'bottom',
            },
        },
        visualMap: {
            min: 0,
            max: 1,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '0%',
            color: ['#d94e5d', '#eac736', '#50a3ba']
        },
        series: [{
            name: 'LD Heatmap',
            type: 'heatmap',
            data: heatmapData.value,
            label: {
            show: true,
            },
            emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
            }
            }
        }]
        };
        chartInstance.value.setOption(option);
    };

    // Extract URL parameters and initialize chart on component mount
    onMounted(() => {
    chr.value = route.query.chr || '';
    position.value = parseInt(route.query.position) || 0;
    initHeatmap();
    });

    return {
    region,
    window,
    methods
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
.heatmap-container {
  display: flex; 
  justify-content: center;
  width: 600px;
  height: 400px;
  margin: 20px auto; /* Center horizontally */
}
</style>
      