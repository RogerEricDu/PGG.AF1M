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
        <el-form-item label="Imputation Method">
          <el-select v-model="imputationParams.method">
            <el-option label="KNN Imputation" value="knn"></el-option>
            <el-option label="Random Forest" value="rf"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="runImputation">Start Imputation</el-button>
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
export default {
  data() {
    return {
      imputationParams: {
        method: 'knn', // Default method
      },
      isImputing: false,
      imputationProgress: 0,
    };
  },
  methods: {
    runImputation() {
      this.isImputing = true;
      this.imputationProgress = 0;
      // Placeholder for imputation process logic
      this.imputationSimulation();
    },
    imputationSimulation() {
      // Simulate progress for demonstration
      const interval = setInterval(() => {
        if (this.imputationProgress >= 100) {
          clearInterval(interval);
          this.isImputing = false;
          this.$message.success('Imputation Complete!');
        } else {
          this.imputationProgress += 10;
        }
      }, 500);
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


</style>
