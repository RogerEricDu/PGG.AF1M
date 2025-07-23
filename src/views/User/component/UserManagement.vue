<template>
  <div class="user-management">
    <!-- 更新资料按钮和第三方账号绑定按钮 -->

    <el-table :data="users" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="Username" />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="organization" label="Organization" />
      <el-table-column prop="department" label="Department" />
      <el-table-column prop="phone_number" label="Phone Number" />
      <!-- <el-table-column prop="role" label="Role" /> -->
      <el-table-column label="Actions" width="180">
        <template #default="scope">
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="button-group">
    <el-button type="primary" @click="showDialog = true">
      Create New User
    </el-button>
      <!-- 登出按钮 -->
      <el-button
        type="danger"
        @click="logout"
      >
        <el-icon><UserFilled /></el-icon>
        <el-icon><Right /></el-icon>
        Logout
      </el-button>
    </div>

    <el-dialog v-model="showDialog" title="Create User">
      <el-form :model="newUser" label-width="100px">
        <el-form-item label="Username">
          <el-input v-model="newUser.username" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="newUser.password" type="password" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="newUser.email" />
        </el-form-item>
        <el-form-item label="Organization">
          <el-input v-model="newUser.organization" />
        </el-form-item>
        <el-form-item label="Department">
          <el-input v-model="newUser.department" />
        </el-form-item>
        <el-form-item label="PhoneNumber">
          <el-input v-model="newUser.phone_number" />
        </el-form-item>
        <el-form-item label="Role">
          <el-select v-model="newUser.role" placeholder="Select role">
            <el-option label="User" :value="1" />
            <el-option label="Admin" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">Cancel</el-button>
        <el-button type="primary" @click="createUser">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from 'element-plus'
import { getAllUsers, register,deleteUser } from '@/api/user' // 替换成你自己的接口路径
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
const router = useRouter()
const users = ref([])
const loading = ref(false)
const showDialog = ref(false)
const newUser = ref({
  username: '',
  password: '',
  email: '',
  organization:'',
  department:'',
  phone_number:'',
  role: 1
})

const loadUsers = async () => {
  loading.value = true
  try {
    const res = await getAllUsers()
    users.value = res.data
  } catch (err) {
    ElMessage.error('Failed to load users')
  }
  loading.value = false
}

const handleDelete = (id) => {
  ElMessageBox.confirm('Are you sure you want to delete this user?', 'Warning', {
    type: 'warning'
  }).then(async () => {
    await deleteUser(id)
    ElMessage.success('User deleted')
    loadUsers()
  }).catch(() => {})
}

const createUser = async () => {
  try {
    await register(newUser.value)
    ElMessage.success('User created')
    showDialog.value = false
    loadUsers()
  } catch (err) {
    ElMessage.error('Failed to create user')
  }
}

const userStore = useUserStore();
const authStore = useAuthStore();

const logout = () => {
  ElMessageBox.confirm("Are you sure you want to log out?", "Confirm Logout", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
    .then(() => {
      authStore.logout();
    })
    .catch(() => {});
};

onMounted(loadUsers)
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
</style>