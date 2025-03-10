<template>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Database</h3>
<div class="Database-container">
    <p>
        In the database section, PGG.AF1M provides visualization of the fine-scale genetic structure of different large-scale populations and multiple genetic information of genome-wide SNVs by genetic and geographical sub-populations.
    </p>
    <h3 style="font-size: 20px; margin-bottom: 20px;">| Data <a href="/data" style="color: darkcyan;">(Jump)</a></h3>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. Dataset</p>
    <p>
        This page displays the dataset names and sources used in this database. Subheadings show the dataset names, with the data type (including chip data, NGS data, or TGS data) indicated in parentheses. Each card contains detailed information about the dataset (such as sample size, sequencing depth, and number of variants). Clicking on the green text below will redirect to the corresponding database and original article for that dataset.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. Population</p>
    <p>
        This part presents basic information about all populations used in this database, including Han Chinese and some plateau ethnic groups and minority populations.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">3. Geographic Distribution</p>
    <p>
        This part displays a geographical distribution map of the samples used in this database, divided according to the provinces of China. The color gradient from blue to red indicates the number of samples in each region, with darker colors representing higher sample counts. Hovering over the bar chart on the right will highlight the corresponding province on the map in yellow, based on the value indicated by the mouse pointer.
    </p>
<!--     <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">4. Gene Flow</p>
    <p>
        This part shows the shared genetic drift among selected 3 populations, which can also obtain recent gene flow from 2 source population to the target population. Only 2 of 3 populations from Source1, Source2 and Target should be selected and click the ‘Search’ button will gain the results.
    </p> -->
    <h3 style="font-size: 20px; margin-bottom: 20px;">| Variant </h3>
    <p>
        The high-quality genome-wide SNP genotyped data can be queried on this page. We provide two different ways of querying. <br>
        If you want to search for SNPs across the entire dataset in the database, use <strong>Database-wide SNP Search</strong> .<br>
        If you want to search for frequency differences of a single SNP across different populations, use <strong> Single SNP Comparison</strong>. For one selected SNV, there is multiple genetic information such as allele frequency, variant annotation, genome diversity and so on. In addition to displaying a map of frequency distribution and a data table, we also provide external links to other databases(Click the <strong>INFO</strong> button to check further information).
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. <a href="/alleleFreq/all_ind" style="color: darkcyan;">Individuals</a></p>
    <p>
        Depends on individual levels. Users can search variants information through whole database.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. <a href="/alleleFreq/by_province" style="color: darkcyan;">Province</a></p>
    <p>
        This part depends on province levels. Users can search variants information among 35 provinces.
        <br>(    'Beijing', 'Tianjin', 'Shanghai', 'Chongqing', 'Anhui', 'Fujian', 'Gansu', 'Guangdong', 'Guangxi', 'Guizhou',
    'Hainan', 'Hebei', 'Heilongjiang', 'Henan', 'Hubei', 'Hunan', 'Jiangsu', 'Jiangxi', 'Jilin', 'Liaoning',
    'Ningxia', 'Qinghai', 'Shaanxi', 'Shandong', 'Shanxi', 'Sichuan', 'Tibet', 'Xinjiang', 'Yunnan', 'Zhejiang',
    'HongKong', 'Macau', 'Taiwan', 'InnerMongolia', 'Singapore')
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">3. <a href="/alleleFreq/by_region" style="color: darkcyan;">Region</a></p>
    <p>
        This part depends on region levels. Users can search variants information among 6 regions.
        <br>('central', 'northeast', 'northwest', 'southcoast', 'southwest','southeast')
    </p>
</div>
</template>

<style>
.Database-container {
    font-weight: normal;
    color: black;
    display: block; /* 设置为块级元素 */
    user-select: text; /* 允许文本被选择 */
}

.Database-container p {
    color: black;
    font-size: 16px;
    margin-bottom: 15px; /* 添加段落之间的间距 */
}
.subtitle-container{
    margin-top: 20px; /* 添加标题之间的间距 */
}
</style>