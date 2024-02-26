<template>
    <footer class="app_footer">
      <!-- 联系我们 -->
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
          <dl>
            <dt>服务热线</dt>
            <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
          </dl>
        </div>
      </div> -->
      <!-- 其它 -->
      <div class="extra">
        <div class="container">
          <div class="slogan">
            <a href="https://pog.fudan.edu.cn">
              <i class="iconfont icon-footer01"></i>
              <span>HumPOG</span>
            </a>
            <a href="https://www.biosino.org/pgghan/index">
              <i class="iconfont icon-footer02"></i>
              <span>PGG.Han</span>
            </a>
            <a href="https://www.biosino.org/pgghan2/index">
              <i class="iconfont icon-footer03"></i>
              <span>PGG.Han 2.0</span>
            </a>
          </div>
          <!-- 版权信息 -->
          <div class="copyright">
            <p>Our Services</p>
            <br>
            <p>
              <a href="https://pog.fudan.edu.cn">Home</a>
              <a href="https://www.biosino.org/pgghan/index">Gene</a>
              <a href="https://www.biosino.org/pgghan2/index">SNPs</a>

            </p>
            <p>CopyRight ©All Rights Reserved by Human Population Omics Group</p>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <style scoped lang='scss'>
  .copyright p{
    color: #ededed;
    font-size: 20px;
  }
  .app_footer {
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
      height: 200px;
      line-height: 58px;
      padding: 60px 100px;
      border-bottom: 1px solid #434343;
      display: flex;
      justify-content: space-between;
  
      a {
        height: 58px;
        line-height: 58px;
        color: #fff;
        font-size: 28px;
  
        i {
          font-size: 50px;
          vertical-align: middle;
          margin-right: 10px;
          font-weight: 100;
        }
  
        span {
          vertical-align: middle;
          text-shadow: 0 0 1px #333;
        }
      }
    }
  
    .copyright {
      height: 170px;
      padding-top: 40px;
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