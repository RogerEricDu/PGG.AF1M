<script setup>
import image1 from '@/assets/images/Homepage_banner1.png'
import image2 from '@/assets/images/sample2.jpg'

const imageUrl = [
  { url: image1 },
  { url: image2 },
];
</script>



<template>
  <h2 style="text-align: center;">Welcome to BiG.Data!</h2>
  <div class="home-banner" style="text-align:center">
    <el-carousel height="600px">
      <el-carousel-item v-for="item in imageUrl" :key="item">
        <img :src="item.url" alt=""/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 600px;
  position: absolute;
  left: 0;
  top: 50px;
  z-index: 98;

  img {
    width: 100%;
    height: 800px;
  }
}
</style>