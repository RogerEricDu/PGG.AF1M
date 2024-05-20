<script setup>


// 表单校验（账号名+密码）

import { ref } from 'vue'

import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

// 1. 准备表单对象
const form = ref({
  account: '',
  password: '',
  agree: true
})

// 2. 准备规则对象
const rules = {
  account: [
    { required: true, message: 'Account cannot be empty', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password cannot be empty', trigger: 'blur' },
    { min: 6, max: 14, message: 'Length of password should be 6-14 characters', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        console.log(value)
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('Please check the agreement'))
        }
      }
    }
  ]
}

// 3. 获取form实例做统一校验
const formRef = ref(null)
const router = useRouter()
const doLogin = () => {
  const { account, password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO LOGIN
      await userStore.getUserInfo({ account, password })
      // 1. 提示用户
      ElMessage({ type: 'success', message: 'Success to Log In' })
      // 2. 跳转首页
      router.replace({ path: '/' })
    }
  })
}

// 1. 用户名和密码 只需要通过简单的配置（看文档的方式 - 复杂功能通过多个不同组件拆解）
// 2. 同意协议  自定义规则  validator:(rule,value,callback)=>{}
// 3. 统一校验  通过调用form实例的方法 validate -> true
</script>


<template>
  <div>
    <header class="login-header">
<!--       <div class="container m-top-20">

        <RouterLink class="entry" to="/"  style="width: 200px;">
          Enter the HomePage
        </RouterLink>
      </div> -->
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">Log In</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px" status-icon>
              <el-form-item prop="account" label="Account:">
                <el-input v-model="form.account" />
              </el-form-item>
              <el-form-item prop="password" label="Password:">
                <el-input v-model="form.password" />
              </el-form-item>
              <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  I agree to the Privacy Policy and Services
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="doLogin">Log In</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login_logo.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}


.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

/*           &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          } */
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
/*         color: $priceColor; */

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
/*       background: $xtxColor; */

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

/* .subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
} */
</style>