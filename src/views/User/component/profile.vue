<template>
  <div class="profile-page">
    <!-- 左侧部分 -->
    <div class="profile-sidebar">
      <div class="profile-image-wrapper">
        <img src="/HomeIcon.png" alt="Profile" class="profile-image" />
      </div>
      <el-button
        type="danger"
        class="logout-button"
        @click="logout"
        style="margin-top: 20px;"
      >
        Logout
      </el-button>
    </div>

    <!-- 右侧部分 -->
    <div class="profile-content">
      <!-- 动态内容 -->
      <div class="profile-tab-content">
        <el-form
          ref="profileFormRef"
          :model="profileForm"
          :rules="rules"
          label-width="120px"
          @submit.prevent="updateProfile"
          class="profile-form"
        >
          <el-form-item label="Username" prop="username">
            <el-input
              type="username"
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
                <el-icon
                  class="password-toggle"
                  :name="passwordVisible ? 'view' : 'view-off'"
                  @click="togglePasswordVisibility"
                >
                  <Hide
                    :class="passwordVisible ? 'el-icon-view' : 'el-icon-view-off'"
                  ></Hide>
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Confirm" prop="confirm">
            <el-input
              :type="passwordVisible ? 'text' : 'password'"
              v-model="profileForm.confirm"
              placeholder="Confirm new password"
              clearable
            ></el-input>
            <p v-if="passwordMismatch" class="error-text">Passwords do not match!</p>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input
              type="email"
              v-model="profileForm.email"
              placeholder="Enter your email"
              clearable
            ></el-input>
            <p v-if="!emailValid && profileForm.email" class="error-text">Invalid email address!</p>
          </el-form-item>
          <el-form-item label="Organization">
            <el-input
              v-model="profileForm.organization"
              placeholder="Enter your organization"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Department">
            <el-input
              v-model="profileForm.department"
              placeholder="Enter your department"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input
              v-model="profileForm.phoneNumber"
              placeholder="Enter your phone number"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">Confirm Update</el-button>
            <el-button type="warning" @click="resetForm" class="reset-button">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

// 使用 Pinia 的 store
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();

// 初始化表单
const profileForm = ref({
  username: "",
  password: "",
  confirm: "",
  email: "",
  organization: "",
  department: "",
  phoneNumber: "",
});

//表单验证
const rules = {
  username: [{ required: true, message: "Please enter your username", trigger: "blur" }],
  password: [{ required: true, message: "Please enter a new password", trigger: "blur" }],
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
  email: [
    { required: true, message: "Please enter your email", trigger: "blur" },
  ],
};

// 密码显示状态
const passwordVisible = ref(false);

// 切换密码显示状态
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 重置表单
const resetForm = () => {
  Object.assign(profileForm.value, {
    username: "",
    password: "",
    confirm: "",
    email: "",
    organization: "",
    department: "",
    phoneNumber: "",
  });
};

// 更新用户信息
const updateProfile = async () => {
  if (passwordMismatch.value) {
    ElMessageBox.alert("Passwords do not match!", "Error", { type: "error" });
    return;
  }
  if (!emailValid.value) {
    ElMessageBox.alert("Invalid email address!", "Error", { type: "error" });
    return;
  }

  try {
    await userStore.updateUserInfo(profileForm.value);
    ElMessageBox.alert("Profile updated successfully", "Success", {
      type: "success",
    });
  } catch (error) {
    ElMessageBox.alert("Failed to update profile", "Error", { type: "error" });
  }
};

// 退出登录
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
</script>

<style scoped>
.profile-page {
  display: flex;
  padding: 20px;
}

.profile-sidebar {
  flex: 1;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logout-button {
  width: 80%;
}

.profile-image-wrapper {
  border: 5px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-image {
  width: 100%;
  height: auto;
}

.profile-content {
  flex: 2;
  padding: 20px;
}

.profile-tab-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.reset-button {
  margin-left: 10px;
}

.error-text {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.password-toggle {
  cursor: pointer;
  font-size: 16px;
  color: #909399;
}
</style>
