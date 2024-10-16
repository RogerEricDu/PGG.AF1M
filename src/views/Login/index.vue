<script setup>
import { ref } from 'vue'
import { userLogin, userSignUp } from '@/api/user.js' // 导入API方法

const isLoginMode = ref(true) // 用于切换登录和注册模式

const form = ref({
  username: '',
  password: '',
  email: '',
  agree: false
})

const rules = {
  username: [
    { required: true, message: 'Please input your username', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input your password', trigger: 'blur' }
  ],
  email: [
    { required: !isLoginMode.value, message: 'Please input your email', trigger: 'blur' }
  ]
}

const formRef = ref(null) // 引用el-form

const doLogin = async () => {
  try {
    // 封装成对象并调用userLogin
    const loginData = {
      username: form.value.username,
      password: form.value.password
    }
    await userLogin(loginData)
    this.$message.success('Login successful!')
    // 重定向到主页或其他页面
    // router.push('/') // 取消注释并根据需要重定向
  } catch (error) {
    this.$message.error('Login failed. Please try again.')
  }
}

const doSignUp = async () => {
  const isValid = await formRef.value.validate()
  if (isValid) {
    try {
      // 封装成对象并调用userSignUp
      const signUpData = {
        username: form.value.username,
        password: form.value.password,
        email: form.value.email
      }
      await userSignUp(signUpData)
      this.$message.success('Sign up successful!')
      isLoginMode.value = true // 注册成功后返回登录页面
    } catch (error) {
      this.$message.error('Sign up failed. Please try again.')
    }
  }
}

const switchToSignUp = () => {
  isLoginMode.value = false
}

const switchToLogin = () => {
  isLoginMode.value = true
}
</script>



<template>
  <div>
    <header class="login-header"></header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:void(0);">{{ isLoginMode ? 'Log In' : 'Sign Up' }}</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px" status-icon>
              <el-form-item prop="username" label="Username:">
                <el-input 
                  v-model="form.username"           
                  placeholder="Please input your username"
                  name="Username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"/>
              </el-form-item>
              <el-form-item prop="password" label="Password:">
                <el-input 
                  v-model="form.password"
                  type="password"
                  placeholder="Please input password"
                  show-password/>
              </el-form-item>
              <!-- 注册页面时显示邮箱 -->
              <el-form-item v-if="!isLoginMode" prop="email" label="Email:">
                <el-input 
                  v-model="form.email"
                  type="email"
                  placeholder="Please input email"
                />
              </el-form-item>
              <!-- 同意政策的复选框 -->
              <el-form-item prop="agree" label-width="22px" v-if="!isLoginMode">
                <el-checkbox size="large" v-model="form.agree">
                  I agree to the Privacy Policy and Services
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="isLoginMode ? doLogin() : doSignUp()">
                {{ isLoginMode ? 'Log In' : 'Yes' }}
              </el-button>
              <el-button size="large" class="subBtn" @click="isLoginMode ? switchToSignUp() : switchToLogin()">
                {{ isLoginMode ? 'Sign Up' : 'No' }}
              </el-button>
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