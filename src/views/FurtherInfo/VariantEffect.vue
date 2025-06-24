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
        <el-table-column prop="symbol" label="Symbol" width="100" />
        <el-table-column prop="gene" label="Gene" width="100" />
        <el-table-column prop="biotype" label="Biotype" width="150" />
        <el-table-column prop="consequence" label="Consequence" width="180" />
        <el-table-column prop="feature" label="Feature" width="180" />
        <el-table-column prop="featureType" label="Feature Type" width="170" />
        <el-table-column prop="featureStrand" label="Feature Strand" width="80" />
        <el-table-column prop="exon" label="Exon" width="100" />
        <el-table-column prop="cDNAPosition" label="cDNA Position" width="100">
          <template #default="scope">{{ scope.row.cDNAPosition }}</template>
        </el-table-column>
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
        :page-sizes="[10, 20, 50]"
      />
    </div>

  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue';
import * as XLSX from 'xlsx';
import { getVEPAnnotation } from '@/api/furtherInfo.js';

const props = defineProps({
  chromosome: String,
  position: String
});

const variantData = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);

// 获取 VEP 注释数据
const fetchVepAnnotation = async () => {
  if (!props.chromosome || !props.position) {
    console.warn('Chromosome or position not set');
    return;
  }

  try {
    const requestData = {
      chromosome: Number(props.chromosome),
      position: Number(props.position),
      page: page.value,
      size: pageSize.value
    };

    /* console.log('Sending request with data:', requestData); */
    const response = await getVEPAnnotation(requestData);

    console.log('API response:', response);

    const results = response.data || [];
    variantData.value = results.map(item => ({
      chr: props.chromosome,  // 明确赋值
      position: item.position,
      refAllele: item.refAllele,
      altAllele: item.altAllele,
      symbol: item.symbol,
      gene: item.gene,
      biotype: item.biotype,
      consequence: item.consequence,
      feature: item.feature,
      featureType: item.featureType,
      featureStrand: item.featureStrand,
      exon: item.exon,
      cDNAPosition: item.cDNAPosition
    }));
    console.log('Variant response:', variantData.value);
    total.value = response.data?.total || results.length;

  } catch (error) {
    console.error('Failed to fetch VEP annotation:', error);
  }
};


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

// 分页
const handleSizeChange = (size) => {
  pageSize.value = size;
  page.value = 1;
  fetchVepAnnotation();
};

const handlePageChange = (newPage) => {
  page.value = newPage;
  fetchVepAnnotation();
};

// 监听 props 变化并立即加载
watch([() => props.chromosome, () => props.position], () => {
  page.value = 1;
  fetchVepAnnotation();
}, { immediate: true });

onMounted(() => {
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
v-deep.pagination-container {
  margin-top: 20px;
  text-align: center;
}
</style>
