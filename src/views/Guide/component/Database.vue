<template>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Database</h3>
<div class="Database-container">
    <p>
        In the database section, PGG.Han provides visualization of the fine-scale genetic structure of the Han Chinese population and multiple genetic information of genome-wide SNVs by genetic and geographical sub-populations
    </p>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Genetic Structure <a href="/data" style="color: darkcyan;">(Jump)</a></h3>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. Genetic Affinity</p>
    <p>
        This page shows the genetic relationship within the Han Chinese population at two different levels. The first half is divided into sub-populations by provinces, and the second half is divided by genetic structure. Click on a sub-population on the map and the genetic relationship between the sub-population and other sub-populations is shown on the right.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. Population Structure</p>
    <p>
        This part shows the genetic coordinates of Han Chinese population, including grouping by province and by genetic structure. Click on a sub-population on the map and its genetic coordinates will be displayed on the right.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">3. Ancestry</p>
    <p>
        This part shows the genetic composition of the Han Chinese population in the context of worldwide populations. Each individual is represented by a single line broken into K colored segments, with lengths proportional to the K inferred components (Cs). The population IDs are presented outside of the circle of the plot. You can see the results of different K by clicking on the drop-down menu.
    </p>
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">4. Gene Flow</p>
    <p>
        This part shows the shared genetic drift among selected 3 populations, which can also obtain recent gene flow from 2 source population to the target population. Only 2 of 3 populations from Source1, Source2 and Target should be selected and click the ‘Search’ button will gain the results.
    </p>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| Variant <a href="/alleleFreq" style="color: darkcyan;">(Jump)</a></h3>
    <p>
        The high-quality genome-wide SNP genotyped data can be queried on this page. We provide two different ways of querying, position or rsID. For one selected SNV, there is multiple genetic information such as allele frequency, variant annotation, genome diversity and so on. In addition to displaying a map of frequency distribution and a data table, we also provide external links to other databases.
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