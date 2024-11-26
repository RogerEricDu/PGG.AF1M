<script lang="ts" setup>
import { ref } from 'vue'; // 从 Vue 中导入 ref

const tableHeader = ref({
  variant: 'Variant',
  chr: 'Chr',
  position: 'Position',
  ref: 'Ref',
  alt: 'Alt',
  alleleFrequency: 'Allele Frequency',
  region:'Region'
});

const tableData = ref([
  { id: 1, chr: 1,variant:'1:13261-G-A',  position: 13261, ref: 'G', alt: 'A',alleleFrequency:0.1 ,region:'SouthWest'},
  { id: 2, chr: 1,variant:'1:13273-G-C',  position: 13273, ref: 'G', alt: 'C', alleleFrequency:0.1,region:'SouthWest'},
  { id: 3, chr: 1,variant:'1:13284-G-A',  position: 13284, ref: 'G', alt: 'A', alleleFrequency:0.1,region:'SouthWest'},
  { id: 4, chr: 1,variant:'1:13372-G-C',  position: 13372, ref: 'G', alt: 'C', alleleFrequency:0.1,region:'SouthWest' },
  { id: 5, chr: 1,variant:'1:13424-A-T',  position: 13424, ref: 'A', alt: 'T', alleleFrequency:0.1,region:'SouthWest'},
  { id: 6, chr: 1,variant:'1:13451-A-C',  position: 13451, ref: 'A', alt: 'C', alleleFrequency:0.1,region:'SouthWest'},
  { id: 7, chr: 1,variant:'1:13539-G-C',  position: 13539, ref: 'G', alt: 'C', alleleFrequency:0.1,region:'SouthWest'},
  { id: 8, chr: 1,variant:'1:13543-T-G',  position: 13543, ref: 'T', alt: 'G',alleleFrequency:0.1 ,region:'SouthWest'},
  { id: 9, chr: 1,variant:'1:14436-G-A',  position: 14436, ref: 'G', alt: 'A',alleleFrequency:0.1 ,region:'SouthWest'},
  { id: 10, chr: 1,variant:'1:14462-A-G',  position: 14462, ref: 'A', alt: 'G',alleleFrequency:0.1,region:'SouthWest'},
  { id: 11, chr: 1,variant:'1:14464-A-T',  position: 14464, ref: 'A', alt: 'T',alleleFrequency:0.1 ,region:'SouthWest'},
  { id: 12, chr: 1,variant:'1:14553-C-T',  position: 14553, ref: 'C', alt: 'T',alleleFrequency:0.1,region:'SouthWest'},
  { id: 13, chr: 1,variant:'1:14610-T-C',  position: 14610, ref: 'T', alt: 'C',alleleFrequency:0.1,region:'SouthWest'},
  { id: 14, chr: 1,variant:'1:14653-C-T',  position: 14653, ref: 'C', alt: 'T',alleleFrequency:0.1,region:'SouthWest'},
  { id: 15, chr: 1,variant:'1:14716-C-T',  position: 14716, ref: 'C', alt: 'T',alleleFrequency:0.1,region:'SouthWest'},
  { id: 16, chr: 1,variant:'1:14728-C-A',  position: 14728, ref: 'C', alt: 'A',alleleFrequency:0.1,region:'SouthWest'},
  { id: 17, chr: 1,variant:'1:14742-G-A',  position: 14742, ref: 'G', alt: 'A',alleleFrequency:0.1,region:'SouthWest'},
  { id: 18, chr: 1,variant:'1:14748-G-A',  position: 14748, ref: 'G', alt: 'A',alleleFrequency:0.1,region:'SouthWest'},
  { id: 19, chr: 1,variant:'1:14752-G-A',  position: 14752, ref: 'G', alt: 'A',alleleFrequency:0.1,region:'SouthWest'},
  { id: 20, chr: 1,variant:'1:14754-G-C',  position: 14754, ref: 'G', alt: 'C',alleleFrequency:0.1,region:'SouthWest'},
]);

// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  variant: 150,
  chr: 100,
  position: 120,
  ref: 80,
  alt: 80,
  alleleFrequency: 120,
  region:100,
};

// 根据列名获取对应的宽度
const getColumnWidth = (columnName) => {
  return `${columnWidths[columnName]}px`;
};

const currentPage = ref(1);
const pageSize = ref(10);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} 条每页`);
};
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
};

const handleSelectionChange = (selection: any[]) => {
  console.log('已选项:', selection);
};

// 生成对应的URL
const navigateToFurtherInfo = (row) => {
  const params = new URLSearchParams({
    id: row.id,
    variant: row.variant,
    chr: row.chr.toString(),
    position: row.position.toString(),
    ref: row.ref,
    alt: row.alt,
    alleleFrequency: row.alleleFrequency.toString(),
    table: 'ByRegion', // 区分表格
  });
  const url = `/further_info?${params.toString()}`;
  window.location.href = url; // 跳转到目标页面
};
</script>

<template>
  <div class="gene-container">
    <h2 class="page-title">100k Microarray</h2>
    <el-table :data="tableData" border style="margin: auto;text-align: center;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column> 
      <el-table-column
        :prop="index"
        :label="item"
        v-for="(item, index) in tableHeader"
        :key="index"
        :width="getColumnWidth(index)"
        align="center"  
        header-align="center" 
      >
      </el-table-column>
      <el-table-column label="FurtherInfo" width="120">
        <template #default="{ row }">
          <div class="centered-link">
            <el-button
              type="primary"
              size="small"
              @click="navigateToFurtherInfo(row)"
            >
              INFO
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>


<style scoped>
.gene-container{
  margin: auto;
  padding: 1%;
  width: fit-content; /* 让容器宽度根据内容自动调整 */
}

.el-table {
  border: 1px solid #dcdfe6; /* 边框变细 */
  width: 100%; /* 表格宽度充满父容器 */
  margin: 0 auto; /* 表格居中 */
  text-align: center; /* 表格内容居中 */
}

::v-deep .el-table th {
  background-color: #f8f4f4; /* 背景淡灰色 */
  color: black; /* 字体黑色 */
  text-align: center;
}
.el-table th, .el-table td {
  text-align: center; /* 表头和表格内容居中 */
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.centered-link {
  text-align: center;
}
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-button {
  color: white;
  background-color: #38b1b2;
  border: none;
}

.el-button:hover {
  background-color: #2b6777;
}
</style>