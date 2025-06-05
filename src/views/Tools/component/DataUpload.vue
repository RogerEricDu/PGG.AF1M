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
        <p><strong>Notice:</strong> Please prepare an Excel file with the first column containing chromosome numbers (1...22, X, Y) and the second column containing positions. </p>
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
            <el-option label="SNP" value="SNP"></el-option>
          </el-select>
        </div>
      </div>
      <el-upload
        :action="uploadUrl"
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
<!--         <el-table-column
          prop="fileInfo"
          label="File Info"
        /> -->
        <el-table-column
          prop="created_at"
          label="Upload Time"
        >
            <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="dataType"
          label="Data Type"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="Search Status"
        >
          <template #default="{ row }">
            <el-tag 
              :type="row.status === 'done' ? 'success' : row.status === 'running' ? 'info' : row.status === 'failed' ? 'danger' : ''"
            >
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="Functions"
          fixed="right"
          width="200" 
        >
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
    </el-card>

  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore.js';
import { uploadSNPFile, getUploadRecords, getDownloadUrl } from '@/api/tools';
import { UploadFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const fileLists = ref([]);
const taskName = ref('');
const dataType = ref('SNP');
const uploadRecords = ref([]);

const uploadRef = ref(null);

const authStore = useAuthStore();
const username = computed(() => authStore.user?.username || '');
const email = computed(() => authStore.user?.email || '');

const handleChange = (file) => {
  fileLists.value = [file];
};

const handleRemove = (file, fileList) => {
  fileLists.value = [];
};

const beforeRemove = (file, fileList) => {
  return ElMessageBox.confirm(`Sure to remove ${file.name}?`);
};

const handlePreview = (file) => {
  console.log(file);
};

const submitUpload = async () => {
  if (!fileLists.value.length) return;

  const file = fileLists.value[0].raw;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", username.value);
  formData.append("email", email.value);
  formData.append("taskName", taskName.value);

  try {
    await uploadSNPFile(formData);
    ElMessage.success("Upload successful!");
    taskName.value = '';
    dataType.value = '';
    fileLists.value = [];
    await loadUploadRecords();
  } catch (err) {
    ElMessage.error("Upload failed: " + err.message);
  }
};

const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const convertKeysToCamelCase = (obj) => {
  const newObj = {};
  for (const key in obj) {
    newObj[toCamelCase(key)] = obj[key];
  }
  return newObj;
};

const loadUploadRecords = async () => {
  try {
    const response = await getUploadRecords(username.value);
    uploadRecords.value = response.data.map(convertKeysToCamelCase);
  } catch (err) {
    ElMessage.error("Failed to load records: " + err.message);
  }
};

const downloadFile = async (id) => {
  try {
    const response = await getDownloadUrl(id, { responseType: 'blob' }); // 这里必须告诉 axios 返回 blob 类型
    const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `task_result_${id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    ElMessage.error("Download failed: " + err.message);
  }
};

const formatDate = (dateStr) => {
  return dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss');
};

onMounted(() => {
  loadUploadRecords();
});
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
