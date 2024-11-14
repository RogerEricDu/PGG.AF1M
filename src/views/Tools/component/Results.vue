<template>
  <div class="results-page">
    <div class="header">
      <h2>Allele Frequency Results</h2>
      <p>View frequency data across populations for a specific SNP.</p>
    </div>

    <!-- Download Form -->
    <el-card class="download-card">
      <div class="step">
      <h3>Download Data</h3>
      <el-button
        type="success"
        @click="submitUpload"
        class="download-button"
      >
        Download File
      </el-button>
    </div>
    </el-card>

    <!-- Search Form -->
    <el-card>
      <div class="step">
      <h3>Search SNP</h3>
      <el-form @submit.native.prevent="fetchFrequencyData">
        <el-form-item label="rsID">
          <el-input v-model="search.rsID" placeholder="e.g., rs12345"></el-input>
        </el-form-item>
        <el-form-item label="Position">
          <el-input v-model="search.position" placeholder="e.g., chr1:12345"></el-input>
        </el-form-item>
        <el-button type="primary" @click="fetchFrequencyData">Search</el-button>
      </el-form>
    </div>
    </el-card>

    <!-- Frequency Chart -->
    <el-card v-if="frequencyData" class="chart-card">
      <div class="step">
      <h3>Allele Frequency Across Populations</h3>
      <div ref="frequencyChart" style="width: 100%; height: 400px;"></div>
    </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      search: {
        rsID: '',
        position: '',
      },
      frequencyData: null,
    };
  },
  methods: {
    fetchFrequencyData() {
      // Placeholder logic for fetching frequency data
      this.frequencyData = this.mockFrequencyData();
      this.renderChart();
    },
    renderChart() {
      const chart = echarts.init(this.$refs.frequencyChart);
      const option = {
        title: {
          subtext: 'by Population',
        },
        xAxis: {
          type: 'category',
          data: this.frequencyData.populations,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: this.frequencyData.frequencies,
            type: 'bar',
          },
        ],
      };
      chart.setOption(option);
    },
    mockFrequencyData() {
      return {
        populations: ['Population 1', 'Population 2', 'Population 3'],
        frequencies: [0.2, 0.35, 0.5],
      };
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}
.header h2 {
  color: #5d7a7c;
  font-size: 30px;
}

.header p {
  font-size: 16px;
  color: #666;
}

.download-card {
  margin-bottom: 20px;
}

.step-card {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
}
.step {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
}
.step h3{
  font-size: 20px;
  margin-bottom: 15px;
}

.results-page {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}

.chart-card {
  margin-top: 20px;
}

.download-button {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
}
</style>
