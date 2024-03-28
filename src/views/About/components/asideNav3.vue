<template>
    <el-row>
        <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>01 Aim and Scope</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><location /></el-icon>
          <span>02 Team</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><location /></el-icon>
          <span>03 Collaborator</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><location /></el-icon>
          <span>04 Contact Us</span>
        </el-menu-item>
      </el-menu>
    </el-col>
</el-row>
</template>

<script lang="ts" setup>
import {
/*   Document,
  Menu as IconMenu, */
  Location,
/*   Setting, */
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>