<script>
import AllIndividuals from './components/AllIndividuals.vue'
import ByProvince from './components/ByProvince.vue'
import ByRegion from './components/ByRegion.vue'
import SearchingBar from './components/SearchingBar.vue'
export default {
  // 导入上传接口
  name: 'import',
    data() {
        return {
            // 附件数量限制
            fileLimit: 10,
            //上传后的文件列表
            fileList: [],
            //请求头
            headers: { 'Content-Type': 'multipart/form-data' },
            // 允许的文件类型
            fileType: ['xls', 'xlsx'],
            // 运行上传文件大小，单位 M
            fileSize: 10,
            // 失败样式开关
            blureimport: false,
        };
    },
    methods: {
      handleSubmit() {
      // 处理提交按钮点击事件
      console.log('Submit button clicked');
      // 在这里添加接口
    },
    //模板下载
        downloadTemplate() {
            let type = this.$route.query.type;
            console.log(type);
            // 创建a标签
            let a = document.createElement('a');
            // 根据不同的页面参数下载不同模板
            if (type === 'personnel') {
                // 例子
                // 模板位置 最好不要出现中文
                a.href = './public/sample_list.xlsx';
                // 下载模板名称
                a.download = '样本信息填写模板.xlsx';
            } else if (type === 'contract') {
                // 模板位置 最好不要出现中文
                a.href = './public/sample_list.xlsx';
                // 下载模板名称
                a.download = '样本信息填写模板.xlsx';
            }
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();
        },
        //上传文件之前
        beforeUpload(file) {
            if (file.type !== '' || file.type != null || file.type !== undefined) {
                //截取文件的后缀，判断文件类型
                const FileExt = file.name.replace(/.+\./, '').toLowerCase();
                //计算文件的大小
                const isLt5M = file.size / 1024 / 1024 < 50; //这里做文件大小限制
                // console.log(1);
                //如果大于50M
                if (!isLt5M) {
                    this.$showMessage('上传文件大小不能超过 10MB!');
                    return false;
                }
                //如果文件类型不在允许上传的范围内
                if (this.fileType.includes(FileExt)) {
                    return true;
                } else {
                    this.$message.error('上传文件格式不正确!');
                    return false;
                }
            }
        },
        //超出文件个数的回调
        handleExceed() {
            this.$message({
                type: 'warning',
                message: '超出最大上传文件数量的限制！'
            });

        },

        async handleRemove() {},
        async uploadFile(item) {
            // this.$showMessage("文件上传中........");
            //上传文件的需要formdata类型;所以要转
            // 创建formDatas类型
            let formDatas = new FormData();
            formDatas.append('uploadFile', item.file);
            console.log('文件是', item.file);
            // console.log("文件是 " + item.file.name);
            // 判断 根据不同页面参数调用不同的接口
            let type = this.$route.query.type;

        },
        // 模拟导入失败的样式变化
        qin() {
            console.log('失败了');
            this.blureimport = true;
        }
    },
  components: {
    AllIndividuals, // 注册GeneTable组件
    ByProvince,
    ByRegion,
    SearchingBar
  }
} 

</script>

<template>
<div class="AlleleFreq-page-container">
    <div class="AlleleFreq-container">
      <el-icon class="AlleleFreq-icon1"><Document /></el-icon><h1>Allele Frequency</h1>  
    </div>
    <div style="height:100%">
      <SearchingBar></SearchingBar>
      <div class="center">
      <div class="upload" :class="{ active: blureimport }">
      <el-upload
        drag
        action
        multiple
        :http-request="uploadFile"
        ref="upload"
        :limit="fileLimit"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :before-upload="beforeUpload"
        :show-file-list="true"
        :headers="headers"
      >
        <i class="el-icon-upload"></i>
        <p>Click to upload, or drag files here</p>
      </el-upload>
      <el-button type="primary" class="submit-button" @click="handleSubmit">Submit</el-button>
      </div>
      </div>
          <!-- 包裹内容的框 -->
    <div class="AlleleFreq-content-box">
      <p style="font-size: 20px;font-weight: bold;text-align: center;">Choose the section you would like to use.</p>
      <!-- 导航栏 -->
      <div class="AlleleFreq-navigation-container">
        <router-link to="/allelefreq/all_ind" class="AlleleFreq-navigation-item">All Individuals</router-link>
        <router-link to="/allelefreq/by_province" class="AlleleFreq-navigation-item">By Province</router-link>
        <router-link to="/allelefreq/by_region" class="AlleleFreq-navigation-item">By Region</router-link>
      </div>

      <!-- 其他内容 -->
      <div class="AlleleFreq-content-container"> <!-- 二级路由的内容放在这里配置展示 -->
        <router-view/>
      </div>
<!--     <GeneTable /> -->
    </div>
    </div>
  </div>
</template>

<style>
.AlleleFreq-page-container {
  user-select: text; /* 允许文本被选择 */
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1200px; /* 设置容器宽度为 700px */
  margin: 0 auto; /* 居中显示 */
}
.AlleleFreq-container {
  display: flex;
  padding: 20px;
}
.AlleleFreq-icon1{
  border:black;
  font-size: 36px;
}
.AlleleFreq-content-box {
  background-color: white;
  padding: 20px;
  border-radius: 5px; /* 可以添加圆角效果 */
  margin-top: 20px; /* 可以调整框与导航栏之间的间距 */
}

.AlleleFreq-container {
  display: flex;
  padding: 20px;
}
.AlleleFreq-content-container{
  flex: 1;
  
}
.AlleleFreq-icon{
  border:black;
  font-size: 36px;
}
.AlleleFreq-navigation-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* 可以调整导航栏与标题之间的间距 */
}

.AlleleFreq-navigation-item {
  font-size: 20px;
  font-weight: bold;
  color: #6e9197;
  flex: 1;
  text-align: center;
  padding: 15px;
  border-radius: 5px; 
  cursor: pointer; /* 可以使导航项鼠标移上去时显示为手型 */
  margin-left: 5px;
  background-color:#f5f5f5;
}

.AlleleFreq-navigation-item:hover {
  background-color: lightgray; /* 鼠标移上去时的背景颜色 */
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.upload {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%; /* 可以调整上传区域的宽度 */
  padding: 20px;
  border: 1px dashed #d9d9d9;
  background-color: #f5f5f5;
  border-radius: 5px;
  text-align: center;
}
.upload.active {
  background-color: #e6f7ff; /* 活跃状态的背景颜色 */
}
.submit-button {
  margin: 20px;
  height: 50px; /* 与上传区域对齐的高度，可以根据需要调整 */
}
/* .center {
  height: 827px;
  background-color: #fff;
  position: relative;

  margin-top: 35px;
  margin-bottom: 25px;
  @media screen and (min-height: 950px) and (max-height: 990px) {
    margin-top: 50px;
    margin-bottom: 40px;
  }
  @media screen and (min-height: 1070px) {
    margin-top: 100px;
    margin-bottom: 100px;
  }
  .upload {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 720px;
    display: flex;
    .btn-box {
      width: 360px;
      height: 180px;
      box-sizing: border-box;
      border: 1px dashed #d9d9d9;
      display: flex;
      align-items: center;
      justify-content: center;
      ::v-deep .el-tooltip {
        color: rgb(88, 87, 81) !important;
        font-size: 25px !important;
        margin-right: 10px;
      }
    }
  }
} */
</style>