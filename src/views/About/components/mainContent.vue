<script>
// 使用 script setup 来编写组件逻辑
import { defineComponent } from 'vue'


// 导出组件定义
export default defineComponent({
  // 组件选项
})
</script>

<template>

<div class="mainContent-container">
  <h3 style="font-size: 24px;margin-bottom: 20px;">| Aim and Scope</h3>
    <div class="mainContent-photo-container">
      <img src="@/assets/images/about-1.jpg" alt="Centered Image">
    </div>
        <p>The Allele Frequency Database for Large Populations (PGG.AF1M) is a resource developed by Human Population Omics Group,the data set provided on this website spans 257,519,942 SNPs and 120,000+ whole-genome sequences from 11 different modern Han population datasets, sequenced as part of various disease-specific and population genetic studies. PGG.AF1M aims to: 
        <br/>① Filling the Gap in Genetic Variation Research for Large-Scale Chinese Populations
        <br/>② Promoting the Development of Precision Medicine
        <br/>③ Advancing Population Genetics and Evolutionary Research
        <br/>④ Supporting Comparative Studies of Global Genetic Variation</p>
        <p><strong>Filling the Gap in Genetic Variation Research for Large-Scale Chinese Populations: </strong> <br>Traditional genomic reference sequences have primarily been based on European and American populations, leading to the neglect of genetic variation characteristics in Chinese populations. By integrating genomic data from Han and ethnic minority groups, the PGG.AF1M database provides more accurate and representative genomic allele frequency and genotype frequency data for Chinese populations, laying the foundation for genetic research in this region.</p>
        <p><strong>Promoting the Development of Precision Medicine:</strong>  <br>The establishment of the PGG.AF1M database will provide strong support for precision medicine, particularly in research areas such as disease susceptibility genes and drug responses. By analyzing genetic variation frequencies, it offers more scientific data for personalized treatment and early diagnosis.</p>
        <p><strong>Advancing Population Genetics and Evolutionary Research:</strong> <br> The population genetics analysis capabilities of the database help study genetic differences among various populations, revealing genetic diversity and evolutionary history. This provides crucial data for research in human genetics, evolutionary biology, and population history.</p>
        <p><strong>Supporting Comparative Studies of Global Genetic Variation:</strong> <br>The integration of the PGG.AF1M database with international databases such as GnomAD offers a more comprehensive tool for global genomic variation research. Researchers can conduct cross-population comparisons to explore the genetic characteristics of different regions and ethnic groups, as well as their potential impacts on diseases.</p>

</div>
</template>

<style scoped>
.mainContent-container{
  user-select: text; /* 允许文本被选择 */
}
.mainContent-container p{
    font-weight: normal;
    color: black;
    margin-bottom: 20px;
    line-height: 1.6;
    font-size: 16px;
}
.mainContent-photo-container {
    margin-bottom: 20px; /* 图片下方留出一些空间 */
}

.mainContent-photo-container img {
    height: 350px;
    width: 630px;
    display: block; /* 使图片居中 */
    margin: 0 auto; /* 水平居中 */
}

strong {
  font-size: 16px;
  color: black;
}

</style>