<script setup>
import HomeBanner from "./components/HomeBanner.vue"
import HomeDetails from './components/HomeDetails.vue'
import HomeStatistics from './components/HomeStatistics.vue'
</script>


<template>
    <div class="container" style="height: 600px;">
        <HomeBanner />
    </div>
    <el-divider />
    <div class="container" style="height: 400px;">
        <HomeStatistics />
    </div>
    <el-divider />
    <div class="container" style="height: 400px;">
        <HomeDetails />
    </div>


</template>

<style scoped>

</style>