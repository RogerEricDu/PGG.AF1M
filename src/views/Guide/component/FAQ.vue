<template>
    <h3 style="font-size: 24px; margin-bottom: 20px;">| FAQ</h3>
<div class="FAQ-container">
    <p class="subtitle-container" style="font-weight: bold;font-size: 18px;">1. How to choose the reference panels?</p>
</br>
    <p>1.If your data have specific information of Han subgroups, reference panel “Subgroup Central China Han, “Subgroup Northeast Han”, “Subgroup Northwest Han”, “Subgroup Southeast Han”, “Subgroup Southwest Han”, “Subgroup Southcoast Han” can be selected according to the subgroups.</p>
</br>
    <p>2.If you need more variants, “Han deep sequencing” is the best choice.</p>
</br>
    <p>3.If you want to run faster, “Han100K” and “CONVERGE” can be used.</p>
</br>
    <p  class="subtitle-container" style="font-weight: bold;font-size: 18px;">2. Will all variants in my data be taken into imputation?</p>
    <p>Currently, the imputation service is only able to handle the biallelic SNP data in autosomes. Imputation with a reference panel requires the quality control and strand recalibration of input data, there might be some variants discarded before imputation. Then, only shared variants between input datasets and reference panels can be used to genotype imputation.</p>
</div>
</template>

<style>
.FAQ-container {
    display: block; /* 设置为块级元素 */
    user-select: text; /* 允许文本被选择 */
    position: relative; /* 添加相对定位 */

}
.FAQ-container::before {
    content: ''; /* 创建伪元素 */
    position: absolute;

}


.FAQ-container p {
    color: black;
    font-size: 14px;
    margin-bottom: 15px; /* 添加段落之间的间距 */
}
</style>