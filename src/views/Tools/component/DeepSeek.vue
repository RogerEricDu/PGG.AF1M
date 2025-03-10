<template>
<div class="blast-page">
      <div class="header">
      <h2>BLAST Sequence Alignment</h2>
      <p>Perform sequence alignment using BLAST.</p>
      </div>

      <!-- Step 1: Sequence Input -->
      <el-card class="step-card">
      <div class="step">
      <h3 style="margin-bottom: 10px;">STEP 1: Enter Sequence</h3>
      <el-form :model="blastParams">
            <el-form-item label="Task Name">
            <el-input v-model="blastParams.taskName" placeholder="Enter Task Name"></el-input>
            </el-form-item>
            <el-form-item label="Sequence">
            <el-input
            v-model="blastParams.sequence"
            type="textarea"
            :rows="5"
            placeholder="Enter your sequence (e.g., ATGCGATCGATCGATCGATCG)..."
            ></el-input>
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
            <el-button type="primary" class="file-button">Select FASTA File</el-button>
            </el-upload>
            </el-form-item>
      </el-form>
      </div>
      </el-card>

      <!-- Step 2: Run BLAST -->
      <el-card class="step-card">
      <div class="step">
      <h3 style="margin-bottom: 10px;">STEP 2: Run BLAST</h3>
      <el-button
            type="success"
            @click="runBlast"
            :disabled="!canRunBlast"
            class="start-button"
      >
            <el-icon style="font-size: 24px; margin-right: 10px">
            <upload-filled />
            </el-icon>
            Run BLAST
      </el-button>
      </div>
      </el-card>

      <!-- Step 3: Results -->
      <el-card class="step-card">
      <div class="step">
      <h3 style="margin-bottom: 10px;">STEP 3: View Results</h3>
      <el-table :data="blastRecords" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="50" />
            <el-table-column prop="taskName" label="Task Name" />
            <el-table-column prop="fileName" label="File Name" />
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
                  @click="downloadResult(row.id)"
            >
                  Download
            </el-button>
            </template>
            </el-table-column>
      </el-table>
      </div>
      </el-card>

      <!-- Results Details -->
      <el-card v-if="selectedResult" class="results-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <h3>Results for {{ selectedResult.taskName }}</h3>
      <div class="results-content">
      <div class="result-text">
            <h4>Alignment Results</h4>
            <pre>{{ selectedResult.result }}</pre>
      </div>
      </div>
      </el-card>
</div>
</template>

<script setup>
import { ref,computed } from 'vue';
import { selectDeepSeek } from '@/api/tools'; // 导入 BLAST 接口
import { ElMessage } from 'element-plus'; // 导入 Element Plus 的提示组件

// 数据绑定
const blastParams = ref({
taskName: '',
sequence: '',
});
const fileLists = ref([]); // 上传的文件列表
const blastRecords = ref([]); // BLAST 任务记录
const selectedResult = ref(null); // 选中的结果
const isLoading = ref(false); // 加载状态
const uploadUrl = '/tools/selectBLAST'; // 上传接口地址

// 计算属性：是否可以运行 BLAST
const canRunBlast = computed(() => {
return (blastParams.value.sequence || fileLists.value.length > 0) && blastParams.value.taskName;
});

// 文件上传相关方法
const handleFileChange = (file) => {
fileLists.value = [file];
};
const handleRemove = () => {
fileLists.value = [];
};
const beforeRemove = (file) => {
return confirm(`Are you sure you want to remove ${file.name}?`);
};

// 运行 BLAST
const runBlast = async () => {
      if (!canRunBlast.value) {
            ElMessage.warning('Please enter a sequence or upload a file.');
            return;
      }

      try {
            isLoading.value = true;
            const formData = new FormData();
            if (fileLists.value.length > 0) {
            formData.append('file', fileLists.value[0].raw);
            }
            formData.append('taskName', blastParams.value.taskName);
            formData.append('sequence', blastParams.value.sequence);

            const response = await selectDeepSeek(formData);
            const newRecord = {
            id: blastRecords.value.length + 1,
            taskName: blastParams.value.taskName,
            fileName: fileLists.value.length > 0 ? fileLists.value[0].name : 'Manual Input',
            status: 'Completed',
            result: response.data,
            };
            blastRecords.value.push(newRecord);
            selectedResult.value = newRecord;
            ElMessage.success('BLAST completed successfully!');
      } catch (error) {
            console.error('BLAST error:', error);
            ElMessage.error('Failed to run BLAST.');
      } finally {
            isLoading.value = false;
      }
};

// 下载结果
const downloadResult = (id) => {
const record = blastRecords.value.find((r) => r.id === id);
if (record) {
      ElMessage.info(`Downloading result for task: ${record.taskName}`);
      // 这里可以添加下载逻辑
}
};
</script>

<style scoped>
.blast-page {
margin-top: 30px;
margin-left: 50px;
margin-right: 50px;
font-family: Arial, sans-serif;
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

/* 按钮样式 */
.file-button {
background: linear-gradient(135deg, #5795ef, #3a6dd5);
color: #fff;
border: none;
border-radius: 8px;
padding: 12px 20px;
font-size: 16px;
font-weight: bold;
transition: all 0.3s ease;
}
.file-button:hover {
background: linear-gradient(135deg, #3a6dd5, #5795ef);
transform: translateY(-2px);
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
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

/* 结果展示 */
.results-card {
margin-top: 20px;
}
.result-text {
background-color: #f5f7fa;
padding: 15px;
border-radius: 8px;
}
pre {
white-space: pre-wrap;
word-wrap: break-word;
}
</style>