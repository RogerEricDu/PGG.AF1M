<template>
    <div class="gwas-page">
      <div class="header">
        <h2>GWAS Analysis</h2>
        <p>Upload your data and configure analysis parameters to start your GWAS process.</p>
      </div>
  
      <!-- Step 1 -->
      <el-card class="step-card">
        <div class="step">
          <h3 style="margin-bottom: 10px;">STEP 1: Configure Parameters</h3>
          <el-form :model="gwasParams">
            <el-form-item label="Task Name">
              <el-input v-model="gwasParams.taskName" placeholder="Enter Task Name"></el-input>
            </el-form-item>
            <el-form-item label="Significance Threshold">
              <el-input v-model="gwasParams.threshold" placeholder="e.g., 0.05"></el-input>
            </el-form-item>
            <el-form-item label="Analysis Model">
              <el-select v-model="gwasParams.model" placeholder="Select Model">
                <el-option label="Linear Regression" value="linear"></el-option>
                <el-option label="Logistic Regression" value="logistic"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
  
      <!-- Step 2 -->
      <el-card class="step-card">
        <div class="step">
          <h3 style="margin-bottom: 10px;">STEP 2: Upload Data</h3>
          <el-upload
            :action="uploadUrl"
            :file-list="fileList"
            :on-change="handleFileChange"
            :on-remove="handleRemove"
            :auto-upload="false"
            :before-remove="beforeRemove"
            class="upload-demo"
          >
            <el-button type="primary" class="file-button">Select File</el-button>
          </el-upload>
        </div>
      </el-card>
  
      <!-- Step 3 -->
      <el-card class="step-card">
        <div class="step">
          <h3 style="margin-bottom: 10px;">STEP 3: Start Analysis</h3>
          <el-button
            type="success"
            @click="startAnalysis"
            :disabled="!canStartAnalysis"
            class="start-button"
          >
            <el-icon style="font-size: 24px; margin-right: 10px">
              <upload-filled />
            </el-icon>
            Start GWAS Analysis
          </el-button>
        </div>
      </el-card>
  
      <!-- Step 4 -->
      <el-card class="step-card">
        <div class="step">
          <h3 style="margin-bottom: 10px;">STEP 4: Results Preview</h3>
          <el-table v-if="resultsAvailable" :data="resultsPreview" border style="width: 100%">
            <el-table-column prop="snp_id" label="SNP ID" />
            <el-table-column prop="p_value" label="P-Value" />
            <el-table-column prop="effect_size" label="Effect Size" />
          </el-table>
          <el-button v-else type="info" disabled>Results will appear here after analysis</el-button>
          <el-button v-if="resultsAvailable" type="primary" @click="downloadResults" style="margin-top: 20px;">
            Download Full Results
          </el-button>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      const gwasParams = ref({
        taskName: "",
        threshold: "0.05",
        model: "linear",
      });
      const fileList = ref([]);
      const resultsAvailable = ref(false);
      const resultsPreview = ref([]);
      const uploadUrl = "/api/gwas/upload";
  
      const handleFileChange = (file) => {
        fileList.value = [file];
      };
  
      const handleRemove = () => {
        fileList.value = [];
      };
  
      const beforeRemove = (file) => {
        return confirm(`Are you sure you want to remove ${file.name}?`);
      };
  
      const canStartAnalysis = ref(() => {
        return gwasParams.value.taskName && fileList.value.length > 0;
      });
  
      const startAnalysis = async () => {
        if (!canStartAnalysis.value) {
          alert("Please complete all fields and upload a file.");
          return;
        }
  
        const formData = new FormData();
        formData.append("file", fileList.value[0].raw);
        formData.append("taskName", gwasParams.value.taskName);
        formData.append("threshold", gwasParams.value.threshold);
        formData.append("model", gwasParams.value.model);
  
        try {
          const response = await axios.post("/api/gwas/run", formData);
          resultsPreview.value = response.data.preview;
          resultsAvailable.value = true;
        } catch (error) {
          console.error("Error running analysis:", error);
          alert("Failed to run GWAS analysis.");
        }
      };
  
      const downloadResults = async () => {
        try {
          const response = await axios.get("/api/gwas/download", {
            responseType: "blob",
          });
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "gwas_results.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error("Error downloading results:", error);
          alert("Failed to download results.");
        }
      };
  
      return {
        gwasParams,
        fileList,
        resultsAvailable,
        resultsPreview,
        uploadUrl,
        handleFileChange,
        handleRemove,
        beforeRemove,
        canStartAnalysis,
        startAnalysis,
        downloadResults,
      };
    },
  };
  </script>
  
  <style scoped>
  .gwas-page {
    margin-top: 30px;
    margin-left: 50px;
    margin-right: 50px;
    font-family: Arial, sans-serif;
  }
  
  body {
    background: linear-gradient(135deg, #e6eef2, #f7fafc);
  }
  
  .header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .header h2 {
    color: #34568b;
    font-size: 32px;
    font-weight: 700;
  }
  
  .header p {
    color: #555;
    font-size: 18px;
  }
  
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
  </style>
  
  