<template>
  <div class="results-page">
    <div class="header">
      <h2>Download and View Data</h2>
      <p>Access and visualize uploaded data files and results.</p>
    </div>

    <!-- Download Data Section -->
    <el-card class="download-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>Download Data</h3>
        <el-form inline style="margin-bottom: 20px;">
          <el-form-item label="Upload Time">
            <el-input v-model="query.uploadTime" placeholder="e.g., 2024-11-18"></el-input>
          </el-form-item>
          <el-form-item label="Sample Name">
            <el-input v-model="query.sampleName" placeholder="Enter Sample Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchTableData" class="search-button">
              Search
            </el-button>
          </el-form-item>
        </el-form>

        <div class="table-container">
          <el-table
            :data="tableData"
            stripe
            border
            style="width: 100%;"
            class="custom-table"
          >
            <el-table-column prop="id" label="ID" :min-width="80"></el-table-column>
            <el-table-column prop="updateTime" label="Update Time" :min-width="120"></el-table-column>
            <el-table-column prop="taskName" label="Task Name" :min-width="200"></el-table-column>
            <el-table-column prop="dataType" label="Data Type" :min-width="220">
              <template #default="scope">
                {{ scope.row.dataType || "N/A" }}
              </template>
            </el-table-column>
            <el-table-column prop="panel" label="Panel" :min-width="200">
              <template #default="scope">
                {{ scope.row.panel || "N/A" }}
              </template>
            </el-table-column>
            <el-table-column prop="fileName" label="File Name" :min-width="200"></el-table-column>
            <el-table-column label="Functions" :min-width="300" fixed="right">
              <template #default="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="downloadFile(scope.row)"
                  class="download-button"
                >
                  Download
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="showResults(scope.row)"
                  class="view-results-button"
                >
                  Show Results
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

    <!-- Results Section -->
    <el-card v-if="selectedResult" class="results-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <h3>Results for {{ selectedResult.taskName }}</h3>
      <div class="results-content">
        <!-- Pie Chart -->
        <div ref="biotypeChart" class="chart"></div>
        <!-- Sample Summary -->
        <div class="summary">
          <h4>Sample Summary</h4>
          <p>Total Samples: 500</p>
          <p>Novel SNPs: 100</p>
          <p>Average Frequency: 0.1145</p>
        </div>
        <!-- High-Frequency Variants -->
        <div class="high-frequency-variants">
          <h4>High-Frequency Variants</h4>
          <ul>
            <li>1:13284-G-A: 0.8445</li>
            <li>13:434754-G-C: 0.8223</li>
            <li>5:1472228-C-A: 0.8111</li>
            <li>4:84747756-C-A: 0.7862</li>
            <li>X:112272228-C-A: 0.7566</li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      query: {
        uploadTime: "",
        taskName: "",
      },
      tableData: [],
      selectedResult: null,
    };
  },
  methods: {
    fetchTableData() {
      this.tableData = [
        {
          id: 1,
          updateTime: "2024-11-17",
          taskName: "Sample A",
          dataType: "Microarray",
          panel: "10k",
          fileName: "file_A.txt",
        },
        {
          id: 2,
          updateTime: "2024-11-18",
          taskName: "Sample B",
          dataType: "NGS",
          panel: "20k",
          fileName: "file_B.txt",
        },
      ];
    },
    downloadFile(row) {
      alert(`Download started for ${row.fileName}`);
    },
    showResults(row) {
      this.selectedResult = row;
      this.renderBiotypeChart();
    },
    renderBiotypeChart() {
      const chart = echarts.init(this.$refs.biotypeChart);
      const option = {
        title: {
          text: "Biotype Distribution",
          left: "center",
          textStyle: { fontSize: 16, color: "#333" },
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Biotype",
            type: "pie",
            radius: "50%",
            data: [
              { value: 400, name: "Transcript" },
              { value: 250, name: "Exon" },
              { value: 100, name: "CDS" },
              { value: 50, name: "Intron" },
              { value: 20, name: "5'UTR" },
              { value: 10, name: "3'UTR" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style scoped>
.results-page {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}
.header {
  text-align: center;
  margin-bottom: 20px;
}
.header h2 {
  font-size: 32px;
  color: #34568B;
}
.header p {
  color: #666;
  font-size: 18px;
}
.download-card,
.results-card {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f9fafc);
}
.table-container {
  overflow-x: auto;
}
.upload-button {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
}

.upload-demo i {
  font-size: 20px;
  margin-right: 10px;
}

.upload-demo:hover {
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}
.el-button {
  background: linear-gradient(135deg, #5795ef, #3a6dd5);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}
.el-button:hover {
  filter: brightness(1.2); /* 提高亮度，使颜色变淡 */
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15); /* 减弱阴影 */
}

.el-button[disabled] {
  background-color: #f2f2f2;
  border-color: #dcdfe6;
  color: #c0c4cc;
}
.custom-table {
  min-width: 800px;
}
.view-results-button {
  background: linear-gradient(135deg, #ff9800, #f57c00);
  color: #fff;
  border-radius: 6px;
}
.results-content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.chart {
  width: 300px;
  height: 300px;
  flex: 1;
}
.summary,
.high-frequency-variants {
  flex: 1;
}
</style>