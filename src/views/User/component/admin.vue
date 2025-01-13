<template>
    <div class="admin">
        <el-table :data="users" style="width:100%">
            <el-table-column prop="username" label="Username"></el-table-column>
            <el-table-column prop="email" label="Email"></el-table-column>
            <el-table-column prop="organization" label="Organization"></el-table-column>
            <el-table-column prop="department" label="Department"></el-table-column>
            <el-table-column prop="phoneNumber" label="PhoneNumber"></el-table-column>
            <el-table-column label="Actions">
                <template #default="scope">
                    <el-button type="danger" @click="confirmDelete(scope.row.id)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-form-item>
          <el-button type="primary" @click="logout">Logout</el-button>
        </el-form-item>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { deleteUser } from '@/api/user'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore();
const users = ref([])

onMounted(async()=>{
    try{
        users.value = await userStore.fetchUsers();
    }catch(error){
        ElMessageBox.alert('Failed to fetch users','Error',{type:'error'});
    }
})

// 删除确认逻辑
const confirmDelete = (userId) => {
  ElMessageBox.confirm(
    'Are you sure to delete this user?',
    'Confirm',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      type: 'warning'
    }
  )
    .then(() => handleDelete(userId))
    .catch(() => {
      // 用户取消操作
    })
}

// 执行删除用户
const handleDelete = async (userId) => {
  try {
    await deleteUser(userId)
    ElMessage.success('User deleted successfully')
    await userStore.fetchUsers() // 重新加载用户列表
  } catch (error) {
    ElMessage.error('Failed to delete user: ' + (error.response?.data?.message || 'Unknown error'))
  }
}
// 退出登录
const logout = () => {
ElMessageBox.confirm("Are you sure you want to log out?", "Confirm Logout", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
})
    .then(() => {
    authStore.logout(); // 清空登录状态
    router.push("/user/login"); // 跳转到登录页面
    })
    .catch(() => {
    // 用户取消退出登录
    });
};
// 组件加载时获取用户列表
onMounted(loadUsers)
</script>