<template>
  <div class="gene-container">
    <!-- 高级表单区域 -->
    <h2 class="page-title">Search Bar</h2>

    
    <!-- 新增查询类型选择 -->
    <div class="query-type-container">
        <div class="query-type-selector">
          <el-radio-group v-model="searchParams.queryType">
            <el-radio-button 
              label="single"
              class="custom-radio-button"
            >
              <span class="radio-label">Database-wide SNP Search</span>
              <span class="radio-description">Retrieve comprehensive SNP data across all datasets</span>
            </el-radio-button>
            
            <el-radio-button 
              label="compare"
              class="custom-radio-button"
            >
              <span class="radio-label">Single SNP Comparison</span>
              <span class="radio-description">Compare SNP characteristics across populations</span>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>

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
          placeholder="Variant (1:13372-G-C)"
          clearable
          id="variant"
        />
      </div>

      <!-- 空着的TIPS预输入，后续可以在这里添加内容 -->
      <div class="form-item">
        <label for="TIPS"></label>
      </div>
      <div class="form-item">
        <label for="TIPS"></label>
      </div>
      <div class="form-item">
        <label for="TIPS"></label>
      </div>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref ,onMounted} from 'vue'; // 从 Vue 中导入 ref
import * as XLSX from 'xlsx'; // 导入 XLSX
import { getByPopulationData,getByPopulationDataMerge } from '@/api/table';
import{ watch } from 'vue';

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

const SnpData = ref([]);  // 用来保存完整的响应数据
const tableData = ref([]); // 表格数据
const total = ref(0); // 数据总数

// 分页参数
const currentPage = ref(1);
const pageSize = ref(10);

// 高级表单的绑定值
const searchParams = ref({
  queryType: 'single', // 新增查询类型，默认'single'或'compare'
  referencePanel: '',
  dataType: '',
  dataLayer: 'Individuals',
  population:'',
  chromosome: '1',
  position: '',
  rsid: '',
  variant: '',
});
// 添加queryType的watch监听
watch(
  () => searchParams.value.queryType,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      fetchData();
    }
  }
);


const availableDataTypes = ref([]);
const handleReferencePanelChange = () => {
  searchParams.value.dataType = ''
  if (searchParams.value.referencePanel === 'T2T') {
    availableDataTypes.value = ['TGS'];
  } else {
    availableDataTypes.value = ['Microarray', 'NGS'];
  }
};

const fetchData = async () => {
  try {
    const params = {
      ...searchParams.value,
      page: currentPage.value,
      size: pageSize.value,
    };

    // 根据 queryType 选择 API 方法
    const apiMethod = searchParams.value.queryType === 'single' 
      ? getByPopulationDataMerge 
      : getByPopulationData;

    const response = await apiMethod(params); // 动态调用 API

    console.log('Raw Response:', response); // 添加调试日志

    // 解析响应数据
    const responseData = response.data;
        //const totalCount = response.total;

    // 更新 total 和 tableData
    const responseTotal = response.total; // 后端返回的总数（确保后端接口返回了这个字段）

    // 检查 rsid、position、variant 是否都为空
    const { rsid, position, variant } = searchParams.value;
    const isAllEmpty = (!rsid || rsid.trim() === '') && (!position || position.trim() === '') && (!variant || variant.trim() === '');

    if (isAllEmpty) {
      total.value = 12251537; // 写死
    } else {
      total.value = responseTotal || 0; // 用后端返回的
    }
    
    tableData.value = responseData.map((item: any) => ({
      ...item, // 保留所有字段
      variant: item.variant,
      chr: item.variant.split(':')[0],
      position: item.position,
      population: item.population,
      ref: item.refAllele,
      alt: item.altAllele,
      refFrequency: item.refAlleleFrequency,
      altFrequency: item.altAlleleFrequency,
      dataset: item.dataset,
      sampleSize: item.sampleSize,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// 页面加载时默认查询
onMounted(() => {
  fetchData();
});

// 处理分页大小变化
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  fetchData();
};

// 处理当前页变化
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  fetchData();
};

const handleSearch = async () => {
  currentPage.value = 1; // 搜索时重置为第一页
  await fetchData();
};

const handleReset = () => {
  searchParams.value = {
    queryType: 'single', // 重置时保持默认值
    referencePanel: '',
    dataType: '',
    dataLayer: 'Individuals',
    population:'',
    chromosome: '1',
    position: '',
    rsid: '',
    variant: '',
  };
};
// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  variant: 200,
  chr: 100,
  position: 150,
  province: 120,
  population: 120,
  ref: 80,
  alt: 80,
  refFrequency: 150,
  altFrequency: 150,
  dataset: 210,
  sampleSize: 160,
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
    Variant: row.variant,
    Chromosome: row.chr,
    Position: row.position,
/*     Population:row.population, */
    Ref: row.ref,
    Alt: row.alt,
    RefFreq:row.refFrequency,
    AltFreq:row.altFrequency,
    dataset:row.dataset,
    sampleSize:row.sampleSize
  }));

  // 创建工作簿和工作表
  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Data');

  // 导出文件
  XLSX.writeFile(workbook, 'SelectedData.xlsx');
};


const small = ref(false);
const background = ref(false);
const disabled = ref(false);

// 生成对应的URL
const navigateToFurtherInfo = (row) => {
  // 直接使用 JSON 序列化所有字段，并通过 URL 的查询参数传递
  const url = `/further_info?data=${encodeURIComponent(JSON.stringify(row))}`;
  window.location.href = url; // 跳转到目标页面
};
</script>


<style scoped>
/* 优化后的查询类型选择器样式 */
.query-type-container {
  margin: 20px 0;
  padding: 15px;
  background: linear-gradient(135deg, #f8f9ff, #ffffff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.query-type-selector {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

:deep(.el-radio-group) {
  width: 100%;
  display: contents;
}

.custom-radio-button {
  height: auto;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  background: white;
}

.custom-radio-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(58, 109, 213, 0.15);
}

:deep(.el-radio-button__inner) {
  background-color: transparent !important; /* 默认背景透明 */
  border: 1px solid #ccc !important; /* 默认边框颜色 */
}

:deep(.el-radio-button.is-active .el-radio-button__inner) {
  background-color: transparent !important; /* 选中时背景透明 */
  box-shadow: none !important; /* 去掉选中阴影 */
}

:deep(.el-radio-button.is-active) {
  background-color: transparent !important;
  border-color: transparent !important;
}

:deep(.el-radio-button__inner) {
  width: 100%;
  height: auto;
  padding: 0;
  background: transparent;
  border: none !important;
  display: block;
}

.radio-label {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  display: block;
}

.radio-description {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
  display: block;
}

:deep(.el-radio-button__orig-radio:checked + .el-radio-button__inner) {
  background: transparent;
  box-shadow: none;
}

:deep(.is-active.custom-radio-button) {
  border-color: #3a6dd5;
  background: linear-gradient(135deg, #f6f9ff, #e8f0ff);
}

.search-bar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* 自适应布局，每个格子最小300px */
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #e9efff, #ffffff);
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%; /* 宽度占满父容器 */
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
.gene-container {
  margin: auto;
  padding: 1%;
  max-width: 100%;
  overflow-x: auto; /* 当内容超出容器宽度时，添加水平滚动条 */
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
  width: 100%; /* 表格宽度自适应 */
  min-width: 1470px; /* 设置最小宽度，防止内容显示错乱 */
  margin: 0 auto; /* 表格居中 */
  text-align: center; /* 表格内容居中 */
  overflow-x: auto; /* 超出部分允许水平滚动 */
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