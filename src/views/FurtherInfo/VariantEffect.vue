<template>
  <div class="variant-effect-container">
    <!-- 表格标题和下载按钮 -->
    <div class="table-header">
      <el-button type="primary" @click="downloadExcel">Download</el-button>
    </div>

    <!-- 表格内容 -->
    <div class="table-wrapper">
      <el-table :data="variantData" class="styled-table">
        <el-table-column prop="chr" label="Chr" width="55" />
        <el-table-column prop="position" label="Pos" width="100" />
        <el-table-column prop="refAllele" label="Ref" width="55" />
        <el-table-column prop="altAllele" label="Alt" width="55" />
        <el-table-column prop="symbol" label="SYMBOL" width="100" />
        <el-table-column prop="biotype" label="BIOTYPE" width="150" />
        <el-table-column prop="consequence" label="Consequence" width="200" />
        <el-table-column prop="feature" label="Feature" width="200" />
        <el-table-column prop="featureType" label="Feature Type" />
      </el-table>
    </div>

    <!-- 分页控件 -->
    <div class="pagination-container" style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next"
        :page-sizes="[10, 20, 40, 100]"
      />
    </div>

    <!-- VEP 注释结果展示 -->
    <el-card v-if="vepDetail" class="vep-detail-card" style="margin-top: 30px;">
      <template #header>
        <span>Annotation Results From VEP</span>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="Gene Symbol">{{ vepDetail.transcript_consequences?.[0]?.gene_symbol || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Consequence">{{ vepDetail.transcript_consequences?.[0]?.consequence_terms?.join(', ') || '-' }}</el-descriptions-item>
        <el-descriptions-item label="SIFT">{{ vepDetail.transcript_consequences?.[0]?.sift_prediction || '-' }}</el-descriptions-item>
        <el-descriptions-item label="PolyPhen">{{ vepDetail.transcript_consequences?.[0]?.polyphen_prediction || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Variant Class">{{ vepDetail.variant_class || '-' }}</el-descriptions-item>
        <el-descriptions-item label="HGVS">{{ vepDetail.transcript_consequences?.[0]?.hgvsp || '-' }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue';
import * as XLSX from 'xlsx';
/* import { getVariantEffect } from '@/api/furtherInfo.js'; */

// 接收父组件传递的 `chromosome` 和 `position`
const props = defineProps({
  chromosome: String,
  position: String
});

// 表格相关数据
const variantData = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);
// VEP 注释结果
const vepDetail = ref(null);

// 模拟表格数据
const fullMockData = Array.from({ length: 5 }, (_, i) => ({
  chr: '1',
  position: 13273,
  refAllele: 'G',
  altAllele: 'C',
  symbol: 'GENE' + i,
  biotype: 'protein_coding',
  consequence: 'missense_variant',
  feature: 'ENST00000' + i,
  featureType: 'Transcript'
}));

// 模拟 VEP 注释数据
const mockVepResult = {
  variant_class: 'SNV',
  transcript_consequences: [{
    gene_symbol: 'TP53',
    consequence_terms: ['missense_variant'],
    sift_prediction: 'tolerated',
    polyphen_prediction: 'benign',
    hgvsp: 'p.Gly123Arg'
  }]
};
const fetchVariantEffect = () => {
  const start = (page.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  variantData.value = fullMockData.slice(start, end);
  total.value = fullMockData.length;
};

const fetchVepAnnotation = () => {
  vepDetail.value = mockVepResult;
};


/* // 获取表格数据
const fetchVariantEffect = async () => {
  if (!props.chromosome || !props.position) return;

  const requestData = {
    chromosome: props.chromosome,
    position: props.position,
    page: page.value,
    size: pageSize.value
  };

  try {
    const response = await getVariantEffect(requestData);
    if (response.code === 200) {
      variantData.value = response.data.map(item => ({
        ...item,
        chr: props.chromosome
      }));
      total.value = response.total;
    } else {
      console.error("Error fetching data:", response.message);
    }
  } catch (error) {
    console.error("API request failed:", error);
  }
};

// 获取 VEP 注释
const fetchVepAnnotation = async () => {
  if (!props.chromosome || !props.position) return;

  try {
    const response = await fetch('/vep/api/annotate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chromosome: props.chromosome,
        position: props.position
      })
    });
    const result = await response.json();
    vepDetail.value = result;
  } catch (err) {
    console.error("Failed to fetch VEP annotation:", err);
  }
}; */

// 下载 Excel
const downloadExcel = () => {
  const ws_data = [
    ['Chr', 'Pos', 'Ref', 'Alt', 'SYMBOL', 'BIOTYPE', 'Consequence', 'Feature', 'Feature Type'],
    ...variantData.value.map(row => [
      row.chr, row.position, row.refAllele, row.altAllele,
      row.symbol, row.biotype, row.consequence, row.feature, row.featureType
    ])
  ];

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'VariantEffect');
  XLSX.writeFile(wb, 'VariantEffect.xlsx');
};

// 分页响应
const handleSizeChange = (size) => {
  pageSize.value = size;
  page.value = 1;
  fetchVariantEffect();
};
const handlePageChange = (newPage) => {
  page.value = newPage;
  fetchVariantEffect();
};

// 自动加载数据和注释
watch([() => props.chromosome, () => props.position], () => {
  fetchVariantEffect();
  fetchVepAnnotation();
}, { immediate: true });

// 挂载时加载一次（防止空白）
onMounted(() => {
  fetchVariantEffect();
  fetchVepAnnotation();
});
</script>

<style scoped>
.variant-effect-container {
  padding: 20px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table-wrapper {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
}

.el-table {
  border-collapse: collapse;
  width: 100%;
}

.styled-table ::v-deep .el-table__cell {
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
}

.styled-table ::v-deep .el-table__row:last-child .el-table__cell {
  border-bottom: none;
}
.styled-table ::v-deep .el-table__cell:last-child {
  border-right: none;
}

.styled-table ::v-deep .el-table__header-wrapper th {
  background-color: #f8f4f4;
  color: black;
  text-align: center;
  font-weight: bold;
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
  filter: brightness(1.2);
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
}

.vep-detail-card {
  border: 1px solid #dcdfe6;
  border-radius: 8px;
}
</style>
