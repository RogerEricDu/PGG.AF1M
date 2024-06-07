<script lang="ts" setup>
import {ref} from 'vue'
const input = ref('')

function handleSubmit() {
      // 处理提交按钮点击事件
      console.log('Submit button clicked');
      // 在这里添加接口
    }
</script>

<template>
    <h2>Quick Start(By individuals as default).</h2>
    <div class="input-container">
    <el-input v-model="input" style="width: 800px; height:45px;" placeholder="rs114514 or  1:114514123" >
        <template #append>
            <el-button type="primary" class="submit-button" @click="handleSubmit"><strong style="font-size: 18px;">Submit</strong></el-button>
        </template>   
    </el-input>
    </div>

    <div class="data-context">
    <p style="font-size: 14px;color:yellowgreen;">e.g. &nbsp;&nbsp;Variants:1:11847591;rsID:rs5063;</p>
    <p>
        The BiG Database for Han Population (BiG.Data) is a resource developed by Human Population Omics Group, with the goal of using computational approaches and developing new methods to dissect genetic architecture of human populations, quantitatively characterize genetic & phenotypic diversity, and reveal their demographic history and adaptive divergence.
    </p>
    <p>
        The data set provided on this website spans 257,519,942 SNPs and 20,000+ whole-genome sequences from 11 different modern Han population datasets, sequenced as part of various disease-specific and population genetic studies. The BiG.Data Principal Investigators and team can be found <a href="/about">here</a>, and the groups that have contributed data to the current release are listed <a href="/about">here</a>.
    </p>
    <p>
        All data here are released for the benefit of the wider biomedical community, without restriction on use - see the terms of use. Sign up for our mailing list for future release announcements.
    </p>
</div>
</template>

<style scoped>
    .data-context{
        margin-top: 20px;
        text-indent: 50px;
        line-height: 1.5;
        font-size: 18px;
    }
    a {
    color: #6e9197; /* 保持链接的默认颜色 */
    font-weight: bold;
    text-decoration: underline; /* 添加下划线 */
    }

    a:hover {
    color:seagreen; /* 鼠标悬停时的颜色 */
    }
    a::after {
    font-weight: bold; /* 加粗显示 */
    text-decoration: underline; /* 添加下划线 */
    }

    .input-container{
        display: flex;
        justify-content: center;
    }

</style>