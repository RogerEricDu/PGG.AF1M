<template>
    <footer class="app_footer">
<!--       <div class="contact">
        <div class="container">
          <dl>
            <dt>客户服务</dt>
            <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
            <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
          </dl>
          <dl>
            <dt>关注我们</dt>
            <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
            <dd><i class="iconfont icon-weibo"></i> 微博</dd>
          </dl>
          <dl>
            <dt>下载APP</dt>
            <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
            <dd class="download">
              <span>扫描二维码</span>
              <span>立马下载APP</span>
              <a href="javascript:;">下载页面</a>
            </dd>
          </dl>
        </div>
      </div> -->
      <!-- 其它 -->
      <div class="extra">
        <div class="container">
          <ul style="color:#ededed; text-align: center; font-size: 24px; padding-top: 20px;">
            Reference Database
          </ul>
          <div class="slogan" style="text-align: center;">
            <a href="https://pog.fudan.edu.cn" target="_blank">
            <img src="../assets/images/HumPOG-logo.png" width="152" height="80">
            <br>
            <span style="color: #ededed;font-size: 22px;">HumPOG.lab</span>
            </a>
            <a href="https://www.biosino.org/pgghan/index" target="_blank">
            <img src="../assets/images/PGG.Han-Logo.png" width="152" height="80">
            <br>
            <span style="color: #ededed;font-size: 22px;">PGG.Han</span>
            </a>
            <a href="https://www.biosino.org/pgghan2/index" target="_blank">
            <img src="../assets/images/PGG.Han2-Logo.png" width="152" height="80">
            <br>
            <span style="color: #ededed;font-size: 22px;" target="_blank">PGG.Han2.0</span>
            </a>
            <a href="https://gnomad.broadinstitute.org/" target="_blank">
            <img src="../assets/images/gnomAD-Logo.png" width="152" height="80">
            <br>
            <span style="color: #ededed;font-size: 22px;">gnomAD</span>
            </a>
          </div>

          <!-- 版权信息 -->
          <div class="copyright">
            <p>Our Services</p>
            <div class="serviceBar">
              <RouterLink to="/">&nbsp;&nbsp;Home&nbsp;&nbsp;</RouterLink>
<!--               <RouterLink to="/statistics">&nbsp;&nbsp;Stats&nbsp;&nbsp;</RouterLink> -->
              <RouterLink to="/data">&nbsp;&nbsp;Data&nbsp;&nbsp;</RouterLink>
              <RouterLink to="/allelefreq">&nbsp;&nbsp;Variants&nbsp;&nbsp;</RouterLink>
<!--               <RouterLink to="/tools">&nbsp;&nbsp;Tools&nbsp;&nbsp;</RouterLink> -->
              <RouterLink to="/summary">&nbsp;&nbsp;Summary&nbsp;&nbsp;</RouterLink>
              <RouterLink to="/about">&nbsp;&nbsp;About&nbsp;&nbsp;</RouterLink>
              <RouterLink to="/guide">&nbsp;&nbsp;Guide&nbsp;&nbsp;</RouterLink>
              <RouterLink to="/user">&nbsp;&nbsp;User&nbsp;&nbsp;</RouterLink>
            </div>
            <p>CopyRight 2024 ©All Rights Reserved by Human Population Omics Group</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped lang='scss'>
  .serviceBar{
    color: #ededed;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .copyright p{
    color: #ededed;
    font-size: 20px;
    margin-bottom: 20px;
  }
  .app_footer {
  width: 100%;
    overflow: hidden;
    background-color: #f5f5f5;
    padding-top: 20px;
  
    .contact {
      background: #fff;
  
      .container {
        padding: 60px 0 40px 25px;
        display: flex;
      }
  
      dl {
        height: 190px;
        text-align: center;
        padding: 0 72px;
        border-right: 1px solid #f2f2f2;
        color: #999;
  
        &:first-child {
          padding-left: 0;
        }
  
        &:last-child {
          border-right: none;
          padding-right: 0;
        }
      }
  
      dt {
        line-height: 1;
        font-size: 18px;
      }
  
      dd {
        margin: 36px 12px 0 0;
        float: left;
        width: 92px;
        height: 92px;
        padding-top: 10px;
        border: 1px solid #ededed;
  
        .iconfont {
          font-size: 36px;
          display: block;
          color: #666;
        }
  
        &:hover {
          .iconfont {
            color: $xtxColor;
          }
        }
  
        &:last-child {
          margin-right: 0;
        }
      }
  
      .qrcode {
        width: 92px;
        height: 92px;
        padding: 7px;
        border: 1px solid #ededed;
      }
  
      .download {
        padding-top: 5px;
        font-size: 14px;
        width: auto;
        height: auto;
        border: none;
  
        span {
          display: block;
        }
  
        a {
          display: block;
          line-height: 1;
          padding: 10px 25px;
          margin-top: 5px;
          color: #fff;
          border-radius: 2px;
          background-color: $xtxColor;
        }
      }
  
      .hotline {
        padding-top: 20px;
        font-size: 22px;
        color: #666;
        width: auto;
        height: auto;
        border: none;
  
        small {
          display: block;
          font-size: 15px;
          color: #999;
        }
      }
    }
  
    .extra {
      background-color: #333;
    }
  
    .slogan {
      height: 160px;
      line-height: 150px;
      padding: 20px 20px;
      border-bottom: 1px solid #434343;
      display: flex;
      justify-content: space-between;
  
      a {
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
  
/*         span {
          font-size: 50px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        } */
  
        span {
          vertical-align: middle;
          text-shadow: 0 0 1px #333;
        }
      }
    }
    .slogan img{
      border-radius: 5px;
    }
  
    .copyright {
      height: 180px;
      padding-top: 30px;
      text-align: center;
      color: #999;
      font-size: 15px;
  
      p {
        line-height: 1;
        margin-bottom: 20px;
      }
  
      a {
        color: #999;
        line-height: 1;
        padding: 0 10px;
        border-right: 1px solid #999;
  
        &:last-child {
          border-right: none;
        }
      }
    }
  }
  </style>