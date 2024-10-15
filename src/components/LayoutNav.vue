<script setup>
const confirm = () =>{
  console.log('User is gonna Log Out')
  router.push('/login')
}

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template>
          <li><a href="javascript:;"><i class="iconfont icon-user"></i></a></li>
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