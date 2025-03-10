<template>
    <div class="gwas-page">
      <div class="header">
        <h2>GWAS Analysis</h2>
        <p>Upload your data and configure analysis parameters to start your GWAS process.</p>
        <!-- 添加WebSocket状态指示器 -->
        <el-tag 
          size="small" 
          :type="socketConnected ? 'success' : 'danger'" 
          style="margin-left: 10px;"
        >
          {{ socketConnected ? 'Real-time Updates On' : 'Real-time Updates Off' }}
        </el-tag>
        
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

      <!-- 添加任务状态监控卡片 -->
      <el-card class="step-card">
        <div class="step">
          <h3 style="margin-bottom: 10px;">Task Status Monitor</h3>
          <el-table v-if="tasks.length > 0" :data="tasks" border style="width: 100%">
            <el-table-column prop="taskName" label="Task Name" />
            <el-table-column prop="model" label="Model" />
            <el-table-column label="Progress">
              <template #default="scope">
                <el-progress :percentage="Math.round(scope.row.progress || 0)"></el-progress>
              </template>
            </el-table-column>
            <el-table-column label="Status">
              <template #default="scope">
                <el-tag :type="getStatusType(scope.row.status || '')">
                  {{ scope.row.status || 'Unknown' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="Actions">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="getPreview(scope.row.taskName)"
                  :disabled="!scope.row.status || scope.row.status !== 'Completed'"
                >
                  View Results
                </el-button>
                <el-button
                  type="success"
                  size="small"
                  @click="downloadTaskResults(scope.row.taskName)"
                  :disabled="!scope.row.status || scope.row.status !== 'Completed'"
                >
                  Download
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-else class="empty-data">No tasks found</div>
        </div>
      </el-card>

      <!-- 通知区域 -->
      <el-card v-if="notifications.length > 0" class="notifications-card">
        <h3>Task Notifications</h3>
        <el-timeline>
          <el-timeline-item
            v-for="(notification, index) in notifications"
            :key="index"
            :timestamp="notification.time"
            :type="notification.type"
          >
            {{ notification.message }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </template>
  
  <script>
import axios from "axios";
import { UploadFilled } from '@element-plus/icons-vue';
import SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { ElMessage } from 'element-plus';

// 在全局为webstomp-client添加polyfill
window.global = window;

export default {
  components: {
    UploadFilled,
  },
  data() {
    return {
      gwasParams: {
        taskName: '',
        threshold: '0.05',
        model: 'linear',
      },
      fileList: [],
      resultsAvailable: false,
      resultsPreview: [],
      stompClient: null,
      socketConnected: false,
      tasks: [],
      notifications: [],
      taskSubscriptions: new Set(),
      submitting: false,
    };
  },
  computed: {
    canStartAnalysis() {
      return this.gwasParams.taskName && this.fileList.length > 0;
    }
  },
  created() {
    // 初始化WebSocket连接
    this.initWebSocket();
    
    // 加载之前的任务
    this.loadAllTasks();
  },
  beforeUnmount() {
    // 组件销毁前，断开WebSocket连接
    this.disconnectWebSocket();
  },
  methods: {
    // WebSocket相关方法
    initWebSocket() {
      try {
        const socket = new SockJS('/imputation-websocket'); // 使用现有的WebSocket端点
        
        this.stompClient = Stomp.over(socket, {
          debug: false,
        });
        
        this.stompClient.connect({}, frame => {
          console.log('WebSocket connected:', frame);
          this.socketConnected = true;
          this.addNotification('WebSocket connection established', 'success');
          
          // 订阅任务完成通知
          this.stompClient.subscribe('/topic/gwas/completed', message => {
            try {
              const task = JSON.parse(message.body);
              this.addNotification(`Task ${task.taskName} completed!`, 'success');
              this.updateTaskRecord(task);
            } catch (error) {
              console.error('Failed to process completed message:', error);
            }
          });
          
          // 订阅任务失败通知
          this.stompClient.subscribe('/topic/gwas/failed', message => {
            try {
              const task = JSON.parse(message.body);
              this.addNotification(`Task ${task.taskName} failed: ${task.errorMessage}`, 'danger');
              this.updateTaskRecord(task);
            } catch (error) {
              console.error('Failed to process failed message:', error);
            }
          });
          
          // 加载已保存的任务
          this.loadAllTasks();
        }, error => {
          console.log('WebSocket connection failed:', error);
          this.socketConnected = false;
          this.addNotification('Failed to connect WebSocket', 'warning');
          // 加载任务，但不通过WebSocket
          this.loadAllTasks();
        });
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
        this.socketConnected = false;
        // 加载任务，但不通过WebSocket
        this.loadAllTasks();
      }
    },
    
    disconnectWebSocket() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.disconnect();
        this.socketConnected = false;
      }
    },
    
    subscribeToTask(taskName) {
      if (!this.socketConnected || !this.stompClient || this.taskSubscriptions.has(taskName)) {
        return;
      }
      
      try {
        this.stompClient.subscribe(`/topic/gwas/${taskName}`, message => {
          try {
            const task = JSON.parse(message.body);
            this.updateTaskRecord(task);
            
            // 当进度是25%的倍数时添加通知
            if (task.progress % 25 < 1) {
              this.addNotification(`Task ${task.taskName} progress: ${Math.round(task.progress)}%`, 'info');
            }
          } catch (error) {
            console.error('Failed to process task update:', error);
          }
        });
        
        this.taskSubscriptions.add(taskName);
        console.log(`Subscribed to updates for task: ${taskName}`);
      } catch (error) {
        console.error(`Failed to subscribe to task ${taskName}:`, error);
      }
    },
    
    // 文件上传处理
    handleFileChange(file) {
      if (file && file.raw) {
        this.fileList = [file];
      }
    },

    handleRemove() {
      this.fileList = [];
    },

    beforeRemove(file) {
      return confirm(`Are you sure you want to remove ${file.name}?`);
    },
    
    // 任务处理方法
    async loadAllTasks() {
      try {
        const response = await axios.get('/api/gwas/tasks');
        if (response.data) {
          this.tasks = response.data;
          
          // 如果WebSocket已连接，为每个未完成的任务设置订阅
          if (this.socketConnected) {
            this.tasks.forEach(task => {
              if (task.status === 'InProgress' || task.status === 'Queued') {
                this.subscribeToTask(task.taskName);
              }
            });
          }
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
        this.addNotification('Failed to load existing tasks', 'danger');
      }
    },
    
    updateTaskRecord(task) {
      if (!task || !task.id) return;
      
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index >= 0) {
        this.tasks[index] = task;
      } else {
        this.tasks.push(task);
      }
    },
    
    getStatusType(status) {
      if (!status) return 'info';
      
      switch (status) {
        case 'Completed': return 'success';
        case 'Failed': return 'danger';
        case 'InProgress': return 'warning';
        case 'Queued': return 'info';
        default: return 'info';
      }
    },
    
    addNotification(message, type = 'info') {
      const notification = {
        message,
        type,
        time: new Date().toLocaleTimeString()
      };
      
      this.notifications.unshift(notification);
      
      // 限制通知数量
      if (this.notifications.length > 10) {
        this.notifications.pop();
      }
    },
    
    // 业务逻辑方法
    async startAnalysis() {
      if (!this.canStartAnalysis) {
        ElMessage.error("Please complete all fields and upload a file.");
        return;
      }

      this.submitting = true;
      const formData = new FormData();
      formData.append("file", this.fileList[0].raw);
      formData.append("taskName", this.gwasParams.taskName);
      formData.append("threshold", this.gwasParams.threshold);
      formData.append("model", this.gwasParams.model);

      try {
        const response = await axios.post("/api/gwas/run", formData);
        this.addNotification(`Started GWAS analysis task: ${this.gwasParams.taskName}`, 'success');
        
        // 如果WebSocket连接，订阅该任务
        if (this.socketConnected) {
          this.subscribeToTask(this.gwasParams.taskName);
        }
        
        // 重置表单
        this.gwasParams.taskName = '';
        this.fileList = [];
        
        // 刷新任务列表
        await this.loadAllTasks();
      } catch (error) {
        console.error("Error running analysis:", error);
        this.addNotification(`Failed to start task: ${error.response?.data || error.message}`, 'danger');
      } finally {
        this.submitting = false;
      }
    },
    
    async getPreview(taskName) {
      try {
        const response = await axios.get(`/api/gwas/preview/${taskName}`);
        this.resultsPreview = response.data.preview;
        this.resultsAvailable = true;
        this.addNotification(`Loaded results preview for task: ${taskName}`, 'success');
      } catch (error) {
        console.error("Error getting preview:", error);
        this.addNotification(`Failed to load results: ${error.response?.data || error.message}`, 'danger');
      }
    },

    async downloadTaskResults(taskName) {
      try {
        const response = await axios.get(`/api/gwas/download/${taskName}`, {
          responseType: "blob",
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${taskName}_results.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.addNotification(`Downloaded results for task: ${taskName}`, 'success');
      } catch (error) {
        console.error("Error downloading results:", error);
        this.addNotification(`Failed to download results: ${error.response?.data || error.message}`, 'danger');
      }
    },

    async downloadResults() {
      // 下载当前查看的结果
      try {
        const currentTaskName = this.tasks.find(t => t.status === 'Completed')?.taskName;
        if (!currentTaskName) {
          ElMessage.warning("No completed task available for download");
          return;
        }
        
        await this.downloadTaskResults(currentTaskName);
      } catch (error) {
        console.error("Error downloading results:", error);
        this.addNotification(`Failed to download results: ${error.message}`, 'danger');
      }
    },
  }
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

  .start-button {
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-button {
  width: 120px;
}

.empty-data {
  text-align: center;
  padding: 20px;
  color: #909399;
}

.notifications-card {
  margin-top: 20px;
}

.notifications-card h3 {
  margin-bottom: 15px;
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
  
  