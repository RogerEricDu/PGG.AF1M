<template>
  <div class="imputation-page">
    <div class="header">
      <h2>Imputation Process</h2>
      <p>Fill missing SNP data before analysis.</p>
    </div>

    <!-- Imputation Settings Form -->
    <el-card>
      <div class="step">
        <h3>Imputation Settings</h3>
        <el-form :model="imputationParams">
          <el-form-item label="Imputation Panel">
            <el-select v-model="imputationParams.panel">
              <el-option label="10,000 Panel" value="10k"></el-option>
              <el-option label="20,000 Panel" value="20k"></el-option>
            </el-select>
          </el-form-item>

         
            <div class="step">
              <h3>STEP 2: Select the file to start Imputation</h3>
            </div>
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
              <el-button type="primary">Select File</el-button>
            </el-upload>

          <el-button type="success" @click="startImputation" :disabled="fileLists.length === 0" class="start-button">
            Start Imputation
          </el-button>
        </el-form>
      </div>
    </el-card>

    <!-- Imputation Progress -->
    <el-card v-if="isImputing" class="progress-card">
      <h3>Imputation Progress</h3>
      <el-progress :percentage="imputationProgress"></el-progress>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imputationParams: {
        panel: '10k', // Default panel
      },
      fileLists: [],
      isImputing: false,
      imputationProgress: 0,
      uploadUrl: '/api/imputation/run', // 后端处理上传请求的 URL
    };
  },
  methods: {
    handleFileChange(file) {
      // 使用上传的文件更新 fileLists 数组
      this.fileLists = [file];
    },
    async startImputation() {
      if (this.fileLists.length === 0) {
        this.$message.error("Please select a file.");
        return;
      }

      this.isImputing = true;
      this.imputationProgress = 0;

      // 创建 FormData 上传文件和参数
      const formData = new FormData();
      formData.append("file", this.fileLists[0].raw); // 上传的文件
      formData.append("panel", this.imputationParams.panel);

      try {
        // 发送请求到后端进行 imputation
        const response = await axios.post(this.uploadUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              this.imputationProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
          },
        });
        this.$message.success('Imputation complete!');
      } catch (error) {
        console.error(error);
        this.$message.error("Imputation failed.");
      } finally {
        this.isImputing = false;
      }
    },
    handleRemove(file, fileList) {
      // 当文件被删除时，清空文件列表
      this.fileLists = [];
    },
    beforeRemove(file, fileList) {
      // 删除确认
      return this.$confirm(`Are you sure you want to remove ${file.name}?`);
    },
  },
};
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 30px;
}
.header h2 {
  color: #5d7a7c;
  font-size: 30px;
}

.header p {
  font-size: 16px;
  color: #666;
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

.imputation-page {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}

.start-button {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
}
</style>
