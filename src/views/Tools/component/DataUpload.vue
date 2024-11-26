<template>
  <div class="DataUpload">
    <div class="header">
      <h2>Upload SNP File</h2>
      <p>Please follow the steps below to upload the SNP information data file.</p>
    </div>
    <!-- Step 1 -->
    <el-card class="step-card" :body-style="{ padding: '20px' }">
      <div class="step">
        <h3>STEP 1: Fill in the SNP file with the following basic information and perform batch data queries.</h3>
        <p><strong>Title:</strong> Variant / Chr / Position / rsID (Province,Region,Population if necessary)</p>
      </div>
    </el-card>
    <!-- Step 2 -->
    <el-card class="step-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>STEP 2: Select the file to upload</h3>
        <!-- Name and Data Type Selection -->
        <div class="job-selection">
          Name for this job (optional):
          <el-input 
            v-model="taskName" 
            placeholder="Enter Task Name" 
            class="task-name-input" 
            style="margin-right: 20px; width: 35%;"
          />
          <el-select v-model="dataType" placeholder="Select Data Type" style="width: 35%;">
            <el-option label="100,000 Microarrays Data" value="Microarray"></el-option>
            <el-option label="20,000 NGS Data" value="NGS"></el-option>
          </el-select>
        </div>
      </div>
      <el-upload
        action="https://pog.fudan.edu.cn/cpcapi/batch/bloodChemistryUpdate"
        :multiple="false"
        class="upload-demo"
        ref="upload"
        :file-list="fileLists"
        :on-preview="handlePreview"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :auto-upload="false"
        :before-remove="beforeRemove"
        :limit="1"
      >
        <el-button 
          type="primary"
          class="select-button"
        >
          Select File
        </el-button>
      </el-upload>
    </el-card>

    <!-- Step 3 -->
    <el-card class="step-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>STEP 3: Upload File to Start Searching</h3>
      </div>
      <el-button
        type="success"
        @click="submitUpload"
        :disabled="fileLists.length === 0 || !taskName || !dataType"
        class="upload-button"
      >
      <el-icon style="font-size: 24px; margin-right: 10px">
        <upload-filled />
      </el-icon> 
      Upload File
      </el-button>
    </el-card>

    <!-- Step 4 -->
    <el-card class="step-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>STEP 4: View Uploaded Files</h3>
      </div>
      <el-table
        :data="uploadRecords"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="50"
        />
        <el-table-column
          prop="taskName"
          label="Task Name"
        />
        <el-table-column
          prop="fileInfo"
          label="File Info"
        />
        <el-table-column
          prop="dataType"
          label="Data Type"
        >
          <template #default="{ row }">
            <el-tag>{{ row.dataType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="Search Status"
        >
          <template #default="{ row }">
            <el-tag 
              :type="row.status === 'Completed' ? 'success' : row.status === 'Queued' ? 'info' : 'danger'"
            >
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Functions"
          fixed="right"
          width="300" 
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="downloadFile(row.id)"
            >
              Download
            </el-button>
            <el-button
              type="primary"
              @click="showResults"
              class="view-results-button"
            >
              Show Results
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- Results Section -->
    <el-card v-if="showResultSection" class="results-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <h3>Results for {{ currentTaskName  }}</h3>
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
import { UploadFilled } from "@element-plus/icons-vue";
export default {
  name: 'dataUpload',
  components: {
    UploadFilled,
  },
  data() {
    return {
      taskName: '', // 当前输入框中的任务名称
      currentTaskName: '', // 用于显示结果区域的任务名称
      dataType: '', //  (chip or ngs)
      fileLists: [],
      uploadRecords: [],
      showResultSection: false,
    };
  },
  methods: {
    handleChange(file) {
      this.fileLists = [file]; // Only keep the latest file
    },
    async submitUpload() {
      if (!this.taskName || !this.dataType) {
        this.$message.error('Task Name and Data Type are required.');
        return;
      }
      const formData = new FormData();
      formData.append("file", this.fileLists[0].raw);
      formData.append("taskName", this.taskName);
      formData.append("dataType", this.dataType);

      try {
        const response = await this.uploadRequest(formData);
        this.currentTaskName = this.taskName; // 保存当前任务名称用于显示
        this.uploadRecords.push({
          id: response.data.id,
          taskName: this.taskName,
          fileInfo: this.fileLists[0].name,
          dataType: this.dataType,
          status: response.data.status || 'Queued',
        });
        this.taskName = ''; // 清空输入框
        this.dataType = '';
        this.$message.success('Upload Success!');
      } catch (error) {
        this.$message.error('Upload Failed. Please try again.');
      }
    },
    async uploadRequest(formData) {
      // Simulate API upload request
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: { id: this.uploadRecords.length + 1, status: 'Queued' } });
        }, 1000);
      });
    },
    downloadFile(id) {
      console.log(`Downloading file with ID: ${id}`);
      this.$message.info(`Download functionality not implemented yet for ID: ${id}`);
    },
    handleRemove(file, fileList) {
      console.log('Remove', file, fileList);
      this.fileLists = [];
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Sure to Remove ${file.name}？`);
    },
    showResults() {
      this.showResultSection = true;
      this.$nextTick(() => {
        this.renderBiotypeChart(); // 确保 DOM 已渲染后再初始化图表
      });
    },
    renderBiotypeChart() {
      const chart = echarts.init(this.$refs.biotypeChart);
      const option = {
        title: {
          text: "Biotype Distribution",
          left: "center",
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
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>


<style scoped>
body {
  background: linear-gradient(135deg, #f0f4f7, #e8eef2);
}
.DataUpload {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}
.job-selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
}

.task-name-input {
  width: 45%; /* Ensure both elements share the space evenly */
}

.el-select {
  width: 45%; /* Ensure both elements share the space evenly */
}
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  color: #34568B;
  font-weight: 600;
}

.header p {
  margin-top: 10px;
  font-size: 18px;
  color: #555;
}

.step-card {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f9fafc);
  padding: 30px;
}

.step {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
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

@media (max-width: 768px) {
  .diseasePhenotypeUpdate {
    margin-left: 20px;
    margin-right: 20px;
  }

  .step-card {
    padding: 15px;
  }

  .el-button {
    width: auto;
  }
}
</style>
