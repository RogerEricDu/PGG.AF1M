<template>
  <div class="DataUpload">
    <div class="header">
      <h2>Upload SNP File</h2>
      <p>Please follow the steps below to upload the SNP information data file.</p>
    </div>

    <el-card class="step-card" :body-style="{ padding: '20px' }">
      <div class="step">
        <h3>STEP 1: Fill in the SNP file with the following basic information and perform batch data queries.</h3>
        <p><strong>Title:</strong> Variant / Chr / Position / rsID (Province,Region,Population if necessary)</p>
      </div>
    </el-card>

    <el-card class="step-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>STEP 2: Select the file to upload (EXCEL as default)</h3>
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

    <el-card class="step-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>STEP 3: Upload File to Start Searching</h3>
      </div>
      <el-button
        type="success"
        @click="submitUpload"
        :disabled="fileLists.length === 0"
        class="upload-button"
      >
        <Upload /> Upload File
      </el-button>
    </el-card>

  </div>
</template>

<script>
import { UploadFilled, Upload, ArrowLeft } from '@element-plus/icons-vue';

export default {
  name: 'bloodChemistryUpdate',
  components: {
    UploadFilled,
    Upload,
    ArrowLeft,
  },
  data() {
    return {
      fileLists: [],
    };
  },
  methods: {
    handleChange(file) {
      this.fileLists.push(file);
    },
    submitUpload() {
      const formData = new FormData();
      this.fileLists.forEach((file) => {
        formData.append("file", this.fileLists[0].raw); 
        formData.append('batchId', this.batchId); 
      });
      this.uploadRequest(formData);
    },
    async uploadRequest(formData) {
      try {
        const response = await updateBloodChemistryFile(formData);
        console.log(response);
        this.$message.success('Upload Success!');
        this.$router.push({
          path: `/tools`,
          query: { projectId: this.projectId, batchId: this.batchId }
        });
      } catch (error) {
        console.log(error);
        this.$message.error('Request Error, Please Try Again!');
        this.$router.push({
          path: `/tools`,
          query: { projectId: this.projectId, batchId: this.batchId }
        });
      }
    },
    handleRemove(file, fileList) {
      console.log('Remove', file, fileList);
      this.fileLists = [];
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Sure to Remove ${file.name}？`);
    },
  },
};
</script>


<style scoped>
.DataUpload {
  margin-top: 30px;
  margin-left: 50px;
  margin-right: 50px;
  font-family: Arial, sans-serif;
}

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


.upload-button {
  width: 100%;
  margin-top: 10px;
  padding: 10px 20px;
}

.upload-demo i {
  font-size: 20px;
  margin-right: 10px;
}

.el-button {
  width: 100%;
}

.el-button:hover {
  background-color: #9dcafa;
  color: white;
}

.el-button[disabled] {
  background-color: #f2f2f2;
  border-color: #dcdfe6;
  color: #c0c4cc;
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
