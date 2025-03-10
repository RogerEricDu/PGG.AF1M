<template>
    <h3 style="font-size: 24px; margin-bottom: 30px;">| Tools</h3>
 <div class="Analysis-container">
  <h3 style="font-size: 20px; margin-top: 30px; margin-bottom: 10px;">| We Provide</h3>
    <p>In the Tools section, The PGG.AF1M provides: <br>
      ① <strong>Multidimensional Genetic Variation Data: </strong>The PGG.AF1M database contains genomic data from multiple Han individuals and ethnic minority groups, with a focus on allele frequency and genotype frequency information. It categorizes data by province, region, ethnic group, and data type, and continues to expand the sample size and ethnic diversity based on the PGG.Han1.0 and 2.0 samples. Through the integration and analysis of these variations, the database provides researchers with a more comprehensive and accurate variation spectrum.<br>
      ② <strong>Population Genetics Analysis and Visualization: </strong>In addition to basic variation data, the PGG.AF1M database also includes population genetics analysis capabilities. Users can compare the frequency of genetic variations among specific populations (such as Han and ethnic minorities) and analyze genetic differences between different groups. The database also offers visualization tools for genetic variation analysis, enabling researchers to intuitively display and compare genetic characteristics across populations. <br>
      ③ <strong>Genotype Imputation Function: </strong>The PGG.AF1M database supports genotype imputation, which is particularly important for researchers dealing with partially missing genotype data. Using this function, users can impute missing data based on existing genomic data, thereby improving the accuracy and completeness of research results.<br>
      ④ <strong>DeepSeek Assistant Functionality: </strong>The PGG.AF1M database has integrated the DeepSeek API. Users can access the DeepSeek feature via the "DeepSeek" button on the Tools page. By interacting with the DeepSeek model, users can perform more personalized queries and searches for various variants and genetic information within the database. Additionally, it provides simple Q&A and introductions based on the data in the database, along with relevant data sources.</p>
    
    <!-- 标题1 -->
      <h3 style="font-size: 20px;  margin-top: 30px; margin-bottom: 10px;">| Data Security</h3>
    <p>
      All data you upload is strictly protected and accessible exclusively to you. You have the authority to delete your data from our servers at any time. We do not utilize your data for any analytical purposes.    </p>
    
    <!-- 标题2 -->
      <h3 style="font-size: 20px;  margin-top: 30px; margin-bottom: 10px;">| Prepare Data</h3>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. Confirm data format</p>
    <p>
      ①For Batch Searching: <br>
      <strong>.txt format</strong><br>
      The following information is required:<br>
      a. Chromosome<br>
      b. Position
    </p>
    <p>
      ②For Imputation Input: <br>
      <strong>VCF format</strong><br>
      The following information is required:<br>
      a. All alleles of the forward strand;<br>
      b. GRCh38 Coordinates.
    </p>
    <p>
      ③For GWAS Input: <br>
      <strong>PLINK 1 binary(*.bed, *.bim, *.fam) or VCF format.</strong><br>
      The following information is required:<br>
      a. All alleles of the forward strand;<br>
      b. GRCh38 Coordinates.
    </p>
    
    <!-- 标题3 -->
    <h3 style="font-size: 20px; margin-top: 30px; margin-bottom: 10px;">| Using the Server</h3>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. <a href="/user/login" style="color: darkcyan;">Registration and Login</a></p>
    <p>
      Registration is required for the first use of PGG.AF1M Tools Server. After logging in, the service can be used for free.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. <a href="/tools/DataUpload" style="color: darkcyan;">Upload data</a></p> <!-- 这里后续要调整，改成analysis内部的分支功能 -->
    <p>
      We provide two ways to upload data. For small-scale data (<100MB), you can upload it directly on the web through the HTTP protocol. For large-scale data, you need to upload it to our server via FTP. For a better experience, we limit the number of samples to <=200 and the number of variants to <=5,000,000. <br>
        Before you start analysis, you need to do data checking. Only data that complete data checking can be used for other analyses.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">3. Pipelines</p>
    <p>① <a href="/tools/DataUpload" style="color: darkcyan;">Batch Searching</a><br>
      We support file uploads for batch retrieval of SNP information, offering a comprehensive and accurate variation spectrum for researchers.<br>
      ② <a href="/tools/Imputation" style="color: darkcyan;">Imputation</a><br>
      Our imputation service is designed to meet a request for imputation: achieving the best imputation result of Han population data with a reference panel based on our NGS datasets of Han Chinese.<br>
      ③ <a href="/tools/GWAS" style="color: darkcyan;">GWAS</a><br>
      We provide the platform for GWAS analysis, as well as the largest control of the Han Chinese population (Han100K). Users only need to provide genotype data, covariate, and phenotype files.<br>
      ④ <a href="/tools/DeepSeek" style="color: darkcyan;">DeepSeek</a><br>
      We integrates the DeepSeek API, enabling users to perform personalized searches for variants and genetic information, along with Q&A and data source references.<br>
      <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">4. <a href="/user/profile" style="color: darkcyan;">Results</a></p>
      <p>All tasks can be presented in your personal homepage directory, where you can view the corresponding task names, progress, and result displays.</p>
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