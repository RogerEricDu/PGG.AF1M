<template>
  <div class="variant-effect-container">
    <!-- 表格标题和下载按钮 -->
    <div class="table-header">
      <el-button type="primary" @click="downloadExcel">Download</el-button>
    </div>

    <!-- 表格内容 -->
    <div class="table-wrapper">
      <el-table :data="pagedVariantData" class="styled-table">
        <el-table-column prop="chr" label="Chr" width="55"></el-table-column>
        <el-table-column prop="pos" label="Pos" width="100"></el-table-column>
        <el-table-column prop="ref" label="Ref" width="55"></el-table-column>
        <el-table-column prop="alt" label="Alt" width="55"></el-table-column>
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

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'VariantEffect',
  data() {
    return {
      // 原始数据
      variantData: [
        { chr: '1', pos: 12345, ref: 'A', alt: 'G', symbol: 'CLCN6', biotype: 'protein_coding', consequence: 'downstream_gene_variant', feature: 'ENST00000312413', featureType: 'Transcript' },
        // 更多数据...
      ],
      // 分页相关
      page: 1,           // 当前页
      pageSize: 10,      // 每页显示条数
      total: 0,          // 数据总条数
    };
  },
  computed: {
    // 计算分页后的数据
    pagedVariantData() {
      const start = (this.page - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.variantData.slice(start, end);
    }
  },
  methods: {
    // 处理分页大小变化
    handleSizeChange(size) {
      this.pageSize = size;
      this.page = 1; // 重置为第一页
    },
    // 处理页码变化
    handlePageChange(page) {
      this.page = page;
    },
    // 导出 Excel 文件
    downloadExcel() {
      // 初始化表头
      const ws_data = [
        ['Chr', 'Pos', 'Ref', 'Alt', 'SYMBOL', 'BIOTYPE', 'Consequence', 'Feature', 'Feature Type'] // 表头
      ];

      // 通过分页后的数据生成 Excel 文件
      const dataToExport = this.pagedVariantData.length > 0 ? this.pagedVariantData : this.variantData;
      dataToExport.forEach(row => {
        ws_data.push([
          row.chr,
          row.pos,
          row.ref,
          row.alt,
          row.symbol,
          row.biotype,
          row.consequence,
          row.feature,
          row.featureType
        ]);
      });

      // 将二维数组转换为工作表
      const ws = XLSX.utils.aoa_to_sheet(ws_data);

      // 设置第一行标题加粗
      const headerCells = Object.keys(ws)
        .filter(cell => cell[0] !== '!')
        .slice(0, ws_data[0].length); // 获取标题单元格
      headerCells.forEach(cell => {
        ws[cell].s = {
          font: {
            bold: true
          }
        };
      });

      // 设置列宽
      ws['!cols'] = [
        { wch: 6 }, 
        { wch: 10 },
        { wch: 6 },
        { wch: 6 }, 
        { wch: 15 }, 
        { wch: 15 }, 
        { wch: 15 },
        { wch: 15 }, 
        { wch: 15 }, 
      ];

      // 创建工作簿并将工作表添加到工作簿中
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'VariantEffect');

      // 导出 Excel 文件
      XLSX.writeFile(wb, 'VariantEffect.xlsx');
    }
  },
  mounted() {
    // 初始化时设置总条数
    this.total = this.variantData.length;
  }
};
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