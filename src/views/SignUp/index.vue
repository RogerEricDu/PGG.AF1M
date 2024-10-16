<script setup>


// 表单校验（账号名+密码）

import { ref } from 'vue'

// 1. 准备表单对象
const form = ref({
  account: '',
  password: '',
  check_password:'',
  agree: true
})

// 2. 准备规则对象
const rules = {
  account: [
    { required: true, message: 'Account cannot be empty', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password cannot be empty', trigger: 'blur' },
    { min: 6, max: 14, message: 'Password should be 6-14 characters', trigger: 'blur' },
  ],
  check_password: [
    { required: true, message: 'Password cannot be empty', trigger: 'blur' },
    { min: 6, max: 14, message: 'Password should be 6-14 characters', trigger: 'blur' },
    {
      validator:(rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('Password do not match'))
        }else{
          callback()
        }
      },
      trigger:'blur'
    }
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
const doDoubleSignUp = () => {
  const { account, password, check_password } = form.value
  // 调用实例方法
  formRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO SIGNUP
      await userStore.registerUser({ account, password, check_password })
      // 1. 提示用户
      this.$message({ type: 'success', message: 'Success to Sign Up' })
      // 2. 跳转首页
      router.replace({ path: '/login' })
    }
  })
}
const doReLogin = () => {
  // 点击 "Sign Up" 按钮后跳转到注册页面
  router.push({ path: '/login' })
}


</script>


<template>
  <div class="signup-container">
    <header class="signup-header">
<!--       <div class="container m-top-20">

        <RouterLink class="entry" to="/"  style="width: 200px;">
          Enter the HomePage
        </RouterLink>
      </div> -->
    </header>
    <section class="signup-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">Sign Up</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="80px" status-icon>
              <el-form-item prop="account" label="Account:">
                <el-input 
                ref="Account"
                v-model="form.account"           
                placeholder="Please input your account"
                name="Account"
                type="text"
                tabindex="1"
                autocomplete="on"/>
              </el-form-item>
              <el-form-item prop="password" label="Password:">
                <el-input 
                v-model="form.password"
                type="password"
                placeholder="Please input password"
                show-password
                />
              </el-form-item>
              <el-form-item prop="check_password" label="Check:">
                <el-input 
                v-model="form.check_password"
                type="check_password"
                placeholder="Please input password again"
                show-password
                />
              </el-form-item>
<!--               <el-form-item prop="agree" label-width="22px">
                <el-checkbox size="large" v-model="form.agree">
                  I agree to the Privacy Policy and Services
                </el-checkbox>
              </el-form-item> -->
              <el-button size="large" class="subBtn" @click="doDoubleSignUp">Submit</el-button>
              <el-button size="large" class="subBtn" @click="doReLogin">Log In</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang='scss'>
.signup-header {
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

.signup-section {
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