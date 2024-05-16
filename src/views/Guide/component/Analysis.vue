<template>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Analysis</h3>
 <div class="Analysis-container">
    <p>In the analysis section, The PGG.Han provides: 1) nested AIMs panels for detecting and controlling population stratification in medical and evolutionary studies; 2) a population-structure-aware shared control for genotype-phenotype association studies (e.g., GWAS); 3) a Han-Chinese-specific reference panel for genotype imputation. Computational tools are implemented into the PGG.Han, and an online user interface is provided for data analysis and results in visualization.</p>
    <h3 style="font-size: 20px; margin-bottom: 20px;">| Data Security</h3>
    <p>
      Any data you upload is protected seriously. Only you can read them. You can delete your data at any time from our servers. We do not use it for our analyses.
    </p>
    <h3 style="font-size: 20px; margin-bottom: 20px;">| Using the Server</h3>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. Prepare your data</p>
    <p>
      Acceptable Input: PLINK 1 binary(*.bed, *.bim, *.fam) or VCF format.<br>
      The following information is required:<br>
      a. All alleles of the forward strand;<br>
      b. GRCh38 Coordinates.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. Registration and Login <a href="/login" style="color: darkcyan;">(Jump)</a></p>
    <p>
      Registration is required for the first use of PGG. Han Analysis Server. After logging in, the service can be used for free.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">3. Upload data & QC <a href="/Analysis" style="color: darkcyan;">(Jump)</a></p> <!-- 这里后续要调整，改成analysis内部的分支功能 -->
    <p>
      We provide two ways to upload data. For small-scale data (<100MB), you can upload it directly on the web through the HTTP protocol. For large-scale data, you need to upload it to our server via FTP. For a better experience, we limit the number of samples to <=200 and the number of variants to <=5,000,000. <br>
        Before you start analysis, you need to do data checking. Only data that complete data checking can be used for other analyses.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">4. Pipelines</p>
    <p>a. Ancestry inference<br>
      Various commonly used algorithms/analyses for ancestry inference are applied to dissect the ancestry composition and genetic affinity of an individual of interest. For more details and a demo report, click <a href="/Analysis" style="color: darkcyan;">here</a>.<br>
      b. Imputation<br>
      Our imputation service is designed to meet a request for imputation: achieving the best imputation result of Han population data with a reference panel based on our NGS datasets of Han Chinese. For more details and a demo report, click <a href="/Analysis" style="color: darkcyan;">here</a>.<br>
      c. GWAS<br>
      We provide the platform for GWAS analysis, as well as the largest control of the Han Chinese population (Han100K). Users only need to provide genotype data, covariate, and phenotype files. For more details and a demo report, click <a href="/Analysis" style="color: darkcyan;">here</a>.<br>
      d. Quick Start<br>
      A simple, fast, and efficient integrated analysis pipeline integrating three analysis modules of Ancestry Inference, Imputation and GWAS. For more details, click <a href="/Analysis" style="color: darkcyan;">here</a>.<br>
      <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">5. Results</p>
      <p>All analysis results will be presented in the form of file downloads and visual online reports.</p>
    </p>
 </div>
</template>
<style>
.Analysis-container {
    font-weight: normal;
    color: black;
    display: block; /* 设置为块级元素 */
    user-select: text; /* 允许文本被选择 */
}

.Analysis-container p {
    color: black;
    font-size: 16px;
    margin-bottom: 15px; 
}
.subtitle-container{
    margin-top: 20px;
}
</style>