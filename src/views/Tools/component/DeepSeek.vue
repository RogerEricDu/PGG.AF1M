<template>
  <div class="deepseek-container">
    <!-- 骨架屏 -->
    <el-skeleton v-if="loading" rows="6" animated />

    <div v-else :style="{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.3s' }">
      <!-- SNP 注释 -->
<!--       <el-card class="box-card" shadow="hover">
        <template #header>
            <span>SNP Annotation From DeepSeek</span>
        </template>
            <el-form :inline="true" @submit.prevent>
              <el-form-item>
                <el-input
                  v-model="snpInput.chromosome"
                  placeholder="Chromosome"
                  style="width: 120px;"
                />
              </el-form-item>
              <el-form-item>
                <el-input
                  v-model="snpInput.position"
                  placeholder="Position"
                  style="width: 120px;"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="fetchSnpData">
                  Query
                </el-button>
              </el-form-item>
            </el-form>

        <el-descriptions v-if="deepseekResult" :column="2" border>
          <el-descriptions-item label="SNP ID">{{ deepseekResult?.snp_id || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Variant Type">{{ deepseekResult?.variant_type || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Consequence">{{ deepseekResult?.consequence || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Sift Prediction">{{ deepseekResult?.sift_prediction || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Polyphen Prediction">{{ deepseekResult?.polyphen_prediction || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Clinical Significance">{{ deepseekResult?.clinical_significance || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Gene Symbol">{{ deepseekResult?.gene_symbol || 'N/A' }}</el-descriptions-item>
        </el-descriptions>
        <el-empty v-else description="Enter chromosome and position to query SNP" />
      </el-card> -->

      <!-- 基因注释 -->
      <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
        <template #header>
            <span>Gene Annotation From DeepSeek</span>
                    
        </template>
            <el-form :inline="true" @submit.prevent>
              <el-form-item>
                <el-input
                  v-model="geneInput.symbol"
                  placeholder="Gene Symbol"
                  style="width: 200px;"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :disabled="!geneInput.symbol" @click="fetchGeneData">
                  Query
                </el-button>
              </el-form-item>
            </el-form>
        <el-descriptions v-if="geneInfo.symbol !== 'N/A'" :column="1" border>
          <el-descriptions-item label="Gene Symbol">{{ geneInfo.symbol || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Description">{{ geneInfo.description || 'N/A' }}</el-descriptions-item>
          <el-descriptions-item label="Function">{{ geneInfo.function || 'N/A' }}</el-descriptions-item>
        </el-descriptions>
        <el-empty v-else description="Enter gene symbol to query gene information" />
      </el-card>
    </div>

    <!-- 问答区域 -->
    <el-card class="box-card" shadow="hover" style="margin-top: 30px;">
      <template #header>
        <span>Q&A Assistant (Within 40 words)</span>
      </template>
      <el-form :inline="true" @submit.prevent>
        <el-form-item>
          <el-input
            v-model="userQuestion"
            maxlength="40"
            show-word-limit
            placeholder="What would you like to ask about this SNP or Gene"
            style="width: 300px;"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!userQuestion || chatCount >= MAX_CHAT" @click="submitQuestion">
            Submit
          </el-button>
        </el-form-item>
        <el-form-item v-if="chatCount > 0">
          <span style="color: #999;">Already Used {{ chatCount }}/{{ MAX_CHAT }} Times</span>
        </el-form-item>
      </el-form>

      <div v-if="chatAnswer" style="margin-top: 20px; white-space: pre-wrap;">
        <el-alert type="success" :closable="false" :title="'Answer：' + chatAnswer" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { annotateSnp, annotateGene, askDeepSeek } from '@/api/deepseek'

// 常量
const MAX_CHAT = 3

// 响应式数据
const deepseekResult = ref(null)
const geneInfo = ref({
  symbol: 'N/A',
  description: 'N/A',
  function: 'N/A'
})
const loading = ref(false)
const userQuestion = ref('')
const chatAnswer = ref(null)
const errorMessage = ref('')
const chatCount = ref(0)

// 输入数据
const snpInput = ref({
  chromosome: '',
  position: ''
})

const geneInput = ref({
  symbol: ''
})

// 获取SNP数据
const fetchSnpData = async () => {
  if (!snpInput.value.chromosome || !snpInput.value.position) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const response = await annotateSnp({
      chromosome: snpInput.value.chromosome,
      position: snpInput.value.position
    })
    
    console.log('SNP API Response:', response)
    
    if (!response) {
      throw new Error('No response received from SNP annotation service')
    }

    deepseekResult.value = {
      snp_id: response.snp_id || 'N/A',
      variant_type: response.variant_type || 'N/A',
      consequence: response.consequence || 'N/A',
      impact: response.impact || 'N/A',
      sift_prediction: response.sift_prediction || 'N/A',
      polyphen_prediction: response.polyphen_prediction || 'N/A',
      clinical_significance: response.clinical_significance || 'N/A',
      gene_symbol: response.gene_symbol || 'N/A',
      gene_function: response.gene_function || 'N/A'
    }
    
  } catch (error) {
    console.error('DeepSeek SNP query failed:', error)
    errorMessage.value = error.message || 'Failed to fetch SNP annotation'
    
    deepseekResult.value = {
      snp_id: 'N/A',
      variant_type: 'N/A',
      consequence: 'N/A',
      impact: 'N/A',
      sift_prediction: 'N/A',
      polyphen_prediction: 'N/A',
      clinical_significance: 'N/A',
      gene_symbol: 'N/A',
      gene_function: 'N/A'
    }
  } finally {
    loading.value = false
  }
}

// 获取Gene数据
const fetchGeneData = async () => {
  if (!geneInput.value.symbol) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    const geneResponse = await annotateGene({
      geneSymbol: geneInput.value.symbol
    })
    
    geneInfo.value = {
      symbol: geneInput.value.symbol,
      description: geneResponse?.description || 'N/A',
      function: geneResponse?.function || 'N/A'
    }
  } catch (geneError) {
    console.error('Gene annotation error:', geneError)
    geneInfo.value = {
      symbol: geneInput.value.symbol,
      description: 'Failed to load gene details',
      function: 'Failed to load gene details'
    }
  } finally {
    loading.value = false
  }
}

// 提交问题
const submitQuestion = async () => {
  if (!userQuestion.value.trim()) return;
  
  try {
    loading.value = true;
    const response = await askDeepSeek({
      question: userQuestion.value
    });
    
    chatAnswer.value = response.answer;
    chatCount.value++;
    
  } catch (error) {
    errorMessage.value = error.response?.answer?.message || error.message;
    console.error("Query failed: ", error);
  } finally {
    loading.value = false;
    userQuestion.value = '';
  }
}
</script>



<style scoped>
.deepseek-container {
padding: 20px;
}
.result-box {
display: flex;
flex-direction: column;
gap: 20px;
}
.loading-box {
margin-top: 40px;
}
</style>
