<template>
  <div class="results-page">
    <div class="header">
      <h2>Download and View Results</h2>
      <p>Access and visualize uploaded data files and results.</p>
    </div>

    <!-- Download Data Section -->
    <el-card class="download-card" :body-style="{ padding: '20px' }" style="margin-top: 20px">
      <div class="step">
        <h3>Download Data</h3>
        <el-form inline style="margin-bottom: 20px;">
          <el-form-item label="Update Time">
            <el-input v-model="query.updateTime" placeholder="e.g., 2024-11-18"></el-input>
          </el-form-item>
          <el-form-item label="Task Name">
            <el-input v-model="query.taskName" placeholder="Enter Task Name"></el-input>
          </el-form-item>
          <el-form-item label="Task Type">
            <el-input v-model="query.taskType" placeholder="Enter Task Type"></el-input>
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
<!--             <el-table-column prop="id" label="ID" :min-width="80"></el-table-column> -->
            <el-table-column prop="updateTime" label="Update Time" :min-width="250">
              <template #default="{ row }">
                {{ formatDate(row.updateTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="taskName" label="Task Name" :min-width="200"></el-table-column>
            <el-table-column prop="taskType" label="Task Type" :min-width="200">
              <template #default="scope">
                {{ scope.row.taskType || "N/A" }}
              </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" :min-width="200">
              <template #default="scope">
                <el-tag
                  :type="statusType(scope.row.status)"
                  effect="dark"
                  class="status-tag"
                >
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- <el-table-column prop="fileName" label="File Name" :min-width="200"></el-table-column> -->
            <el-table-column label="Functions" :min-width="150" fixed="right">
              <template #default="scope">
                <el-button
                  type="success"
                  size="mini"
                  @click="downloadFile(scope.row)"
                  class="download-button"
                >
                  Download
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineProps } from 'vue';
import dayjs from 'dayjs';
import { ElMessage } from 'element-plus';
import { checkUserTasks } from '@/api/user';

const props = defineProps({
  username: {
  type: String,
  required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const query = reactive({
  updateTime: '',
  taskName: '',
})

const tableData = ref ([]);
const selectedResult = ref(null);

const statusType = (status) => {
  switch (status?.toLowerCase()) {
    case "running":
      return "primary";  // 蓝
    case "pending":
      return "warning";  // 黄
    case "done":
      return "success";  // 绿
    case "error":
      return "danger";   // 红
    default:
      return "info";     // 灰蓝
  }
};

const fetchTableData = async () => {
  const payload = {
    username : props.username,
    email : props.email,
  };
  try {
    const res = await checkUserTasks(payload);
    if (res.code === 200 && Array.isArray(res.data)) {
      tableData.value = res.data.filter((item) => {
        return (
          (!query.taskName || item.taskName?.includes(query.taskName)) &&
          (!query.taskType || item.taskType?.toLowerCase().includes(query.taskType.toLowerCase())) &&
          (!query.updateTime || item.updateTime?.startsWith(query.updateTime))
        );
      });
    } else {
      ElMessage.error('Unexpected response format.');
    }
  } catch (err) {
    ElMessage.error('Failed to load tasks: ' + err.message);
  }
};

// 下载
const downloadFile = (row) => {
  alert(`Download started for ${row.fileName}`);
};

// 初始化
onMounted(() => {
  fetchTableData();
});

const formatDate = (dateStr) => {
  return dayjs(dateStr).format('YYYY-MM-DD HH:mm:ss');
};

</script>

<style scoped>
.results-page {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
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
.status-tag {
  transition: all 0.3s ease;
  cursor: default;
  font-weight: bold;
}
.status-tag:hover {
  transform: scale(1.05);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

</style>