<template>
<div class="deepseek-container">
      <div v-if="deepseekResult" class="result-box">
            <el-card class="box-card" shadow="hover">
            <template #header>
                  <span>SNP Annotation Results From DeepSeek</span>
            </template>
            <el-descriptions :column="2" border>
                  <el-descriptions-item label="SNP ID">{{ deepseekResult.snp_id || '-' }}</el-descriptions-item>
                  <el-descriptions-item label="功能注释">{{ deepseekResult.snp_function || '-' }}</el-descriptions-item>
                  <el-descriptions-item label="相关性">{{ deepseekResult.association || '-' }}</el-descriptions-item>
                  <el-descriptions-item label="影响基因">{{ deepseekResult.gene_symbol || '-' }}</el-descriptions-item>
            </el-descriptions>
            </el-card>

            <el-card class="box-card" shadow="hover" style="margin-top: 20px;">
            <template #header>
                  <span>Gene Annotation Results From DeepSeek</span>
            </template>
            <el-descriptions :column="1" border>
                  <el-descriptions-item label="Gene Symbol">{{ geneInfo.symbol || '-' }}</el-descriptions-item>
                  <el-descriptions-item label="描述">{{ geneInfo.description || '-' }}</el-descriptions-item>
                  <el-descriptions-item label="功能">{{ geneInfo.function || '-' }}</el-descriptions-item>
            </el-descriptions>
            </el-card>
            </div>

            <div v-else class="loading-box">
            <el-empty description="暂无 DeepSeek 注释结果" />
      </div>

      <!-- 对话式提问 -->
      <el-card class="box-card" shadow="hover" style="margin-top: 30px;">
            <template #header>
            <span>问答助手（20字以内）</span>
            </template>
            <el-form :inline="true" @submit.prevent>
            <el-form-item>
                  <el-input
                  v-model="userQuestion"
                  maxlength="20"
                  show-word-limit
                  placeholder="你想问这个SNP或基因什么？"
                  style="width: 300px;"
                  />
            </el-form-item>
            <el-form-item>
                  <el-button type="primary" :disabled="!userQuestion || chatCount >= MAX_CHAT" @click="submitQuestion">
                  提问
                  </el-button>
            </el-form-item>
            <el-form-item v-if="chatCount > 0">
                  <span style="color: #999;">已使用 {{ chatCount }}/{{ MAX_CHAT }} 次</span>
            </el-form-item>
            </el-form>

            <div v-if="chatAnswer" style="margin-top: 20px; white-space: pre-wrap;">
            <el-alert type="success" :closable="false" :title="'AI 回答：' + chatAnswer" />
            </div>
      </el-card>

</div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue'

// 接收父组件传递的 chr 和 pos
const props = defineProps({
chromosome: String,
position: String
})

const deepseekResult = ref(null)
const geneInfo = ref({})
const queryCount = ref(0)
const MAX_QUERY = 3

const userQuestion = ref('')
const chatAnswer = ref('')
const chatCount = ref(0)
const MAX_CHAT = 3

// 提交用户问题（模拟回答逻辑）
const submitQuestion = async () => {
  if (!userQuestion.value || chatCount.value >= MAX_CHAT) return
  chatCount.value++

  try {
    // 模拟回答生成，可替换成实际 AI 调用
    const question = userQuestion.value
    const gene = geneInfo.value.symbol || '该基因'
    const mockAnswers = [
      `SNP 位于 ${gene}，与脑部发育相关。`,
      `${gene} 可能影响心血管健康。`,
      `根据 DeepSeek 数据，该 SNP 在亚洲人群中频率较高。`,
      `${gene} 是一种关键代谢基因。`,
      `这个变异可能影响蛋白结构功能。`
    ]
    const randomAnswer = mockAnswers[Math.floor(Math.random() * mockAnswers.length)]
    chatAnswer.value = randomAnswer
    userQuestion.value = ''
  } catch (err) {
    console.error("问答失败", err)
    chatAnswer.value = '抱歉，暂时无法回答您的问题。'
  }
}


// 模拟请求 DeepSeek API 注释（可以改成你实际的 API）
const fetchDeepseekData = async () => {
if (!props.chromosome || !props.position || queryCount.value >= MAX_QUERY) return

queryCount.value++
try {
      // 模拟 DeepSeek 返回结果
      const snpResult = {
      snp_id: `${props.chromosome}:${props.position}`,
      snp_function: 'Missense variant in protein-coding gene',
      association: 'Associated with lipid metabolism',
      gene_symbol: 'APOE'
      }
      deepseekResult.value = snpResult

      // 模拟 gene 相关注释结果
      geneInfo.value = {
      symbol: 'APOE',
      description: 'Apolipoprotein E, involved in lipid transport and metabolism.',
      function: 'Plays a role in lipid metabolism and is associated with Alzheimer\'s disease.'
      }
} catch (error) {
      console.error('DeepSeek 查询失败:', error)
}
}

// 自动触发查询
watch(
[() => props.chromosome, () => props.position],
() => {
      if (props.chromosome && props.position) {
      fetchDeepseekData()
      }
},
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
