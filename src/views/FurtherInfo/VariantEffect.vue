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
        <el-table-column prop="pos" label="Pos" width="100"></el-table-column>
        <el-table-column prop="ref" label="Ref" width="55"></el-table-column>
        <el-table-column prop="alt" label="Alt" width="55"></el-table-column>
        <el-table-column prop="symbol" label="SYMBOL" width="100"></el-table-column>
        <el-table-column prop="biotype" label="BIOTYPE" width="150"></el-table-column>
        <el-table-column prop="consequence" label="Consequence" width="150"></el-table-column>
        <!-- <el-table-column prop="transcript" label="Transcript" width="100"></el-table-column> -->
        <el-table-column prop="feature" label="Feature" width="150"></el-table-column>
        <el-table-column prop="featureType" label="Feature Type"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';

export default {
  name: 'VariantEffect',
  data() {
    return {
      variantData: [
        { chr: '1', pos: 12345, ref: 'A', alt: 'G', symbol: 'GENE1', biotype: 'protein_coding', consequence: 'missense_variant', feature: 'Feature1', featureType: 'Transcript' },
        // 添加更多数据...
      ],
    };
  },
  methods: {
    downloadExcel() {
      // 初始化表头
      const ws_data = [
        ['Chr', 'Pos', 'Ref', 'Alt', 'SYMBOL', 'BIOTYPE','Consequence','Feature','Feature Type'] // 表头
      ];

      // 遍历 variantData，逐行添加数据到 ws_data 中
      this.variantData.forEach(row => {
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
        { wch: 15 }, 
      ];

      // 创建工作簿并将工作表添加到工作簿中
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'VariantEffect');

      // 导出 Excel 文件
      XLSX.writeFile(wb, 'VariantEffect.xlsx');
    }
  },

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

</style>