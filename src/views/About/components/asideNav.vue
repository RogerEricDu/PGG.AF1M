<script>
import { currentPage } from '@/views/About/components/mainContent.vue';

export default {
  methods: {
    setCurrentPage(page) {
      currentPage.value = page; // 更新 currentPage 变量的值
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>


<template>
    <el-row>
        <el-col :span="24">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="setCurrentPage('aimAndScope')">
          <el-icon><location /></el-icon>
          <span>01 Aim and Scope</span>
        </el-menu-item>
        <el-menu-item index="2" @click="setCurrentPage('team')">
          <el-icon><location /></el-icon>
          <span>02 Team</span>
        </el-menu-item>
        <el-menu-item index="3" @click="setCurrentPage('collaborator')">
          <el-icon><location /></el-icon>
          <span>03 Collaborator</span>
        </el-menu-item>
        <el-menu-item index="4" @click="setCurrentPage('contactUs')">
          <el-icon><location /></el-icon>
          <span>04 Contact Us</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</el-row>
</template>

<style>





</style>