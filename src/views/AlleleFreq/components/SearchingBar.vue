<script lang="ts" setup>
import {ref} from 'vue'
const input = ref('')
</script>

<template>
    <h2 style="text-align: center;">Search</h2>
    <div class="searching-container">
        <el-input v-model="input" style="width: 800px; height:45px;" placeholder="rs114514 or  1:114514123" >
        <template #append>
            <strong style="font-size: 18px;">Submit</strong>
        </template>   
        </el-input>
    </div>
    
    <div class="data-context">
    <p style="font-size: 14px;color:yellowgreen;">e.g. &nbsp;&nbsp;Variants:1:11847591;rsID:rs5063;</p>
    <p>
        The Genome Aggregation Database (gnomAD) is a resource developed by an international coalition of investigators, with the goal of aggregating and harmonizing both exome and genome sequencing data from a wide variety of large-scale sequencing projects, and making summary data available for the wider scientific community.
    </p>
    <p>
        The v4 data set (GRCh38) provided on this website spans 730,947 exome sequences and 76,215 whole-genome sequences from unrelated individuals, of diverse ancestries, sequenced as part of various disease-specific and population genetic studies. The gnomAD Principal Investigators and team can be found here, and the groups that have contributed data to the current release are listed here.
    </p>
    <p>
        All data here are released for the benefit of the wider biomedical community, without restriction on use - see the terms of use. Sign up for our mailing list for future release announcements.
    </p>
</div>
</template>

<style>
    .data-context{
        margin-top: 20px;
        text-indent: 50px;
        line-height: 1.5;
        font-size: 18px;
    }
    .searching-container{
        display: flex;
        justify-content: center;
    }
</style>