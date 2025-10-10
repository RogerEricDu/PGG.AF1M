<template>
<div class="login-page">
    <!-- 左侧部分 -->
    <div class="login-sidebar">
    <div class="login-image-wrapper">
        <img src="/Bar-Logo.png" alt="Profile" class="profile-image" />
    </div>
    </div>

    <!-- 右侧部分 -->
    <div class="login-content">
    <div class="login-tab-content">
        <el-form @submit.prevent="handleLogin" class="login-form">
        <el-form-item label="Username" class="form-item">
            <el-input v-model="loginForm.username" placeholder="Enter your username" />
        </el-form-item>
        <el-form-item label="Password" class="form-item">
            <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="Enter your password"
            />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" class="login-button">Log In</el-button>
        </el-form-item>
        </el-form>

        <!-- Sign Up Link -->
        <div class="signup-link">
        <p>
            Don't have an account? 
            <el-link :underline="false" @click="goToSignUp" class="signup-text">
            Sign Up
            </el-link>
        </p>
        </div>
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore';
import { ElMessageBox } from 'element-plus';

const router = useRouter();
const authStore = useAuthStore();
const loginForm = ref({ username: '', password: '' });

const handleLogin = async () => {
try {
    await authStore.login(loginForm.value);
    router.push('/user/profile'); // 登录成功后重定向到profile
} catch (error) {
    console.log(error);
    ElMessageBox.alert(
    'Login failed: ' + (error.response?.data || 'Unknown error'),
    'Login Error',
    { type: 'error' }
    );
}
};

// 跳转到注册页面
const goToSignUp = () => {
router.push('/user/profile');
};
</script>

<style scoped>
.login-page {
display: flex;
height: 600px;
justify-content: center;
align-items: center;
}

.login-sidebar {
display: none;
}

.login-image-wrapper {
border-radius: 50%;
overflow: hidden;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profile-image {
width: 100%;
height: 100%;
object-fit: cover;
}

.login-content {
flex: 1;
max-width: 400px;
width: 100%;
padding: 40px;
background-color: #fff;
border-radius: 15px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
text-align: center;
}

.login-tab-content {
display: flex;
flex-direction: column;
}

.login-form .form-item {
margin-bottom: 20px;
}

.el-input {
border-radius: 8px;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
transition: border-color 0.3s ease;
}

.el-input:focus {
border-color: #409eff;
box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
}

.login-button {
width: 100%;
padding: 12px;
border-radius: 10px;
font-size: 16px;
}

.login-button:hover {
background-color: #409eff;
color: #fff;
}

.el-form-item label {
font-weight: bold;
color: #333;
}

.signup-link {
margin-top: 20px;
}

.signup-text {
color: #409eff;
cursor: pointer;
}

.signup-text:hover {
text-decoration: underline;
}
</style>

