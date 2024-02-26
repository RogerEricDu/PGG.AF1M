<script setup>

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>RogerEricDu</a></li>
          <li>
            <el-popconfirm title="Are you sure to exit?" confirm-button-text="Confirm" cancel-button-text="Cancel">
              <template #reference>
                <a href="javascript:;">Log Out</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">History Records</a></li>
          <li><a href="javascript:;">Help</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">Please log in</a></li>
          <li><a href="javascript:;">Help</a></li>
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
    height: 53px;
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