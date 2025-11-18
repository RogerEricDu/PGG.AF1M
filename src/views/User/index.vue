<template>
  <div class="user-page-container">
    <div class="user-container">
      <el-icon class="user-icon" style="font-size: 36px;"><DocumentCopy /></el-icon>
      <h1>User</h1>
    </div>

    <div class="user-content-container">
      <!-- 使用 router-view 渲染子路由 -->
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import LogIn from "./component/login.vue";
import Profile from "./component/profile.vue";

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();

// 页面组件映射
const componentsMap = {
  Login: LogIn,
  Profile: Profile,
};

// 当前视图名称
const currentView = computed(() => {
  if (!authStore.isLoggedIn) {
    return "Login";
  }
  return "Profile";
});

// 监听用户登录状态并同步路由
watch(
  () => currentView.value,
  (newView) => {
    const routeMap = {
      Login: "/user/login",
      Profile: "/user/profile",
    };
    router.push(routeMap[newView]); // 更新路由路径
  },
  { immediate: true }
);
</script>

<style>
.user-page-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  background: linear-gradient(to bottom, #f5f7fa, #ffffff); /* 高级感背景 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.user-container {
  display: flex;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #3a6073, #16222a);
  color: white;
  border-radius: 20px;
  margin-bottom: 20px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;
}
.user-container::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
  animation: shimmer 3s infinite linear;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.user-content-container {
  background-color: white;
  padding: 20px;
  flex: 1;
  border-radius: 5px;
  border: 2px whitesmoke;
}
.demo-tabs {
  margin-top: 20px; /* 调整标签页与上方内容的距离 */
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
  background-color: white; /* 右侧内容部分背景变为白色 */
}
</style>
