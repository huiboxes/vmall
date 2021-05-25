<template>
  <div class="login">
    <div class="container">
      <!-- <a href="/#/index"><img src="/imgs/login-logo.png" alt=""/></a> -->
      <order-header title="嗨商城">
        <template v-slot:tip>
          <span>有好物</span>
        </template>
      </order-header>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span>
          </h3>
          <div class="input">
            <input type="text" placeholder="请输入帐号" v-model="username" />
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="password"
            />
          </div>
          <div class="btn-box">
            <a href="javascript:;" class="btn" @click="login">登录</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://juejin.cn/user/2858385965326968"
          >掘金账号<span>|</span></a
        >
        <a href="">high服务（BaaS）<span>|</span></a>
        <a href="">high运维<span>|</span></a>
        <a href="">high课堂</a>
      </div>
      <p class="copyright">
        Copyright ©2020 huibox.xyz All Rights Reserved.
      </p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import storage from '../storage'
import OrderHeader from '@/components/OrderHeader'

export default {
  name: 'login',
  components: {
    OrderHeader,
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      let { username, password } = this
      this.axios
        .post('/user/login', {
          username,
          password,
        })
        .then(res => {
          storage.setItem('token', res.token)
          storage.setItem('username',res.username)
          this.saveUserName(res.username)
          this.$router.push({
            name: 'index',
            params: {
              from: 'login',
            },
          })
        })
    },
    ...mapActions(['saveUserName']),
    register() {
      this.axios
        .post('/user/register', {
          username: 'admin1',
          password: 'admin1',
          email: 'admin1@163.com',
        })
        .then(() => {
          this.$message.success('注册成功')
        })
    },
  },
}
</script>
<style lang="scss">
@import './../assets/scss/base.scss';
@import './../assets/scss/config.scss';
@import './../assets/scss/button.scss';

.login {
  .order-header {
    border-bottom: none;
  }
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: $colorA;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: $colorA;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>
