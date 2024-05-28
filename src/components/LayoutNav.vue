<script setup>
import { useUserStore } from '@/stores/userStore';
import {useRouter} from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
const confirm = () =>{
  console.log('User is gonna Log Out')
  //退出逻辑实现，1.清除用户信息，触发action
  userStore.clearUserInfo()
  router.push('/login')
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染，区分登录状态和非登录状态 -->
        <!-- 适配思路：登录时显示第一块，非登录时显示第二块 -->
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="Are you sure to exit?" confirm-button-text="Confirm" cancel-button-text="Cancel">
              <template #reference>
                <a href="javascript:;">Log Out</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">History Records</a></li>
          <li><router-link to="/help">Help</router-link></li>
        </template>
        <template v-else>
          <li><a href="/login">Please Log In / Sign Up</a></li>
          <li><router-link to="/help">Help</router-link></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 36px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>