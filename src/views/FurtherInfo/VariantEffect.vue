<template>
  <div class="variant-effect-container">
    <!-- 表格标题和下载按钮 -->
    <div class="table-header">
      <el-button type="primary" @click="downloadExcel">Download</el-button>
    </div>

    <!-- 表格内容 -->
    <div class="table-wrapper">
      <el-table :data="variantData" class="styled-table">
        <el-table-column prop="chr" label="Chr" width="55"></el-table-column>
        <el-table-column prop="position" label="Pos" width="100"></el-table-column>
        <el-table-column prop="refAllele" label="Ref" width="55"></el-table-column>
        <el-table-column prop="altAllele" label="Alt" width="55"></el-table-column>
        <el-table-column prop="symbol" label="SYMBOL" width="100"></el-table-column>
        <el-table-column prop="biotype" label="BIOTYPE" width="150"></el-table-column>
        <el-table-column prop="consequence" label="Consequence" width="200"></el-table-column>
        <el-table-column prop="feature" label="Feature" width="200"></el-table-column>
        <el-table-column prop="featureType" label="Feature Type"></el-table-column>
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
  </div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps } from 'vue';
import { getVariantEffect } from '@/api/furtherInfo.js';
import * as XLSX from 'xlsx';

// 接收父组件传递的 `chromosome` 和 `position`
const props = defineProps({
  chromosome: String,
  position: String
});

// 定义响应式数据
const variantData = ref([]);
const total = ref(0);
const page = ref(1);
const pageSize = ref(10);

// 获取数据的方法
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

// 监听 `chromosome`、`position`、`page` 和 `pageSize` 变化，自动刷新数据
watch([() => props.chromosome, () => props.position, page, pageSize], fetchVariantEffect, { immediate: true });

// 处理分页大小变化
const handleSizeChange = (size) => {
  pageSize.value = size;
  page.value = 1;
};

// 处理页码变化
const handlePageChange = (newPage) => {
  page.value = newPage;
};

// 导出 Excel 文件
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

// 组件挂载后首次获取数据
onMounted(fetchVariantEffect);
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
  border: 1px solid #ccc; /* 外边框 */
  border-radius: 8px;
  overflow: hidden;
}

.el-table {
  border-collapse: collapse; /* 边框合并 */
  width: 100%; /* 表格宽度充满父容器 */
}

.styled-table ::v-deep .el-table__cell {
  border-right: 1px solid #ddd; /* 列分隔线 */
  border-bottom: 1px solid #ddd; /* 行分隔线 */
  text-align: center; /* 表格内容居中 */
  font-size: 14px;
}

/* 去掉最后一行和最后一列的多余边框 */
.styled-table ::v-deep .el-table__row:last-child .el-table__cell {
  border-bottom: none;
}
.styled-table ::v-deep .el-table__cell:last-child {
  border-right: none;
}

/* 表头样式 */
.styled-table ::v-deep .el-table__header-wrapper th {
  background-color: #f8f4f4; /* 背景淡灰色 */
  color: black; /* 字体黑色 */
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
  filter: brightness(1.2); /* 提高亮度，使颜色变淡 */
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15); /* 减弱阴影 */
}
</style>