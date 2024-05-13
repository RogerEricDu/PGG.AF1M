<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'; // 从 Vue 中导入 ref 和 onMounted

const tableHeader = ref({}); // 将 tableHeader 初始化为一个包含空对象的 ref
const tableData = ref([]); // 将 tableData 初始化为一个包含空数组的 ref

onMounted(() => {
  fetchData(); // 在组件挂载时获取数据
});

const fetchData = () => {
  axios.get('/public/genelist/haadata.json')
    .then(response => {
      console.log('数据 URL:',response.config.url);
      console.log('收到的数据:',response.data);
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        Object.keys(response.data.data[0]).forEach(key => {
          tableHeader.value[key] = key;
        });
        tableData.value = response.data.data;
      } else {
        console.error('数据为空或格式不正确');
      }
    })
    .catch(error => {
      console.error('获取数据时出错:', error);
    });
};

const currentPage = ref(4)
const pageSize = ref(100)
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
    <h2 style="text-align:center">By Region</h2>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column> <!-- 添加此行以进行选择 -->
      <el-table-column
        :prop="index"
        :label="item"
        v-for="(item, index) in tableHeader"
        :key="index"
      >
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
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