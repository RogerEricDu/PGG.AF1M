<template>
  <div class="login-page">
    <!-- 右侧部分 -->
    <div class="login-content">
      <div class="login-tab-content">
        <el-form ref="registerFormRef" :model="registerForm" class="login-form">
          <el-form-item label="Username" class="form-item">
            <el-input
              v-model="registerForm.username"
              placeholder="Enter your username"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="Password"
            class="form-item"
            prop="password"
            :rules="[{ required: true, message: 'Password is required', trigger: 'blur' }]"
          >
            <el-input
              type="password"
              v-model="registerForm.password"
              placeholder="Enter your password"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="Confirm Password"
            class="form-item"
            prop="confirm"
            :rules="[
              { required: true, message: 'Confirm password is required', trigger: 'blur' },
              { validator: validateConfirmPassword, trigger: 'blur' }
            ]"
          >
            <el-input
              type="password"
              v-model="registerForm.confirm"
              placeholder="Confirm your password"
              clearable
            />
          </el-form-item>
          <el-form-item label="Email" class="form-item">
            <el-input
              type="email"
              v-model="registerForm.email"
              placeholder="Enter your email"
              clearable
            />
          </el-form-item>
          <el-form-item label="Organization" class="form-item">
            <el-input
              v-model="registerForm.organization"
              placeholder="Enter your organization"
              clearable
            />
          </el-form-item>
          <el-form-item label="Department" class="form-item">
            <el-input
              v-model="registerForm.department"
              placeholder="Enter your department"
              clearable
            />
          </el-form-item>
          <el-form-item label="Phone Number" class="form-item">
            <el-input
              type="text"
              v-model="registerForm.phoneNumber"
              placeholder="Enter your phone number"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              native-type="submit"
              class="login-button"
              @click="handleRegister"
            >
              Sign Up
            </el-button>

          </el-form-item>
        </el-form>

        <!-- Back to Login Link -->
        <div class="signup-link">
          <p>
            Already have an account?
            <el-link :underline="false" @click="goToLogin" class="signup-text">
              Log In
            </el-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { register } from "@/api/user";

const router = useRouter();
const registerForm = ref({
  username: "",
  password: "",
  confirm: "",
  email: "",
  organization: "",
  department: "",
  phoneNumber: "",
});

const registerFormRef = ref(null);

const handleRegister = () => {
  registerFormRef.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    try {
      await register({
        username: registerForm.value.username,
        password: registerForm.value.password,
        email: registerForm.value.email,
        organization: registerForm.value.organization,
        department: registerForm.value.department,
        phoneNumber: registerForm.value.phoneNumber,
        role: 2, // 默认角色
      });
      ElMessage.success("Registration successful");
      router.push("/user/login");
    } catch (error) {
      ElMessage.error("Registration failed: " + error.message);
    }
  });
};

const resetForm = () => {
  registerFormRef.value.resetFields();
};

const goToLogin = () => {
  router.push("/user/login");
};

const validateConfirmPassword = (rule, value, callback) => {
  if (value !== registerForm.value.password) {
    callback(new Error("Passwords do not match"));
  } else {
    callback();
  }
};
</script>

<style scoped>
/* 样式保持一致 */
.login-page {
  display: flex;
  height: 800px;
  justify-content: center;
  align-items: center;
}

.login-content {
  max-width: 800px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.login-form .form-item {
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
}

.signup-link {
  margin-top: 20px;
}

.signup-text {
  color: #409eff;
}
</style>

