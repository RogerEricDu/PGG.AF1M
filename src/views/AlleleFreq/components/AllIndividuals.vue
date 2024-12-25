<script lang="ts" setup>
import { ref } from 'vue'; // 从 Vue 中导入 ref
import * as XLSX from 'xlsx'; // 导入 XLSX
import axios from 'axios'; // 导入 axios

const tableHeader = ref({
  variant: 'Variant',
  chr: 'Chr',
  position: 'Position',
  ref: 'Ref',
  alt: 'Alt',
  refFrequency: 'Ref Frequency',
  altFrequency: 'Alt Frequency',
  dataset: 'Dataset',
  sampleSize: 'SampleSize',
});

const tableData = ref([]); // 初始化为空数组，待后端返回数据填充

// 搜索框的绑定值
const searchParams = ref({
  chromosome: '',
  position: '',
  rsid: '',
  variant: ''
});

// 搜索并请求后端数据
const searchData = async () => {
  try {
    const response = await axios.post('/select/snp', searchParams.value);
    tableData.value = response.data; // 后端返回的数据填充到表格
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  variant: 150,
  chr: 100,
  position: 120,
  province: 100,
  ref: 80,
  alt: 80,
  refFrequency: 120,
  altFrequency: 120,
  dataset: 200,
  sampleSize: 105,
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
    dataset: row.dataset,
  });
  const url = `/further_info?${params.toString()}`;
  window.location.href = url; // 跳转到目标页面
};

</script>



<template>
  <div class="gene-container">
      <!-- 搜索框区域 -->
      <div class="search-container">
        Chromosome:
        <el-select 
          v-model="searchParams.chromosome" 
          placeholder="Chromosome" 
          style="width: 180px; margin-right: 10px;"
        >
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
        <el-option label="6" value="6"></el-option>
        <el-option label="7" value="7"></el-option>
        <el-option label="8" value="8"></el-option>
        <el-option label="9" value="9"></el-option>
        <el-option label="10" value="10"></el-option>
        <el-option label="11" value="11"></el-option>
        <el-option label="12" value="12"></el-option>
        <el-option label="13" value="13"></el-option>
        <el-option label="14" value="14"></el-option>
        <el-option label="15" value="15"></el-option>
        <el-option label="16" value="16"></el-option>
        <el-option label="17" value="17"></el-option>
        <el-option label="18" value="18"></el-option>
        <el-option label="19" value="19"></el-option>
        <el-option label="20" value="20"></el-option>
        <el-option label="21" value="21"></el-option>
        <el-option label="22" value="22"></el-option>
        <el-option label="X" value="X"></el-option>
        <el-option label="Y" value="Y"></el-option>
        </el-select>
        Position:
        <el-input 
          v-model="searchParams.position" 
          placeholder="Position" 

          style="width: 200px; margin-right: 10px;"
        />
        RSID:
        <el-input 
          v-model="searchParams.rsid" 
          placeholder="RSID" 
          style="width: 200px;margin-right: 10px;"
        />
        Variants:
        <el-input 
          v-model="searchParams.variant" 
          placeholder="Variant"
          style="width: 200px; margin-right: 10px;"
        />
        <el-button 
          type="primary" 
          @click="searchData"
        >
          Search
        </el-button>
      </div>
    <!-- 标题区域 -->
    <div class="header-container">
      <h2 class="page-title">All Individuals</h2>
      <!-- 导出按钮 -->
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
.search-container {
  display: flex;
  justify-content: center;
  gap: 15px; /* 让元素之间的间距更加均匀 */
  align-items: center;
  flex-wrap: wrap; /* 让容器在小屏幕上自动换行 */
  margin-top: 20px;
  margin-bottom: 20px;
}

.search-button {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  border-radius: 8px;
  background: linear-gradient(135deg, #5795ef, #3a6dd5);
  color: #fff;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.search-button:hover {
  background: linear-gradient(135deg, #3a6dd5, #5795ef);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
}

.search-button:active {
  transform: scale(0.98);
}

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
  width: 1250px; /* 表格宽度充满父容器 */
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