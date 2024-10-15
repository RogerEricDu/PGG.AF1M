<template>
    <div class="container" style="height: 660px; margin-top: 40px;">
        <HomeBanner />
    </div>
    <el-divider />
    <div class="container" style="height: 400px;">
        <HomeStatistics />
    </div>
    <el-divider />
    <div class="container" style="height: auto;">
        <HomeDetails />
    </div>

</template>

<script setup>
import HomeBanner from "./components/HomeBanner.vue"
import HomeDetails from './components/HomeDetails.vue'
import HomeStatistics from './components/HomeStatistics.vue'
</script>

<style scoped>
</style>