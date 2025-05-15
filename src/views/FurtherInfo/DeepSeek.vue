<template>
  <div class="deepseek-container">
    <!-- 骨架屏 -->
    <el-skeleton v-if="loading" rows="6" animated />

    <div v-else-if="deepseekResult" :style="{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.3s' }">
      <!-- SNP 注释 -->
      <el-card class="box-card" shadow="hover">
        <template #header>
          <span>SNP Annotation Results From DeepSeek</span>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="SNP ID">{{ deepseekResult.snp_id || '-' }}</el-descriptions-item>
          <el-descriptions-item label="Functional Annotation">{{ deepseekResult.snp_function || '-' }}</el-descriptions-item>
          <el-descriptions-item label="Correlation">{{ deepseekResult.association || '-' }}</el-descriptions-item>
          <el-descriptions-item label="Affected Genes">{{ deepseekResult.gene_symbol || '-' }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <!-- 基因注释 -->
      <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
        <template #header>
          <span>Gene Annotation Results From DeepSeek</span>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="Gene Symbol">{{ geneInfo.symbol || '-' }}</el-descriptions-item>
          <el-descriptions-item label="Description">{{ geneInfo.description || '-' }}</el-descriptions-item>
          <el-descriptions-item label="Function">{{ geneInfo.function || '-' }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>

    <!-- 无数据 -->
    <div v-else class="loading-box">
      <el-empty description="Waiting for DeepSeek Results" />
    </div>

    <!-- 问答区域 -->
    <el-card class="box-card" shadow="hover" style="margin-top: 30px;">
      <template #header>
        <span>Q&A Assistant (Within 20 words)</span>
      </template>
      <el-form :inline="true" @submit.prevent>
        <el-form-item>
          <el-input
            v-model="userQuestion"
            maxlength="20"
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
import { ref, defineProps, watch } from 'vue'
import { annotateSnp, annotateGene, askDeepSeek } from '@/api/deepseek'

const props = defineProps({
  chromosome: String,
  position: String
})

// 响应式数据
const deepseekResult = ref(null)
const geneInfo = ref({
  symbol: 'NA',
  description: 'NA',
  function: 'NA'
})
const loading = ref(false)
const userQuestion = ref('')
const chatAnswer = ref(null)
const errorMessage = ref('')

// 提交问题
const submitQuestion = async () => {
  if (!userQuestion.value.trim()) return
  
  try {
    loading.value = true
    const response = await askDeepSeek({
      question: userQuestion.value
    })
    
    // 处理问答接口返回的JSON数据
    if (typeof response.data === 'string') {
      try {
        chatAnswer.value = JSON.parse(response.data)
      } catch {
        chatAnswer.value = { answer: response.data }
      }
    } else {
      chatAnswer.value = response.data
    }
    
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message
    console.error("Query failed: ", error)
  } finally {
    loading.value = false
    userQuestion.value = ''
  }
}

// 获取SNP数据并决定是否获取基因数据
const fetchData = async () => {
  if (!props.chromosome || !props.position) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    // 1. 先获取SNP注释
    const snpResponse = await annotateSnp({
      chromosome: props.chromosome,
      position: props.position
    })
    
    // 处理SNP响应
    deepseekResult.value = typeof snpResponse.data === 'string' ? 
      JSON.parse(snpResponse.data) : 
      snpResponse.data
    
    // 2. 检查gene_symbol是否有有效值
    if (deepseekResult.value.gene_symbol && 
        deepseekResult.value.gene_symbol !== 'NA') {
      
      // 调用基因注释接口
      const geneResponse = await annotateGene({
        geneSymbol: deepseekResult.value.gene_symbol
      })
      
      // 处理基因响应
      geneInfo.value = typeof geneResponse.data === 'string' ? 
        JSON.parse(geneResponse.data) : 
        geneResponse.data
    } else {
      // 如果没有有效基因符号，重置基因信息为NA
      geneInfo.value = {
        symbol: 'NA',
        description: 'NA',
        function: 'NA'
      }
    }
    
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message
    console.error('DeepSeek query failed:', error)
  } finally {
    loading.value = false
  }
}

// 监听props变化
watch(
  [() => props.chromosome, () => props.position],
  fetchData,
  { immediate: true }
)
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
