<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="" />
      <p>嗨商城</p>
    </div>
    <div class="footer-link">
      <a href="https://juejin.cn/user/2858385965326968"
        >掘金账号<span>|</span></a
      >
      <a href="">high服务（BaaS）<span>|</span></a>
      <a href="">high运维<span>|</span></a>
      <a href="">high课堂</a>
    </div>
    <div class="copyright">
      Copyright ©2020 huibox.xyz All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer',
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/config.scss';
.footer {
  height: 234px;
  background-color: $colorB;
  color: $colorD;
  text-align: center;
  .footer-logo{
    margin-top: 46px;
    margin-bottom: 31px;
    img{
      margin-bottom: 13px;
    }
  }
  .footer-link{
    a{
      color: $colorD;
      display: inline-block;
    }
    span{
      margin: 0 10px;
    }
    margin-bottom: 13px;
  }
}
</style>
