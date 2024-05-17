<script setup>
</script>

<template>
<div class="HelpContent">
<h1 style="text-align: center;">User Guide</h1>

  <h2 style="text-align: left;">--Introduction</h2>
  <p class="paragraph">This user guide is a comprehensive compilation of all general navigation and other useful tools/features for using BiG.Data database.</p>

  <h2 style="text-align: left;">--An Analysis Pipeline for BiG.Data</h2>
  <p class="paragraph"><strong>a)A brief Introduction to the Pipeline</strong><br/>The pipeline consists of four steps: Upload & QC, Ancestry Inference, Imputation and GWAS analysis.</p>
      <div class="HelpContent-photo-container">
            <img src="@/assets/images/AnalysisPipeline.png" alt="Centered Image">
      </div>

  <h2 style="text-align: left;">--Home</h2>
  <p class="paragraph"><strong>a)Quick Usage for Searching on the Home Page</strong><br/>The Home page provides a quick searching for a gene or region. Users can use the search function by the following steps.<br/>
        1) Selecting chromosome<br/>
        2) Inputting start position of the gene or region<br/>
        3) Inputting the end position <br/>
        4) Gene name(The searching supports batch queries, which are separated by commas to return all query genetic information).<br/>
        Remember to input any information to activate the searching, and the examples are listed.</p>
  <p class="paragraph"><strong>b)Summary of PGHA Data Sources</strong><br/>
        The Pangenome.Highland database contains 6 highlander populations, over 1500 highlander genomes and 158MB novel sequences.</p>

  <h2 style="text-align: left;">--Allele Freq</h2>
  <p class="paragraph"><strong>a) Guidance for Searching Allele Frequency on the Allele Freq Page</strong><br/>
        This visualization page contains gene searching system which is the same as the one in 'Home' page. Our gene database provides novel contigs missing in human reference genome(GRCh38) for specific populations and further information of genes.<br/>    
        Users can input any one or more of the Chromosome, start position, end position, or gene number to search for a specific gene or region.(The searching supports batch queries, which are separated by commas to return all query genetic information). The searching system support single-conditional query by inputting one condition, multi-conditional comprehensive query by inputting several conditions, or directly click on the 'Search' button without any conditions to see all the information.</p>
        <div class="HelpContent-photo-container">
            <img src="@/assets/images/IntroductionAF.png" alt="Centered Image">
      </div>  

  <p class="paragraph"><strong>b) Guidance for Searching Further information and modifying the table</strong><br/>
        After the Gene/Contig Search, users are able to check the information and click the link for further details. Exporting the information of gene & contigs and adjusting the content displayed per page are supported. <br/>
        1)Users can click on the optional box to select the related information of the gene/contigs.<br/>
        2)Users can click the link button to check further details and annotations of the gene/contigs. The Annotation Page contains the gene information, altitudinal correlation, KEGG enrichment, pathway enrichment and inferred adaptive SF.<br/>
        3)Click the “EXPORT SELECTED” button to export the gene information users have selected.<br/>
        4)The pagination can be customized. Users can adjust the number of genes displayed per page and switch page.<br/></p>

  <h2 style="text-align: left;">--Data Statistics</h2>
  <p class="paragraph"><strong>a)Sample Composition</strong><br/>
        The pie chart contains information about the population and the corresponding number of samples, users can click on the image above to hide or show the proportion of the corresponding population samples. 1) Dragging the mouse over the different sections to show the size of samples for each population.</p>
  <p class="paragraph"><strong>b)Geographical Distribution with Altitude</strong><br/>
        The map contains altitude and regional distributions of our samples. 1) Dragging the mouse over the different sections of the map to show the name of the population, altitude and number of each samples. 2) The bar chart on the bottom left shows the exact altitude of each population. ( The deeper the red, the higher the altitude.)</p>

  <h2 style="text-align: left;">--Analysis</h2>

</div>
</template>

<style>
.paragraph {
    padding: 10px;
    color: black;
    line-height: 1.6;
    font-size: 16px;
    user-select: text;
}

.HelpContent-photo-container {
    text-align: center; /* 将图像居中 */
    margin-top: 20px; /* 添加上边距 */
    margin-bottom: 20px; /* 添加下边距 */
}

.HelpContent-photo-container img {
    width: 70%; /* 设置图像宽度为900px */
    height: 70%; /* 设置图像高度为600px */
    display: block; /* 设置图像为块级元素，以便居中显示 */
    margin: 20px auto; /* 设置上下边距为20px，左右居中 */
}


</style>
