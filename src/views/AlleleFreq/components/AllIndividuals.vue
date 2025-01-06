<script lang="ts" setup>
import { ref } from 'vue'; // 从 Vue 中导入 ref
import * as XLSX from 'xlsx'; // 导入 XLSX
import { getAllIndividualData } from '@/api/table';

const tableHeader = ref({
  variant: 'Variant',
  chr: 'Chr',
  position: 'Position',
  population:'Population',
  ref: 'Ref',
  alt: 'Alt',
  refFrequency: 'Ref Frequency',
  altFrequency: 'Alt Frequency',
  dataset: 'Dataset',
  sampleSize: 'SampleSize',
});

const tableData = ref([]); // 初始化为空数组，待后端返回数据填充

// 高级表单的绑定值
const searchParams = ref({
  referencePanel: '',
  dataType: '',
  dataLayer: 'Individuals',
  population:'',
  chromosome: '',
  position: '',
  rsid: '',
  variant: '',
  region: '',
  province: '',
});

const availableDataTypes = ref([]);
const handleReferencePanelChange = () => {
  searchParams.value.dataType = ''
  if (searchParams.value.referencePanel === 'T2T') {
    availableDataTypes.value = ['TGS'];
  } else {
    availableDataTypes.value = ['Microarray', 'NGS'];
  }
};

// 搜索并请求后端数据
const handleSearch = async () => {
  try {
    const response = await getAllIndividualData(searchParams.value);
    console.log('Search Results:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleReset = () => {
  searchParams.value = {
    referencePanel: '',
    dataType: '',
    dataLayer: 'Individuals',
    population:'',
    chromosome: '',
    position: '',
    rsid: '',
    variant: '',
    region: '',
    province: '',
  };
};
// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  variant: 150,
  chr: 100,
  position: 120,
  province: 100,
  population: 120,
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
    <!-- 高级表单区域 -->
    <h2 class="page-title">Search Bar</h2>
    <div class="search-bar">
      <!-- 选择 Reference Panel -->
      <div class="form-item">
        <label for="referencePanel">Reference Panel:</label>
        <el-select
          v-model="searchParams.referencePanel"
          placeholder="Select Reference Panel"
          clearable
          @change="handleReferencePanelChange"
          id="referencePanel"
        >
          <el-option label="GRCh37" value="GRCh37"></el-option>
          <el-option label="GRCh38" value="GRCh38"></el-option>
          <el-option label="T2T" value="T2T"></el-option>
        </el-select>
      </div>

      <!-- 数据类型 -->
      <div class="form-item">
        <label for="dataType">Data Type:</label>
        <el-select
          v-model="searchParams.dataType"
          placeholder="Select Data Type"
          clearable
          id="dataType"
        >
          <el-option
            v-for="type in availableDataTypes"
            :key="type"
            :label="type"
            :value="type"
          />
        </el-select>
      </div>

      <!-- 民族 -->
      <div class="form-item">
        <label for="population">Population:</label>
        <el-input
          v-model="searchParams.population"
          placeholder="Population"
          clearable
          id="Population"
        />
      </div>

      <!-- 数据分层 -->
<!--       <div class="form-item">
        <label for="dataLayer">Data Layer:</label>
        <el-input
          v-model="searchParams.dataLayer"
          placeholder="Data Layer"
          readonly
          id="dataLayer"
          disabled
        />
      </div> -->

      <!-- 选择染色体 -->
      <div class="form-item">
        <label for="chromosome">Chromosome:</label>
        <el-select
          v-model="searchParams.chromosome"
          placeholder="Select Chromosome"
          clearable
          id="chromosome"
        >
          <el-option v-for="chr in 22" :key="chr" :label="chr" :value="chr" />
          <el-option label="X" value="X"></el-option>
          <el-option label="Y" value="Y"></el-option>
        </el-select>
      </div>

      <!-- 位置输入 -->
      <div class="form-item">
        <label for="position">Position:</label>
        <el-input
          v-model="searchParams.position"
          placeholder="Position"
          clearable
          id="position"
        />
      </div>

      <!-- RSID 输入 -->
      <div class="form-item">
        <label for="rsid">RSID:</label>
        <el-input
          v-model="searchParams.rsid"
          placeholder="RSID"
          clearable
          id="rsid"
        />
      </div>

      <!-- Variant 输入 -->
      <div class="form-item">
        <label for="variant">Variant:</label>
        <el-input
          v-model="searchParams.variant"
          placeholder="Variant"
          clearable
          id="variant"
        />
      </div>

      <!-- 空着的TIPS预输入，后续可以在这里添加内容 -->
      <div class="form-item">
        <label for="TIPS"></label>

      </div>

      <!-- 按钮组 -->
      <div class="form-item button-group">
        <el-button type="primary" @click="handleSearch">Search</el-button>
        <el-button type="warning" @click="handleReset">Reset</el-button>
      </div>
    </div>

    <!-- 标题区域 -->
    <div class="header-container">
      <h2 class="page-title">All Individuals</h2>
      <!-- 导出按钮 -->
      <el-button 
        type="success" 
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
.search-bar {
  width:1280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 每行三个格子 */
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #e9efff, #ffffff);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.search-bar .form-item {
  display: flex;
  align-items: center;
  gap: 0px;
}

.form-item label {
  width: 150px; /* 设置label宽度 */
  font-size: 14px;
  font-weight: bold;
  color: #333;
}

.form-item .el-select, .form-item .el-input {
  width: 250px; /* 输入框和选择框占满剩余空间 */
}

.button-group {
  grid-column: span 1; /* 按钮组占一格 */
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.el-button {
  color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.el-button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.el-button[disabled] {
  background-color: #f2f2f2;
  border-color: #dcdfe6;
  color: #c0c4cc;
}

.search-bar .form-item input, .search-bar .form-item select {
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar .form-item input:focus, .search-bar .form-item select:focus {
  border-color: #3a6dd5;
  box-shadow: 0px 0px 8px rgba(58, 109, 213, 0.5);
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
  width: 1370px; /* 表格宽度充满父容器 */
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

</style>