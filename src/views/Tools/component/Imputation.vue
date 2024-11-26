<template>
  <div class="imputation-page">
    <div class="header">
      <h2>Imputation Process</h2>
      <p>Fill missing SNP data before analysis.</p>
    </div>

    <!-- Step 1 -->
    <el-card class="step-card">
      <div class="step">
        <h3 style="margin-bottom: 10px;">STEP 1: Imputation Settings</h3>
        <el-form :model="imputationParams">
          <el-form-item label="Task Name">
            <el-input v-model="imputationParams.taskName" placeholder="Enter Task Name"></el-input>
          </el-form-item>
          <el-form-item label="Imputation Panel">
            <el-select v-model="imputationParams.panel" placeholder="Select a Panel">
              <el-option label="10,000 Population" value="10k"></el-option>
              <el-option label="20,000 Population" value="20k"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-upload
              :action="uploadUrl"
              :multiple="false"
              class="upload-demo"
              ref="upload"
              :file-list="fileLists"
              :on-change="handleFileChange"
              :on-remove="handleRemove"
              :auto-upload="false"
              :before-remove="beforeRemove"
              :limit="1"
            >
              <el-button type="primary" class="file-button">Select File</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- Step 2 -->
    <el-card class="step-card">
      <div class="step">
        <h3 style="margin-bottom: 10px;">STEP 2: Start Imputation</h3>
        <el-button
          type="success"
          @click="startImputation"
          :disabled="!canStartImputation"
          class="start-button"
        >
        <el-icon style="font-size: 24px; margin-right: 10px">
          <upload-filled />
        </el-icon> 
          Start Imputation
        </el-button>
      </div>
    </el-card>

    <!-- Step 3 -->
    <el-card class="step-card">
      <div class="step">
        <h3 style="margin-bottom: 10px;">STEP 3: View Uploaded Files</h3>
        <el-table :data="uploadRecords" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="taskName" label="Task Name" />
          <el-table-column prop="fileName" label="File Name" />
          <el-table-column prop="panel" label="Panel" />
          <el-table-column prop="status" label="Status">
            <template #default="{ row }">
              <el-tag :type="row.status === 'Completed' ? 'success' : 'info'">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Functions">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="mini"
                @click="downloadFile(row.id)"
              >
                Download
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-card v-if="selectedResult" class="results-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <h3>Results for {{ selectedResult.sampleName }}</h3>
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
import axios from "axios";

export default {
  data() {
    return {
      imputationParams: {
        taskName: "",
        panel: "",
      },
      fileLists: [],
      uploadRecords: [],
      uploadUrl: "/api/imputation/run",
    };
  },
  computed: {
    canStartImputation() {
      return (
        this.fileLists.length > 0 &&
        this.imputationParams.taskName &&
        this.imputationParams.panel
      );
    },
  },
  methods: {
    handleFileChange(file) {
      this.fileLists = [file];
    },
    handleRemove(file, fileList) {
      this.fileLists = [];
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Are you sure you want to remove ${file.name}?`);
    },
    async startImputation() {
      if (!this.canStartImputation) {
        this.$message.error("Please complete all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.fileLists[0].raw);
      formData.append("taskName", this.imputationParams.taskName);
      formData.append("panel", this.imputationParams.panel);

      try {
        const response = await axios.post(this.uploadUrl, formData);
        const newRecord = {
          id: this.uploadRecords.length + 1,
          taskName: this.imputationParams.taskName,
          fileName: this.fileLists[0].name,
          panel: this.imputationParams.panel,
          status: "Queued",
        };
        this.uploadRecords.push(newRecord);
        this.$message.success("Imputation started successfully!");
        this.resetForm();
      } catch (error) {
        console.error(error);
        this.$message.error("Failed to start imputation.");
      }
    },
    downloadFile(id) {
      this.$message.info(`Downloading file with ID: ${id}`);
    },
    resetForm() {
      this.fileLists = [];
      this.imputationParams = {
        taskName: "",
        panel: "",
      };
    },
  },
};
</script>

<style scoped>
.imputation-page{
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}
/* 背景渐变 */
body {
  background: linear-gradient(135deg, #e6eef2, #f7fafc);
}

/* 标题和描述 */
.header {
  text-align: center;
  margin-bottom: 40px;
}
.header h2 {
  color: #34568B;
  font-size: 32px;
  font-weight: 700;
}
.header p {
  color: #555;
  font-size: 18px;
}


/* 卡片样式 */
.step-card {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f9fafc);
  padding: 30px;
  margin-bottom: 20px;
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
  background: linear-gradient(135deg, #3a6dd5, #5795ef);
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.el-button[disabled] {
  background-color: #f2f2f2;
  border-color: #dcdfe6;
  color: #c0c4cc;
}
/* 表单与控件样式 */
.el-form-item {
  margin-bottom: 20px;
}

/* 按钮样式 */

.file-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.start-button {
  width: 100%;
  background: linear-gradient(135deg, #4CAF50, #43A047);
  color: #fff;
  padding: 14px 28px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 进度条样式 */
.progress-card {
  margin-top: 20px;
  padding: 20px;
}
.el-progress {
  margin-top: 10px;
  height: 16px;
  border-radius: 8px;
  background-color: #e6eef2;
}
.el-progress-bar {
  border-radius: 8px;
  background: linear-gradient(135deg, #4CAF50, #43A047);
}
</style>
