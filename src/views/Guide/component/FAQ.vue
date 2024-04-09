<template>
<div class="FAQ-container">
    <h3>1. How to choose the reference panels?</h3>
</br>
    <p>1.If your data have specific information of Han subgroups, reference panel “Subgroup Central China Han, “Subgroup Northeast Han”, “Subgroup Northwest Han”, “Subgroup Southeast Han”, “Subgroup Southwest Han”, “Subgroup Southcoast Han” can be selected according to the subgroups.</p>
</br>
    <p>2.If you need more variants, “Han deep sequencing” is the best choice.</p>
</br>
    <p>3.If you want to run faster, “Han100K” and “CONVERGE” can be used.</p>
</br>
    <h3>2. Will all variants in my data be taken into imputation?</h3>
    <p>Currently, the imputation service is only able to handle the biallelic SNP data in autosomes. Imputation with a reference panel requires the quality control and strand recalibration of input data, there might be some variants discarded before imputation. Then, only shared variants between input datasets and reference panels can be used to genotype imputation.</p>
</div>
</template>

<style>
.FAQ-container{
    color: black;
    line-height: 1.5;
}
    .FAQ-container h3{
        font-size: 24px;
        margin-top: 50px;
    }
    .FAQ-container p{
        font-size: 16px;
    }
</style>