<script lang="ts" setup>
import { ref } from 'vue'; // 从 Vue 中导入 ref
import * as XLSX from 'xlsx'; // 导入 XLSX
const tableHeader = ref({
  variant: 'Variant',
  chr: 'Chr',
  position: 'Position',
  region:'Region',
  ref: 'Ref',
  alt: 'Alt',
  refFrequency:'Ref Frequency',
  altFrequency:'Alt Frequency',
  dataset:'Dataset',
  sampleSize:'SampleSize',
});

const tableData = ref([
  { id: 1, chr: 1,variant:'1:13261-G-A',  position: 13261, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 2, chr: 1,variant:'1:13273-G-C',  position: 13273, ref: 'G', alt: 'C',region:'SouthWest'},
  { id: 3, chr: 1,variant:'1:13284-G-A',  position: 13284, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 4, chr: 1,variant:'1:13372-G-C',  position: 13372, ref: 'G', alt: 'C',region:'SouthWest' },
  { id: 5, chr: 1,variant:'1:13424-A-T',  position: 13424, ref: 'A', alt: 'T',region:'SouthWest'},
  { id: 6, chr: 1,variant:'1:13451-A-C',  position: 13451, ref: 'A', alt: 'C',region:'SouthWest'},
  { id: 7, chr: 1,variant:'1:13539-G-C',  position: 13539, ref: 'G', alt: 'C',region:'SouthWest'},
  { id: 8, chr: 1,variant:'1:13543-T-G',  position: 13543, ref: 'T', alt: 'G',region:'SouthWest'},
  { id: 9, chr: 1,variant:'1:14436-G-A',  position: 14436, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 10, chr: 1,variant:'1:14462-A-G',  position: 14462, ref: 'A', alt: 'G',region:'SouthWest'},
  { id: 11, chr: 1,variant:'1:14464-A-T',  position: 14464, ref: 'A', alt: 'T',region:'SouthWest'},
  { id: 12, chr: 1,variant:'1:14553-C-T',  position: 14553, ref: 'C', alt: 'T',region:'SouthWest'},
  { id: 13, chr: 1,variant:'1:14610-T-C',  position: 14610, ref: 'T', alt: 'C',region:'SouthWest'},
  { id: 14, chr: 1,variant:'1:14653-C-T',  position: 14653, ref: 'C', alt: 'T',region:'SouthWest'},
  { id: 15, chr: 1,variant:'1:14716-C-T',  position: 14716, ref: 'C', alt: 'T',region:'SouthWest'},
  { id: 16, chr: 1,variant:'1:14728-C-A',  position: 14728, ref: 'C', alt: 'A',region:'SouthWest'},
  { id: 17, chr: 1,variant:'1:14742-G-A',  position: 14742, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 18, chr: 1,variant:'1:14748-G-A',  position: 14748, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 19, chr: 1,variant:'1:14752-G-A',  position: 14752, ref: 'G', alt: 'A',region:'SouthWest'},
  { id: 20, chr: 1,variant:'1:14754-G-C',  position: 14754, ref: 'G', alt: 'C',region:'SouthWest'},
]);

// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  variant: 150,
  chr: 100,
  position: 120,
  region:100,
  ref: 80,
  alt: 80,
  refFrequency: 120,
  altFrequency: 120,
  dataset:200,
  sampleSize:105,
};

// 根据列名获取对应的宽度
const getColumnWidth = (columnName) => {
  return `${columnWidths[columnName]}px`;
};

const selectedRows = ref([]); // 存储选中的行

const handleSelectionChange = (selection: any[]) => {
  selectedRows.value = selection; // 更新选中的数据
};

// 导出选中行到 Excel
const exportToExcel = () => {
  if (!selectedRows.value.length) {
    alert('Please select at least one row to export.');
    return;
  }

  const sheetData = selectedRows.value.map(row => ({
    ID: row.id,
    Variant: row.variant,
    Chromosome: row.chr,
    Position: row.position,
    Reference: row.ref,
    Alternative: row.alt,
  }));

  // 创建工作簿和工作表
  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Data');

  // 导出文件
  XLSX.writeFile(workbook, 'SelectedData.xlsx');
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


// 生成对应的URL
const navigateToFurtherInfo = (row) => {
  const params = new URLSearchParams({
    id: row.id,
    variant: row.variant,
    chr: row.chr.toString(),
    position: row.position.toString(),
    ref: row.ref,
    alt: row.alt,
  });
  const url = `/further_info?${params.toString()}`;
  window.location.href = url; // 跳转到目标页面
};
</script>



<template>
  <div class="gene-container">
    <!-- 标题区域 -->
    <div class="header-container">
      <h2 class="page-title">By Region</h2>
      <el-button 
        type="primary" 
        size="small" 
        @click="exportToExcel"
      >
        Download
      </el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" border style="margin: auto; text-align: center;" @selection-change="handleSelectionChange">
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
      <el-table-column label="Further Info" width="120">
        <template #default="{ row }">
          <div class="centered-link">
            <el-button type="primary" size="small" @click="navigateToFurtherInfo(row)">
              INFO
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
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
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.page-title {
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
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