<template>
  <div class="profile-page">
    <!-- 右侧部分 -->
    <div class="profile-content">
      <!-- 管理员界面 -->
      <div v-if="isAdmin">
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
      </div>

      <!-- 普通用户界面 -->
      <div v-else>
      <div class="profile-tab-content">
        <!-- 将 transition 内部的所有内容包裹在一个 div 中 -->
        <transition name="fade-slide">
          <div>
            <!-- 更新资料按钮和第三方账号绑定按钮 -->
            <div class="button-group">
              <el-button
                v-if="!isFormVisible"
                class="update-profile-button"
                type="primary" 
                @click="toggleFormVisibility"
              >
                <el-icon><EditPen /></el-icon>Update Your Profile
              </el-button>

              <el-button
                v-if="!isSocialFormVisible"
                class="bind-social-button"
                type="success"
                @click="toggleSocialFormVisibility"
              >
                <el-icon><Link /></el-icon>Bind Social Accounts
              </el-button>
                    <!-- 登出按钮 -->
              <el-button
                type="danger"
                class="update-profile-button"
                @click="logout"
              >
                <div class="icon-container">
                  <el-icon><UserFilled /></el-icon>
                  <el-icon><Right /></el-icon>
                </div>
                <div class="text-container">
                  <slot>Logout</slot>
                </div>
              </el-button>
            </div>

            <!-- 资料表单 -->
            <el-form
              v-if="isFormVisible"
              ref="profileFormRef"
              :model="profileForm"
              :rules="rules"
              label-width="120px"
              @submit.prevent="updateProfile"
              class="profile-form animated"
              style="margin-top: 20px;"
            >
              <!-- 原有的表单内容 -->
              <el-form-item label="Username" prop="username">
                <el-input
                  type="text"
                  v-model="profileForm.username"
                  placeholder="Enter your username"
                  clearable
                />
              </el-form-item>
              <el-form-item label="New Password" prop="password">
                <el-input
                  :type="passwordVisible ? 'text' : 'password'"
                  v-model="profileForm.password"
                  placeholder="Enter new password"
                  clearable
                >
                  <template #suffix>
                    <div class="password-toggle" @click="togglePasswordVisibility">
                      <el-icon>
                        <component :is="passwordVisible ? Hide : View" />
                      </el-icon>
                    </div>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label="Confirm" prop="confirm">
                <el-input
                  :type="passwordVisible ? 'text' : 'password'"
                  v-model="profileForm.confirm"
                  placeholder="Confirm new password"
                  clearable
                />
              </el-form-item>
              <el-form-item label="Email">
                <el-input
                  type="email"
                  v-model="profileForm.email"
                  placeholder="Enter your email"
                  clearable
                />
              </el-form-item>
              <el-form-item label="Organization">
                <el-input
                  v-model="profileForm.organization"
                  placeholder="Enter your organization"
                  clearable
                />
              </el-form-item>
              <el-form-item label="Department">
                <el-input
                  v-model="profileForm.department"
                  placeholder="Enter your department"
                  clearable
                />
              </el-form-item>
              <el-form-item label="Phone Number">
                <el-input
                  v-model="profileForm.phone_number"
                  placeholder="Enter your phone number"
                  clearable
                />
              </el-form-item>
              <el-form-item label="2FA">
                <div class="mfa-section">
                  <el-switch v-model="mfaEnabled" />
                  <el-button type="text" @click="showQrCode">
                    {{ mfaEnabled ? '已启用' : '点击配置' }}
                  </el-button>
                </div>
              </el-form-item>
              <el-form-item>
                <div style="display: flex; gap: 10px;">
                  <el-button
                    type="primary"
                    native-type="submit"
                    :disabled="!isFormValid"
                  >
                    <el-icon><Edit /></el-icon>Confirm Update
                  </el-button>
                  <el-button
                    type="warning"
                    @click="resetForm"
                    class="reset-button"
                  >
                    <el-icon><Refresh /></el-icon>Reset
                  </el-button>
                </div>
                <el-button
                  type="danger"
                  @click="toggleFormVisibility"
                  class="cancel-button"
                  style="margin-left: auto;"
                >
                  <el-icon><CircleClose /></el-icon>Cancel
                </el-button>
              </el-form-item>
            </el-form>

            <!-- 第三方账号绑定表单 -->
            <el-form
              v-if="isSocialFormVisible"
              ref="socialFormRef"
              :model="socialForm"
              label-width="120px"
              class="social-form animated"
              style="margin-top: 20px;"
            >
              <el-form-item label="GitHub">
                <el-button
                  type="primary"
                  @click="bindSocial('github')"
                >
                  <el-icon><Link /></el-icon>Bind GitHub
                </el-button>
              </el-form-item>
              <el-form-item label="Google">
                <el-button
                  type="primary"
                  @click="bindSocial('google')"
                >
                  <el-icon><Link /></el-icon>Bind Google
                </el-button>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  @click="toggleSocialFormVisibility"
                  class="cancel-button"
                  style="margin-left: auto;"
                >
                  <el-icon><CircleClose /></el-icon>Cancel
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </transition>
      </div>

      <!-- 嵌入 ResultsPage 组件 -->
      <ResultsPage :username="authStore.user?.username" :email="authStore.user?.email"/>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { ElMessageBox,ElMessage } from "element-plus";
import ResultsPage from "./ResultsPage.vue"; // 引入 ResultsPage 组件
import { View, Hide, EditPen, Link, UserFilled, Right, Edit, Refresh, CircleClose } from '@element-plus/icons-vue'
import { getAllUsers, register, deleteUser } from '@/api/user'

// 共用
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

const isAdmin = computed(() => authStore.user?.role === 2)

//管理员
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
//挂载
onMounted(loadUsers)
//普通用户
const profileForm = ref({
  username: authStore.user?.username || "",
  password: "",
  confirm: "",
  email: authStore.user?.email || "",
  organization: "",
  department: "",
  phone_number: "",
});

const rules = {
  username: [{ required: true, message: "Please enter your username", trigger: "blur" }],
  password: [
    { required: true, message: "Please enter a new password", trigger: "blur" },
    {
      validator: (_, value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,}$/.test(value),
      message: "Must contain uppercase and lowercase letters and numbers, at least 8 characters.",
    },
  ],
  confirm: [
    { required: true, message: "Please confirm your new password", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== profileForm.value.password) {
          callback(new Error("Passwords do not match"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  email: [{ required: true, message: "Please enter your email", trigger: "blur" }],
};

const socialForm = ref({}); // 第三方账号绑定表单数据

const isFormVisible = ref(false); // 控制资料表单显示
const isSocialFormVisible = ref(false); // 控制第三方账号绑定表单显示
const passwordVisible = ref(false);
const mfaEnabled = ref(false);

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const toggleFormVisibility = () => {
  isFormVisible.value = !isFormVisible.value;
  isSocialFormVisible.value = false; // 关闭社交账号表单
};

const toggleSocialFormVisibility = () => {
  isSocialFormVisible.value = !isSocialFormVisible.value;
  isFormVisible.value = false; // 关闭资料表单
};

const passwordMismatch = computed(() => {
  return profileForm.value.password !== profileForm.value.confirm;
});

const isFormValid = computed(() => {
  return (
    profileForm.value.username &&
    profileForm.value.password &&
    !passwordMismatch.value
  );
});

const resetForm = () => {
  Object.assign(profileForm.value, {
    username: "",
    password: "",
    confirm: "",
    email: "",
    organization: "",
    department: "",
    phone_number: "",
  });
};

const updateProfile = async () => {
  try {
    const { confirm, ...data } = profileForm.value;
    await userStore.updateUserInfo(data);
    ElMessageBox.alert("Profile updated successfully", "Success", {
      type: "success",
    });
    toggleFormVisibility();
  } catch (error) {
    ElMessageBox.alert("Failed to update profile", "Error", { type: "error" });
  }
};

const logout = () => {
  ElMessageBox.confirm("Are you sure you want to log out?", "Confirm Logout", {
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    type: "warning",
  })
    .then(() => {
      authStore.logout();
      router.push("/user/login");
    })
    .catch(() => {});
};


const showQrCode = () => {
  // 显示二维码逻辑
};

const bindSocial = (platform) => {
    // 绑定社交账号逻辑
    ElMessageBox.alert(`Binding ${platform} account`, "Info", { type: "info" });
};
</script>


<style scoped>
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --card-bg: rgba(255, 255, 255, 0.95);
  --glass-border: rgba(255, 255, 255, 0.2);
}

.profile-page {
  display: flex;
  padding: 20px;
  gap: 20px;
}



.profile-content {
  flex: 3;
  padding: 10px;
  overflow: hidden; /* 防止内容溢出 */
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.profile-tab-content {
  text-align: center;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-tab-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}



.stats-cards {
  margin-top: 20px;
}

.social-bindings {
  margin-top: 20px;
}

.social-icons {
  display: flex;
  gap: 30px;
}
.el-button {
    margin-left: 30px;
    margin-right: 30px;
    /* background: linear-gradient(135deg, #5795ef, #3a6dd5); */
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  .el-button:hover {
    filter: brightness(1.0); /* 提高亮度，使颜色变淡 */
    transform: translateY(-2px);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15); /* 减弱阴影 */
  }
  
  .el-button[disabled] {
    background-color: #f2f2f2;
    border-color: #dcdfe6;
    color: #c0c4cc;
  }

</style>