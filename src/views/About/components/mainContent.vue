<script>
// 使用 script setup 来编写组件逻辑
import { defineComponent } from 'vue'


// 导出组件定义
export default defineComponent({
  // 组件选项
})
</script>

<template>
<div>
<!--   <h4>Norwegian Mountain Trip</h4>
  <img border="0" src="@/assets/images/HumPOGlab.png" alt="HumPOG lab" width="304" height="228"> -->
        <h4 style="text-align: center;">Welcome to BiG.Data !</h4>
        <p class="paragraph">The Han Chinese Genomes Database (PGG.Han) serves as the central repository of the genomic data of the Han Chinese Genomes Project (Phase I). As is its current version, PGG.Han archives 8,056,973 genome-wide single nucleotide variants (SNVs) of 102,583 Han Chinese individuals (a.k.a. Han100K). PGG.Han aims to: 1) facilitate understanding the population structure and history of Han Chinese; 2) screen AIMs panels for detecting and controlling population stratification in medical and evolutionary studies; 3) create a shared control panel for genotype-phenotype association studies (e.g., GWAS); 4) provide a Han-Chinese-specific reference panel for genotype imputation. Computational tools are implemented into the PGG.Han, and an online user interface is provided for data analysis and results visualization.</p>
        <p class="paragraph"><strong>Fine-scale population structure: </strong>Han Chinese individuals formed a distinct cluster from the surrounding groups including minority groups in China and other neighboring countries, suggesting a full-identity of Han Chinese people in terms of overall genetic make-up. Sub-populations within Han Chinese are seen, which represent 6 sub-groups: North, Northeast, Central, South, Southwest, and Southeast. In spite of connections are also obvious among the groups, the northern Han Chinese have been influenced more by northern Chinese minorities, and southern Han Chinese by southern neighbors.</p>
        <p class="paragraph"><strong>Informative Markers (AIMs):</strong> We screened nested AIMs panels for detecting population structure and controlling population stratification to improve association testing and population genetic analysis. Our analysis show that the AIMs panel had sufficient power to discern and control population stratification in Han Chinese, which could significantly reduce false positive rates in both genome-wide association studies (GWAS) and candidate gene association studies (CGAS). We suggest this AIMs panel be genotyped and used to control and correct population stratification in the study design or data analysis of future association studies, especially in CGAS which is the most popular approach to validate previous reports on genetic associations of diseases in post-GWAS era. In addition, we also provide a computational pipeline for users who can customize the reverence populations for screening their own AIMs panels. genetic ancestry and population structure</p>
        <p class="paragraph"><strong>Han-Chinese-Specific Reference Panel for Genotype Imputation:</strong> A reference panel facilitate complex diseases mapping using population-based association studies, which has been well-established and demonstrated its power for populations of European ancestry but lacks for Han Chinese, the largest ethnic group in East Asia and in the world. We develop a Han-Chinese-Specific Reference Panel and an online server for genotype imputation to facilitate further association studies. Notably, we provide a population structure-aware reference panel by which users can customize the imputation reference by selecting particular subpopulation samples with respect to population stratification.</p>

</div>
</template>

<style>
.paragraph{
   color: black;
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 16px;
}


</style>