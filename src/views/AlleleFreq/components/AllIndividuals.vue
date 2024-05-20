<script lang="ts" setup>
import { ref } from 'vue'; // 从 Vue 中导入 ref

const tableHeader = ref({
  id: 'ID',
  chr: 'Chr',
  position: 'Position',
  ref: 'Ref',
  alt: 'Alt',
  refAllele: 'Ref allele',
  altAllele: 'Alt allele',
  totalAllele: 'Total allele',
  homoRefGenotype: 'Homo Ref genotype',
  heteroGenotype: 'Hetero genotype',
  homoAltGenotype: 'Homo Alt genotype',
});

const tableData = ref([
  { id: 1, chr: 1, position: 13261, ref: 'G', alt: 'A', refAllele: 41645, altAllele: 1, totalAllele: 41646, homoRefGenotype: 20822, heteroGenotype: 1, homoAltGenotype: 0 },
  { id: 2, chr: 1, position: 13273, ref: 'G', alt: 'C', refAllele: 39864, altAllele: 1782, totalAllele: 41646, homoRefGenotype: 19122, heteroGenotype: 1620, homoAltGenotype: 81 },
  { id: 3, chr: 1, position: 13284, ref: 'G', alt: 'A', refAllele: 41634, altAllele: 12, totalAllele: 41646, homoRefGenotype: 20811, heteroGenotype: 12, homoAltGenotype: 0 },
  { id: 4, chr: 1, position: 13372, ref: 'G', alt: 'C', refAllele: 41636, altAllele: 10, totalAllele: 41646, homoRefGenotype: 20813, heteroGenotype: 10, homoAltGenotype: 0 },
  { id: 5, chr: 1, position: 13424, ref: 'A', alt: 'T', refAllele: 41645, altAllele: 1, totalAllele: 41646, homoRefGenotype: 20822, heteroGenotype: 1, homoAltGenotype: 0 },
  { id: 6, chr: 1, position: 13451, ref: 'A', alt: 'C', refAllele: 41640, altAllele: 6, totalAllele: 41646, homoRefGenotype: 20817, heteroGenotype: 6, homoAltGenotype: 0 },
  { id: 7, chr: 1, position: 13539, ref: 'G', alt: 'C', refAllele: 41645, altAllele: 1, totalAllele: 41646, homoRefGenotype: 20822, heteroGenotype: 1, homoAltGenotype: 0 },
  { id: 8, chr: 1, position: 13543, ref: 'T', alt: 'G', refAllele: 41591, altAllele: 55, totalAllele: 41646, homoRefGenotype: 20768, heteroGenotype: 55, homoAltGenotype: 0 },
  { id: 9, chr: 1, position: 14436, ref: 'G', alt: 'A', refAllele: 41603, altAllele: 43, totalAllele: 41646, homoRefGenotype: 20780, heteroGenotype: 43, homoAltGenotype: 0 },
  { id: 10, chr: 1, position: 14462, ref: 'A', alt: 'G', refAllele: 41643, altAllele: 3, totalAllele: 41646, homoRefGenotype: 20820, heteroGenotype: 3, homoAltGenotype: 0 },
  { id: 11, chr: 1, position: 14464, ref: 'A', alt: 'T', refAllele: 41407, altAllele: 239, totalAllele: 41646, homoRefGenotype: 20587, heteroGenotype: 233, homoAltGenotype: 3 },
  { id: 12, chr: 1, position: 14553, ref: 'C', alt: 'T', refAllele: 41644, altAllele: 2, totalAllele: 41646, homoRefGenotype: 20821, heteroGenotype: 2, homoAltGenotype: 0 },
  { id: 13, chr: 1, position: 14610, ref: 'T', alt: 'C', refAllele: 34656, altAllele: 6990, totalAllele: 41646, homoRefGenotype: 14036, heteroGenotype: 6584, homoAltGenotype: 203 },
  { id: 14, chr: 1, position: 14653, ref: 'C', alt: 'T', refAllele: 34198, altAllele: 7448, totalAllele: 41646, homoRefGenotype: 13612, heteroGenotype: 6974, homoAltGenotype: 237 },
  { id: 15, chr: 1, position: 14716, ref: 'C', alt: 'T', refAllele: 41645, altAllele: 1, totalAllele: 41646, homoRefGenotype: 20822, heteroGenotype: 1, homoAltGenotype: 0 },
  { id: 16, chr: 1, position: 14728, ref: 'C', alt: 'A', refAllele: 41621, altAllele: 25, totalAllele: 41646, homoRefGenotype: 20798, heteroGenotype: 25, homoAltGenotype: 0 },
  { id: 17, chr: 1, position: 14742, ref: 'G', alt: 'A', refAllele: 41644, altAllele: 2, totalAllele: 41646, homoRefGenotype: 20821, heteroGenotype: 2, homoAltGenotype: 0 },
  { id: 18, chr: 1, position: 14748, ref: 'G', alt: 'A', refAllele: 41644, altAllele: 2, totalAllele: 41646, homoRefGenotype: 20821, heteroGenotype: 2, homoAltGenotype: 0 },
  { id: 19, chr: 1, position: 14752, ref: 'G', alt: 'A', refAllele: 41641, altAllele: 5, totalAllele: 41646, homoRefGenotype: 20818, heteroGenotype: 5, homoAltGenotype: 0 },
  { id: 20, chr: 1, position: 14754, ref: 'G', alt: 'C', refAllele: 41644, altAllele: 2, totalAllele: 41646, homoRefGenotype: 20821, heteroGenotype: 2, homoAltGenotype: 0 },
  { id: 21, chr: 1, position: 14976, ref: 'G', alt: 'A', refAllele: 41524, altAllele: 122, totalAllele: 41646, homoRefGenotype: 20701, heteroGenotype: 122, homoAltGenotype: 0 },
  { id: 22, chr: 1, position: 15398, ref: 'C', alt: 'T', refAllele: 41618, altAllele: 28, totalAllele: 41646, homoRefGenotype: 20795, heteroGenotype: 28, homoAltGenotype: 0 },
  { id: 23, chr: 1, position: 15447, ref: 'A', alt: 'G', refAllele: 41039, altAllele: 607, totalAllele: 41646, homoRefGenotype: 20218, heteroGenotype: 603, homoAltGenotype: 2 },
  { id: 24, chr: 1, position: 15711, ref: 'G', alt: 'A', refAllele: 41643, altAllele: 3, totalAllele: 41646, homoRefGenotype: 20820, heteroGenotype: 3, homoAltGenotype: 0 },
  { id: 25, chr: 1, position: 16042, ref: 'G', alt: 'T', refAllele: 41620, altAllele: 26, totalAllele: 41646, homoRefGenotype: 20799, heteroGenotype: 22, homoAltGenotype: 2 },
  { id: 26, chr: 1, position: 16103, ref: 'T', alt: 'G', refAllele: 40307, altAllele: 1339, totalAllele: 41646, homoRefGenotype: 19502, heteroGenotype: 1303, homoAltGenotype: 18 },
  { id: 27, chr: 1, position: 16140, ref: 'G', alt: 'A', refAllele: 41593, altAllele: 53, totalAllele: 41646, homoRefGenotype: 20770, heteroGenotype: 53, homoAltGenotype: 0 },
  { id: 28, chr: 1, position: 16141, ref: 'C', alt: 'T', refAllele: 41555, altAllele: 91, totalAllele: 41646, homoRefGenotype: 20732, heteroGenotype: 91, homoAltGenotype: 0 },
  { id: 29, chr: 1, position: 16142, ref: 'G', alt: 'A', refAllele: 41645, altAllele: 1, totalAllele: 41646, homoRefGenotype: 20822, heteroGenotype: 1, homoAltGenotype: 0 },
  { id: 30, chr: 1, position: 16178, ref: 'T', alt: 'G', refAllele: 41644, altAllele: 2, totalAllele: 41646, homoRefGenotype: 20821, heteroGenotype: 2, homoAltGenotype: 0 },
  { id: 31, chr: 1, position: 16275, ref: 'G', alt: 'C', refAllele: 41643, altAllele: 3, totalAllele: 41646, homoRefGenotype: 20820, heteroGenotype: 3, homoAltGenotype: 0 },
  { id: 32, chr: 1, position: 16571, ref: 'G', alt: 'A', refAllele: 39944, altAllele: 1702, totalAllele: 41646, homoRefGenotype: 19134, heteroGenotype: 1676, homoAltGenotype: 13 },
  { id: 33, chr: 1, position: 16841, ref: 'G', alt: 'T', refAllele: 40508, altAllele: 1138, totalAllele: 41646, homoRefGenotype: 19689, heteroGenotype: 1130, homoAltGenotype: 4 },
  { id: 34, chr: 1, position: 16946, ref: 'G', alt: 'T', refAllele: 41643, altAllele: 3, totalAllele: 41646, homoRefGenotype: 20820, heteroGenotype: 3, homoAltGenotype: 0 },
  { id: 35, chr: 1, position: 16949, ref: 'A', alt: 'C', refAllele: 37981, altAllele: 3665, totalAllele: 41646, homoRefGenotype: 17217, heteroGenotype: 3547, homoAltGenotype: 59 },
  { id: 36, chr: 1, position: 16968, ref: 'C', alt: 'T', refAllele: 41639, altAllele: 7, totalAllele: 41646, homoRefGenotype: 20816, heteroGenotype: 7, homoAltGenotype: 0 },
  { id: 37, chr: 1, position: 17305, ref: 'C', alt: 'T', refAllele: 41639, altAllele: 7, totalAllele: 41646, homoRefGenotype: 20816, heteroGenotype: 7, homoAltGenotype: 0 },
  { id: 38, chr: 1, position: 17365, ref: 'C', alt: 'G', refAllele: 36843, altAllele: 4803, totalAllele: 41646, homoRefGenotype: 16101, heteroGenotype: 4641, homoAltGenotype: 81 },
  { id: 39, chr: 1, position: 17375, ref: 'A', alt: 'G', refAllele: 41377, altAllele: 269, totalAllele: 41646, homoRefGenotype: 20554, heteroGenotype: 269, homoAltGenotype: 0 },
  { id: 40, chr: 1, position: 17379, ref: 'G', alt: 'A', refAllele: 41557, altAllele: 89, totalAllele: 41646, homoRefGenotype: 20734, heteroGenotype: 89, homoAltGenotype: 0 }
]);

// 定义每一列的宽度，这里只是示例，你可以根据需求自定义
const columnWidths = {
  id: 80,
  chromosome: 100,
  position: 120,
  ref: 80,
  alt: 80,
  refAllele: 120,
  altAllele: 120,
  totalAllele: 120,
  homoRefGenotype: 150,
  heteroGenotype: 150,
  homoAltGenotype: 150,
};

// 根据列名获取对应的宽度
const getColumnWidth = (columnName) => {
  return `${columnWidths[columnName]}px`;
};

const currentPage = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} 条每页`)
}
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`)
}

const handleSelectionChange = (selection: any[]) => {
  console.log('已选项:', selection);
}
</script>

<template>
  <div class="gene-container">
    <h2 style="text-align:center">All Individuals</h2>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column> <!-- 添加此行以进行选择 -->
      <el-table-column style="width: 100%;"
        :prop="index"
        :label="item"
        v-for="(item, index) in tableHeader"
        :key="index"
        :width="getColumnWidth(index)"
      >
      </el-table-column>
      <el-table-column label="FurtherInfo" width="120">
        <template #default="{ row }">
          <a :href="'/further_info?id=' + row.id" style="color:#6e9197;">INFO</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <div class="demonstration"></div>
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
}
.el-table{
  border: 2px solid black;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
