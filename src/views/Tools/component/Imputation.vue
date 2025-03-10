<template>
  <div class="imputation-page">
    <div class="header">
      <h2>Imputation Process</h2>
      <p>Fill missing SNP data before analysis.</p>
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
              action="#"
              :multiple="false"
              class="upload-demo"
              ref="upload"
              :file-list="fileLists"
              :on-change="handleFileChange"
              :on-remove="handleRemove"
              :auto-upload="false"
              :before-remove="beforeRemove"
              :limit="1"
              :http-request="() => {}"
            >
              <el-button type="primary" class="file-button">Select File</el-button>
              <div class="el-upload__tip" style="margin-left: 10px;">Only .vcf or .vcf.gz files</div>
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
          :loading="submitting"
          class="start-button"
        >
          <el-icon style="margin-right: 5px;"><upload-filled /></el-icon>
          Start Imputation
        </el-button>
      </div>
    </el-card>

    <!-- Step 3 -->
    <el-card class="step-card">
      <div class="step">
        <h3 style="margin-bottom: 10px;">STEP 3: View Uploaded Files</h3>
        <el-table v-if="uploadRecords.length > 0" :data="uploadRecords" border style="width: 100%">
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column prop="taskName" label="Task Name" />
          <el-table-column prop="fileName" label="File Name" />
          <el-table-column prop="panel" label="Panel" />
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
          <el-table-column label="Functions">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                @click="downloadFile(scope.row)"
                :disabled="!scope.row.status || scope.row.status !== 'Completed'"
              >
                Download
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-else class="empty-data">
          No imputation tasks found.
        </div>
      </div>
    </el-card>
    
    <!-- 实时通知区域 -->
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
import { Client } from '@stomp/stompjs';

export default {
  components: {
    UploadFilled
  },
  data() {
    return {
      imputationParams: {
        taskName: "",
        panel: "",
      },
      fileLists: [],
      uploadRecords: [],
      submitting: false,
      pollTimers: {},
      stompClient: null,
      socketConnected: false,
      notifications: [],
      taskSubscriptions: new Set() // 跟踪已订阅的任务
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
  created() {
    // 初始化WebSocket连接
    this.initWebSocket();
    
    // 加载之前的任务
    this.loadAllImputationTasks();
  },
  beforeUnmount() {
    // 组件销毁前，断开WebSocket连接
    this.disconnectWebSocket();
    
    // 清除所有轮询计时器
    Object.values(this.pollTimers).forEach(timer => clearTimeout(timer));
  },
  methods: {
    // WebSocket相关方法
    initWebSocket() {
      try {
        // 创建WebSocket连接
        const socket = new SockJS('/imputation-websocket');
        
        this.stompClient = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000, // 重连延迟
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: this.onSocketConnect,
          onDisconnect: this.onSocketDisconnect,
          onStompError: this.onSocketError
        });
        
        // 启动连接
        this.stompClient.activate();
      } catch (error) {
        console.error('Failed to initialize WebSocket:', error);
        this.fallbackToPolling();
      }
    },
    
    onSocketConnect(frame) {
      console.log('WebSocket connected:', frame);
      this.socketConnected = true;
      this.addNotification('WebSocket connection established. Real-time updates enabled.', 'success');
      
      // 订阅任务完成通道
      this.stompClient.subscribe('/topic/imputation/completed', message => {
        try {
          const record = JSON.parse(message.body);
          this.addNotification(`Task ${record.taskName} completed!`, 'success');
          this.updateTaskRecord(record);
        } catch (error) {
          console.error('Failed to process completed message:', error);
        }
      });
      
      // 订阅任务失败通道
      this.stompClient.subscribe('/topic/imputation/failed', message => {
        try {
          const record = JSON.parse(message.body);
          this.addNotification(`Task ${record.taskName} failed: ${record.errorMessage}`, 'danger');
          this.updateTaskRecord(record);
        } catch (error) {
          console.error('Failed to process failed message:', error);
        }
      });
      
      // 订阅先前保存的所有任务
      this.subscribeToSavedTasks();
    },
    
    onSocketDisconnect(frame) {
      console.log('WebSocket disconnected:', frame);
      this.socketConnected = false;
      this.addNotification('WebSocket connection lost. Falling back to polling.', 'warning');
      this.fallbackToPolling();
    },
    
    onSocketError(frame) {
      console.error('WebSocket error:', frame);
      this.addNotification('WebSocket error occurred.', 'danger');
    },
    
    disconnectWebSocket() {
      if (this.stompClient && this.stompClient.connected) {
        this.stompClient.deactivate();
        this.socketConnected = false;
      }
    },
    
    subscribeToTask(taskName) {
      // 如果WebSocket未连接或已订阅，则跳过
      if (!this.socketConnected || !this.stompClient || this.taskSubscriptions.has(taskName)) {
        return;
      }
      
      try {
        // 订阅特定任务的进度更新
        const subscription = this.stompClient.subscribe(`/topic/imputation/${taskName}`, message => {
          try {
            const record = JSON.parse(message.body);
            this.updateTaskRecord(record);
            
            // 只有进度发生显著变化才添加通知
            if (record.progress % 25 === 0) { // 每25%通知一次
              this.addNotification(`Task ${record.taskName} progress: ${Math.round(record.progress)}%`, 'info');
            }
          } catch (error) {
            console.error('Failed to process task update:', error);
          }
        });
        
        // 记录订阅，避免重复订阅
        this.taskSubscriptions.add(taskName);
        console.log(`Subscribed to updates for task: ${taskName}`);
      } catch (error) {
        console.error(`Failed to subscribe to task ${taskName}:`, error);
      }
    },
    
    subscribeToSavedTasks() {
      try {
        const savedTasks = JSON.parse(localStorage.getItem('imputationTasks') || '[]');
        savedTasks.forEach(taskName => {
          this.subscribeToTask(taskName);
        });
      } catch (error) {
        console.error('Failed to subscribe to saved tasks:', error);
      }
    },
    
    fallbackToPolling() {
      // 当WebSocket不可用时，回退到轮询模式
      this.loadAllImputationTasksWithPolling();
    },
    
    addNotification(message, type = 'info') {
      const notification = {
        message,
        type,
        time: new Date().toLocaleTimeString()
      };
      
      this.notifications.unshift(notification);
      
      // 限制通知数量，保持界面整洁
      if (this.notifications.length > 10) {
        this.notifications.pop();
      }
    },
    
    // 轮询相关方法
    async loadAllImputationTasks() {
      try {
        const savedTasks = localStorage.getItem('imputationTasks');
        if (savedTasks) {
          const taskNames = JSON.parse(savedTasks);
          for (const taskName of taskNames) {
            await this.getProgress(taskName);
            
            // 如果WebSocket已连接，为每个任务设置订阅
            if (this.socketConnected) {
              this.subscribeToTask(taskName);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    },
    
    async loadAllImputationTasksWithPolling() {
      try {
        const savedTasks = localStorage.getItem('imputationTasks');
        if (savedTasks) {
          const taskNames = JSON.parse(savedTasks);
          for (const taskName of taskNames) {
            await this.getProgress(taskName);
            
            // 设置轮询以跟踪进度
            const records = this.uploadRecords.filter(r => r.taskName === taskName);
            const inProgress = records.some(r => 
              r.status === 'InProgress' || r.status === 'Queued'
            );
            
            if (inProgress) {
              this.setupPolling(taskName);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load tasks with polling:', error);
      }
    },
    
    // 请求进度信息
    async getProgress(taskName) {
      if (!taskName) return;
      
      try {
        const response = await axios.get(`/imputation/status/${taskName}`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // 更新表格数据
          const records = response.data;
          
          // 检查是否需要添加或更新记录
          for (const record of records) {
            if (!record || !record.id) continue;
            
            this.updateTaskRecord(record);
          }
          
          return records;
        }
        return [];
      } catch (error) {
        console.error('Failed to fetch task status:', error);
        return [];
      }
    },
    
    // 设置轮询以更新任务进度
    setupPolling(taskName) {
      // 如果WebSocket已连接或已在轮询，则不设置轮询
      if (this.socketConnected || this.pollTimers[taskName]) {
        return;
      }
      
      // 实现自适应轮询间隔
      let interval = 2000; // 初始间隔2秒
      const maxInterval = 5000; // 最大间隔5秒
      
      const poll = async () => {
        try {
          const records = await this.getProgress(taskName);
          
          // 检查该任务是否已完成或失败
          const isCompleted = records.every(r => 
            r.status === 'Completed' || r.status === 'Failed'
          );
          
          if (isCompleted) {
            // 如果任务已完成，清除轮询
            clearTimeout(this.pollTimers[taskName]);
            delete this.pollTimers[taskName];
            
            // 添加通知
            const status = records[0].status;
            const message = `Task ${taskName} ${status.toLowerCase()}`;
            this.addNotification(message, status === 'Completed' ? 'success' : 'danger');
          } else {
            // 继续轮询
            this.pollTimers[taskName] = setTimeout(poll, interval);
          }
        } catch (error) {
          console.error('Polling failed:', error);
          interval = Math.min(interval * 1.5, maxInterval);
          this.pollTimers[taskName] = setTimeout(poll, interval);
        }
      };
      
      // 开始轮询
      this.pollTimers[taskName] = setTimeout(poll, interval);
    },

    updateTaskRecord(record) {
      if (!record || !record.id) return;
      
      // 创建一个干净的对象副本，避免引用问题
      const cleanRecord = JSON.parse(JSON.stringify(record));
      
      const existingIndex = this.uploadRecords.findIndex(r => r.id === cleanRecord.id);
      if (existingIndex >= 0) {
        // 替换现有记录
        this.uploadRecords.splice(existingIndex, 1, cleanRecord);
      } else {
        // 添加新记录
        this.uploadRecords.push(cleanRecord);
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
    
    handleFileChange(file) {
      // 确保file对象有效
      if (file && file.raw) {
        this.fileLists = [file];
      }
    },
    
    handleRemove() {
      this.fileLists = [];
    },
    
    beforeRemove(file) {
      return this.$confirm(`Are you sure you want to remove ${file.name}?`);
    },
    
    async startImputation() {
      if (!this.canStartImputation) {
        this.$message.error("Please complete all fields.");
        return;
      }

      if (!this.fileLists[0] || !this.fileLists[0].raw) {
        this.$message.error("Invalid file selected.");
        return;
      }

      this.submitting = true;
      const formData = new FormData();
      formData.append("file", this.fileLists[0].raw);
      formData.append("taskName", this.imputationParams.taskName);
      formData.append("panel", this.imputationParams.panel);

      try {
        const response = await axios.post('/imputation/run', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // 保存任务信息到localStorage
        const savedTasks = JSON.parse(localStorage.getItem('imputationTasks') || '[]');
        if (!savedTasks.includes(this.imputationParams.taskName)) {
          savedTasks.push(this.imputationParams.taskName);
          localStorage.setItem('imputationTasks', JSON.stringify(savedTasks));
        }
        
        // 立即获取一次任务状态
        await this.getProgress(this.imputationParams.taskName);
        
        // 如果WebSocket已连接，订阅该任务的更新
        if (this.socketConnected) {
          this.subscribeToTask(this.imputationParams.taskName);
        } else {
          // 否则启动轮询
          this.setupPolling(this.imputationParams.taskName);
        }
        
        this.$message.success("Imputation started successfully!");
        this.addNotification(`Started imputation task: ${this.imputationParams.taskName}`, 'success');
        this.resetForm();
      } catch (error) {
        console.error('Failed to start imputation:', error);
        this.$message.error(error.response?.data || "Failed to start imputation.");
        this.addNotification(`Failed to start task: ${error.message}`, 'danger');
      } finally {
        this.submitting = false;
      }
    },
    
    async downloadFile(record) {
      if (!record || !record.taskName || record.status !== 'Completed') {
        this.$message.warning('This task is not completed yet.');
        return;
      }
      
      try {
        // 创建一个下载链接
        window.location.href = `/imputation/download/${record.taskName}`;
        this.$message.success('Download started');
        this.addNotification(`Started downloading results for task: ${record.taskName}`, 'info');
      } catch (error) {
        console.error('Failed to download file:', error);
        this.$message.error("Failed to download the file.");
        this.addNotification(`Download failed: ${error.message}`, 'danger');
      }
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

.header {
  margin-bottom: 20px;
}



.start-button {
  width: 200px;
}

.file-button {
  width: 120px;
}

.results-card {
  margin-top: 20px;
}

.results-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.chart {
  height: 300px;
  background: #f9f9f9;
  border-radius: 4px;
}

.summary, .high-frequency-variants {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
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
/* 根据需要添加其他样式 */
</style>

