<template>
<div>
    <div class="method-selection">
    <strong style="font-size: 15px; margin-right: 20px;">MAF:</strong>
    <el-select v-model="maf" placeholder="Select a method" style="width: 180px;">
        <el-option label="0%" value="0" />
        <el-option label="1%" value="1" />
        <el-option label="5%" value="5" />
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

    <!-- 图表容器 -->
    <div id="map" style="width: 1100px; height: 500px; margin-top: 20px;"></div>
</div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import * as echarts from 'echarts';

export default {
setup() {
    const route = useRoute();
    const chr = ref('');
    const position = ref(0);
    const window = ref('20k');
    const maf = ref('1%');
    const mapChart = ref(null);

    const region = computed(() => {
    const start = Math.max(0, position.value - 20000);
    const end = position.value + 20000;
    return `${chr.value}:${start}-${end}`;
    });

    // 初始化图表
    const initChart = () => {
    const chartDom = document.getElementById('map');
    mapChart.value = echarts.init(chartDom);
    updateChart(getExampleData()); // 使用示例数据展示图表
    /* loadChartData(); // 初始加载数据并展示图表 */
    };

    // 示例数据
    const getExampleData = () => {
    return {
        xLabels: ["11843184", "11844019", "11844035", "11844685", "11845604", "11846412", "11846993", "11847591", "11849679", "11851781"],
        yLabels: ["Sample1", "Sample2", "Sample3", "Sample4", "Sample5", "Sample6", "Sample7", "Sample8", "Sample9", "Sample10", "Sample11", "Sample12", "Sample13", "Sample14", "Sample15"],
        seriesData: [
        [0, 0, 0.1], [1, 0, 0.8], [2, 0, 0.4], [3, 0, 0.5], [4, 0, 0.3], [5, 0, 0.9], [6, 0, 0.2], [7, 0, 0.6], [8, 0, 0.1], [9, 0, 0.7],
        [0, 1, 0.8], [1, 1, 0.5], [2, 1, 0.3], [3, 1, 0.6], [4, 1, 0.7], [5, 1, 0.1], [6, 1, 0.4], [7, 1, 0.9], [8, 1, 0.2], [9, 1, 0.3],
        [0, 2, 0.5], [1, 2, 0.4], [2, 2, 0.7], [3, 2, 0.8], [4, 2, 0.1], [5, 2, 0.6], [6, 2, 0.9], [7, 2, 0.3], [8, 2, 0.2], [9, 2, 0.8],
        ]
    };
    };

/*     // 后端动态获取数据
    const loadChartData = async () => {
      try {
        const response = await axios.post('/your-api-endpoint', {
          region: region.value,
          window: window.value,
          maf: maf.value
        });
        
        // 使用从后端获取的动态数据更新图表
        const data = response.data; // 假设后端返回的数据格式符合 ECharts 的需求
        updateChart(data);
      } catch (error) {
        console.error("Error loading chart data:", error);
      }
    }; */

    //更新图表内容
    const updateChart = (data) => {
        if (!mapChart.value) return;
        
        const option = {
            title: {
                text: `Haplotype Structure: ${region.value}`
            },
            xAxis: {
                type: 'category',
                data: data.xLabels,
                axisLabel: {
                    interval: 0,
                    rotate: 45
                }
            },
            yAxis: {
                type: 'category',
                data: data.yLabels,
                axisLabel: {
                    fontSize: 8
                }
            },
            series: [{
                type: 'heatmap',
                data: data.seriesData,
                label: {
                    show: false
                },
                itemStyle: {
/*                     borderColor: '#ffffff', // 边框颜色设为白色以形成间隙
                    borderWidth: 10, // 设置较大的边框宽度以增加块之间的间距 */
                },
                emphasis: {
                    itemStyle: {
                        borderColor: '#ffffff', // 高亮状态的边框颜色
                        borderWidth: 10
                    }
                }
            }],
            grid: {
                left: '10%',
                right: '10%',
                bottom: '10%',
                top: '10%',
            },
            visualMap: {
                min: 0,
                max: 1,
                orient: 'vertical',
                left: 'right',
                top: 'middle',
                inRange: {
                    color: ['#ff0000', '#0000ff']
                }
            }
        };

        mapChart.value.setOption(option);
    };

    // 当参数变更时重新加载数据
    watch([region, window, maf], () => updateChart(getExampleData()));

    // 组件加载时初始化图表
    onMounted(() => {
    chr.value = route.query.chr || '';
    position.value = parseInt(route.query.position) || 0;
    initChart();
    });

    return {
    region,
    window,
    maf
    };
}
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